const express = require('express')
const router = new express.Router()

const Product = require('../models/product')


router.get('/', (req, res) => {
    res.render('user/homepage', { msg: "" })
})

module.exports = router