const express = require("express");
const path = require("path");
const router = express.Router();
const Post = require('../model/post'); 

 

 router.get('/create-post',(req,res )=>
 {
   
    res.redirect('create-post.ejs'); 
 }); 

 

module.exports=router ; 