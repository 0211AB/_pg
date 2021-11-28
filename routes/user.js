const express = require('express')
const router = new express.Router()
const usercontroller = require('../controllers/user')
const auth = require('../middleware/userauth')


router.get('/', usercontroller.home)

router.get('/account', auth, usercontroller.getaccount)

router.post('/account', auth, usercontroller.postaccount)

router.post('/pgdetails', usercontroller.postpgdetails)

router.get('/pgs', usercontroller.pgs)

router.get('/pgdetails', usercontroller.getpgdetails)

router.get('/flats', usercontroller.flats)

router.get('/login', usercontroller.login)

router.get('/amenities', usercontroller.amenities)

router.get('/comingsoon', usercontroller.comingsoon)

router.post('/login', usercontroller.postlogin)

router.post('/signup', usercontroller.signup)

router.post('/pgsort', usercontroller.pgsort)

router.post('/flatdetails', usercontroller.flatdetails)

module.exports = router