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
  },
  {
    slug: 'volunteer',
    label: 'Volunteer',
    description: 'Non-code Contributions',
  }
]

const experiences = [
  {
    slug: 'mizbeach',
    label: 'Mizbeach',
    start: '2010',
    end: '2014',
    type: 'contract',
    nutshell: 'Mobile Phone Retailer - Product Gallery and Price Update apps',
    notes: [
      <>
        site: <a href="http://archives.mizbeach.com/v2/" target="_blank">Product Gallery</a>
      </>,
      'Designed and built a product gallery for customers to browse through mobile phones and their features instead of travelling to the store or calling to get the info.',
      'Created a product list webapp to easily manage a large inventory and rapidly-changing prices from a mobile phone.',
      <>
        Used React and <a href="https://web.dev/appcache-beginner/" target="_blank">appcache</a> to make a product update app work offline. Ask me about data-syncing or <a href="https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type" target="_blank">CRDTs (conflict-free replicated data types)</a> sometime!
      </>,
    ],
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
    nutshell: 'Built novel interfaces and controls for interactive Lifestyle Blog',
    notes: [
      <>
        site: <a href="http://yknightlights.designbymobi.us/" target="_blank">YKNightlights</a>
      </>,
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
    nutshell: 'Restored Marine Magnetics hacked website with no available backups and patched vulnerability',
    notes: [
      <>
        Referrer: <a href="https://hypenotic.com/" target="_blank">Hypenotic</a>
      </>,
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
    nutshell: 'Streamline creation of custom admin interface components in WordPress',
    notes: [
      'Leveraged hooks and enqueue system to make it easy to create a metabox (custom admin interface component) with a few lines of code.',
      <a href="https://github.com/Akamaozu/dxm-wp-metabox" target="_blank">View Repository</a>
    ],
  },
  {
    slug: 'ladies-learning-code',
    label: 'Ladies Learning Code',
    start: '2012',
    end: '2012',
    type: 'volunteer',
    nutshell: 'Supported small groups learning to setup WordPress locally for the first time',
    technologies: [
      'wordpress',
    ],
    notes: [
      <>
        site: <a href="https://www.canadalearningcode.ca/">Canada Learning Code</a> formerly <a href="https://en.wikipedia.org/wiki/Ladies_Learning_Code" target="_blank">Ladies Learn Code</a>)
      </>,
      'Guided students through setting up a WordPress development environment on their computer (Mac / Windows).',
      '',
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
    nutshell: 'Interactive Overview of cross-continent Bicycle Tours',
    notes: [
      <>
        Referrer: <a href="https://catalystworkshop.com" target="_blank">Catalyst Workshop</a>
      </>,
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
    nutshell: 'Student-Counsellor Relationship Manager - Invite System, Admin Interfaces and Reports',
    notes: [
      <>
        Referrer: <a href="http://blueportsoftware.com" target="_blank">Blueport Software</a>
      </>,
      'Student-Counsellor Relationship Managers connect university students with their counsellors, making it easier for students to get the help needed for optimal academic and social success.',
      'Automated report generation of CyclusBreak\'s business objectives. The reports were exported as Excel documents and emailed to appropriate stakeholders on a schedule.',
      'Implemented the app\'s invitation system, notifications (in-app and via email) and some admin config interfaces.',
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
    nutshell: 'Point of Sale desktop application with customizable Invoice Layout',
    notes: [
      <>
        Referrer: <a href="https://18techs.com" target="_blank">18Techs</a>
      </>,
      'With a few clicks in the POS interface, users can select which printer the receipt would be sent to.',
      'Proudest accomplishment was selecting printers and printing receipts without triggering Windows print prompt. Resulted in a much smoother user experience in the app.',
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
    nutshell: 'Erlang-inspired process supervision library for Node.js',
    notes: [
      '',
    ]
  },
  {
    slug: 'hubbli',
    label: 'Hubbli',
    start: '2016',
    end: '2018',
    type: 'employment',
    nutshell: 'School Communication Software - Messaging, Groups, Events and Billing',
    notes: [
      <>
        Site: <a href="https://hubbli.com" target="_blank">hubbli.com</a>
      </>,
      'Built system to enable schools accept debit and credit cards on invoices issued. Tuition was deposited in the school\'s bank account in 72 hours.',
      'Improved server reliability and performance by switching certain types of requests from on-demand to message queues and scheduled bulk processing.',
      'Created Slack integrations to notify support, engineers and management about lifecycle events and errors.',
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
    nutshell: 'Improved File Manager extension\'s usability',
    notes: [
      'Replaced hard-coded path to dependency with user-configurable path. Fails intelligently if path doesn\'t exist on disk.',
      <a href="https://github.com/oskretc/fman-sublimehelper/pull/1" target="_blank">View Pull Request</a>,
    ],
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
    nutshell: 'Automated exam availability search and registration for Medical Students',
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
    nutshell: 'Critical bug-fixes and improvements to Node.js drivers for RabbitMQ',
    notes: [
      <>
        Fixed race condition with emitted event in critical API call <code>queue.consume</code>
        <br />
        <a className="inline-block" href="https://github.com/pagerinc/jackrabbit/pull/40" target="_blank">View Pull Request</a>
      </>,
      <>
        Fixed race condition with hoisted variable in critical API call <code>queue.consume</code>
        <br />
        <a className="inline-block" href="https://github.com/pagerinc/jackrabbit/pull/88" target="_blank">View Pull Request</a>
      </>,
      <>
        Added option to opt out of creating a reply queue for every exchange
        <br />
        <a className="inline-block" href="https://github.com/pagerinc/jackrabbit/pull/74" target="_blank">View Pull Request
        </a>
      </>
    ],
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
      <>
        Site: <a href="https://robotsandpencils.com" target="_blank">robotsandpencils.com</a>
      </>,
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
