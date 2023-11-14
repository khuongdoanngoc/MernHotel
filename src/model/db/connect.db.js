const mongoose = require('mongoose')

const connect = async () => {
    await mongoose.connect('mongodb://127.0.0.1/27017/EcommerceApplication')
    .then(() => {
        console.log('connect to db successfully!')
    })
    .catch(err => console.log('connect db err: ', err))

}
module.exports = connect