const express = require('express')
const helmet = require('helmet')
require('dotenv').config()

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

const server = express()

const logger = (req, res, next) => {
    console.log(`${req.method} Requests to ${req.originalUrl}`)
    next()
}

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', logger, userRouter)
server.use('/api/posts', postRouter)

server.get('/', logger, (req, res) => {
    const newThing = ({ thing: 'Cool', yep: 'yes'})
    res.status(200).json(newThing)
})

port = process.env.PORT || 5000
server.listen(port, () => {
    console.log(`\n* ${Date(Date.now).toString()}Server listening on https://localhost:${port} *\n`)
})