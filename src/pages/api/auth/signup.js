import { hashPassword } from "../../../../helper/auth";
import { connectToDatabase } from "../../../../helper/db";

// Define the function to handler the request.
async function handler(req, res) {
  // Validate the request method. If not POST, terminate processig.
  if (req.method !== "POST") {
    return;
  }
  // Store the request body.
  const data = req.body;
  // Destrcture the body to email and password.
  const { email, password } = data;
  // Validate the user input.
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 3
  ) {
    // If the user input validation faild, define the response and terminate processing.
    res.status(422).json({
      message: "Invalid input = password should be at least 3 characters.",
    });
    return;
  }
  // If all validation success, call the connectToDatabase function to activate the connection.
  const client = await connectToDatabase(); 
  // Create database connection.
  const db = client.db();
  // Get the user has the same email in the database.
  const existingUser = await db.collection('users').findOne({email: email})
  // If the user exists already, response to client, close the connection and terminate excution.
  if(existingUser) {
    res.status(422).json({message: 'User exists.'})
    client.close();
    return;
  }

  // Encrypt password.
  const hashedPassword = await hashPassword(password);
  // Define how to insert data to database.
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });
  // Define how to response to client when insertion success.
  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
