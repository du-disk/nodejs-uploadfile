/**
 * Main file of application
 * @author Dudi Iskandar
 * June 29, 2021
 */

const path = require('path')
const env = require('dotenv')
const express = require('express')
const parser = require('body-parser')

env.config()

const app = express()
app.use(parser.json())
app.disable('x-powered-by')
app.use(parser.urlencoded({ extended: true }))

// Constant
const PORT = process.env.PORT || 3000

// Import controller
const uploadrouter = require('./router')

// Router
app.use('/', uploadrouter)
app.use('/ping', (req, res) => {
    res.send({
        error_code: 0,
        message: "PONG!!!"
    })
})
app.use('/public/upload/', express.static(path.resolve('./public/upload')))
app.use('/public/uploaded/', express.static(path.resolve('./public/uploaded')))

app.listen(PORT || 4000, function () {
    console.log('Server running on port:', PORT, 'at', new Date())
})