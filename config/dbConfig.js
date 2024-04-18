const mongoose = require("mongoose");

const dbConfig = async () => {
    await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database connection Success.");
        })
        .catch((err) => {
            console.error("Mongo Connection Error", err);
        });
};

module.exports = { dbConfig };
