const mongoose = require('mongoose')





const userSchema = mongoose.Schema({
   
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },


    
    password: {
        type: String, 
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    studentsPerMonth: [
        {
            month: {
                type: String, // e.g., 'January', 'February'
                required: true
            },
            studentCount: {
                type: Number,
                required: true
            }
        }
    ],

    batches:  [
        {
            ageGroup: String,
            timings: [String],
            fees: Number,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('Users', userSchema);

module.exports = User;
