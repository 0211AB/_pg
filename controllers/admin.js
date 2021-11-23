const Admin = require('../models/admin')
const Product = require('../models/product')
const Flat = require('../models/flats')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = (req, res) => {
    res.render('admin/login', { msg: "" })
}

exports.home = (req, res) => {
    res.redirect('admin/login')
}

exports.addproducts = (req, res) => {
    res.render('admin/add-products', { message: "" })
}

exports.addflats = (req, res) => {
    res.render('admin/add-flats')
}

exports.postlogin = (req, res) => {

    const username = req.body.username
    const password = req.body.password

    if (password.length < 8) return res.status(400).render('admin/login', { msg: 'Password length is too small ' })

    //find admin exist or not
    Admin.findOne({ username }).exec()
        .then(admin => {
            //if admin not exist than return status 400
            if (!admin) return res.status(400).render('admin/login', { msg: 'admin not exist' })

            //if admin exist than compare password
            //password comes from the admin
            //admin.password comes from the database
            bcrypt.compare(password, admin.password, async (err, data) => {
                //if error than throw error
                if (err) return res.status(400).render('admin/login', { msg: 'Incorrect Credentials' })

                //if both match than you can do anything
                if (data) {
                    const token = await admin.generateAuthToken()
                    res.cookie('auth_token', token)
                    res.redirect('add-products')
                }
                else {
                    return res.status(400).render('admin/login', { msg: 'Incorrect Credentials' })
                }

            })

        })
}

exports.postaddflats = async (req, res) => {
    const flat = new Flat(req.body)
    await flat.save()

    res.redirect('add-flats')
}

exports.postaddpgs = async (req, res) => {

    const product = new Product(req.body)
    await product.save()

    res.redirect('add-products')
}

exports.view = async (req, res) => {
    Product.find({}).then((products) => {
        res.render('admin/view-products', { products })
    })
}

exports.viewuser = async (req, res) => {
    User.find({}).then((users) => {
        res.render('admin/view-users', { users })
    })
}

exports.viewflats = async (req, res) => {
    Flat.find({}).then((flats) => {
        res.render('admin/view-flats', { flats })
    })
}