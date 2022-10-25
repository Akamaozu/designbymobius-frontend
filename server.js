const child_process = require('child_process')
const puppeteer = require('puppeteer')
const express = require('express')
const mime = require('mime-types')
const dotenv = require('dotenv')
const md5 = require('md5')
const fs = require('fs')

let server,
    port,
    build_exists,
    data = {},
    cache = {},
    inflight = {},
    is_generating_pdfs,
    generate_pdf_requests = []

load_env_vars()
load_data()
start_server()

function load_env_vars() {
  dotenv.config()

  const env_keys = Object.keys(process.env)
  console.log(`action=load-env-vars count=${env_keys.length} keys="${env_keys.join(', ')}"`)
}

function load_data() {
  data.experiences = {
    types: require('./src/data/experience-types.json')
  }

  data.technologies = {
    items: require('./src/data/technologies.json'),
    types: require('./src/data/technology-types.json')
  }
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

    const { download, ...printArgs } = req.query

    generate_pdf( printArgs, (error, pdf) => {
      if (error) res.sendStatus(500)
      else {
        res.setHeader('content-disposition', 'attachment; filename="uzo-olisemeka-resume.pdf"')
        res.setHeader('content-type', 'application/pdf')
        res.send(pdf)
      }
    })
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

function generate_pdf(config = {}, callback) {
  if (!config.notes) config.notes = 'open'

  const sorted_config_keys = Object.keys(config).map(key => key.toLowerCase()).sort()
  const sorted_config = sorted_config_keys.reduce((sorted, key) => {
    sorted[key] = config[key]

    switch (key) {
      case 'technologies':
      case 'types':
        sorted[key] = config[key].split(',').sort()
      break
    }

    return sorted
  }, {})

  // remove invalid options
  const valid_options = [ 'technologies', 'types', 'notes' ]
  const valid_technologies_options = data.technologies?.items?.map(tech => tech.slug) ?? []
  const valid_types_options = data.experiences?.types?.map(type => type.slug) ?? []

  const sorted_valid_config = valid_options.reduce((sorted_valid, key) => {
    if (sorted_config[key]) {
      switch(key) {
        case 'technologies':
          sorted_valid[key] = sorted_config[key].filter(technology => valid_technologies_options.includes(technology)).sort()
        break

        case 'types':
          sorted_valid[key] = sorted_config[key].filter(type => valid_types_options.includes(type)).sort()
        break

        case 'notes':
          sorted_valid[key] = sorted_config[key]
        break
      }
    }

    return sorted_valid
  }, {})

  const sorted_valid_config_md5 = md5(JSON.stringify(sorted_valid_config))
  const inflight_key = 'generate-pdf-'+ sorted_valid_config_md5

  if (cache[inflight_key]) return callback(null, cache[inflight_key])

  if (inflight[inflight_key]) {
    const wait_for_pdf_to_generate = async () => {
      await inflight[inflight_key]
      callback(null, cache[inflight_key])
    }

    return wait_for_pdf_to_generate()
  }

  generate_pdf_requests.push({
    key: inflight_key,
    config: sorted_valid_config,
    callback,
  })

  const generate_pdf_with_puppeteer = async () => {
    if (is_generating_pdfs) return

    is_generating_pdfs = true
    const scriptStartTime = Date.now()

    let opStartTime = Date.now()
    const browser = await puppeteer.launch();
    console.log(`action=launch-puppeteer success=true duration=${ Date.now() - opStartTime }ms`)

    const page = await browser.newPage();

    for (let i = 0; i < generate_pdf_requests.length; i += 1) {
      const sorted_valid_config = generate_pdf_requests[i].config
      const sorted_valid_config_querystring = Object.keys(sorted_valid_config)
        .map((config_key) => {
          switch(config_key) {
            case 'technologies':
            case 'types':
              return `${encodeURIComponent(config_key)}=${encodeURIComponent(sorted_valid_config[config_key].join(','))}`
            break

            case 'notes':
              return `notes=${sorted_valid_config[config_key]}`
            break
          }
        })
        .join("&")

      await page.goto(
        `http://localhost:${port}/resume${ sorted_valid_config_querystring.length > 0 ? '?'+ sorted_valid_config_querystring : '' }`,
        { waitUntil: 'load', }
      );

      console.log(`action=load-resume-page success=true duration=${ Date.now() - opStartTime }ms md5=${ sorted_valid_config_md5 } querystring="${ sorted_valid_config_querystring }"`)

      opStartTime = Date.now()
      await page.waitForSelector('.Experiences > .Experience')
      console.log(`action=wait-for-experiences-to-render success=true duration=${ Date.now() - opStartTime }ms`)

      opStartTime = Date.now()
      await page.pdf({
        path: 'uzo-olisemeka-resume.pdf',
        printBackground: true,
        format: 'a4',
        margin: {
          top: '1.75cm',
          bottom: '1.75cm',
          left: '.75cm',
          right: '.75cm',
        }
      });
      console.log(`action=convert-resume-to-pdf success=true duration=${ Date.now() - opStartTime }ms`)
      const pdf = await get_file('./uzo-olisemeka-resume.pdf', { encoding: null })

      cache[inflight_key] = pdf
      delete inflight[inflight_key]

      generate_pdf_requests[i].callback(null, pdf)
    }

    console.log('action=shutdown-puppeteer')
    await browser.close();

    generate_pdf_requests = []
    is_generating_pdfs = false
  }

  generate_pdf_with_puppeteer()
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
