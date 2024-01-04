const mongoose = require("mongoose");
const { boolean } = require("zod");
require('dotenv').config();
const URL = process.env.DB_URL;

mongoose.connect(URL);

const todo = mongoose.model('todo', {
    title: String,
    description: String,
    completed: Boolean
});

module.exports = { todo }