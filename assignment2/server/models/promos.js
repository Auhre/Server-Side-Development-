const mongoose = require('mongoose')
const promoRouter = require('../routes/promoRouter')
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const promoSchema = new Schema(
{
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        require: true,
        min: 0
    },
    description: {
        type: String,
        require: true
    }
}, 
{
    timestamps: true
}
)

var Promos = mongoose.model('Promotion', promoSchema)

module.exports = Promos