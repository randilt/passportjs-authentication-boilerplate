const mongoose = require('mongoose');

mongoose.connect('') // Enter the mongodb connection string here

const userSchema = mongoose.Schema({
    username : String,
    password : String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
