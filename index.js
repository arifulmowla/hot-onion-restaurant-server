const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
var cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('dotenv').config()

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://process.env.DB_USER:process.env.DB_PASS@cluster0.l97ey.mongodb.net/dbRestaurant>?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("dbRestaurant").collection("recipes");

  // recipes gets
  app.get("/recipes/", (req, res) => {
    const categoryName = req.query.category;
    // res.send("test " + categoryName);
    collection.find({ category: categoryName }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // recipe single gets
  app.get("/recipe/:id", (req, res) => {
    const id = req.params.id;
    // res.send("test " + categoryName);
    collection.find({ _id: ObjectId(id) }).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(process.env.PORT);
