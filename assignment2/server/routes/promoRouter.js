const express = require('express')
const bodyParser = require('body-parser')
const Promos = require('../models/promos')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.get((req, res, next) => {
    
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    
    Promos.create(req.body)
    .then((promo) => {
        console.log('Dish created ', dish)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(promo)
        console.log('Yes')
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.put((req, res, next) => {
    
    res.statusCode = 403
    res.end('PUT operation not suppported on /dishes')

})
.delete((req, res, next) => {
    
    Promos.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(resp)
    }, (err) => next(err))


})


promoRouter.route('/:promoId')
.get((req, res, next) => {
    
    Promos.findById(req.params.promoId)
    .then((promo) => {
        console.log('Promo: ', promo)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.post((req, res, next) => {

    res.end('POST operation not supported in /promotions/' + req.params.promoId)

})
.put((req, res, next) => {
    
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        console.log('Promo updated ', promo)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.delete((req, res, next) => {
    
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200 
        res.setHeader('Content-type', 'application/json')
        res.json(resp)
    }, (err) => {console.log(err)})
    .catch((err) => {
        console.log(err)
    })

})

module.exports = promoRouter