const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

const resetPassword = async(req,res)=>{
    try {

        const { email , confirmPassword} = req.body

        if(!email || !confirmPassword){
            return res.status(500).json({
                message : "Provide require fields",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(confirmPassword,salt)

        const update = await userModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })

        return res.json({
            message : "password update successfully",
            error : false,
            success : true
        })

    } catch (error) {
        res.status(500).json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}
module.exports = resetPassword