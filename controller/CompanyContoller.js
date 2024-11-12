const companyModel = require("../models/company_model");
const { fetch_company_copy } = require("./utils");

const add_company = async (req, res) => {
  const { name } = req.body;
  // const id = req.user;
  // const userFound =findUser(id);
  // if(userFound){
  try {
    const companyAdded = new companyModel({ name });
    await companyAdded.save();
    return res
      .status(200)
      .json({ message: "Company Succefully addded", companyAdded: companyAdded });
  } catch (error) {
    return res.status(400).json({ message: "Error adding company" });
  }

  // }
};

const get_company = async (req, res) => {
  // const id = req.user;
  // const userFound =findUser(id);
  // if(userFound){
  try {
    const companies = await companyModel.find();
    return res
      .status(200)
      .json({ message: "Company Succefully addded", companies });
  } catch (error) {
    return res.status(400).json({ message: "Error adding company" });
  }

  // }
};

const update_company = async (req, res) => {
  const { companyId } = req.params;
  const updates = req.body;
  try {
    const updatedRecord = await companyModel.findByIdAndUpdate(
      companyId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Company Updated", content: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: "Error updating record", error });
  }
};

const delete_company = async (req, res) => {
    const {companyId} = req.params;

    

    try {
        const deleted = await companyModel.findByIdAndDelete(companyId);

        if (!deleted) return res.status(404).json({ message: "Company NOT FOUND" });
        const companiesFetched = await fetch_company_copy(companyId, "company");
        console.log(companiesFetched);
        return res.status(200).json({ message: "Company Deleted", content:companiesFetched });
    } catch (error) {
        
    }
}

module.exports = { add_company, get_company,update_company, delete_company };
