import { MongoClient } from "mongodb";


export async function connectToDatabase() {
  const connectionString = `mongodb+srv://Kaisen:Kaisen@homequerycluster.arkxnhx.mongodb.net/home_query?retryWrites=true&w=majority`;  
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

export async function getAllProperties(client, collection) {
  // Declare the database instance.
  const db = client.db();
  // Operate with a specific collection in the database.
  const properties = await db.collection(collection).find().toArray();
  client.close();
  return properties;
}

export async function getPropertyById(client, collection, id) {
  // Declare the database instance.
  const db = client.db();
  // Get all the comments from the collection, convert it to array.
 
  const selectedProperties = await db.collection(collection).findById({_id: id});
  client.close();
  return selectedProperties;
}
