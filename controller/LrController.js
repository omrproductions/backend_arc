/**
 * LR COPIES
 * Add
 * get
 * update 
 * delete
 */

const companyModel = require("../models/company_model");
const LRModel = require("../models/Lr_model");
const findUser = async (id) =>{ 
    const userFound = await companyModel.find({_id: id});
    if(userFound) return userFound
    else return false;
}

// ADD LR
const addLr = async (req, res) => {

    const lrDetails = req.body;
    // console.log(lrDetails);
    
    // const id = req.user;
    // const userFound = findUser(id);
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
    const {id} = req.params;
    console.log(id);
    
    // const id = req.user;
    // const userFound = findUser(id);
    // if(userFound){
        const lrsFetched = await LRModel.find({under_company: id});
        if(lrsFetched) return res.status(200).json({message: "LR fetched", lrsFetched: lrsFetched});
        else return res.status(400).json({message: "Couldn't fetch LR's"});
    // }
}


module.exports = {addLr, getLrs}
