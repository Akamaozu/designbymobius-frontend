require('dotenv').config()
console.log(`action=load-env-vars count=${(Object.keys(process.env)).length}`)

const express = require('express')
const fs = require('fs')

const start = async () => {
  const server = express()
  const PORT = process.env.PORT ?? 3000
  const html = fs.readFileSync('./build/index.html', { encoding: 'utf8' })

  server.use(express.static('build'))
  console.log(`action=map-build-dir-to-routes`)

  server.get('/*', (req, res) => {
    res.setHeader('content-type', 'text/html')
    res.send(html)
  })
  console.log(`action=setup-catchall-route payload=app-html`)

  server.listen(PORT, ()=> {
    console.log(`action=server-listen port=${ PORT }`)
  })
}

start()
