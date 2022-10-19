const child_process = require('child_process')
const express = require('express')
const mime = require('mime-types')
const dotenv = require('dotenv')
const fs = require('fs')

let server,
    port,
    build_exists,
    cache = {},
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

  server.get(
    [
      '/favicon.ico',
      '/logo192.png',
      '/profile-pic.jpg',
    ],
    (req, res) => {
      const filename = req.path.slice(1)
      const cache_key = filename.replace('.', '-')
      if (cache[cache_key]) {
        res.set('Content-Type', mime.lookup(filename))
        return res.send(cache[cache_key])
      }

      if (!inflight[cache_key]) inflight[cache_key] = get_file('./public' + req.path, { encoding: null })

      const get_and_send_file = async () => {
        cache[cache_key] = await inflight[cache_key]
        delete inflight[cache_key]

        res.set('Content-Type', mime.lookup(filename))
        res.send(cache[cache_key])
      }

      get_and_send_file()
    }
  )

  server.use(express.static('build'))
  console.log(`action=map-build-dir-to-server-routes`)

  // handle requests when app build hasn't started / isn't done
  server.use((req, res, next) => {
    if (cache.app_html) return next()
    else {
      const build_app_and_load_html = async () => {
        if (typeof build_exists === 'undefined') {
          console.log('action=verify-app-build-exists')
          inflight.build_exists = file_exists('./build/index.html')
          build_exists = await inflight.build_exists
          delete inflight.build_exists
        }

        if (!build_exists) {
          if (!inflight.build_app) {
            console.log('action=build-app')
            inflight.build_app = build_app()
          }

          await inflight.build_app
          delete inflight.build_app
          build_exists = true
        }

        if (!inflight.get_app_html) inflight.get_app_html = get_file('./build/index.html')

        cache.app_html = await inflight.get_app_html
        delete inflight.get_app_html
      }

      build_app_and_load_html()
    }

    if (cache.reload_html) return res.send(cache.reload_html)
    else {
      const get_and_send_reload_html = async () => {
        if (!inflight.get_reload_html) inflight.get_reload_html = get_file('./public/reload.html')

        cache.reload_html = await inflight.get_reload_html
        delete inflight.get_reload_html

        res.send(cache.reload_html)
      }

      get_and_send_reload_html()
    }
  })

  server.get('/resume', (req, res, next) => {
    if (req.query.download !== 'true') return next()

    res.send(JSON.stringify(req.query, null, 2))
  })

  server.get('/*', (req, res) => {
    res.setHeader('content-type', 'text/html')
    res.send(cache.app_html)
  })
  console.log('action=setup-catchall-route payload=app-html')

  server.listen(port, ()=> {
    console.log(`action=server-listen port=${ port }`)
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

async function file_exists(path_to_file) {
  return new Promise( (resolve, reject) => {
    fs.access(path_to_file, error => {
      if (error) resolve(false)
      else resolve(true)
    })
  })
}

async function get_file(path_to_file, config = {}) {
  const default_get_file_config = { encoding: 'utf8' }

  return new Promise( (resolve, reject) => {
    const fs_config = { ...default_get_file_config, ...config }

    console.log( 'action=get-file-from-disk path="'+ path_to_file +'"' )
    fs.readFile( path_to_file, fs_config, (error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
