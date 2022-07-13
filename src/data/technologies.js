const technologyTypes = [
  {
    slug: 'database',
    label: 'Database',
  },
  {
    slug: 'framework',
    label: 'Framework or Runtime',
  },
  {
    slug: 'language',
    label: 'Programming Language',
  },
  {
    slug: 'message-queue',
    label: 'Message Queue',
  }
]

const technologies = [
  {
    slug: 'electron',
    label: 'Electron',
    type: 'framework',
    dependencies: [
      'nodejs',
    ],
  },
  {
    slug: 'javascript',
    label: 'JavaScript',
    type: 'language',
  },
  {
    slug: 'meteor',
    label: 'Meteor.js',
    type: 'framework',
    dependencies: [
      'mongodb',
      'nodejs',
    ],
  },
  {
    slug: 'mongodb',
    label: 'MongoDB',
    type: 'database',
  },
  {
    slug: 'mysql',
    label: 'MySQL',
    type: 'database',
  },
  {
    slug: 'nodejs',
    label: 'Node.js',
    type: 'framework',
    dependencies: [
      'javascript',
    ],
  },
  {
    slug: 'php',
    label: 'PHP',
    type: 'language',
  },
  {
    slug: 'postgres',
    label: 'PostgreSQL',
    type: 'database',
  },
  {
    slug: 'puppeteer',
    label: 'Puppeteer',
    type: 'framework',
    dependencies: [
      'nodejs',
    ],
  },
  {
    slug: 'python',
    label: 'Python',
    type: 'language',
  },
  {
    slug: 'rabbitmq',
    label: 'RabbitMQ',
    type: 'message-queue',
  },
  {
    slug: 'react',
    label: 'React',
    type: 'framework',
    dependencies: [
      'javascript',
    ],
  },
  {
    slug: 'redis',
    label: 'Redis',
    type: 'database',
  },
  {
    slug: 'typescript',
    label: 'TypeScript',
    type: 'language',
    dependencies: [
      'javascript',
    ],
  },
  {
    slug: 'wordpress',
    label: 'WordPress',
    type: 'framework',
    dependencies: [
      'javascript',
      'mysql',
      'php'
    ],
  }
]

const api = {
  types: technologyTypes,
  items: technologies,
}

export default api

