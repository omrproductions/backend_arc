/**
 * LR ROUTES
 * - / -> Get lrs
 * - /add -> ADD LR
 * - /update -> UPDATE LR
 * - /delete -> DELETE LR
 */

const authenticate = require('../authenticate');
const { addLr, getLrs, updateLr, deleteLr } = require('../controller/LrController');

const router = require('express').Router();


router.post("/:comapnyId", getLrs)
router.post("/add/:comapnyId", addLr)
router.patch("/update/:lrid", updateLr)
router.delete("/delete/:comapnyId/:lrid", deleteLr)


 
module.exports = router