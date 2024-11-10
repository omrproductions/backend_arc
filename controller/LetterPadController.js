const letterPad_model = require("../models/letterPad_model");
const { fetch_company_copy } = require("./utils");

const getLetterPad =async (req, res) => {
    const {companyId} = req.params;
    // const id = req.user;
    // const userFound = findUser(id);
    // if(userFound){
        const letterPadFetched = await fetch_company_copy(companyId, "letterPad");
        if (letterPadFetched)
            return res
            .status(200)
            .json({ message: "All Letter Pad fetched", content: letterPadFetched });
        else return res.status(400).json({ message: "Couldn't fetch LR's" });
    // }

}

const addLetterPad = async (req, res) => {
    const {companyId} = req.params;
    let letterPadDetails = req.body;


    letterPadDetails = { ...letterPadDetails, under_company: companyId };
    console.log(letterPadDetails);
  
    try {
      const letterPad_added = new letterPad_model(letterPadDetails);
      await letterPad_added.save();
      return res.status(200).json({ message: "Letter Pad ADDED", content: letterPad_added });
    } catch (error) {
      return res.status(400).json({ error });
    }

}

const updateLetterPad = async (req, res) => {
    const {letterPadId} = req.params;
    const updates = req.body;
    try {
        const updatedRecord = await letterPad_model.findByIdAndUpdate(
            letterPadId,
          { $set: updates },
          { new: true, runValidators: true }
        );
    
        if (!updatedRecord) {
          return res.status(404).json({ message: "Record not found" });
        }
    
        res.status(200).json({message: "Letter Pad Updated", content: updatedRecord});
      } catch (error) {
        res.status(500).json({ message: "Error updating record", error });
      }

}

const deleteletterPad = async (req, res) => {
    const {companyId, letterPadId} = req.params;
    try {
        const deleted_letterPad = await letterPad_model.findByIdAndDelete(letterPadId);
        if (!deleted_letterPad) return res.status(404).json({ message: "Letter Pad Not found" });
        const letterPad_fetched = await fetch_company_copy(companyId, "letterPad");
        console.log(letterPad_fetched);
        return res.status(200).json({ message: "Lr Deleted", content:letterPad_fetched });
      } catch (error) {
        console.log(error);
      }

}

module.exports = {getLetterPad, addLetterPad, updateLetterPad, deleteletterPad}