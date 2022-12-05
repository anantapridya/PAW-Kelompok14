const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        validate: {
            validator: validator.isEmail,
            message: 'Masukkan email yang valid',
        },
        required: true
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
    ]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;