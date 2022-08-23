const express = require('express')
const bodyParser = require('body-parser')
const Leaders = require('../models/leaders')

const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.get((req, res, next) => {
    
    Leaders.find({})
    .then((leader) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))

})
.post((req, res, next) => {
    
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader created ', leader)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.put((req, res, next) => {

    res.statusCode = 403
    res.end('PUT operation not suppported on /leaders')

})
.delete((req, res, next) => {
    
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    
})


leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        console.log('Leader: ', leader)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.post((req, res, next) => {
    
    res.end('POST operation not supported in /leaders/' + req.params.leaderId)

})
.put((req, res, next) => {
    
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        console.log('Leader updated ', leader)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => {
        console.log(err)
    })

})
.delete((req, res, next) => {
    
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200 
        res.setHeader('Content-type', 'application/json')
        res.json(resp)
    }, (err) => {console.log(err)})
    .catch((err) => {
        console.log(err)
    })

})

module.exports = leaderRouter