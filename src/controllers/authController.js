const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/usersModel");

const register = async (req, res) => {
    try {
        const newUserData = req.body;
        // validate required: true
        {
            const { name, email, password, phone, address } = newUserData;
            if (!name) {
                return res.send({ error: "Name is Required!" });
            }
            if (!email) {
                return res.send({ error: "Email is Required!" });
            }
            if (!password) {
                return res.send({ error: "Password is Required!" });
            }
            if (!phone) {
                return res.send({ error: "Phone is Required!" });
            }
            if (!address) {
                return res.send({ error: "Address is Required!" });
            }
        }
        // hash password
        {
            const hashedPassword = await hashPassword(newUserData.password);
            newUserData.password = hashedPassword;
        }
        const existingUser = await userModel.findOne({
            email: newUserData.email,
        });
        if (existingUser) {
            return res.send("email already exist");
        }
        const user = await new userModel(newUserData)
            .save()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log("register save data err: ", err);
            });
        res.status(201).send({
            success: true,
            message: "Register Successfully",
            user: user,
        });
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const body = req.body;
    await userModel
        .findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                return res.send("Wrong email!");
            }
            const match = comparePassword(body.password, user.password);
            console.log(match)
            if (!match) {
                return res.send("Wrong password!");
            }
        })
        .catch((err) => {
            console.log("user find err: ", err);
        });
    res.status(201).send({
        success: true,
        message: "Login Successfully",
    });
};

module.exports = {
    register,
    login,
};
