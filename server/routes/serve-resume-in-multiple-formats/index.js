const puppeteer = require('puppeteer')
const shelljs = require('shelljs')
const path = require('path')
const md5 = require('md5')
const fs = require('fs')

const utils = require('../../../utils')

const PATH_TO_SERVER_ROOT = path.join( __dirname, '../../' )

const GHOSTSCRIPT_DEFAULT_PLATFORM_EXEC_NAME = 'gs'
const GHOSTSCRIPT_PLATFORM_EXEC_NAMES = {
  win32: [
    'gswin64c',
    'gswin32c',
  ],
}

const GHOSTSCRIPT_EXEC_NAME =
  [
    ...(
      process.platform === 'win32'
        ? GHOSTSCRIPT_PLATFORM_EXEC_NAMES.win32
        : []
    ),
    GHOSTSCRIPT_DEFAULT_PLATFORM_EXEC_NAME,
  ]
    .filter( exec_name_to_test => shelljs.which( exec_name_to_test ) )
    .shift()

if (!GHOSTSCRIPT_EXEC_NAME) console.log( `action=log-missing-optional-dependency dep=ghostscript platform=${ process.platform }` )

const GHOSTSCRIPT_COMPRESS_FLAGS = '-sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH'

let is_generating_pdfs
let generate_pdf_requests = []

module.exports = serve_resume_in_multiple_formats

function serve_resume_in_multiple_formats( req, res, next ) {
  // app not built? don't do anything
  if (!req.app.locals?.app_build?.built) return next()

  let requested_format

  if (req.query.download === 'true') requested_format = 'pdf'
  else requested_format = 'html'

  switch (requested_format) {
    case 'pdf':
      {
        const { download, ...pdf_generation_args } = req.query

        generate_pdf( pdf_generation_args, (error, pdf) => {
          if (error) {
            res.sendStatus(500)
            console.log( `action=generate-resume-pdf success=false args="${ JSON.stringify( pdf_generation_args ) }" error="${ error?.stack ?? error?.message ?? 'unspecified error' }"` )
          }

          else {
            res.setHeader('content-disposition', 'attachment; filename="uzo-olisemeka-software-engineer-resume.pdf"')
            res.setHeader('content-type', 'application/pdf')
            res.send(pdf)
          }
        })
      }
      break

    case 'html':
    default:
      {
        // let app handle requests for html format
        next()
      }
      break
  }

  function generate_pdf(config = {}, callback) {
    if (!req.app.locals?.resume_datasets) throw new Error( 'resume datasets not yet loaded' )
    if (!req.app.locals?.inflight_actions) throw new Error( 'inflight actions locals space not yet created' )
    if (!req.app.locals?.cache) throw new Error( 'server cache locals space not yet created' )

    const {
      inflight_actions: inflight,
      resume_datasets,
      cache,
      port,
    } = req.app.locals

    const {
      technologies,
      experience_types,
    } = resume_datasets

    if (!technologies) throw new Error( 'missing resume dataset "technologies"' )      
    if (!experience_types) throw new Error( 'missing resume dataset "experience_types"' )

    if (!config.notes) config.notes = 'open'
   
    const sorted_config_keys = Object.keys(config).map(key => key.toLowerCase())
    const sorted_config = sorted_config_keys.reduce((sorted, key) => {
      sorted[key] = config[key]

      switch (key) {
        case 'technologies':
        case 'types':
          sorted[key] = config[key].split(',')
        break
      }

      return sorted
    }, {})

    // remove invalid options
    const valid_options = [ 'technologies', 'types', 'notes' ]
    const valid_technologies_options = technologies.map(tech => tech.slug) ?? []
    const valid_types_options = experience_types.map(type => type.slug) ?? []

    const sorted_valid_config = valid_options.reduce((sorted_valid, key) => {
      if (sorted_config[key]) {
        switch(key) {
          case 'technologies':
            sorted_valid[key] = sorted_config[key].filter(technology => valid_technologies_options.includes(technology))
          break

          case 'types':
            sorted_valid[key] = sorted_config[key].filter(type => valid_types_options.includes(type))
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
      let browser
      const browser_launch_args = {
        headless: true,
        args: [ '--no-sandbox' ]
      }

      if (process.env.BROWSER_WS_ENDPOINT) {
        browser_launch_args.headless = browser_launch_args.headless === true
          ? 'true'
          : browser_launch_args.headless

        browser = await puppeteer.connect({ browserWSEndpoint: `${process.env.BROWSER_WS_ENDPOINT}&launch=${ JSON.stringify( browser_launch_args ) }` })
        console.log(`action=connect-to-puppeteer success=true duration=${ Date.now() - opStartTime }ms`)
      }
      else {
        browser = await puppeteer.launch( browser_launch_args )
        console.log(`action=launch-puppeteer success=true duration=${ Date.now() - opStartTime }ms`)
      }

      const page = await browser.newPage();

      for (let i = 0; i < generate_pdf_requests.length; i += 1) {
        const sorted_valid_config_inflight_key = generate_pdf_requests[i].key
        if (cache[sorted_valid_config_inflight_key]) return callback(null, cache[sorted_valid_config_inflight_key])
        if (inflight[sorted_valid_config_inflight_key]) {
          const wait_for_inflight = async () => {
            await inflight[sorted_valid_config_inflight_key]
            callback(null, inflight[sorted_valid_config_inflight_key])
          }

          return wait_for_inflight()
        }

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

        const localhost_domain = process.env.PRIVATE_URL ?? `localhost`
        const browser_port = process.env.PRIVATE_BROWSER_PORT ?? port
        const resume_app_domain = process.env.BROWSER_CONNECT_LOCALLY !== 'true'
          ? `${process.env.PUBLIC_URL_PROTOCOL ?? 'https://'}${process.env.REACT_APP_PUBLIC_URL}`
          : `http://${localhost_domain}:${browser_port}`

        await page.goto(
          `${resume_app_domain}/resume${ sorted_valid_config_querystring.length > 0 ? '?'+ sorted_valid_config_querystring : '' }`,
          { waitUntil: 'load', }
        );

        console.log(`action=load-resume-page success=true duration=${ Date.now() - opStartTime }ms md5=${ sorted_valid_config_md5 } querystring="${ sorted_valid_config_querystring }"`)

        opStartTime = Date.now()
        await page.waitForSelector('.Experiences > .Experience')
        console.log(`action=wait-for-experiences-to-render success=true duration=${ Date.now() - opStartTime }ms`)

        opStartTime = Date.now()
        const pdf = await page.pdf({
          printBackground: true,
          format: 'a4',
          margin: {
            top: '1.28cm',
            bottom: '1.28cm',
            left: '.64cm',
            right: '.64cm',
          }
        });
        console.log(`action=convert-resume-to-pdf success=true duration=${ Date.now() - opStartTime }ms`)

        let compressed_pdf
        if (GHOSTSCRIPT_EXEC_NAME && GHOSTSCRIPT_COMPRESS_FLAGS) {
          try {
            const path_to_uncompressed_pdf = path
              .join(
                PATH_TO_SERVER_ROOT,
                `./resume-${ sorted_valid_config_md5 }-uncompressed.pdf`
              )
            const path_to_compressed_pdf = path
              .join(
                  PATH_TO_SERVER_ROOT,
                  `./resume-${ sorted_valid_config_md5 }.pdf`
              )

            // save uncompressed pdf to disk
            await new Promise(( resolve, reject ) => {
              fs.writeFile( path_to_uncompressed_pdf, pdf, { encoding: null }, error => {
                if (error) reject(error)
                else resolve()
              })
            })

            // compress with ghostscript
            await new Promise(( resolve, reject ) => {
              shelljs.exec(
                `${ GHOSTSCRIPT_EXEC_NAME } ${ GHOSTSCRIPT_COMPRESS_FLAGS } -sOutputFile="${ path_to_compressed_pdf }" ${ path_to_uncompressed_pdf }`,
                { async: true },
                code => {
                  code === 0
                    ? resolve()
                    : reject( new Error( `ghostscript process exit code: ${ code }` ) )
                }
              )
            })

            // read compressed file into memory
            compressed_pdf = await utils.fs.async_get_file( path_to_compressed_pdf, { encoding: null })

            // cleanup files from disk
            fs.unlink( path_to_uncompressed_pdf, error => error && console.log( `action=log-cleanup-error file=uncompressed-resume-pdf path="${ path_to_uncompressed_pdf }"` ) )
            fs.unlink( path_to_compressed_pdf, error => error && console.log( `action=log-cleanup-error file=compressed-resume-pdf path="${ path_to_compressed_pdf }"` ) )
          }

          catch (compression_error) {
            console.log( `action=log-pdf-compression-error error="${ compression_error.stack ?? compression_error.message ?? 'unspecified error' }"` )
          }
        }

        cache[inflight_key] = compressed_pdf ?? pdf
        delete inflight[inflight_key]

        generate_pdf_requests[i].callback(null, cache[inflight_key])
      }

      console.log('action=shutdown-puppeteer')
      await browser.close();

      generate_pdf_requests = []
      is_generating_pdfs = false
    }

    generate_pdf_with_puppeteer()
  }
}