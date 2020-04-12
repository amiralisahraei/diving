const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const pug = require('pug');
const router = express.Router();
const {User , validateSignup , validateSignin} = require('../model/user.js');



router.get('/signup' , (req , res)=>{
    res.render('sign_up');
})

router.get('/signin' , (req , res)=>{
    res.render('sign_in');
})

router.post('/register' , async (req , res)=>{
    var {error} = validateSignup(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});

    var salt  =  await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password , salt);

    var user = new User({
        phone : req.body.phone,
        password : req.body.password
    });

    await user.save();
    console.log(user); 
    return res.status(200).render('result' , { result : `You registered successfuly with this phone : ${req.body.phone}`});
})



router.post('/login' , async(req , res)=>{
    var {error} = validateSignin(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});
    
    var user = await User.findOne({phone : req.body.phone});
    if(!user) return res.status(404).render('result' , { result : "User with this number did not find....!"});

    var validatePass = await bycrypt.compare(req.body.password , user.password);
    if(!validatePass) return res.status(401).render('result' , { result : "Invalid password.....!"});

    return res.status(200).render('result' , { result : "You log in successfuly"});
    
})

router.delete('/delete/:id' , async(req,res)=>{
    var user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).render('result' , { result : "User with this Id did not find....!"});

    return res.status(200).render('result' , { result : "User deleted successfuly.....!"});
})


// router.post('/post' , urlencodedParser , (req , res)=>{
//     console.log(req.body);
// })


/////////////////////////////////////
// router.post('/register' , jsonParser , async(req , res)=>{
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const salt = await bycrypt.genSalt(10);
//     req.body.password = await bycrypt.hash(req.body.password , salt);

//     var user = new User({
//         name : req.body.name,
//         password : req.body.password
//     });
    
//     await user.save();
//     res.send("user registered");
//     console.log(user);
// })
////////////////////////////////////////////
// router.post('/login' ,jsonParser, async (req , res)=>{
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     var user = await User.findOne({ name : req.body.name});
//     if(!user) return res.status(401).send("the user with this name was not found...!");

//     const validate_password = await bycrypt.compare(req.body.password , user.password);
//     if(!validate_password) return res.status(401).send("invalid password...!");

//     return res.status(200).send("you log in successfully.....!");

//     //res.send(user);
// })
///////////////////////////////////////////
// router.put('/update/:id' ,jsonParser ,async(req,res)=>{
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const salt = await bycrypt.genSalt(10);
//     req.body.password = await bycrypt.hash(req.body.password , salt);

//     var user = await User.findByIdAndUpdate(req.params.id , {
//         name : req.body.name,
//         password : req.body.password
//     } , {new : true});

//     if(!user) return res.status(404).send("user with this Id was not found.....!");
    
//     res.send(user);
// } )

/////////////////////////////////////
// router.delete('/delete/:id' , async(req,res)=>{
//     var user = await User.findByIdAndRemove(req.params.id);
//     if(!user) return res.status(404).send("user with this Id was not found...!");

//     res.send(user);
// })



module.exports = router;