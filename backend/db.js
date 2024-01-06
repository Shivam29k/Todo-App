const mongoose = require("mongoose");
require('dotenv').config();
const URL = process.env.DB_URL;

mongoose.connect(URL);

const todo = mongoose.model('todo', {
    title: String,
    description: String,
    completed: Boolean
});

module.exports = { todo }