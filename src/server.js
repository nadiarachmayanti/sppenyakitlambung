require('dotenv/config');

// import the package
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const mongoose = require("mongoose");

//execute or initiate
const app = express()
const http = require('http').createServer(app);

//connect to mongoDB
mongoose.connect(
    process.env.MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) return console.error(err);
        console.log("Connect to MongoDB")
    }
)

//app.uselexpress.json()); ini fungsinya sama dengan body parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Alow-Origin", "+");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE");
next();
});

const initWebRoutes = require("./routes/webRoute")
initWebRoutes(app)

let port = process.env.PORT || 3000;
http.listen(port,()=>{
    console.log(`Server is running in port ${port}`);

})


