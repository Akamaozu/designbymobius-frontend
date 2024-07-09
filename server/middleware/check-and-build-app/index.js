const utils = require('../../../utils')

module.exports = process_request

process_request.async_check_and_maybe_build_app = async_check_and_maybe_build_app

function process_request( request, response, next ) {
  const {
    built: app_built,
    building: building_app,
    checking_for_build: checking_for_app_build,
  } = request.app.locals.app_build

  if (!app_built && !building_app && !checking_for_app_build) {
    async_check_and_maybe_build_app({ server: request.app })
  }

  next()
}

async function async_check_and_maybe_build_app({ server }) {
  const {
    built: app_built,
    building: building_app,
    checking_for_build: checking_for_app_build,    
  } = server?.locals?.app_build ?? {}

  if (app_built) throw new Error( 'app already built' )
  if (building_app) throw new Error( 'app is currently being built' )
  if (checking_for_app_build) throw new Error( 'app build check is already in progress' )

  try {
    server.locals.app_build.checking_for_build = true

    const was_app_built = await utils.app.async_is_built()
    server.locals.app_build.built = was_app_built
    server.locals.app_build.checking_for_build = false

    if (!was_app_built) {
      server.locals.app_build.building = true

      await utils.app.async_build()

      server.locals.app_build.built = true
      server.locals.app_build.building = false
    }
  }

  catch (error) {
    if (checking_for_app_build) server.locals.app_build.checking_for_build = false
    if (building_app) server.locals.app_build.building = false
  }
}
