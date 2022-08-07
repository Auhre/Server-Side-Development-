const express = require('express')
const bodyParser = require('body-parser')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain')
    next()
})
.get((req, res, next) => {
    res.end('Will send all the promotions')
})
.post((req, res, next) => {
    res.end('Will add the ' +  req.body.promoName + ' with a description of ' + req.body.promoDescription)
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not suppported on /promotions')
})
.delete((req, res, next) => {
    res.end('Deleting all promotions')
})


promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('Will send the promo with id of ' + req.params.promoId + ' in a moment')
})
.post((req, res, next) => {
    res.end('POST operation not supported in /promotions/' + req.params.promoId)
})
.put((req, res, next) => {
    res.write('Updating promotion with Id number of ' + req.params.promoId + '\n')
    res.end('Will update the promo with id of ' + req.params.promoId + ' with a name of '
        + req.body.promoName + ' and with description of ' + req.body.promoDescription)
})
.delete((req, res, next) => {
    res.end('Deleting promotion with Id of ' + req.params.promoId)
})

module.exports = promoRouter