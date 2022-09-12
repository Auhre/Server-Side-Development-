const express = require('express')
const bodyParser = require('body-parser')
const Promos = require('../models/promos')
const authenticate = require('../authenticate')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    
    if (authenticate.verifyAdmin === true){
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err))
    }
    else {
        res.statusCode = 403;
        res.end('Not authorized unless is admin');
    }
})
.post(authenticate.verifyUser, (req, res, next) => {
    
    Promos.create(req.body)
    .then((promo) => {
        console.log('Promo created ', promo)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.put(authenticate.verifyUser, (req, res, next) => {
    
    res.statusCode = 403
    res.end('PUT operation not suppported on /promos')

})
.delete(authenticate.verifyUser, (req, res, next) => {
    
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
.post(authenticate.verifyUser, (req, res, next) => {

    res.end('POST operation not supported in /promotions/' + req.params.promoId)

})
.put(authenticate.verifyUser, (req, res, next) => {
    
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
.delete(authenticate.verifyUser, (req, res, next) => {
    
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
