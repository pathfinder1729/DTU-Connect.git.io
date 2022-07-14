const express = require("express");
const path = require("path");
const router = express.Router();
const Post = require('../model/post'); 

 

 router.post('/create-post',(req,res )=>
 {
   
    res.render('create-post.ejs'); 
 }); 

 router.post('/cre',(req,res )=>
 {
   
    res.render('create-post.ejs'); 
 }); 

module.exports=router ; 