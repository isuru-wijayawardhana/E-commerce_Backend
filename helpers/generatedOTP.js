const generatedOTP = ()=>{
    return Math.floor(Math.random() * 900000) + 100000 ///random num between 100000 to 999999
}
module.exports = generatedOTP