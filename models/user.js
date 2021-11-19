const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        trim: true
    },
    number:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    extradetails:{
        type:Boolean,
    },
    dob:{
        type:String
    },
    college:{
        type:String
    },
    dept:{
        type:String
    },
    altnumber:{
        type:String
    },
    gradyear:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    wishlisted:{
        type:Array
    }
})


userSchema.pre("save", function (next) {
    const user = this

    bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError)
        } else {
            bcrypt.hash(user.password, salt, function (hashError, hash) {
                if (hashError) {
                    return next(hashError)
                }

                user.password = hash
                next()
            })
        }
    })
})

userSchema.methods.generateAuthToken = async function generateAuthToken() {
    const token = jwt.sign({ username: this.username }, process.env.JWT_KEY, {
        expiresIn: "3h",
    })
    return token;
}

module.exports = mongoose.model('User', userSchema);