const mongoose = require('mongoose')

const flatSchema = new mongoose.Schema({
    idofflat: {
        type: String,
        required: true
    },
    Cost: {
        type: String,
        required: true
    },
    floor: {
        type: String
    },
    bhk: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    distancefromjusl: { type: String },
    distancefromiem: { type: String },
    distancefromtechno: { type: String }
})

module.exports = mongoose.model('Flat', flatSchema)