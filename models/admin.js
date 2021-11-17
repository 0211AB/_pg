const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    adminname:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        minlength: 8,
        required: true,
        trim: true
    }
})


adminSchema.pre("save", function (next) {
    const admin = this

    bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError)
        } else {
            bcrypt.hash(admin.password, salt, function (hashError, hash) {
                if (hashError) {
                    return next(hashError)
                }

                admin.password = hash
                next()
            })
        }
    })
})

adminSchema.methods.generateAuthToken = async function generateAuthToken(){
    const token = jwt.sign({ username: this.username }, process.env.JWT_KEY, {
        expiresIn: "3h",
    })
    return token;
}

module.exports = mongoose.model('Admin', adminSchema);