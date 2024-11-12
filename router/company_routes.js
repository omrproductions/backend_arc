/**
 *  Company Routes
 * ______________________
 * FETCH - /
 * ADD - /add
 * UPDATE - /update/:companyId
 * DELTE - /delete/:companyId
 * 
 * NOTE: 
 * 1. Use data.content to see the info of the docs
 * 2. Use data.message to see what has happened
 */

const router = require('express').Router();
const { get_company,add_company, update_company, delete_company} = require('../controller/CompanyContoller');


router.get("/", get_company)
router.post("/add", add_company)
router.patch("/update/:companyId", update_company)
router.delete("/delete/:companyId", delete_company)


 
module.exports = router