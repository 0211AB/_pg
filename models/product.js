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
    sototal: { type: String },
    soavailable: { type: String },
    socost: { type: String },
    dototal: { type: String },
    doavailable: { type: String },
    docost: { type: String },
    tototal: { type: String },
    toavailable: { type: String },
    tocost: { type: String },
    fototal: { type: String },
    foavailable: { type: String },
    focost: { type: String },
    fmsunday: { type: String },
    fmmonday: { type: String },
    fmtuesday: { type: String },
    fmwednesday: { type: String },
    fmthursday: { type: String },
    fmfriday: { type: String },
    fmsaturday: { type: String },
    fnsunday: { type: String },
    fnmonday: { type: String },
    fntuesday: { type: String },
    fnwednesday: { type: String },
    fnthursday: { type: String },
    fnfriday: { type: String },
    fnsaturday: { type: String },
    foodincluded: { type: Boolean },
    compulsory: { type: Boolean },
    Laundry: { type: Boolean },
    ElectricityBill: { type: Boolean },
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