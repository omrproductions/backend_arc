const express = require("express")
const {registerUser, loginUser, logout, fetchUserDetails, addBatch, fetchBatches, addAgeGroup, deleteAgeGroup, addTimings, deleteTiming, addFees} = require("./controller");
// const authenticate = require("../authenticate");

const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

// // BATCHES
// // Age groups
// router.post("/addbatch",authenticate,  addBatch);
// router.post("/add/agegroup",authenticate,  addAgeGroup);
// router.get("/fetchbatches",authenticate,  fetchBatches);
// router.post("/deleteagegroup",authenticate,  deleteAgeGroup);

// // Batch Timings
// router.post('/addtimings', authenticate, addTimings);
// router.post('/addfees', authenticate, addFees);
// router.post('/deletetiming', authenticate, deleteTiming);

// router.get("/fetchUserDetails", authenticate, fetchUserDetails);


module.exports = router;