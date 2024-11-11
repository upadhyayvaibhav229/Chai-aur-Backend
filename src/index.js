// require('dotenv').config()

import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: `./env`
});

connectDB()



// to run this file use nodemon src/index.js










/*import express from "express";

const app = express();


;(async ()=>{
    // database connection
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error", (error) => {
        console.log('error', error);
        throw error
        
       });
       app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        
       });
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("ERROR", error);
        throw error
    }
})()*/