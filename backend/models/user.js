const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    mobile:{
      type: String,
      required:true
    }
},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;