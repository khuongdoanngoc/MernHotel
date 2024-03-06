const productModel = require("../models/productModel");
const slugify = require("slugify");

const createProduct = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Product Name Error!",
        });
    }
    const productData = {
        name: req.body.name,
        slug: slugify(req.body.name),
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        isActive: req.body.isActive,
    };
    try {
        const isExist = await productModel.findOne({
            slug: slugify(req.body.name),
        });
        if (isExist) {
            return res.status(409).send({
                success: false,
                message: "The product already exists!",
            });
        }
        const newProduct = await new productModel(productData).save();
        res.status(201).send({
            success: true,
            message: `${newProduct.name} Created!`,
            newProduct,
        });
    } catch (error) {
        console.log("create product error");
        res.status(500).send({
            success: false,
            error,
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productModel
            .find()
            .select("name description slug pricePerDay imgUrl")
            .exec();
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        res.status(403).send({
            success: false,
            message: "Error get products",
        });
    }
};

const descriptionProduct = async (req, res) => {
    try {
        const productDescription = await productModel.findOne({
            slug: req.params.slug,
        });
        if (!productDescription) {
            return res.status(404).send({
                success: false,
                message: `${req.params.slug} not Found!`,
            });
        }
        res.status(200).send({
            success: true,
            message: `Get ${req.params.slug} description successfully!`,
            productDescription,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: error,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        await productModel.findOneAndUpdate({ slug: req.body.slug }, req.body);
        res.status(201).send({
            success: true,
            message: "Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            error,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productModel.findOneAndDelete({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Deleted!",
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            error,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.body._id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'that id is not exist!'
            })
        }
        res.status(200).send({
            success: true,
            message: 'get a product success',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(403).send({
            success: false,
            message: error
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    descriptionProduct,
    updateProduct,
    deleteProduct,
    getProductById
};
