const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");

const createReview = async (req, res) => {
    if (!req.body.comment || !req.body.author) {
        return res.status(403).send({
            success: false,
            message: 'auth and comment are required!'
        })
    }
    const newReview = await new reviewModel(req.body).save();
    let product = await productModel.findById(req.body.productId);
    product.reviews.push(newReview._id);
    await product.save();
    res.status(201).send({
        success: true,
        message: 'publish review successful',
        newReview
    })
}

module.exports = {
    createReview
};
