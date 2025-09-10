import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function getMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB_NAME || "flashcard_frenzy");
}
