const userModel = require("../../models/userModel")

const forgotPasswordVerifyOTP = async(req,res)=>{

    try {
        const { email , otp } = req.body

        const user = await userModel.findOne({ email })

        if(!email || !otp){
            return res.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }

        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const currentTime = new Date().toISOString

        if(user.forgot_password_expiry > currentTime){
            return res.status(400).json({
                message : "OTP is expired",
                error : true,
                success : false
            })
        }

        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message : "Invalid OTP",
                error : true,
                success : false
            })
        }

        return res.json({
            message : "Verify OTP Successfully",
            error : false,
            success : true
        })


    } catch (error) {
        return res.status(500).json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}
module.exports = forgotPasswordVerifyOTP