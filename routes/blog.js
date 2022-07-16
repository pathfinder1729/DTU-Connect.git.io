const express = require("express");
const path = require("path");
const router = express.Router();
const Post = require('../model/post'); 

router.get('/blog',async(req,res )=>
{
     
    let newBlogs = await Post.find({}); 
     let blogs = newBlogs.reverse() ; 
   res.render('blog.ejs', {blogs}); 
}); 

router.get('/interview',async(req,res )=>
{
     const type = "Interview Experience"; 
    let newBlogs = await Post.find({type:type}); 
     let blogs = newBlogs.reverse() ; 
   res.render('interview.ejs', {blogs}); 
}); 

router.get('/notice',async(req,res )=>
{
     
    let newBlogs = await Post.find({}); 
     let blogs = newBlogs.reverse() ; 
     //console.log(blogs) ; 
   res.render('notice.ejs',{blogs}); 
}); 

router.get('/single_post/:id',async(req,res )=>
{
    const  id = req.params.id ; 
   const post = await Post.findById({_id: id}); 
    //console.log(post) ; 
   res.render('single_post.ejs',{post}); 
    
}); 
  

router.get('/single_post/vote/:id',async(req,res )=>
{
   
   if(req.session.isLoggedIn==true)
   {
     
      
      let id = req.params.id ; 
   try
   {
    
      const userId = req.session.user._id._id.toString();
      const blog = await Post.findById({_id: id});
      let upvoteList = blog.upvoteLists; 
      const isPresent = upvoteList.includes(userId) ; 
      if(isPresent)
      {
          console.log("user is already present "); 
        upvoteList= upvoteList.filter(function(item){
           return item!=userId; 
        })
      }
      else 
      {
         upvoteList.push(userId) ; 
      }
      var myquery = { _id:id };
      var newvalues = { $set: {upvoteLists: upvoteList }}; 
      Post.updateOne(myquery, newvalues,function(err, res) {
         if (err) throw err;
         console.log("1 document updated");
          
       }); 
   }
   catch(err)
   {
      console.log(err) ; 
   }
    
    //res.redirect('/'); 
    res.redirect(`/single_post/${id}`); 
     }
     else 
     {
        res.redirect("/login"); 
     }
    
}); 
router.post('/search',async(req,res )=>
{
   //  const  id = req.body.text ; 
   //   consloe.log(id) ; 
   console.log("search")
   res.redirect("/"); 
    
}); 
  
module.exports=router ; 