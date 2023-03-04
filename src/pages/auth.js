import { useRouter } from "next/router";
import AuthForm from "../../components/auth/auth-form";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // Define if the router changes and the session is acive, redirect to home page.
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        // If the session is empty, set the loading state to false.
        setIsLoading(false);
      }
    });
  }, [router]);

  // If the loading state is true, displaying the loading text.
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  // If the loading state is false, display the authentication form.
  return <AuthForm />;
}

export default AuthPage;
