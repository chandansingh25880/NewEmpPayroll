const express = require('express');
const dbconnect = require('./config/database.js');
require("dotenv").config();
// create express app
const app = express();

//Connect to DB
dbconnect();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())     

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePayRoll application "});
});

// Require Notes routes
require('./app/routers/employee')(app);

// listen for requests
 module.exports = 
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is listening on the port "+process.env.SERVER_PORT);
});