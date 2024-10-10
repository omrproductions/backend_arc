const mongoose = require('mongoose')


const company_Schema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required: true,
    },
    name: String,
}, {timestamps: true})


const companyModel = mongoose.model("companies", company_Schema)


module.exports = companyModel;

