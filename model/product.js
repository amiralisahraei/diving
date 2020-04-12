const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Joi = require("joi");


var productshema = new mongoose.Schema({
    id : Number,
    imgUrl : String,
    title : String,
    price : Number,
    color : String,
    offValue : Number,
    count : Number,
    moreInfo : Object,
    brand : String,
    category : String
})

var Product = mongoose.model('product' , productshema)



exports.Product = Product;