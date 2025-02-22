const productModel = require("../../models/productModel")

const searchProduct = async(req,res)=>{
    try {

        const query = req.query.q

        const regex = new RegExp(query,"ig")

        const product = await productModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex 
                }
            ]
        })
        res.status(200).json({
            message : "search product list",
            error : false,
            success : true,
            data : product
        })
    } catch (error) {
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success:false
        })
    }
}
module.exports = searchProduct