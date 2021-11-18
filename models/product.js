const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    nameofpg: {
        type: String,
        required: true,
    },
    idofpg: {
        type: String,
        required: true,
    },
    nameofowner: {
        type: String,
        required: true,
    },
    contactofowner: {
        type: String,
        required: true,
    },
    nameofwarden: {
        type: String,
    },
    contactofwarden: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    distancefromjusl: { type: String },
    distancefromiem: { type: String },
    distancefromtechno: { type: String },
    soac: { type: String },
    socost: { type: String },
    doac: { type: String },
    docost: { type: String },
    toac: { type: String },
    tocost: { type: String },
    foac: { type: String },
    focost: { type: String },
    foodbullet1: { type: String },
    foodbullet2: { type: String },
    foodbullet3: { type: String },
    foodincluded: { type: Boolean },
    compulsory: { type: Boolean },
    Laundry: { type: Boolean },
    washroom: { type: Boolean },
    wifi: { type: Boolean },
    geyser: { type: Boolean },
    speed: { type: String },
    kitchen: { type: String },
    securitydeposit: { type: String },
    refundpolicy: { type: String },
    intime: { type: String },
    housekeeping: { type: String },
    drinkingwater: { type: String },
    furniture: { type: String }
})

module.exports = mongoose.model('Product', productSchema);