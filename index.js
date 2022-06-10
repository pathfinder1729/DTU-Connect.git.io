const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const {flash} = require("express-flash-message")
var mongoose = require('mongoose'); 
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);

  

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
  res.render("home.ejs");// {isLoggedIn}
});

app.listen(8000, () => {
  console.log("Listening at 8000");
});

 mongoose.connect("mongodb://localhost:27017/Check_connection",()=>{
     
  console.log("connected to db2");
})