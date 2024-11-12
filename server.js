const express = require('express')
const app = express();
const cors = require('cors')
const lr_routes = require('./router/lr_routes')
const billCopy_routes = require('./router/billCopy_routes')
const bookingRegister_routes = require('./router/bookingRegister_routes');
const letterPad_routes = require('./router/letterPad_routes')
const company_routes = require('./router/company_routes')

const user_routes = require('./user/routes')
// const authenticate = require('./authenticate');
const companyModel = require('./models/company_model');
const mongoose = require('mongoose');
// DOTENV
require('dotenv').config();
// CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const findUser = async (id) =>{ 
    const userFound = await companyModel.find({_id: id});
    if(userFound) return userFound
    else return false;
}
// USER
app.use("/api/user", user_routes);

// COMPANY
app.use('/api/company', company_routes)

// LR copies
app.use("/api/lr", lr_routes)
// Bill Copy
app.use("/api/billcopy", billCopy_routes)
// Booking Register
app.use("/api/bookingRegister", bookingRegister_routes)

// Letter Pad Routes
app.use("/api/letterPad", letterPad_routes)




const startServer  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
        
        // start server
        app.listen(process.env.PORT, () => {
            console.log("Server Started at", process.env.PORT);
        });

    } catch (error) {
        console.log(error);
    }
    
}


startServer();


