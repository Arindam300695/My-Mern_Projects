const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const foodRouter = require("./routes/foodRouter");

const app = express();

// using the express middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: "true" }));

// connecting to the database
const connect = async () => {
    await mongoose.connect(process.env.db_url);
    console.log("connection established with database successfully");
};

// listening to the server
app.listen(process.env.port || 8080, async (error) => {
    if (error) {
        console.log(error);
    } else {
        await connect();
        console.log(
            `server is listening on http://localhost:${
                process.env.port || 8080
            }`
        );
    }
});

// routes
// auth routes
app.use("/auth", authRouter);

// food item routes
app.use("/food", foodRouter);
