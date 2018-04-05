const mongoose = require('mongoose');
//const Schema = mongoose.Schema; same as below
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId:String,
    facebookId:String,
    credits:{type : Number,default:0}
});
// hey thifgs ust to coomit
mongoose.model('users',userSchema);
