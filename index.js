import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gotmti8.mongodb.net/?appName=Cluster0`;

// MongoDB client configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();

    const db = client.db("zapshift_db");
    const parcelsCollection = db.collection("parcels");

    //   parcel api
    app.get("/parcels", async (req, res) => {});

    app.post("/parcels", async (req, res) => {
      const parcel = req.body;
      const result = await parcelsCollection.insertOne(parcel);
      res.send(result);
    });

    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}
// Call the function to connect to MongoDB
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("ZapShift API is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
