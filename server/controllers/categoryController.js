const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategory = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Category Name Error!",
        });
    }
    const categoryData = {
        name: req.body.name,
        slug: slugify(req.body.name),
        description: req.body.description,
        products: req.body.products,
        isActive: req.body.isActive,
    };
    try {
        const isExist = await categoryModel.findOne({
            slug: slugify(req.body.name)
        });
        if (isExist) {
            return res.status(409).send({
                success: false,
                message: "The category already exists!",
            });
        }
        const newCategory = await new categoryModel(categoryData).save();
        res.status(201).send({
            success: true,
            message: `${newCategory.name} Created!`,
            newCategory,
        });
    } catch (error) {
        console.log("create category error");
        res.status(500).send({
            success: false,
            error,
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel
            .find()
            .select("name description slug")
            .exec();
        res.status(200).send({
            success: true,
            categories,
        });
    } catch (error) {
        res.status(403).send({
            success: false,
            message: "Error get categories",
        });
    }
};

const descriptionCategory = async (req, res) => {
    res.send(req.params.slug)
}

module.exports = {
    createCategory,
    getCategories,
    descriptionCategory,
};
