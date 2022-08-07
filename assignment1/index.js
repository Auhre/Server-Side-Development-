const express = require('express')
const bodyParser = require('body-parser')
const promoRouter = require('./route/PromoRouter')
const leaderRouter = require('./route/LeaderRouter')


const port = 7553
const host = 'localhost'

const app = express()
app.use(bodyParser.json())


app.use('/promotions', promoRouter)
app.use('/leader', leaderRouter)


app.listen(port, () => {
    console.log(`Server running at http://${host}:${port} `) })