const mongoose = require('mongoose')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL_CONNECT)
    .then(() => {
        console.log('connect to db successfully!')
    })
    .catch(err => console.log('connect db err: ', err))

}
module.exports = connect