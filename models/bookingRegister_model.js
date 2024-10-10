const mongoose = require('mongoose')


const bookingRegisterSchema =new  mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required: true,
    },
    cn_number: Number, 
    date: {
        type: Date,
        default: new Date()
    },
    number_of_packages: Number,
    consignor: String,
    consignee: String,
}, {timestamps: true})


const BookingRegisterModel = mongoose.model("bookingRegister", bookingRegisterSchema)

module.exports  = BookingRegisterModel;