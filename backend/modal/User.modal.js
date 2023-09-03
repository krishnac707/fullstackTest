import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        enum:["buyer","seller","admin"],
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
    
})

export default mongoose.model("Users",UserSchema)