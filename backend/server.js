const express = require("express");
const serverless =require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const approuter=require("./routes/userroute");
const cors=require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());

app.use(express.json());
//app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected to database");

    app.listen(process.env.PORT || 8000, (err) => {
      
      if (err) console.log(err);

      console.log("Running successfully at", process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log(err);
  });


 
 


app.use(approuter); 