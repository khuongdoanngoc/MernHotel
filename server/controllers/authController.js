const {
    hashPassword,
    comparePassword,
    generateCode,
} = require("../helpers/authHelper");
const { sendResetPasswordEmail } = require("../configs/nodemailer");
const userModel = require("../models/userModel");

const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    try {
        const newUserData = req.body;
        newUserData.role = 0;
        newUserData.authType = "local";
        // validate required: true
        {
            const { username, name, email, password, phone, address } = newUserData;
            if (!username) {
                return res
                    .status(404)
                    .send({ success: false, message: "Username is Required!" });
            }
            if (!email) {
                return res
                    .status(404)
                    .send({ success: false, message: "Email is Required!" });
            }
            if (!password) {
                return res
                    .status(404)
                    .send({ success: false, message: "Password is Required!" });
            }
            if (!name) {
                return res
                    .status(404)
                    .send({ success: false, message: "Name is Required!" });
            }
            if (!phone) {
                return res
                    .status(404)
                    .send({ success: false, message: "Phone is Required!" });
            }
            if (!address) {
                return res
                    .status(404)
                    .send({ success: false, message: "Address is Required!" });
            }
        }
        // hash password
        {
            const hashedPassword = await hashPassword(newUserData.password);
            newUserData.password = hashedPassword;
        }
        const existingUser = await userModel.findOne({
            username: newUserData.username,
        });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "The username already exist",
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
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in register",
            error,
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(404).send({
                success: false,
                message: "Username or Password Incorrect!",
            });
        }

        const result = await userModel.findOne({ username });

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Username Incorrect!",
            });
        }

        // compare password
        const isMatched = await comparePassword(password, result.password);
        if (!isMatched) {
            return res.status(404).send({
                success: false,
                message: "Password Incorrect!",
            });
        }

        const payload = {
            _id: result._id,
        };
        // sign jwt
        const token = await JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).send({
            success: true,
            message: "Login Successfully",
            user: result,
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

const authGoogle = async (req, res, next) => {
    const payload = { _id: req.user._id };
    const token = await JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.redirect(`http://localhost:3000/login/success?token=${token}`);
};

const authFacebook = async (req, res, next) => {
    const payload = { _id: req.user._id };
    const token = await JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.redirect(`http://localhost:3000/login/success?token=${token}`);
};

const getUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            success: false,
            message: "No Auth Token",
        });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await JWT.verify(token, process.env.JWT_SECRET);
    const _id = decoded._id;
    const user = await userModel.findById(_id);
    res.status(200).send({
        success: true,
        message: "get user success",
        user,
    });
};

let resetCode;
const resetPassword = async (req, res) => {
    // check if not exist username
    const isExist = await userModel.findOne({ username: req.body.username });
    if (!isExist) {
        return res.status(401).send({
            success: false,
            message: "No user found for this username!",
        });
    }
    const info = {
        _id: isExist._id,
        email: isExist.email,
    };
    const code = generateCode();
    resetCode = code;
    sendResetPasswordEmail(isExist.email, code);
    res.status(200).send({
        success: true,
        message: "Send mail successfully!",
        info,
    });
};

const verifyCode = async (req, res) => {
    const codeFromUser = req.body.code;
    const isMatched = codeFromUser == resetCode;
    if (!isMatched) {
        return res.status(400).send({
            success: false,
            message: "Code Is Incorrect!",
        });
    }
    const payload = {
        _id: req.body._id,
    };
    const token = await JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    const userData = await userModel.findById(req.body._id);
    delete userData.password;
    res.status(200).send({
        success: true,
        message: "Verified!",
        token,
        user: userData,
        resetCode,
    });
};

const updateAuth = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(403).send({
            success: true,
            message: "Name and Email are required!",
        });
    }
    try {
        let user = await userModel.findByIdAndUpdate(req.user._id, req.body);
        user = await userModel.findById(req.user._id);
        res.status(201).send({
            success: true,
            message: "Update Info Successfully!",
            token: req.user.token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error in update auth!",
        });
    }
};

const changePassword = async (req, res) => {
    try {
        let user = await userModel.findById(req.user._id);
        if (req.body.oldPassword) {
            const isPasswordMatched = comparePassword(
                req.body.oldPassword,
                user.password
            );
            if (!isPasswordMatched) {
                return res.status(403).send({
                    success: false,
                    message: "Old Password is Incorrect!",
                });
            }
        } else if (req.body.permission) {
            const isCodeMatched = Number(req.body.permission) === resetCode;
            if (!isCodeMatched) {
                return res.status(403).send({
                    success: false,
                    message: "Code Is Not Matched!",
                });
            }
        } else {
            return res.status(403).send({
                success: false,
                message: "Error!",
            });
        }
        const newPasswordHashed = await hashPassword(req.body.newPassword);
        await userModel.updateOne(
            { _id: req.user._id },
            { $set: { password: newPasswordHashed } }
        );
        const userPasswordChanged = await userModel.findById(req.user._id);
        res.status(201).send({
            success: true,
            message: "Change Password Successfully!",
            token: req.user.token,
            user: userPasswordChanged,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error in change password!",
        });
    }
};

const secret = async (req, res, next) => {
    res.send("secret called!");
};

module.exports = {
    register,
    login,
    authGoogle,
    authFacebook,
    getUser,
    resetPassword,
    verifyCode,
    updateAuth,
    changePassword,
    secret,
};
