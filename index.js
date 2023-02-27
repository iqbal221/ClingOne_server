const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 8080;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("clingOne Server is running");
});

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t4uwg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  // create database
  const createUser = client.db("ClingOne").collection("users");

  try {
    // user
    app.post("/createUser", async (req, res) => {
      const user = req.body;
      console.log(user);
      const storedUser = await createUser.insertOne(user);
      res.send(storedUser);
      console.log(storedUser);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const findUsers = await createUser.find(query).toArray();
      res.send(findUsers);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log("server is running");
});
