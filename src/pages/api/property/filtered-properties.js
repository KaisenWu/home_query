import { getFilteredProperties } from "../../../../helper/db";
import { connectToDatabase } from "../../../../helper/db";

async function handler(req, res) {

  let client;
  try {
    // Declare the connection instance.
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed." });
    return;
  }

  if (req.method === "POST") {
    const requestBodyJson = JSON.parse(req.body);
    try {
      const filteredProperties = await getFilteredProperties(
        client,
        "transactions",
        requestBodyJson.city,
        requestBodyJson.bedroom,
        requestBodyJson.bathroom
      );
      console.log(filteredProperties);
      res.status(200).json(filteredProperties);
    } catch (error) {
      res.status(500).json({ message: "Getting filtered properties failed" });
    }
  }
  // Close the connection.
  client.close();
}

export default handler;
