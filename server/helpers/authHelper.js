const bcrypt = require('bcryptjs')
const JWT = require("jsonwebtoken");


const hashPassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log("hash password err: ", err);
    }
}

const generateCode = () => {
    const min = 1000
    const max = 9999
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const decodeToken = async (token) => {
    return await JWT.decode(token);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateCode,
    decodeToken
}