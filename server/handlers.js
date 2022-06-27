"use strict";

// TO DO: Julia - we will need to set up our Mongo connections here:
const { MongoClient, MongoSystemError, Double } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

//get all items
const getItems = async (req, res) => {
  try {
    const page = req.query.page;
    console.log("page:", page);
    const size = 20;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("store");
    const myItems = await db
      .collection("items")
      .find()
      .skip((page - 1) * size)
      .limit(size)
      .toArray();
    const count = await db.collection("items").countDocuments();
    res.status(200).json({ status: 200, count, data: myItems });

    client.close();
  } catch (err) {
    console.log(err);
  }
};

///get single item by id
const getItemById = async (req, res) => {
  const _id = JSON.parse(req.params.id);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("store");
  const myItem = await db.collection("items").findOne({ _id });

  myItem
    ? res.status(200).json({ status: 200, data: myItem })
    : res.status(404).json({ status: 404, message: "error", data: req.params });
};

///get items by company id
const getItemByCompany = async (req, res) => {
  const companyId = JSON.parse(req.params.id);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("store");
  const itemsByCompany = await db
    .collection("items")
    .find({ companyId })
    .toArray();

  itemsByCompany
    ? res.status(200).json({ status: 200, data: itemsByCompany })
    : res.status(404).json({ status: 404, message: "error", data: req.params });
};

///update item
const updateItem = async (req, res) => {
  const { _id } = req.params;
  try {
    const {
      name,
      price,
      body_location,
      category,
      imageSrc,
      numInStock,
      companyId,
    } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("store");

    const updateItem = await db.collection("items").updateOne(
      { id: _id },
      {
        $set: {
          name: name,
          price: price,
          body_location: body_location,
          category: category,
          imageSrc: imageSrc,
          numInStock: numInStock,
          companyId: companyId,
        },
      }
    );
    await client.close();
    if (updateItem) {
      return res
        .status(200)
        .json({ status: 200, message: "success", data: updateItem });
    } else {
      res.status(400).json({ status: 400, message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, mesage: "error", data: req.params });
  }
};

///create order
const createOrder = async (req, res) => {
  const { order, cxFirstName, cxLastName, email } = req.body;

  const newOrder = {
    _id: uuidv4(),
    ...req.body,
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("store");
    if (0 === "store.$.items.$.numInStock") {
      return res.status(400).json({ status: 400, message: "out of stock" });
    }
    //   add order
    const insertResult = await db.collection("orders").insertOne(newOrder);
    let counter = 0;

    const updateResult = await db.collection("items").updateMany(
      { _id: { $in: order } },
      {
        $inc: {
          numInStock: -1,
        },
      }
    );

    if (updateResult) {
      return res.status(200).json({ status: 200, message: newOrder });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Cannot place order" });
    }
  } catch (err) {
    console.log(err.mesage);
  } finally {
    await client.close();
  }
};

// get order by id
const getOrderById = async (req, res) => {
  const _id = req.params.id;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("store");
  const myOrder = await db.collection("orders").findOne({ _id });

  myOrder
    ? res.status(200).json({ status: 200, data: myOrder })
    : res.status(404).json({ status: 404, message: "error", data: req.params });
};

///get all companies
const getCompanies = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("store");
    const myCompanies = await db.collection("companies").find().toArray();
    res.status(200).json({ status: 200, data: myCompanies });

    client.close();
  } catch (err) {
    console.log(err);
  }
};

///get company by id
const getCompanyById = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("store");
  const myCompany = await db.collection("companies").findOne({ id: _id });

  myCompany
    ? res.status(200).json({ status: 200, data: myCompany })
    : res.status(404).json({ status: 404, message: "error", data: req.params });
};

module.exports = {
  getItems,
  getItemById,
  getCompanies,
  getCompanyById,
  updateItem,
  createOrder,
  getItemByCompany,
  getOrderById,
};
