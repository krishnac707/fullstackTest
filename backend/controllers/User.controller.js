import UserModal from "./../modal/User.modal.js"
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { name, email, password, role, pin, number } = req.body.userData;
        if (!name || !email || !password || !role || !pin || !number) return res.status(403).json({ success: false, message: "All Fields are mandetory" })

        const userEmail = await UserModal.find({ email: email })

        if (userEmail.length) {
            return res.status(403).json({ success: false, message: "Email already registered" })
        }

        const genPassword = await bcrypt.hash(password, 10);
        const genPin = await bcrypt.hash(pin, 10)

        console.log(genPin, '18');

        if (genPassword && genPin) {
            const user = new UserModal({
                name, email, password: genPassword, role, pin: genPin, number
            })
            await user.save();
            return res.status(200).json({ success: true, message: "User Register Successfully" })
        }
        else {
            return res.status(403).json({ success: false, message: "password or pin not generated" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const login = async (req, res) => {
    try{
    const{email,password} = req.body;
    if (!email || !password) return res.status(403).json({ success: false, message: "All Fields are mandetory" })

    const userEmail = await UserModal.findOne({email:email})
    if(!userEmail){
        return res.status(404).json({success:false,message:"User not found"})
    }

    const checkPassword = await bcrypt.compare(password,userEmail.password)
    if(checkPassword){
        console.log(userEmail,"50");
        const token = await jwt.sign({userId:userEmail._id},process.env.JWT_SECRET)
        console.log(token,"52");
        const userObj = {
            name:userEmail.name,
            email:userEmail.email,
            role:userEmail.role,
            userId:userEmail._id
        }
        return res.status(200).json({success:true,token:token,user:userObj,message:"login successful"})
    }
    return res.status(403).json({success:false,message:"please check the password"})
}
catch(error){
    return res.status(500).json({success:false,message:error})
}

}