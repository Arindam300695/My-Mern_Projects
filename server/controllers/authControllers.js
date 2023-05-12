const asyncHandler = require('express-async-handler');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// cloudinary Configuration 
cloudinary.config({
    cloud_name: "djylexzyi",
    api_key: "142328284162156",
    api_secret: "tsJyiQKlQngYnYxw8faaF0q2kok"
});

// registration controller
const registrationController = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword, address, avatar } = req.body;
    // checking if any field is empty
    if (!name || !email || !password || !confirmPassword || !address) return res.status(200).send({ message: "all the fields are required" });
    // checking if the user email is already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(200).send({ message: "User already exists with given email" });
    // if user does not exist
    else {
        // checking if the password and the confrim password are same or not
        if (password !== confirmPassword) return res.status(200).send({ message: "password and confrim password are not matching" });
        // if everyting is fine then need to hash the password as well
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        // Upload
        if (avatar) {
            // if everything is fine and the user chooses any avatar image then  need to upload it into cloudinary
            const response = await cloudinary.uploader.upload(avatar, { folder: "user Avatar" })
            try {
                const newUser = await User.create({ name, email, password: hashedPassword, address, avatar: response.url });
                return res.status(201).send({ message: "user created successfully", newUser })
            } catch (error) {
                return res.status(500).send({ message: "Something went wrong" });
            }
        } else {
            // if user does not choose any avatar
            try {
                const newUser = await User.create({ name, email, password: hashedPassword, address });
                return res.status(201).send({ message: "user created successfully", newUser })
            } catch (error) {
                return res.status(500).send({ message: "Something went wrong" });
            }
        }
    }
});

// login controller
const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // checking if the user is registered or not
    const isRegistered = await User.findOne({ email });
    if (!isRegistered) return res.status(200).send({ message: "user not found, Please register first" });
    // if user is registerd then need to match the provided password with the hasged one
    const compare = await bcrypt.compare(password, isRegistered.password);
    // if password doesnot match
    if (!compare) return res.status(200).send({ message: "Invalid Credentials" });
    // if everything is fine then need to create a jsonwebtoken for the user
    const token = jwt.sign({ id: isRegistered._id }, process.env.secret_key)
    // now let's write the code to login a user
    try {
        return res.status(201).send({ message: "Login successful", isRegistered, token });
    } catch (error) {
        return res.status(500).send({ message: "something went wrong", error });
    }
});

module.exports = { registrationController, loginController };