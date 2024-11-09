/**
 * LR COPIES
 * Add
 * get
 * update 
 * delete
 */

const companyModel = require("../models/company_model");
const LRModel = require("../models/Lr_model");
const { fetch_company_copy } = require("./utils");
const findUser = async (id) =>{ 
    const userFound = await companyModel.find({_id: id});
    if(userFound) return userFound
    else return false;
}

// ADD LR
const addLr = async (req, res) => {
    const {comapnyId} = req.params;
    let lrDetails = req.body;
    lrDetails = {...lrDetails, under_company: comapnyId}
    console.log(lrDetails);
    
    try{
        const lr_Added = new LRModel(lrDetails);
        await lr_Added.save();
        return res.status(200).json({message: "LR ADDED", lrDetails:lr_Added })
    }catch(error){
        return res.status(400).json({error})
    }
} 

// GET LR
const getLrs = async (req, res) => {
    const {comapnyId} = req.params;
    console.log(comapnyId);
    
    // const id = req.user;
    // const userFound = findUser(id);
    // if(userFound){
        const lrsFetched = await fetch_company_copy(comapnyId, "lr");
        // console.log(lrsFetched);
        
        if(lrsFetched) return res.status(200).json({message: "LR fetched", lrsFetched: lrsFetched});
        else return res.status(400).json({message: "Couldn't fetch LR's"});
    // }
}





const updateLr = async (req, res) => {
    const {lrId} = req.params;
    const updates = req.body;
    try {
        const updatedRecord = await LRModel.findByIdAndUpdate(
            lrId,
          { $set: updates },
          { new: true, runValidators: true } 
        );
    
        if (!updatedRecord) {
          return res.status(404).json({ message: "Record not found" });
        }
    
        res.status(200).json(updatedRecord);
      } catch (error) {
        res.status(500).json({ message: "Error updating record", error });
      }
}

const deleteLr = async (req, res) => {
    const {lrid, comapnyId} = req.params;
    try {
        console.log(lrid);

        const deletedLr = await LRModel.findByIdAndDelete(lrid) 

        if(!deletedLr) return res.status(404).json({message: "Lr Not found"})
        const lrsFetched = await fetch_company_copy(comapnyId, "lr");
        console.log(lrsFetched);
        return res.status(200).json({message: "Lr Deleted",lrsFetched })
        

        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {addLr, getLrs, updateLr, deleteLr}
