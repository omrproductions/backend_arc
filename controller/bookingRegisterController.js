/**
 * Booking Register 
 * 
 * ADD - add_bookingRegister - DONE
 * GET - get_bookingRegister - DONE
 * UPDATE - update_bookingRegister - DONE
 * DELETE - delete_bookingRegister - DONE
 */

const companyModel = require("../models/company_model");
const bookingRegister_model = require('../models/bookingRegister_model')
const { fetch_company_copy } = require("./utils");

// FIND USER
const findUser = async (id) =>{ 
    const userFound = await companyModel.find({_id: id});
    if(userFound) return userFound
    else return false;
}



// GET 
const get_bookingRegister= async (req, res) => {
    const {comapnyId} = req.params;

    // const id = req.user;
    // const userFound = findUser(id);
    // if(userFound){
        const bookingRegister_fetched = await  fetch_company_copy(comapnyId, "bookingRegister");
        
        if(bookingRegister_fetched) return res.status(200).json({message: "Bill Copy fetched", content:bookingRegister_fetched});
        else return res.status(400).json({message: "Couldn't fetch Bill Copies"});
    // }
}

// ADD 
const add_bookingRegister= async (req, res) => {
    const {comapnyId} = req.params;
    let bookingRegisterDetails = req.body;
    bookingRegisterDetails = {...bookingRegisterDetails, under_company: comapnyId}

    try{
        const bookingRegister_added = new bookingRegister_model(bookingRegisterDetails);
        await bookingRegister_added.save();
        return res.status(200).json({message: "Bill Copy ADDED",content: bookingRegister_added })
    }catch(error){
        return res.status(400).json({error})
    }
} 

// UPDATE
const update_bookingRegister= async (req, res) => {
    const {bookingRegisterId} = req.params;
    const updates = req.body;
    try {
        const updatedRecord = await bookingRegister_model.findByIdAndUpdate(
            bookingRegisterId,
          { $set: updates },
          { new: true, runValidators: true } 
        );
    
        if (!updatedRecord) {
          return res.status(404).json({ message: "Bill Copy not found" });
        }
    
        return res.status(200).json({message: "Updated Bill copy",content:updatedRecord});
      } catch (error) {
        res.status(500).json({ message: "Error updating record", error });
      }
}

// DELETE BILL COPY
const delete_bookingRegister= async (req, res) => {
    const {bookingRegisterId, comapnyId} = req.params;
    try {
        console.log(bookingRegisterId);
        const deletedLr = await bookingRegister_model.findByIdAndDelete(bookingRegisterId) 
        if(!deletedLr) return res.status(404).json({message: "Lr Not found"})
        const bookingRegister_fetched =await fetch_company_copy(comapnyId, "bookingRegister");
        console.log(bookingRegister_fetched);
        return res.status(200).json({message: "Booking Register Deleted",content: bookingRegister_fetched })
        

        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {add_bookingRegister, get_bookingRegister, update_bookingRegister, delete_bookingRegister}
