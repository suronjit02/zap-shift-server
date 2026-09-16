const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
import { MongoClient, ServerApiVersion } from "mongodb";
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
