const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const admincontroller = require('../controllers/admin')

router.get('/login', admincontroller.login)

router.get('/', admincontroller.home)

router.get('/add-products', auth, admincontroller.addproducts)

router.get('/add-flats', auth, admincontroller.addflats)

router.post('/login', admincontroller.postlogin)

router.post('/add-products', admincontroller.postaddpgs)

router.post('/add-flats', admincontroller.postaddflats)

router.get('/view-products', auth, admincontroller.view)

router.get('/view-users', auth, admincontroller.viewuser)

router.get('/view-flats', auth, admincontroller.viewflats)

module.exports = router