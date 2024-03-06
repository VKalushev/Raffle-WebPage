//https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs

var path = require('path');
var express = require('express');
var app = express();


//K5oLmpiauI7u9stp
// The database
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://beyondReality1:bestpassword@main.ef79t9g.mongodb.net/?retryWrites=true&w=majority&appName=main";

var options = {
    index: "index.html"
  };

var dir = path.join(__dirname, '../frontend');

app.get('/api', function(req, res){
    res.send("Yes we have an API now")
});

// e.g. test using:
//http://127.0.0.1:8000/api/getPrice?salary=2000&days=20
app.get('/api/getPrice', function(req, res){
    //res.send("Hello world!")
    // Copied from front end
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    let finalPrice = 0;
    dailyRate = s/365;
    price = Math.round(dailyRate * d);
    var roundToNearest = 50;
    roundedPrice = Math.round((price+roundToNearest)/roundToNearest) * roundToNearest // Always round up
    res.send(""+roundedPrice)
});

// Define the route handler for storing quotes
app.get('/api/storeQuote', function(req, res) {
    // Extract parameters from the request query
    var n = req.query.quoteName;
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Storing quote: " + n + " " + s + " " + d);

    // Create a new MongoClient
    const client = new MongoClient(uri);

    async function run() {
        try {
            // Connect to the MongoDB server
            await client.connect();

            console.log('Start the database stuff');

            // Access the database and collection
            const database = client.db("mydb");
            const collection = database.collection("quotes");

            // Create a new document to insert
            const quoteDocument = { quoteName: n, salary: s, days: d };

            // Insert the document into the collection
            const result = await collection.insertOne(quoteDocument);
            console.log(`${result.insertedCount} quote inserted`);

            console.log('End the database stuff');

        } finally {
            // Close the MongoDB client connection
            await client.close();
        }
    }

    // Call the asynchronous function to perform database operations
    run().catch(console.dir);

    // Send a response back to the client
    res.send("Stored quote: " + n);
});

app.use(express.static(dir, options));

// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(8000, function () {
    console.log('Listening on http://localhost:8000/');
});