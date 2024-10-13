const User = require('./model')
// ENCRYPTION PASSWORD
const bcrypt = require('bcryptjs')
const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log('Error hashing the password', error);
        throw error;
    }
}
const comparePass = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if(isMatch) return true
    } catch (error) {
        console.log("Password does not match", error);
        throw error;
    }
}

// Token
const jwt = require('jsonwebtoken');
const { localCookieConfig, productionCookieConfig } = require('./Config');

// COOKIE


const generateToken = (user) => {
    return jwt.sign({ userId: user._id, username: user.studioName, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: "3h"})
}

const registerUser = async (req, res) => {

   try {
        const {name, email, password} = req.body;

        
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: 'User already exists'});
        }else{
            const hashedPassword = await encryptPassword(password);
            const newUser = await new User({name, email, password: hashedPassword});
            await newUser.save();
            return res.status(201).json({message: 'User created successfully'});
        }   
   } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' }); // Respond with an error 
   }
}


const loginUser = async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const isPassChecked = await comparePass(password, user.password);
        if(isPassChecked){
            console.log(isPassChecked);
            const token = generateToken(user);
            // res.cookie('token', token, localCookieConfig);
            // res.cookie('token', token, productionCookieConfig);
            return res.status(200).json({token, message: "You are logged In"});
        }else{
            return res.status(401).json({error: 'Password does not match'});
        }
    }else{
        return res.status(404).json({error: 'Email Not Found!'});
    }
   
}


const logout = (req, res) => {
    if(req.cookies.token){
        res.clearCookie('token');
        return res.json({status: true, message: "Logeed out"});
    }else{
        return res.json({status: true, message: "No token"});
    }
}


const fetchUserDetails = (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const addBatch = async (req, res) => {
    try {
        const user = req.user;
        const {batches} = req.body;
        const user_found = await User.findById(user.userId);
        if(!user_found){
            return res.status(404).json({error: 'User Not Found!'});
        }
        console.log(batches);
        

    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const addAgeGroup = async (req, res) => {
    const {userId} = req.user;
    const user_found = await User.findById(userId);
    if(!user_found){
        return res.status(404).json({error: 'User Not Found!'});
    }
    let {ageGroupName} = req.body;
    ageGroupName = ageGroupName.charAt(0).toUpperCase() + ageGroupName.slice(1);

    
    const ageGroupFound = await user_found.batches.find((batch) => batch.ageGroup === ageGroupName);


    if(ageGroupFound){
        
        return res.status(409).json({error: 'Age Group Already Exists!'});
    }else{
        user_found.batches.push({ageGroup: ageGroupName.charAt(0).toUpperCase() + ageGroupName.slice(1)});
        await user_found.save();
        let ageGoroups = []
        user_found.batches.map(batch => ageGoroups.push(batch.ageGroup));
        return res.status(200).json({message: 'Age Group Added Successfully!', ageGroup: ageGroupName});
    }
    

}


const deleteAgeGroup = async (req, res) => {
    const {userId} = req.user;
    const user_found = await User.findById(userId);
    if(!user_found){
        return res.status(404).json({error: 'User Not Found!'});
    }
    const {ageGroupName} = req.body;
    user_found.batches = user_found.batches.filter(batch => batch.ageGroup !== ageGroupName);
    console.log(user_found.batches);
    await user_found.save();
    return res.status(200).json({message: "Category Deleted"})

}

const addTimings = async (req, res) => {
    const user = req.user;
    const user_found = await User.findById(user.userId);
    if(!user_found){
        return res.status(404).json({error: 'User Not Found!'});
    }
    const {groupName, timing} = req.body;

    console.log(req.body);
    console.log(user_found);
    
    const group = await user_found.batches.find((batch) => batch.ageGroup === groupName);

    if (group) {
        // If the group exists, add the new timing to its timings array if it's not already there
        if (!group.timings.includes(timing)) {
            group.timings.push(timing);
        } else {
            return res.status(400).json({ message: 'Timing already exists for this age group' });
        }
    } else {
        // If the group doesn't exist, create a new one with the provided timing
        user_found.batchTimings.push({
            ageGroup: groupName,
            timings: [timing]
        });
    }
    console.log(user_found.batchTimings);
    
    await user_found.save();
    return res.status(200).json({message: 'Timing Added Successfully!'});
}

const fetchBatches = async(req, res) => {
    const user = req.user;
    const user_found = await User.findById(user.userId);

    
    if(!user_found){
        return res.status(404).json({error: 'User Not Found!'});
    }
    console.log(user_found.batches);
    return res.status(200).json({batches:user_found.batches})
}

const deleteTiming = async (req, res) => {
    const user = req.user;
    const user_found = await User.findById(user.userId);
    if(!user_found){
        return res.status(404).json({error: 'User Not Found!'});
    }
    const {groupName, timing} = req.body;
    const group = await user_found.batchTimings.find((batchTime) => batchTime.ageGroup ===groupName);
    group.timings = group.timings.filter(item => item !== timing);
    await user_found.save();
    return res.status(200).json({
        message: 'Timing deleted successfully!',
        batchTimings: user_found.batchTimings
    });
}

const addFees = async (req, res) => {
    const user = req.user;
    const user_found = await User.findById(user.userId);
    if(!user_found){
        return res.status(404).json({error: 'User Not Found!'});
    }
    const {groupName, fees} = req.body;
    console.log(groupName, fees);
    
    // user_found.batches.map((batch) => console.log(batchTime));
    // user_found.batchTimings.map((batchTime) => console.log(batchTime));
    const group = await user_found.batches.find((batch) => batch.ageGroup === groupName);

    
    group.fees = fees;
       
    console.log(user_found.batches);
    
    await user_found.save();
    return res.status(200).json({message: 'Fees Added Successfully!', batchTimings: fees});
   
}
module.exports = {registerUser, loginUser, logout, fetchUserDetails, addBatch, fetchBatches, addAgeGroup, deleteAgeGroup, addTimings, deleteTiming, addFees}