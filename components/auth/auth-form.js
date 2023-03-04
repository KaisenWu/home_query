import { useState, useRef } from "react";
// Import signIn function from "next-auth/client"
import { signIn } from "next-auth/client";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

async function createUser(email, password) {
  // Define how to post user input to server.
  // Define which script you intent to post.
  const response = await fetch("/api/auth/signup", {
    // Define the request method to post.
    method: "POST",
    // Define the request body with the user input.
    body: JSON.stringify({ email, password }),
    // Define we will use json to exchange data with server.
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Convert the response to Javascript object format and store it.
  const data = await response.json();
  // Check if the response id unnormal, what will return to user.
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  // Return the response data.
  return data;
}

function AuthForm() {
  // Define the useRef of inputs.
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // Define the login mode useState.
  const [isLogin, setIsLogin] = useState(true);
  // Define the login error message useState.
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  // Create a router instance.
  const router = useRouter();
  // Define the function to toggle between login and registration mode.
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  // Define the function to handle submit button.
  async function submitHandler(event) {
    // Prevent page refresh after click the button.
    event.preventDefault();
    // Store the user input values.
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // Check if the mode is login or not.
    if (isLogin) {
      // Call the signIn function to sign in.
      // By default, if the authentication faild, the next-auth will redirect user to another page.
      // If the sign in excution rejected, the result will contain the rejected information.
      // We don't have to declare the path and request method here, the signIn() method will send request to [...nextauth].js file and pass the credentials (the Javascript onject below) to there.
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // Define if signIn succeed, the user will be redirected to the profile page.
        // The reason why we use router.replace here is we don't want to loose the state.
        router.replace('/home');
      }
      setLoginErrorMsg(result.error)
    } else {
      try {
        // Call the createUser function to post the user input to server. Then store the result.
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        // Log the error.
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <h1>{isLogin && loginErrorMsg}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
