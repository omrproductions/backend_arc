/**
 * LR COPIES
 * add_billcopy
 * get_billcopy 
 * update_billcopy 
 * delete_billcopy
 */

const companyModel = require("../models/company_model");
const billCopy_model = require('../models/billCopy_model')
const { fetch_company_copy } = require("./utils");

// FIND USER
const findUser = async (id) =>{ 
    const userFound = await companyModel.find({_id: id});
    if(userFound) return userFound
    else return false;
}

// GET Copy
const get_billcopy = async (req, res) => {
    const {comapnyId} = req.params;
    console.log(comapnyId);
    
    // const id = req.user;
    // const userFound = findUser(id);
    // if(userFound){
        const billCopy_Fetched = await  fetch_company_copy(comapnyId, "billCopy");
        
        if(billCopy_Fetched) return res.status(200).json({message: "Bill Copy fetched", content: billCopy_Fetched});
        else return res.status(400).json({message: "Couldn't fetch Bill Copies"});
    // }
}


// ADD Bill Copy
const add_billcopy = async (req, res) => {
    const {comapnyId} = req.params;
    let billcopyDetails = req.body;
    billcopyDetails = {...billcopyDetails, under_company: comapnyId}
    console.log(billcopyDetails);
    
    try{
        const billcopy_added = new billCopy_model(billcopyDetails);
        await billcopy_added.save();
        return res.status(200).json({message: "Bill Copy ADDED", content:billcopy_added })
    }catch(error){
        return res.status(400).json({error})
    }
} 


// UPDATE BILL COPY
const update_billcopy = async (req, res) => {
    const {billcopyId} = req.params;
    const updates = req.body;
    try {
        const updatedRecord = await billCopy_model.findByIdAndUpdate(
            billcopyId,
          { $set: updates },
          { new: true, runValidators: true } 
        );
    
        if (!updatedRecord) {
          return res.status(404).json({ message: "Bill Copy not found" });
        }
    
        return res.status(200).json({message: "Updated Bill copy",content: updatedRecord});
      } catch (error) {
        res.status(500).json({ message: "Error updating record", error });
      }
}

// DELETE BILL COPY
const delete_billcopy = async (req, res) => {
    const {billcopyId, comapnyId} = req.params;
    try {
        console.log(billcopyId);
        const deleted_billCopy = await billCopy_model.findByIdAndDelete(billcopyId) 
        if(!deleted_billCopy) return res.status(404).json({message: "Lr Not found"})
        const billCopy_Fetched =await fetch_company_copy(comapnyId, "billcopy");
        console.log(billCopy_Fetched);
        return res.status(200).json({message: "Bill Copy Deleted",content: billCopy_Fetched })
        

        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {add_billcopy, get_billcopy, update_billcopy, delete_billcopy}
