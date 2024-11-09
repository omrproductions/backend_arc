/**
 * Bill Copy ROUTES
 * - / -> Get lrs
 * - /add -> ADD LR
 * - /update -> UPDATE LR
 * - /delete -> DELETE LR
 */

const authenticate = require('../authenticate');
const { add_billcopy, get_billcopy, update_billcopy, delete_billcopy} = require('../controller/BillCopyController');

const router = require('express').Router();


router.post("/:comapnyId", get_billcopy)
router.post("/add/:comapnyId", add_billcopy)
router.patch("/update/:billcopyId", update_billcopy)
router.delete("/delete/:comapnyId/:billcopyId", delete_billcopy)


 
module.exports = router