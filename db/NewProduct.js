const mongoose= require('mongoose');

const NewProductSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String
});

module.exports = mongoose.model("NewProducts", NewProductSchema);

