import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../../helper/auth";
import { connectToDatabase } from "../../../../helper/db";

async function handler(req, res) {
  // Check if the request method is PATCH which means update.
  if (req.method !== "PATCH") {
    return;
  }
  //   Get session from the request.
  const session = await getSession({ req: req });
  // Check if the session exists.
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }
  //   Extract email, old and new password.
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  //   Declare the database and collection instance.
  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');
  //   Extract user with the email which extract from session.
  const user = await usersCollection.findOne({ email: userEmail });
  //   Define the response if the extract user faild.
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }
  //   Get the current hashed password from database.
  const currentPassword = user.password;
  // Verify if the user inputed password is correct.
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  // If user input is not correct, send error response.
  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    client.close();
    return;
  }
  //   Hash the new password.
  const hashedPassword = await hashPassword(newPassword);
  // After verify successfully, update the password.
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
