const mongoose = require('mongoose')


const company_Schema = new mongoose.Schema(
    {
    name: String,
    }
, {timestamps: true})


const companyModel = mongoose.model("companies", company_Schema)


module.exports = companyModel;

