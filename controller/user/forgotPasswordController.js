
const forgotPasswordEmailTemplate = require("../../helpers/forgotPasswordEmailTemplate")
const generatedOTP = require("../../helpers/generatedOTP")
const userModel = require("../../models/userModel")
const sendEmail = require("../../config/sendEmail")


const ForgotPasswordController =async(req,res) =>{

    try {
        const { email } = req.body
        const user = await userModel.findOne({email})
        //console.log("Email from request body:", email);

        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp = generatedOTP()
        const expireTime = new Date() + 60 * 60 * 1000 //1hr

        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from Isuru Shop",
            html : forgotPasswordEmailTemplate({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "check your email",
            error : false,
            success : true
        })
        
    } catch (error) {
        res.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}
module.exports = ForgotPasswordController