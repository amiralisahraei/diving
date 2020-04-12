const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Joi = require("joi");


var ordershema = new mongoose.Schema({
        id : Number,
        orderDate : Date,
        deliveryPrice : Number,
        totalPrice : Number,
        status : String,
        items : Array   ///this is for products
})

var Order = mongoose.model('order' , ordershema)



exports.Order = Order;
