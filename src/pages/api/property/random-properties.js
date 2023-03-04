import { getRandomProperties } from "../../../../helper/db";
import { connectToDatabase } from "../../../../helper/db";

async function handler(req, res) {
  const client = await connectToDatabase();
  const properties = await getRandomProperties(client, "transactions");
  client.close();
  res.status(200).json(properties);
}

export default handler;