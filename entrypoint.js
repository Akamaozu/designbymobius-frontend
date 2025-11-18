const path = require('path')
const supe = require('supe')
const { spawn } = require('node:child_process')
const utils = require('./utils')

utils.env.load()

const { ENV_NAME } = process.env
const server_type = ENV_NAME?.toLowerCase().trim() === 'production'
  ? 'production'
  : 'development'

console.log(`action=start-server type=${server_type}`)

if (server_type === 'production') {
  const supervisor = supe()
  supervisor.start( 'prod-server', path.join(__dirname, './server'))
}

else {
  const server = spawn('npm', ['run', 'start:dev'], {
    shell: true,
  })

  server.on('error', (error) => {
    console.log(error)
    throw error
  })

  server.stdout.on( 'data', (data) => {
    const output = data.toString().trim()
    console.log( `[dev-server] ${output}` )
  })

  server.stderr.on( 'data', (data) => {
    const error = data.toString().trim()
    console.log( `[dev-server][error] ${error}` )
  })
}
