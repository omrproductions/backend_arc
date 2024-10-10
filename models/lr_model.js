const mongoose = require("mongoose");

const LR_Schema = new mongoose.Schema({
  under_company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  partyMob: String,
  demurrage_days: Number,
  demurrage_charges: String,
  insurance: {
    isInsuredConsignment: Boolean,
    companyName: String,
    policyNumber: String,
    date: String,
    amount: Number,
    risk: String,
    eway_billNo: String,
  },
  caution: {
    add_deliveryOffice: String,
    consignment_note: {
      consignment_note_no: String,
      consignment_date: Date,
    },
  },
  gst_payable_by: {
    type: String,
    enum: ["Consignor", "Consignee"],
  },
  delivery_details: {
    consigner: {
      name: String,
      address: String,
    },
    consignee: {
      name: String,
      address: String,
    },
    packages: [{ package_name: String, description: String }],
    weight: { actual: Number, charged: Number },
    amount_to_pay: {
      freight: Number,
      hamali: Number,
      sur: Number,
      lr: Number,
      risk: Number,
      total: Number,
    },
  },
  additional_delivery_details: {
    issuing_address: String,
    lorry_no: String,
    mode_of_packaging: String,
    invoice_no: String,
    consigners_gst_no: String,
    consignee_gst_no: String,
    remarks: String,
  },
});

const LRModel = mongoose.model("LR", LR_Schema);

module.exports = LRModel;
