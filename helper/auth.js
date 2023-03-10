// Import the encrypt and compare package.
import { hash, compare } from "bcryptjs";

// Define the function to encrypt password.
export async function hashPassword(password) {
  // The hashed passwords which are generated by the same password don't always the same.
  const hashPassword = await hash(password, 12);
  return hashPassword;
}

// Define the function to comapare the user login inputed password and the hashed password which stored in database.
export async function verifyPassword(password, hashedPassword) {
  // The compare function can copare if the plaint password equals to the hashed password.
  const isValid = await compare(password, hashedPassword);
  // Return the boolean value.
  return isValid;
}