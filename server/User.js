const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    } 
})

userSchema.statics.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.checkPassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema);
module.exports = User;
