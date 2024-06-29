const dotenv = require('dotenv')

module.exports = load_env

function load_env() {
	dotenv.config()

  const env_keys = Object.keys( process.env )
  console.log(`action=load-env-vars total=${ env_keys.length } keys="${ env_keys.join(', ') }"`)
}
