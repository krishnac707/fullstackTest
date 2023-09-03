import ProductModal from "../modal/Product.modal.js";
import jwt from "jsonwebtoken"
import UserModal from "../modal/User.modal.js";

export const Addproduct = async (req, res) => {
    try {
        const { name, price, category, image, userId } = req.body;
        if (!name || !price || !category || !image || !userId) return res.status(403).json({ success: false, message: "All Fields are mandetory" })
        // const decoder = await jwt.verify(token, process.env.JWT_SECRET)
        // const userId = decoder?.userId
        const user = await UserModal.findById(userId)
        if (user && user?.role == "seller" || user?.role == "admin") {
            const product = new ProductModal({
                name, price, category, image
            })
            await product.save();
            return res.status(200).json({ success: true, message: "Product Added Successfully" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}