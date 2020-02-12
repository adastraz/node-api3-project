const express = require('express')
const helmet = require('helmet')

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

const server = express()

const logger = (req, res, next) => {
    console.log(`${req.method} Requests to ${req.originalUrl}`)
    next()
}

server.use(express.json())
server.use(helmet())

server.use('/api/users', logger, userRouter)
server.use('/api/posts', postRouter)

server.get('/', logger, (req, res) => {
    res.send(`
        <h1>Welcome to Tyler's messy API for Lambda</h1>
        <h1> Lets see if we can get this to work</h1>
    `)
})

port = 5000
server.listen(port, () => {
    console.log(`\n* Server listening on https://localhost:${port} *\n`)
})

module.exports = server