const mongoose=require("mongoose"); 
let postSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    type:{   //notice , interview  ; 
       type:String , 
       required:true 
    },
    content:{
        type:String ,
        required:true , 
    },
    author:String , 
    date:{
        type:Date, 
    },
    upvote:Number ,
    upvoteLists: {
        type: Array,
        default: []
    
    }

     



}); 
module.exports=mongoose.model('post', postSchema) 