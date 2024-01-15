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
            slug: slugify(req.body.name),
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
    try {
        const categoryDescription = await categoryModel.findOne({
            slug: req.params.slug,
        });
        if (!categoryDescription) {
            return res.status(404).send({
                success: false,
                message: `${req.params.slug} not Found!`,
            });
        }
        res.status(200).send({
            success: true,
            message: `Get ${req.params.slug} description successfully!`,
            categoryDescription,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: error,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        await categoryModel.findOneAndUpdate({ slug: req.body.slug }, req.body);
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

module.exports = {
    createCategory,
    getCategories,
    descriptionCategory,
    updateCategory,
};
