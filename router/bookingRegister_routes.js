/**
 * Booking Register ROUTES
 * ______________________
 * FETCH - /:companyId  
 * ADD - /add/:companyId
 * UPDATE - /update/:bookingRegisterId
 * DELTE - /delete/:companyId/:bookingRegisterId
 * 
 * NOTE: 
 * 1. Use data.content to see the info of the docs
 * 2. Use data.message to see what has happened
 */

const authenticate = require('../authenticate');
const { add_bookingRegister, get_bookingRegister, update_bookingRegister, delete_bookingRegister} = require('../controller/bookingRegisterController');

const router = require('express').Router();


router.post("/:comapnyId", get_bookingRegister)
router.post("/add/:comapnyId", add_bookingRegister)
router.patch("/update/:bookingRegisterId", update_bookingRegister)
router.delete("/delete/:comapnyId/:bookingRegisterId", delete_bookingRegister)


 
module.exports = router