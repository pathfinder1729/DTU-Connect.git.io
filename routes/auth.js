const express = require("express");
const { route } = require("express/lib/application"); // iska kya kam hai ?? 
 
const router = express.Router();
const User = require("../model/user")
const Post = require('../model/post'); 


router.get("/signup",async (req, res) => {
    //res.render("signup.ejs");
    const message= await req.consumeFlash('message')
    res.render("signup.ejs",{message:message[0]});
});

router.get("/login", async (req, res) => {
    const message= await req.consumeFlash('message')
    res.render("login.ejs",{message:message[0]});
});

router.post("/signup",  async (req, res) => {
    
        let fullName = req.body.fullName,
        email = req.body.email,
        password = req.body.password;

        let user1 = await User.findOne({email: email}); 
        console.log(user1);
         
        if(user1)
        {
            await req.flash('message',"User Already Exists")
            //console.log("vikash");
            res.redirect("/signup"); 
            //return ; 
        }   
     else
     {
        let username = email.split("@")[0]

        const user = await User.create({
            name: fullName,
            email,
            password,
            admin: true,
            username: username,
            posts: [{}]
        })
    
        console.log(user)
        req.session.isLoggedIn = true;
        req.session.user= user ; 

        //console.log(req.session.user)
        console.log(req.body.email) ; 
        res.redirect("/");
     }
   
})

router.post("/login",async (req, res) => {
    console.log(req.body.email, req.body.password)
    let fullName = req.body.fullName; 
    let user = await User.findOne({email: req.body.email, password: req.body.password});

    if (user) {
        req.session.isLoggedIn = true;
        req.session.user=user ; 
        console.log(fullName) ; 
       // res.render('home.ejs',{isLoggedIn}); ye galat kyu de rha hai  ;  directky render nai karwa sakte hai 
       res.redirect('/'); 
        //console.log(req.session.user.username) ; 
    }
     else 
        
    {
        await req.flash('message',"Invalid email or password ")
          res.redirect("/login"); 
    }

    

} )

router.get('/logout', (req,res)=>{
    req.session.isLoggedIn=false ; 
    res.redirect('/');  
})
module.exports=router ; 