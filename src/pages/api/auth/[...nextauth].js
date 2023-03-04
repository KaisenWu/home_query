// Import the next authentication package.
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// Import helper functions.
import { verifyPassword } from "../../../../helper/auth";
import { connectToDatabase } from "../../../../helper/db";

// The NextAuth will apply for the entire app.
export default NextAuth({
  // Define the session.
  session: {
    JWT: true,
  },
  // Define the providers.
  providers: [
    Providers.Credentials({
      // The credentials here is a object with {email: '', password: ''}
      async authorize(credentials) {
        // Craete a connection instance.
        const client = await connectToDatabase();
        // Create a collection instance with the collection name.
        const userCollection = client.db().collection("users");
        // Find if the user is in the users collection.
        const user = await userCollection.findOne({ email: credentials.email });
        // Define how to response if the user email is not in the collection.
        if (!user) {
          client.close();
          throw new Error("No user found. Please try again.");
        }
        // Define the excution in case of the email exists in the collection.
        // Compare the user input password and the hashed password in the database.
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        // Define how to response if the passwords nit match.
        if (!isValid) {
          client.close();
          throw new Error("Your password is not correct. Please try again.");
        }
        // Close the connection and return the user email.
        // If we return an object in the authorize() function, NextAuth will know the authorization successed.
        // The object will be encoded as a json web token.
        // In this case we only return the user email, because we don't want to expose the password even it been hashed.
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
