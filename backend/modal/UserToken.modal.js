import mongoose, { Schema } from "mongoose";

const newToken = new Schema({
    token:{
        type:String,
    }
})

export default mongoose.model("AwdizToken",newToken)