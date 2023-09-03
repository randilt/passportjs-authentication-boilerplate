const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://randil:randil@cluster0.xrp7coq.mongodb.net/passport?retryWrites=true&w=majority')

const userSchema = mongoose.Schema({
    username : String,
    password : String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;