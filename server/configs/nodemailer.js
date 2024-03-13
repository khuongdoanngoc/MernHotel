const nodemailer = require("nodemailer");
const { formatDate } = require("../helpers/formatDate");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

const sendResetPasswordEmail = (userEmail, code) => {
    const mailOptions = {
        from: "MERN Hotel",
        to: userEmail,
        subject: "Retrieve Password",
        text: `Your MERN Hotel authentication code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            // console.log('main sent: ', info)
        }
    });
};

const sendConfirmOrder = (userEmail, payload) => {
    const mailOptions = {
        from: "MERN Hotel",
        to: userEmail,
        subject: "Successful booking confirmation",
        html: `<html><body><h1>Thank you for ordering from us!</h1><p>We have received your order with the following information:</p><ul><li>Order ID: ${
            payload.order._id
        }</li><li>Customer: ${payload.userName}</li><li>Room: ${payload.productName}</li><li>Checkin: ${formatDate(
            payload.order.checkin
        )}</li><li>Checkout: ${formatDate(payload.order.checkout)}</li><li>Total: $${
            payload.order.total
        }</li></ul><p>We will contact you as soon as possible to confirm your order. Thank you for choosing us!</p></body></html>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            // console.log('main sent: ', info)
        }
    });
};

module.exports = {
    sendResetPasswordEmail,
    sendConfirmOrder,
};
