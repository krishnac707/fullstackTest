import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

export default mongoose.model("products",ProductSchema)