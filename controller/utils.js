const LRModel = require("../models/Lr_model");
const billCopy_model = require("../models/billCopy_model");
const bookingRegister_model = require("../models/bookingRegister_model");
const letterPad_model = require('../models/letterPad_model');
const models = {
    "lr": LRModel,
    "billCopy": billCopy_model,
    "bookingRegister": bookingRegister_model,
    "letterPad": letterPad_model
    
}

const fetch_company_copy = async (companyId, copy) => {
    
    for (const [copyName, model] of Object.entries(models)) {
        if (copyName === copy) {
            return await model.find({ under_company: companyId });
        }
    }
    return null;

};

module.exports = { fetch_company_copy };