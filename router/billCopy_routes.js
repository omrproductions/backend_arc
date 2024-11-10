/**
 * Letter Pad ROUTES
 * ___________________________
 * FETCH - /:companyId  
 * ADD - /add/:companyId
 * UPDATE - /update/:billcopyId
 * DELTE - /delete/:companyId/:billcopyId
 * 
 * NOTE: 
 * 1. Use data.content to see the info of the docs
 * 2. Use data.message to see what has happened
 */
const authenticate = require('../authenticate');
const { add_billcopy, get_billcopy, update_billcopy, delete_billcopy} = require('../controller/BillCopyController');

const router = require('express').Router();


router.post("/:comapnyId", get_billcopy)
router.post("/add/:comapnyId", add_billcopy)
router.patch("/update/:billcopyId", update_billcopy)
router.delete("/delete/:comapnyId/:billcopyId", delete_billcopy)


 
module.exports = router