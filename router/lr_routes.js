
const authenticate = require('../authenticate');
const { addLr, getLrs } = require('../controller/LrController');

const router = require('express').Router();


router.post("/read/:id",getLrs)
router.post("/add", addLr)
// router.update("/update/:lrid", updateLr)
router.delete("/delete", (req, res)=> {})


 
module.exports = router