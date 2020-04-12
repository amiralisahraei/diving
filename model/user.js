const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Joi = require("joi");


var usershema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String,
    email : String,
    address : String,
    phone : Number,
    postalCode : Number,
    Order : {
        id : Number,
        orderDate : Date,
        deliveryPrice : Number,
        totalPrice : Number,
        status : String,
        items : Array   ///this is for products
    }
})

var User = mongoose.model('user' , usershema)



function validateSignup(req){
    const schema = {
        phone : Joi.string().length(11).required(),
        password :Joi.string().min(8).max(15).required(),
        repassword : Joi.ref('password')  
        // username : Joi.string().min(5).max(255).required(),
        // firstname : Joi.string().required(),
        // lastname : Joi.string().required(),
        // password : Joi.string().min(8).max(255).required(),
        // email : Joi.string().min(5).max(255).email(),
        // address : Joi.string().min(5).max(255).required(),
        // phone : Joi.number().min(11).max(11).required(),
        // postalCode : Joi.number().min(10).max(10),
    };
    return Joi.validate(req , schema);
}

function validateSignin(req){
    const schema = {
        phone : Joi.string().length(11).required(),
        password :Joi.string().min(8).max(15).required(),
    };
    return Joi.validate(req , schema);
}


exports.User = User;
exports.validateSignup = validateSignup;
exports.validateSignin = validateSignin;
