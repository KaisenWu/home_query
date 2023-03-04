import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://Kaisen:Kaisen@homequerycluster.arkxnhx.mongodb.net/home_query?retryWrites=true&w=majority"
  );
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

export async function getFilteredProperties(client, collection, city) {
    // Declare the database instance.
    const db = client.db();
    // Get all the comments from the collection, convert it to array.
    const filteredProperties = await db.collection(collection).aggregate([
      {
        $match: {
          // year: year,
          // month: month,
          City: city
        }
      }
    ]).toArray();
  
    return filteredProperties;
}