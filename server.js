require('dotenv').config()

const express = require('express')
const fs = require('fs')

const server = express()
const PORT = process.env.PORT ?? 3000
const html = fs.readFileSync('./build/index.html', { encoding: 'utf8' })

server.use(express.static('build'))

server.get('/*', (req, res) => {
  res.setHeader('content-type', 'text/html')
  res.send(html)
})

server.listen(PORT, ()=> {
  console.log(`action=server-listen port=${ PORT }`)
})
