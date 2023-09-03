import jwt from "jsonwebtoken"
import UserModal from "../modal/User.modal.js";
export const CheckSeller = async(req,res,next) =>{
    const {token} = req.body;

    if(!token){
        return res.status(404).json({success:false,message:"Token is mandetory"})
    }
    const decoder = await jwt.verify(token,process.env.JWT_SECRET)
    const userId = decoder?.userId;

    const user = await UserModal.findById(userId)
    console.log(user,"13");
    if(user && user.role == "seller" || user.role == "admin")
    
    next();
}