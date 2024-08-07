import ExperienceNoteSection from '../components/ExperienceNoteSection'
import ExperienceNoteSectionListItem from '../components/ExperienceNoteSection/components/ListItem'

import experienceTypes from './experience-types.json'

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
        site: <a href="http://archives.mizbeach.com/v2/" target="_blank" rel="noreferrer">Product Gallery</a>
      </>,
      'Designed and built a product gallery for customers to browse through mobile phones and their features instead of travelling to the store or calling to get the info.',
      'Created a product list webapp to easily manage a large inventory and rapidly-changing prices from a mobile phone.',
      <>
        Used React and <a href="https://web.dev/appcache-beginner/" target="_blank" rel="noreferrer">appcache</a> to make a product update app work offline. Ask me about data-syncing or <a href="https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type" target="_blank" rel="noreferrer">CRDTs (conflict-free replicated data types)</a> sometime!
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
        site: <a href="http://yknightlights.designbymobi.us/" target="_blank" rel="noreferrer">YKNightlights</a>
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
        Referrer: <a href="https://hypenotic.com/" target="_blank" rel="noreferrer">Hypenotic</a>
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
      <a href="https://github.com/Akamaozu/dxm-wp-metabox" target="_blank" rel="noreferrer">View Repository</a>
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
        site: <a href="https://www.canadalearningcode.ca/">Canada Learning Code</a> (formerly <a href="https://en.wikipedia.org/wiki/Ladies_Learning_Code" target="_blank" rel="noreferrer">Ladies Learning Code</a>)
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
        Referrer: <a href="https://catalystworkshop.com" target="_blank" rel="noreferrer">Catalyst Workshop</a>
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
        Referrer: <a href="http://blueportsoftware.com" target="_blank" rel="noreferrer">Blueport Software</a>
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
    slug: '18techs',
    label: '18Techs',
    start: '2016',
    end: '2016',
    type: 'contract',
    nutshell: 'Contracted to build Windows app for Networked Receipt Printers',
    notes: [
      <>
        Site: <a href="https://18techs.com" target="_blank" rel="noreferrer">18techs.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build windows app with electron'
            description={
              <>
                <div>key features:</div>
                <ul>
                  <li>detect printers on local network</li>
                  <li>user-configurable target printer</li>
                  <li>populate html receipt template with transaction data</li>
                  <li>print html receipt on any networked printer</li>
                </ul>
              </>
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='bypassed windows print dialog while printing receipts'
          />
        </ul>
      </ExperienceNoteSection>,
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
    nutshell: 'Authored an Open-Source Node.js library for Fault Tolerance',
    notes: [
      <>
        Site: <a href="https://github.com/akamaozu/node-supe" target="_blank" rel="noreferrer">github.com/akamaozu/node-supe</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='design core components, messaging primitives and lifecycle events'
            description={
              'module pattern made it easy to add/modify/override functionality'
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='built a simple api to monitor, manage and communicate with node.js processes'
            description={
              'reduced the work needed to setup system failure recovery processes'
            }
          />
        </ul>
      </ExperienceNoteSection>,
    ]
  },
  {
    slug: 'hubbli',
    label: 'Hubbli',
    start: '2016',
    end: '2018',
    type: 'employment',
    nutshell: 'Employed as a Full-Stack Developer for Education projects',
    notes: [
      <>
        Site: <a href="https://hubbli.com" target="_blank" rel="noreferrer">hubbli.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build backends with wordpress and node.js'
            description={
              'integrated payment processors and other essential third-party services'
            }
          />
          <ExperienceNoteSectionListItem
            title='build frontends with jquery'
            description={
              'created or modified customer-facing and internal workflows'
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='designed and built component that reduced server costs by more than 50%'
            description={
              'additionally, new design improved reliability of third-party webhook integrations'
            }
          />
          <ExperienceNoteSectionListItem
            title='built tuition management system that processed over $1,000,000'
            description={
              'integrated with slack to notify support, engineers and management about key payment events'
            }
          />
        </ul>
      </ExperienceNoteSection>,
    ],
    technologies: [
      'nodejs',
      'rabbitmq',
      'redis',
      'wordpress',
    ],
  },
  {
    slug: 'torontojs',
    label: 'TorontoJS',
    start: '2017',
    end: '2017',
    type: 'volunteer',
    nutshell: 'Led a Node.js workshop on Fault Tolerance',
    notes: [
      <>
        Site:
        {' '}
        <a href="https://twitter.com/torontojs/status/874771829780623360" target="_blank" rel="noreferrer">
          twitter.com/torontojs/status/874771829780623360
        </a>
      </>,
      <ExperienceNoteSection
        title='Responsibilties'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='design interactive space-themed exercises'
            description={
              'attendees created/modified software to be useful in strict operation conditions and even error states'
            }
          />
        </ul>
      </ExperienceNoteSection>,
    ],
    technologies: [
      'nodejs',
    ]
  },
  {
    slug: 'fman-sublimehelper',
    label: 'fman-sublimehelper',
    start: '2018',
    end: '2018',
    type: 'open-source',
    nutshell: 'Contributed to an Open-Source Windows app',
    notes: [
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='built workflow for modifying hard-coded path to dependency'
            description={
              <span>
                allow user to override default path to executable
                {' - '}
                <a href="https://github.com/oskretc/fman-sublimehelper/pull/1" target="_blank" rel="noreferrer">
                  github.com/oskretc/fman-sublimehelper/pull/1
                </a>
              </span>
            }
          />
        </ul>
      </ExperienceNoteSection>,
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
    nutshell: 'Ran an Automated Exam Registration service for Medical Students',
    notes: [
      <>
        Sites:
        <ul
          style={{
            margin: 0
          }}
        >
          <li>
            <a href="https://www.indiehackers.com/product/spotgetter/revenue" target="_blank">indiehackers.com/product/spotgetter/revenue</a>
          </li>
          <li>
            <a href="https://www.facebook.com/spotgetter/reviews" target="_blank">facebook.com/spotgetter/reviews</a>
          </li>
        </ul>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build scheduling automation in node.js'
            description={
              'programmed puppeteer to login, check for availability, claim spot, solve captcha, take screenshot and send emails'
            }
          />
          <ExperienceNoteSectionListItem
            title='design system architecture'
            description={
              'prioritized fault-tolerance and low operations cost'
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='successfully scheduled 1500+ USMLE Step 2 CS spots'
            description={
              '4% of all spots available in 2020 (35,000)'
            }
          />
        </ul>
      </ExperienceNoteSection>,
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
    nutshell: 'Contributed to an Open-Source Node.js RabbitMQ Library',
    notes: [
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='diagnosed and fixed multiple race conditions'
            description={
              <span>
                { '1. fix "ready" event race-condition - ' }
                <a className="inline-block" href="https://github.com/pagerinc/jackrabbit/pull/40" target="_blank" rel="noreferrer">
                  github.com/pagerinc/jackrabbit/pull/40
                </a>
                <br />
                { '2. fix hoisted callback race-condition - ' }
                <a className="inline-block" href="https://github.com/pagerinc/jackrabbit/pull/88" target="_blank" rel="noreferrer">
                  github.com/pagerinc/jackrabbit/pull/88
                </a>
              </span>
            }
          />
          <ExperienceNoteSectionListItem
            title='made core action "create exchange" more resource-efficient'
            description={
              <span>
                { 'skip reply queue creation if not needed - ' }
                <a className="inline-block" href="https://github.com/pagerinc/jackrabbit/pull/74" target="_blank" rel="noreferrer">
                  github.com/pagerinc/jackrabbit/pull/74
                </a>
              </span>
            }
          />
        </ul>
      </ExperienceNoteSection>
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
    nutshell: 'Employed as Full-Stack Developer for Banking, Education and Medical projects',
    notes: [
      <>
        Site: <a href="https://robotsandpencils.com" target="_blank" rel="noreferrer">robotsandpencils.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build backends in node.js'
            description='integrated salesforce and other third-party services, built multi-lingual multi-provider notification engine'
          />
          <ExperienceNoteSectionListItem
            title='build frontend with react'
            description='integrated multiple third-party services into a secure digital banking client'
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='fast-tracked medical software system upgrade by weeks'
            description='built a backwards-compatible api, avoiding the need to update all dependent subsystems'
          />
        </ul>
      </ExperienceNoteSection>,
    ],
    technologies: [
      'nodejs',
      'postgres',
      'react',
      'typescript',
    ],
  },
  {
    slug: 'sparkpocketjoy',
    label: 'sparkpocketjoy',
    start: '2023',
    type: 'entrepreneur',
    technologies: [
      'nodejs',
      'react',
      'redis',
      'rabbitmq',
      'indexeddb',
      'svg',
    ],
    nutshell: 'Running a Data Explorer service for Mozilla Pocket\'s users',
    notes: [
      <>
        Site: <a href="https://www.sparkpocketjoy.com" target="_blank">sparkpocketjoy.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='design system architecture'
            description='prioritize observability, fault-tolerance, performance'
          />
          <ExperienceNoteSectionListItem
            title='build backend in node.js'
            description='service-oriented architecture, communication via rabbitmq'
          />
          <ExperienceNoteSectionListItem
            title='build frontend with react'
            description='client-side persistence with indexed-db, svg for graphics'
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='faster query than official pocket clients'
            description='queries complete in nanoseconds due to pre-computed indexes and in-memory query design'
          />
        </ul>
      </ExperienceNoteSection>,
    ]
  }
]

const api = {
  types: experienceTypes,
  items: experiences,
}

export default api
