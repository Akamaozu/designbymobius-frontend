const experienceTypes = [
  {
    slug: 'employment',
    label: 'Employment',
    description: 'Full-time Employment',
  },
  {
    slug: 'contract',
    label: 'Contract',
    description: 'Contract or Part-time Employment',
  },
  {
    slug: 'entrepreneur',
    label: 'Entrepreneur',
    description: 'Business Owner / Operator',
  },
  {
    slug: 'open-source',
    label: 'Open Source',
    description: 'Open Source Contributions',
  }
]

const experiences = [
  {
    slug: 'mizbeach',
    label: 'Mizbeach',
    start: '2010',
    end: '2014',
    type: 'contract',
    technologies: [
      'react',
      'wordpress',
    ],
  },
  {
    slug: 'yknightlights',
    label: 'YKNightlights',
    start: '2011',
    end: '2011',
    type: 'contract',
    technologies: [
      'wordpress',
    ],
    notes: [
      'Was commissioned to build a unique theme for a lifestyle blog. We focused on building little details that created a delightful experience for the readers.',
      'When your mouse hovered on a preview card, other page elements dimmed to create more emphasis.',
      'Keyboard arrow keys were augmented to scroll through the post preview cards.',
      'Up and down arrow keys on the keyboard were context-aware, automatically scrolling to sections unless it was in the article body, in which case it behaved normally.',
    ],
  },
  {
    slug: 'marine-magnetics',
    label: 'Marine Magnetics',
    start: '2012',
    end: '2012',
    type: 'contract',
    technologies: [
      'wordpress',
    ],
    nutshell: 'Marine Magnetics website hacked, had no backups. Hypenotic called me in to restore it.',
    notes: [
      'The theme files were corrupted beyond recovery and there were no backups. I had to rebuild the site using a previous view from the Wayback Machine.',
      'I analyzed the WordPress installation, found the source of the malware and removed it.',
      'After recovery I noticed there were bugs in the site\'s JavaScript so I cleaned those up as well.',
    ],
  },
  {
    slug: 'metabox-maker',
    label: 'metabox-maker',
    start: '2012',
    end: '2014',
    type: 'open-source',
    technologies: [
      'wordpress',
    ],
  },
  {
    slug: 'tour-d-afrique',
    label: 'Tour D\'Afrique',
    start: '2013',
    end: '2013',
    type: 'contract',
    technologies: [
      'wordpress',
    ],
    notes: [
      'Catalyst Workshop was making huge upgrades to a client\'s site and I was responsible for bringing many of the designs to life. My primary responsibility was implementing the design and behavior of Tour Overview section.',
      'My favorite part of was the strategies employed to keep the Tour Section page behavior very fast. The redesign was beautiful, but the experience would have been subpar if the section was sluggish.',
      'Each tour overview and sections are independent pages with unique URLs, but loaded subsequent sections dynamically.',
      'Map embeds for each tour section are loaded dynamically to avoid unnecessary downloads of heavy assets. Embeds were also cached to prevent more data and time waste for visiting a section multiple times.',
    ],
  },
  {
    slug: 'cyclusbreak',
    label: 'CyclusBreak',
    start: '2015',
    end: '2015',
    type: 'contract',
    notes: [
      'CyclusBreak is a Student-Counsellor Relationship Manager built by Blueport Software. It connects university students with their counsellors, making it easier for students to get the help needed for optimal academic and social success.',
      'I automated report generation of CyclusBreak\'s business objectives. The reports were exported as Excel documents and emailed to appropriate stakeholders on a schedule.',
      'I also implemented the app\'s invitation system, notifications (in-app and via email) and some admin config interfaces.',
    ],
    technologies: [
      'meteor',
    ],
  },
  {
    slug: 'receipt-printer',
    label: 'Receipt Printer Software',
    start: '2016',
    end: '2016',
    type: 'contract',
    nutshell: 'Built a configurable Point of Sale (POS) application for 18Techs',
    notes: [
      'It enabled them to trivially update the receipt design, the POS interface or reconfigure which printer the receipt was sent to without ever being on-site.',
    ],
    technologies: [
      'electron',
    ],
  },
  {
    slug: 'node-supe',
    label: 'node-supe',
    start: '2016',
    end: '2019',
    type: 'open-source',
    technologies: [
      'nodejs',
    ],
    nutshell: 'Erlang-inspired Process Supervision for Node.js',
  },
  {
    slug: 'hubbli',
    label: 'Hubbli',
    start: '2016',
    end: '2018',
    type: 'employment',
    notes: [
      'item one',
      'item two',
    ],
    technologies: [
      'nodejs',
      'rabbitmq',
      'redis',
      'wordpress',
    ],
  },
  {
    slug: 'fman-sublimehelper',
    label: 'fman-sublimehelper',
    start: '2018',
    end: '2018',
    type: 'open-source',
    technologies: [
      'python',
    ],
  },
  {
    slug: 'spotgetter',
    label: 'Spotgetter',
    start: '2018',
    end: '2020',
    type: 'entrepreneur',
    notes: [
      'Spotgetter is process automation software for USMLE Step 2 CS medical exams.',
      'Instead of manually refreshing webpages looking for an availability that meets their requirements, Spotgetter automated the process of searching and getting a spot.',
    ],
    technologies: [
      'puppeteer',
      'rabbitmq',
      'redis',
    ],
  },
  {
    slug: 'jackrabbit',
    label: 'jackrabbit',
    start: '2019',
    end: '2019',
    type: 'open-source',
    technologies: [
      'nodejs',
      'rabbitmq',
    ],
  },
  {
    slug: 'robots-and-pencils',
    label: 'Robots and Pencils',
    start: '2021',
    end: '2022',
    type: 'employment',
    nutshell: 'Client apps, servers and third-party integrations for Banking, Education and Medical projects',
    notes: [
      'item one',
      'item two',
    ],
    technologies: [
      'nodejs',
      'postgres',
      'react',
      'typescript',
    ],
  },
]

const api = {
  types: experienceTypes,
  items: experiences,
}

export default api
