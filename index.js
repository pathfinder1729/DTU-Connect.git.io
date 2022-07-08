const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const {flash} = require("express-flash-message")
var mongoose = require('mongoose'); 
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);

 
const router = express.Router();
const Post = require('./model/post'); 


  

 const createRoutes = require("./routes/create"); 
 const blogRoutes = require("./routes/blog");
 const authRoutes =require("./routes/auth");  
 const req = require("express/lib/request");

 const store = new MongoDBStore({ uri:"mongodb://localhost:27017/Check_connection", collection: 'sessions'})

 
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");
 app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store }));
 app.use(flash({sessionKeyName: 'flashMessage'}));

 app.use((req, res,next ) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  if (req.session.user)
      res.locals.username = req.session.user.username;
   else
      res.locals.username = null



   next();
})
 
 app.use(createRoutes) ;
 app.use(blogRoutes) ; 
 app.use(authRoutes) ;

 



app.get("/", async (req, res) => {
 
  await req.flash('info', 'Flash is back!');
  let newBlogs = await Post.find({}); 
     let blogs = newBlogs.reverse() ;
     
     var arr=[] ; 
      var ie="NO DATA";
      var b1="NO DATA" ; 
      var b2 ="NO DATA"; 
      var notice ="NO DATA" ;
      var cnt =0 ;   
      var j=0 ; 
      var a=false ; 
      var b=false;
      var c=false ; 
      var d =false ; 
     for( let i=0 ;i<blogs.length; i++ )
     {
         
           if(blogs[i].type =="Interview Experience")
           {
             ie = blogs[i]; 
             
              a=true ;  
           }
           else if(blogs[i].type =="Notice")
           {
            notice = blogs[i] ; 
            j++ ; 
            b=true ; 
           }
           else if(blogs[i].type =="Blogs" &&  cnt ==0 )
           {
           b1 = blogs[i]; 
           cnt++ ; 
           j++ ; 
           c=true ; 
           }
           else if(blogs[i].type =="Blogs" &&  cnt ==1)
           {
            b2 = blogs[i]; 
           cnt++ ; 
           j++ ; 
           d=true ; 
           }
           if(a===true && b===true && c===true && d===true)
           break ; 
     }
     console.log(notice) ; 
     console.log(ie) ;
     console.log(b1) ; 
     console.log(b2) ; 
     arr.push(ie) ; 
     
     arr.push(notice); 
     arr.push(b1) ; 
     arr.push(b2) ; 

      
  res.render("home.ejs",{arr});// {isLoggedIn}
});

app.listen(8000, () => {
  console.log("Listening at 8000");
});

 mongoose.connect("mongodb://localhost:27017/Check_connection",()=>{
     
  console.log("connected to db2");
})