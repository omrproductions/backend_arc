const mongoose = require('mongoose')


const lettPad_Schema = new mongoose.Schema({
    under_company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comapnies",
        required: true
    },
    text: String,

}, {timestamps: true})


const letterPad_model = mongoose.model("letterPad",lettPad_Schema);

module.exports = letterPad_model;
