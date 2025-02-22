const addToCartModel = require("../../models/cardProduct")

const deleteAddToCartProduct = async(req,res)=>{
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const delelteProduct = await addToCartModel.deleteOne({_id : addToCartProductId})

        res.json({
            message : "Product delete from cart",
            data : delelteProduct , 
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

module.exports=deleteAddToCartProduct