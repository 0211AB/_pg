const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const Product = require('../models/product')
const Flat = require('../models/flats')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const User=require('../models/user')

router.get('/login', (req, res) => {
    res.render('admin/login', { msg: "" })
})

router.get('/', (req, res) => {
    res.redirect('admin/login')
})

router.get('/add-products', auth, (req, res) => {
    res.render('admin/add-products', { message: "" })
})

router.get('/add-flats', auth, (req, res) => {
    res.render('admin/add-flats')
})

router.post('/login', (req, res) => {

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
})

router.post('/add-products', async (req, res) => {
    
    const product = new Product(req.body)
    await product.save()

    res.redirect('add-products')
})

router.post('/add-flats', async (req, res) => {
    const flat = new Flat(req.body)
    await flat.save()

    res.redirect('add-flats')
})

router.get('/view-products', auth, async (req, res) => {
    Product.find({}).then((products) => {
        res.render('admin/view-products', { products })
    })
})

router.get('/view-users', auth, async (req, res) => {
    User.find({}).then((users) => {
        res.render('admin/view-users', { users})
    })
})

router.get('/view-flats', auth, async (req, res) => {
    Flat.find({}).then((flats) => {
        res.render('admin/view-flats', { flats })
    })
})

module.exports = router