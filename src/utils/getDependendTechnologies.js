const getDependentTechnologies = (technologies = [], technologyMap = {}) => {
  if (!Array.isArray(technologies)) throw new Error('unexpected data-type for "technologies". expected array, got '+ typeof technologies)
  if (!Object.prototype.toString.call(technologyMap) === '[object Object]') throw new Error('unexpected data-type for "technologyMap". expected object, got '+ typeof technologyMap)

  const dependentTechnologies = []
  const queue = [...technologies]

  while (queue.length > 0) {
    const technologySlug = queue.shift()
    dependentTechnologies.push(technologySlug)

    const technology = technologyMap[technologySlug]
    if (technology.dependencies) technology.dependencies.forEach(dependencySlug => {
      if (!queue.includes(dependencySlug) && !dependentTechnologies.includes(dependencySlug)) queue.push(dependencySlug)
    })
  }

  return dependentTechnologies
}

export default getDependentTechnologies
