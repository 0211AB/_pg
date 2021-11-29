const Flat = require('../models/flats')
const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')

exports.home = async (req, res) => {
    const products = await Product.find({ $or: [{ 'idofpg': "13" }, { 'idofpg': "1" }] }).limit(2)
    const flats = await Flat.find().limit(3)

    res.render('user/homepage', { products, flats })
}

exports.getaccount = (req, res) => {
    const username = req.user.username

    User.findOne({ username })
        .then((user) => {
            if(user)
            res.render('user/account', { user })
            else
            res.render('user/login',{msg:""})
        })
        .catch((err) => {
            res.render('user/login',{msg:""})
        })
}

exports.postaccount = (req, res) => {
    const username = req.user.username
    User.findOne({ username }).exec()
        .then((user) => {
            user.college = req.body.college
            user.dob = req.body.dob
            user.dept = req.body.dept
            user.gradyear = req.body.gradyear
            user.altnumber = req.body.altnumber
            user.address = req.body.address
            user.email = req.body.email
            user.extradetails = true
            return user.save()
        })
        .then((user) => {
            res.render('user/account', { user })
        })
        .catch((e) => {
            console.log(e)
        })
}


exports.postpgdetails = (req, res) => {
    Product.findById(req.body.id)
        .then((product) => {
            res.render('user/pgdetails', { product })
        })
        .catch((e) => {
            console.log(e)
        })
}

exports.pgs = (req, res) => {
    const sortx = req.query.sort

    if (sortx == "tocost") {
        Product.find({}).sort(sortx)
            .then((products) => {
                res.render('user/pgs', { products })
            })
    }
    else if (sortx == "gender") {
        Product.find({ gender: "Girls" })
            .then((products) => {
                res.render('user/pgs', { products })
            })
    }
    else if (sortx == "genderm") {
        Product.find({ gender: "Boys" })
            .then((products) => {
                res.render('user/pgs', { products })
            })
    }
    else {
        Product.find({})
            .then((products) => {
                res.render('user/pgs', { products })
            })
    }
}

exports.getpgdetails = (req, res) => {
    res.render('user/pgdetails')
}

exports.flats = (req, res) => {
    Flat.find({})
        .then((flats) => {
            res.render('user/flats', { flats })
        })
}

exports.login = (req, res) => {
    res.render('user/login', { msg: "" })
}

exports.amenities = (req, res) => {
    res.render('user/amenities')
}

exports.comingsoon = (req, res) => {
    res.render('user/comingsoon')
}

exports.postlogin = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    //find user exist or not
    User.findOne({ username }).exec()
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.status(400).render('user/login', { msg: 'User does not exist !! Please sign up' })

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, async (err, data) => {
                //if error than throw error
                if (err) return res.status(400).render('user/login', { msg: 'Incorrect Credentials' })

                //if both match than you can do anything
                if (data) {
                    const token = await user.generateAuthToken()
                    res.cookie('auth_token', token)
                    res.redirect('account')
                }
                else {
                    return res.status(400).render('user/login', { msg: 'Incorrect Credentials' })
                }

            })

        })
}

exports.signup = (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    console.log(user)
    user.save()
        .then(() => {
            console.log('In Then:',user)
            res.render('user/login', { msg: "User Created Succesfully! Please Login" })
        })
        .catch((e) => {
            console.log(e)
        })
}

exports.pgsort = async (req, res) => {
    console.log(req.body.sort)

    res.redirect('pgs', {
        sort: req.body.sort
    })
}

exports.flatdetails = (req, res) => {
    const id = req.body.id

    Flat.findById(id)
        .then((flat) => {
            res.render('user/flatdetails', { flat })
        })
}
