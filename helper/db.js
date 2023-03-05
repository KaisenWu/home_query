import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.arkxnhx.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);
  return client;
}

export async function insertDocument(client, collection, document) {
  // Declare the database instance.
  const db = client.db();
  // Operate with a specific collection in the database.
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getRandomProperties(client, collection) {
  // Declare the database instance.
  const db = client.db();
  // Operate with a specific collection in the database.
  const randomeMongoProperties = await db
    .collection(collection)
    .aggregate([{ $sample: { size: 10 } }])
    .toArray();

  return randomeMongoProperties;
}

export async function getFilteredProperties(
  client,
  collection,
  city,
  bedroom,
  bathroom
) {
  // Declare the database instance.
  const db = client.db();
  // Get all the comments from the collection, convert it to array.
  const filteredProperties = await db
    .collection(collection)
    .aggregate([
      {
        $match: {
          "Total Bedrooms": bedroom,
          "Total Bathrooms": bathroom,
          City: city,
        },
      },
    ])
    .toArray();

  return filteredProperties;
}
