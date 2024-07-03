const mime = require('mime-types')
const md5 = require('md5')
const utils = require('./utils')

const check_and_build_app = require('./server/middleware/check-and-build-app')
const load_resume_datasets = require('./server/middleware/load-resume-datasets')
const serve_if_fs_path = require('./server/middleware/serve-if-fs-path')

const serve_app_or_prebuild = require('./server/routes/serve-app-or-prebuild')
const serve_resume_in_multiple_formats = require('./server/routes/serve-resume-in-multiple-formats')

utils.env.load()
start_server()

function start_server() {
  const server = utils.server.create()
  const port = process.env.PORT ?? 3000

  // configure server's internal store
  server.locals.port = port
  server.locals.cache = {}
  server.locals.inflight_actions = {}
  server.locals.app_build = {
    building: false,
    checking_for_build: false,
  }

  // handle requests when app build hasn't started / isn't done
  server.use( check_and_build_app )
  console.log( 'action=setup-middleware behavior=check-and-build-app' )

  server.get( '/*', serve_if_fs_path )
  console.log( 'action=setup-route-handler path=ALL method=GET behavior=serve-if-fs-path' )

  server.get( '/resume', [
    load_resume_datasets,
    serve_resume_in_multiple_formats,
  ])
  console.log( 'action=setup-route-handler path="/resume" method=GET behavior=serve-resume-in-multiple-formats' )

  server.get( '/*', serve_app_or_prebuild )
  console.log( 'action=setup-route-handler path=ALL method=GET behavior=serve-app-build-or-prebuild' )

  server.listen( port, ()=> {
    console.log( `action=server-listen port=${ port }` )

    check_and_build_app.async_check_and_maybe_build_app({ server })
  })
}
