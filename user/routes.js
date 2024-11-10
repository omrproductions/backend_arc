const express = require("express")
const {registerUser, loginUser, logout, fetchUserDetails, addBatch, fetchBatches, addAgeGroup, deleteAgeGroup, addTimings, deleteTiming, addFees} = require("./controller");
// const authenticate = require("../authenticate");

const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);


module.exports = router;