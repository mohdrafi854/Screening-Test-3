const mongoose = require("mongoose");

const mongo_uri = process.env.MONGODB_URI;

const initailizeDatabase = async() => {
    try {
        await mongoose.connect(mongo_uri).then(() => {
            console.log("Database connected");
            
        }).catch((error) => {
            console.log("Failed to connected database");
        })
    } catch (error) {
        console.error("Error: ", error);
    }
}

module.exports = {initailizeDatabase}