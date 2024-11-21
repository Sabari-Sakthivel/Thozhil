const mongoose =require("mongoose")

const userShema=new mongoose.Schema(

    {
        email:{
            type:String,
            required:true,
            unique:true
        },
         
        name:{
            type:String,
            required:true,
        },
        phonenumber:{
            type:Number,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"User"
        }
    },
    {
        timestamps:true
    }

    
);
const User=mongoose.model("User",userShema)

module.exports=User;
