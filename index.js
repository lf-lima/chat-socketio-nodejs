const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

io.on('connection', client => {
  console.log('Test connection')

  io.on('hello', (arg) => {
    console.log(arg)
  })
})

httpServer.listen(3333, () => {
  console.log('App listen port 3333')
})
