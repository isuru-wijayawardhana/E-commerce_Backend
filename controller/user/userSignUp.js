const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');// Store hash in your password DB.

async function userSignUpController(req,res) {
    try {
        const { email, password, name} = req.body 

        //console.log("req.body",req.body)
        const user = await userModel.findOne({ email });

        //console.log("Email received:", email); 
        //console.log("User",user); 

        if(user){
            throw new Error("Already user exists.");
        }

        if(!email){
            throw new Error("Please provide email"); 
        }
        if(!password){
            throw new Error("Please provide password");
        }
        if(!name){
            throw new Error("Please provide name");
        }
        const salt = bcrypt.genSaltSync(10); //Salt is random data added to the password before hashing to ensure that even if two users have the same password, the resulting hashes will be different.
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is Wrong!");
        }
        
        const payload = { //password override password for hashcode
            ...req.body,
            role : "GENERAL",
            password :hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User Created successfully!"
        })

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true, 
            success : false,
        })
    }
}

module.exports = userSignUpController 