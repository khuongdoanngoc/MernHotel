const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log("hash password err: ", err);
    }
}

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}