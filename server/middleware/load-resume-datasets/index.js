const experience_types = require('../../../src/data/experience-types.json')
const technologies = require('../../../src/data/technologies.json')

module.exports = load_resume_datasets

function load_resume_datasets( req, res, next ) {
  const {
    resume_datasets
  } = req.app.locals

  if (!resume_datasets) req.app.locals.resume_datasets = {}

  const {
    experience_types: loaded_experience_types,
    technologies: loaded_technologies,
  } = req.app.locals.resume_datasets

  if (!loaded_experience_types) req.app.locals.resume_datasets.experience_types = experience_types
  if (!loaded_technologies) req.app.locals.resume_datasets.technologies = technologies

  next()
}