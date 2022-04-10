const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const path = require('path')

const port = process.env.PORT || 3000

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

const messages = []

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

io.on('connection', socket => {
  socket.emit('message:render-olds', messages)

  let username = ''
  socket.on('user:enter', (_username) => {
    username = _username
    console.log(`New user: ${username}`)
  })

  socket.on('message:send', (message) => {
    const messageData = {
      username,
      message
    }

    messages.push(messageData)

    socket.broadcast.emit('message:new', messageData)
  })
})

httpServer.listen(port, () => {
  console.log(`App listen port http://localhost:${port}`)
})
