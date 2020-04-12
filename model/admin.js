const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Joi = require("joi");


var adminshema = new mongoose.Schema({
    username : String,
    password : String,
    email : String
})

var Admin = mongoose.model('admin' , adminshema)



function validateSignup(req){
    const schema = {
        username : Joi.string().min(5).max(255).required(),
        password : Joi.string().min(5).max(255).required(),
        email : Joi.email().required()
    };
    return Joi.validateSignup(req , schema);
}

function validateSignin(req){
    const schema = {
        username : Joi.string().min(5).max(255).required(),
        password : Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req , schema);
}

exports.Admin = Admin;
exports.validateSignup = validateSignup;
exports.validateSignin = validateSignin;