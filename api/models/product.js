const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Product = new Schema({
    catalog: { type: mongoose.Types.ObjectId, ref: 'Catalog' },
    prod_name: {
        type: String
    },
    prod_desc: {
        type: String
    },
    prod_price: {
        type: Number
    },
    updated_at: {
        type: Date
    },
    image: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Product", Product);