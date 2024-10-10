const express = require('express')
const app = express();
const cors = require('cors')
const lr_routes = require('./router/lr_routes')
// const userRoutes = require('./user/userRoutes');
// const authenticate = require('./authenticate');
const companyModel = require('./models/company_model');
const mongoose = require('mongoose');
// DOTENV
require('dotenv').config();
// CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const findUser = async (id) =>{ 
    const userFound = await companyModel.find({_id: id});
    if(userFound) return userFound
    else return false;
}

// LR copies
app.use("/api/lr", lr_routes)
app.post("/addcompany",async (req, res) => {
    const {name} = req.body;
    const id = req.user;
    const userFound =findUser(id);
    if(userFound){
        const companyAdded = await new companyModel(name);
        return res.status(200).json({message: "Company Succefully addded", company: companyAdded})
    }
    return res.status(400).json({message: "Error adding company"});
})
// app.use("/api/user", userRoutes);


const startServer  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
        
        app.listen(process.env.PORT, () => {
            console.log("Server Started at", process.env.PORT);
        });

    } catch (error) {
        console.log(error);
    }
    
}


startServer();

