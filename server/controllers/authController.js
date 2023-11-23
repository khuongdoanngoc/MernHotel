const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/usersModel");

const JWT = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const newUserData = req.body;
        // validate required: true
        {
            const { name, email, password, phone, address } = newUserData;
            if (!name) {
                return res.status(404).send({ success: false, message: "Name is Required!" });
            }
            if (!email) {
                return res.status(404).send({ success: false, message: "Email is Required!" });
            }
            if (!password) {
                return res.status(404).send({ success: false, message: "Password is Required!" });
            }
            if (!phone) {
                return res.status(404).send({ success: false, message: "Phone is Required!" });
            }
            if (!address) {
                return res.status(404).send({ success: false, message: "Address is Required!" });
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
            return res.status(409).send({
                success: false,
                message: "Email already exist"
            });
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
        res.status(500).send({
            success: false,
            message: "Error in register",
            error,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Wrong email or password",
            });
        }

        const result = await userModel.findOne({ email });

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Wrong email",
            });
        }

        // compare password
        const isMatched = await comparePassword(password, result.password);
        if (!isMatched) {
            return res.status(404).send({
                success: false,
                message: "Wrong Password",
            });
        }

        const payload = {
            _id: result._id,
        };
        // sign jwt
        const token = await JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).send({
            success: true,
            message: "Login Successfully",
            user: result,
            token
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

const secret = async (req, res, next) => {
    res.send('secret called!');
}

module.exports = {
    register,
    login,
    secret
};
