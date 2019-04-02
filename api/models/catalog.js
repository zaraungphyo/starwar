const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Catalog = new Schema({
    // catalog_id: {
    //     type: String, unique: true
    // },
    catalog_name: {
        type: String
    }
});
module.exports = mongoose.model("Catalog", Catalog);