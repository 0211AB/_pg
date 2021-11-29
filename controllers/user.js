const Flat = require('../models/flats')
const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')

exports.home = (req, res) => {
    Product.find({ $or: [{ 'idofpg': "13" }, { 'idofpg': "1" }] }, async (err, products) => {
        Flat.find(async (err, flats) => {
            res.render('user/homepage', { products, flats })
        }).limit(3)
    }).limit(2)
}

exports.getaccount = (req, res) => {
    const username = req.user.username

    User.findOne({ username }, (err, user) => {
        if (user) {
            res.render('user/account', { user })
        }
    })
}

exports.postaccount = (req, res) => {
    const username = req.user.username
    User.findOne({ username }).exec()
        .then(async (user) => {
            user.college = req.body.college
            user.dob = req.body.dob
            user.dept = req.body.dept
            user.gradyear = req.body.gradyear
            user.altnumber = req.body.altnumber
            user.address = req.body.address
            user.email = req.body.email
            user.extradetails = true
            await user.save()
            res.render('user/account', { user })
        })
}

exports.postpgdetails = (req, res) => {
    Product.findById(req.body.id, async (err, product) => {
        res.render('user/pgdetails', { product })
    })
}

exports.pgs = (req, res) => {
    const sortx = req.query.sort

    if (sortx == "tocost") {
        Product.find( (err, products) => {
            res.render('user/pgs', { products })
        }).sort(sortx)
    }
    else if (sortx == "gender") {
        Product.find({ gender: "Girls" }, async (err, products) => {
            res.render('user/pgs', { products })
        })
    }
    else if (sortx == "genderm") {
        Product.find({ gender: "Boys" }, async (err, products) => {
            res.render('user/pgs', { products })
        })
    }
    else {
        Product.find(async (err, products) => {
            res.render('user/pgs', { products })
        })
    }
}

exports.getpgdetails = (req, res) => {
    res.render('user/pgdetails')
}

exports.flats = (req, res) => {
    Flat.find({}).then((flats) => {
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

exports.signup = async (req, res) => {
    const user = new User(req.body)
    await user.save()

    res.render('user/login', { msg: "User Created Succesfully! Please Login" })
}

exports.pgsort = async (req, res) => {
    console.log(req.body.sort)

    res.redirect('pgs', {
        sort: req.body.sort
    })
}

exports.flatdetails = (req, res) => {
    const id = req.body.id

    Flat.findById(id).then((flat) => {
        res.render('user/flatdetails', { flat })
    })
}