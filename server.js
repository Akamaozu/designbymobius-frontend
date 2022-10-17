const child_process = require('child_process')
const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')

let server,
    port,
    build_dir_exists,
    app_html,
    reload_html,
    inflight = {}

load_env_vars()
start_server()

function load_env_vars() {
  dotenv.config()

  const env_keys = Object.keys(process.env)
  console.log(`action=load-env-vars count=${env_keys.length} keys="${env_keys.join(', ')}"`)
}

function start_server() {
  server = express()
  port = process.env.PORT ?? 3000

  server.use(express.static('build'))
  console.log(`action=map-build-dir-to-server-routes`)

  server.use((req, res, next) => {
    if (app_html) return next()
    else {
      const build_app_and_load_html = async () => {
        if (typeof build_dir_exists === 'undefined') {
          console.log('action=verify-app-build-exists')
          inflight.build_dir_exists = app_build_exists()
          build_dir_exists = await inflight.build_dir_exists
          delete inflight.build_dir_exists
        }

        if (!build_dir_exists) {
          if (!inflight.build_app) {
            console.log('action=build-app')
            inflight.build_app = build_app()
          }

          await inflight.build_app
          delete inflight.build_app
          build_dir_exists = true
        }

        if (!inflight.get_app_html) {
          console.log('action=get-app-html')
          inflight.get_app_html = get_app_html()
        }

        app_html = await inflight.get_app_html
        delete inflight.get_app_html
      }

      build_app_and_load_html()
    }

    if (reload_html) return res.send(reload_html)
    else {
      const load_and_send_reload_html = async () => {
        if (!inflight.get_reload_html) {
          console.log('action=get-reload-html')
          inflight.get_reload_html = get_reload_html()
        }

        reload_html = await inflight.get_reload_html
        delete inflight.get_reload_html

        res.send(reload_html)
      }

      load_and_send_reload_html()
    }
  })

  server.get('/*', (req, res) => {
    res.setHeader('content-type', 'text/html')
    res.send(app_html)
  })
  console.log(`action=setup-catchall-route payload=app-html`)

  server.listen(port, ()=> {
    console.log(`action=server-listen port=${ port }`)
  })
}

async function app_build_exists() {
  return new Promise( (resolve, reject) => {
    fs.access('./build/index.html', error => {
      if (error) resolve(false)
      else resolve(true)
    })
  })
}

async function build_app() {
  return new Promise( (resolve, reject) => {
    child_process.exec('npm run build', error => {
      if (error) reject(error)
      else resolve(true)
    })
  })
}

async function get_app_html() {
  return new Promise( (resolve, reject) => {
    fs.readFile('./build/index.html', { encoding: 'utf8' }, (error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })
}

async function get_reload_html() {
  return new Promise( (resolve, reject) => {
    fs.readFile('./public/reload.html', { encoding: 'utf8' }, (error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
