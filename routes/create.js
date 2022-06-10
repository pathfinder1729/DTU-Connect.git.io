const { reverse } = require("dns");
const express = require("express");
const path = require("path");
const router = express.Router();
const Post = require('../model/post'); 

 router.get('/create-post',(req,res )=>
 {
   
    res.render('create-post.ejs'); 
 }); 
 
 router.post('/create-post',async (req, res )=>{
       
      const isLoggedIn=req.session.isLoggedIn; 
      const username = req.session.user.username ; 
      console.log(username) ; 
      console.log("ye hai username"); 
      const Blogtype = req.body.picker;
      console.log(Blogtype) ; 
      console.log("ye hai blog type"); 
     try
     {
        const post = await Post.create({
          title: req.body.title ,
          content:req.body.content, 
          type: Blogtype,
          author:username, 
          date:new Date(), 
          upvote:0 


        })
        let newBlogs = await Post.find({}); 
        let blogs = newBlogs.reverse() ;
        res.render('blog.ejs',{ blogs}); 

     }
     catch(err)
     {
       console.log(err) ; 
     }
     res.render('home.ejs'); 
 })
 module.exports = router
  





module.exports=router ; 