const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BeerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: [0, 'Sorry, nothing below 0'],
        max: [10, 'Nothing above 10!!'],
        required: true
    }
})

module.exports = mongoose.model('Beer', BeerSchema)