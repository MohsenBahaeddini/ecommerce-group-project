'use strict';

//importing our handler functions!
const {
  getItems,
  getItemById,
  getCompanies,
  getCompanyById, 
  updateItem,
  createOrder,
  getItemByCompany,
  getOrderById
} = require("./handlers");

//server setup
const express = require('express');
const morgan = require('morgan');

const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

// REST Endpoints
 ////// MONICA'S NOTE: Some basic GET endpoints to get us started

 .get("/store/get-items", getItems)
 .get("/store/get-item/:id", getItemById)
 .get("/store/get-companies", getCompanies)
 .get("/store/get-company/:id", getCompanyById)
 .get("/store/get-company-items/:id",getItemByCompany)
 .patch("/store/get-item/:id", updateItem)
 .post("/store/order", createOrder)
 .get("/store/order/:id", getOrderById)
 // ---------------------------------
 // Nothing to modify below this line

 // this is our catch all endpoint.
 .get("*", (req, res) => {
     res.status(404).json({
     status: 404,
     message: "Oops! Seems like you've lost your way.",
     });
 })

// Listening on port 4000
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
