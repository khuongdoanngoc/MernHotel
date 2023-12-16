const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

const sendResetPasswordEmail = (userEmail, code) => {
    const mailOptions = {
        from: 'MERN Store',
        to: userEmail,
        subject: 'Retrieve Password',
        text: `Your MERN STORE authentication code is: ${code}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            // console.log('main sent: ', info)
        }
    })
}

module.exports = {
    sendResetPasswordEmail
}