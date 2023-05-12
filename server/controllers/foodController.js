const asyncHandler = require('express-async-handler');
const Food = require("../models/foodItems");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;

// cloudinary Configuration 
cloudinary.config({
    cloud_name: "djylexzyi",
    api_key: "142328284162156",
    api_secret: "tsJyiQKlQngYnYxw8faaF0q2kok"
});

// adding food item controller
const addFoodItemController = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    const { categoryName, name, description, variety, image } = req.body;
    // checking if any field is empty
    if (!categoryName || !name || !description || !variety || !image) return res.status(200).send({ message: "all the fields are required" });
    if (!token) return res.status(200).send({ message: "Unauthorized Access" });
    // if there is any token then checking is the token valid or not
    const isValidToken = jwt.verify(token, process.env.secret_key);
    if (!isValidToken) return res.status(200).send({ message: "Unauthorized access" });
    //    checking if the user is admin or not
    const id = isValidToken.id;
    // finding the user with the above id
    const user = await User.findOne({ _id: id });
    if (user.email !== "ari1995@admin.com") return res.status(200).send({ message: "You aren't an admin" })
    // if everyting is fine then need to upload the food item image to the cloudinary server
    else {
        const response = await cloudinary.uploader.upload(image, { folder: "Food Items" });

        if (response) {
            try {
                const addedFoodItem = await Food.create({ categoryName, name, description, variety: [variety], image: [{ public_id: response.public_id, url: response.url }] });
                return res.status(201).send({ message: "food item added successfully", addedFoodItem });
            } catch (error) {
                return res.status(200).send({ message: "something went wrong", error });
            }
        }
    }
});

// getting food item controller
const getFoodItemController = asyncHandler(async (req, res) => {
    const foodItems = await Food.find();
    try {
        res.status(200).send({ message: "success", foodItems });
    } catch (error) {
        return res.status(200).send({ message: "something went wrong", error });
    }
});

// editing food item controller
const editFoodItemController = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    const { _id, categoryName, name, description, variety, image } = req.body;

    if (!token) return res.status(200).send({ message: "Unauthorized Access" });
    // if there is any token then checking is the token valid or not
    const isValidToken = jwt.verify(token, process.env.secret_key);
    if (!isValidToken) return res.status(200).send({ message: "Unauthorized access" });
    //    checking if the user is admin or not
    const id = isValidToken.id;
    // finding the user with the above id
    const user = await User.findOne({ _id: id });
    if (user.email !== "ari1995@admin.com") return res.status(200).send({ message: "You aren't an admin" });
    try {
        // if everyting is fine and admin wants to set a new image in place of the existing one
        // finding the food item in order to delete the image from cloudinary if in case admin added a new image
        if (image !== "") {
            const food = await Food.findOne({ _id });
            // console.log(image);
            // deleting the product image from cloudinary
            const response = await cloudinary.uploader.destroy(food.image[0].public_id);
            const uploadResponse = await cloudinary.uploader.upload(image, { folder: "Food Items" });
            // console.log(uploadResponse);
            const editedFood = await Food.findByIdAndUpdate({ _id }, { name, description, categoryName, variety, image: [{ public_id: uploadResponse.public_id, url: uploadResponse.url }] }, { new: true });
            return res.status(201).send({ message: "food item updated successfully", editedFood });
        };
        // if everyting is fine and admin doesnot want to replace the existing image
        if (image === "") {
            const food = await Food.findByIdAndUpdate({ _id }, { name, description, categoryName, variety }, { new: true });
            return res.status(201).send({ message: "food item updated successfully", food });
        }
    } catch (error) {
        return res.status(200).send({ message: "something went wrong", error: error.message });
    }
});

// deleting food item controller
const deleteFoodItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // finding the food and deleting it
    try {
        // deleting the product image from cloudinary
        const food = await Food.findById({ _id: id });
        const response = await cloudinary.uploader.destroy(food.image[0].public_id);
        if (response) {
            await Food.findByIdAndDelete({ _id: id }, { new: true })
        };
        return res.status(201).send({ message: "food item deleted successfully" });
    } catch (error) {
        return res.status(200).send({ message: "something went wrong", error: error.message });
    }
});

module.exports = { addFoodItemController, getFoodItemController, editFoodItemController, deleteFoodItemController };