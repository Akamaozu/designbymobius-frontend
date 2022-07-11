require('dotenv').config()

const express = require('express')
const server = express()

const PORT = process.env.PORT ?? 3000

server.use(express.static('build'))

server.listen(PORT, ()=> {
  console.log(`action=server-listen port=${ PORT }`)
})
