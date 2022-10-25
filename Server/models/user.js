const mongoose = require('mongoose');

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