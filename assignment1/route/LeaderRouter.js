const express = require('express')
const bodyParser = require('body-parser')

const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain')
    next()
})
.get((req, res, next) => {
    res.end('Will send all the leader roles')
})
.post((req, res, next) => {
    res.end('Will add the ' +  req.body.leaderName + ' with a description of ' + req.body.leaderDescription)
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not suppported on /leaders')
})
.delete((req, res, next) => {
    res.end('Deleting all leader roles')
})


leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end('Will send the leader role with id of ' + req.params.leaderId + ' in a moment')
})
.post((req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported in /leaders/' + req.params.leaderId)
})
.put((req, res, next) => {
    res.write('Updating promotion with Id number of ' + req.params.leaderId + '\n')
    res.end('Will update the promo with id of ' + req.params.leaderId + ' with a name of '
        + req.body.leaderName + ' and with description of ' + req.body.leaderDescription)
})
.delete((req, res, next) => {
    res.end('Deleting promotion with Id of ' + req.params.leaderId)
})

module.exports = leaderRouter
