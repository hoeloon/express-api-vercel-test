import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.DATABASE_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
export const collections: { user?: any } = {}
export async function connectToDatabase () {
    try {
        const dbName = "test-vercel"
        const collectionName = "user"
        await client.connect();
        
        const db = client.db(dbName);
        const userCollection = db.collection(collectionName)
        collections.user = userCollection
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
    } catch (error: any) {
        console.log(error)
    }

}