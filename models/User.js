const mongoose = require('mongoose');
//const Schema = mongoose.Schema; same as below
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId:String,
    facebookId:String
});

mongoose.model('users',userSchema);
