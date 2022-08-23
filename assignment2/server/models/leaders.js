const mongoose = require('mongoose')
const leaderRouter = require('../routes/leaderRouter')
const Schema = mongoose.Schema

const leaderSchema  = new Schema({
    name : {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: String,
        require: true
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

var Leaders = mongoose.model('Leader', leaderSchema)
module.exports = Leaders