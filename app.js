const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bycrypt = require("bcrypt");
const Joi = require("joi");
//const pug = require('pug');
const route = require('./controller/user.js');

var app = express();

mongoose.connect('mongodb://localhost/server')
    .then(()=>console.log("mongodb connected successfully...."))
    .catch( err => console.error("mongodb connected failed opssss....!"))


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/' , (req , res)=>{
    res.send("this is me");
})

// var jsonParser = bodyParser.json();

// var urlencodedParser = bodyParser.urlencoded({ extended: false });


///app.set('view engine' , 'pug');

app.set('view engine' , 'ejs');


// app.post('/post' ,urlencodedParser , (req,res)=>{
//     console.log(req.body);
// })

app.use(express.static(__dirname + '/public'));

app.use('/routes' , route);


// app.get("/" , (req , res)=>{
//      res.render('view' , {name : "amirali"});
// });



app.listen(1000 , ()=>{
    console.log("server is run on port 1000");
})