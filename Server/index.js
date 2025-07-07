// Importing express
let express = require("express");

// Importing Mongoose
let mongoose = require("mongoose");

// Configuring dotenv
require("dotenv").config();

// Initilaizing Express to App
let app = express();

// Us json Middleware
app.use(express.json());

// Importing Client API
let clientApi = require("./App/routes/Client/clientApi");

// Importing cors
app.use(require("cors")());

// Routes
app.use("/api/client",clientApi)


// Connecting to mongoDB
mongoose.connect(process.env.DB_url).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8000,()=>{
        console.log("Server Running.");  
    })
}).catch((err)=>{
    console.log("Error connecting to MongoDB: ", err);
})