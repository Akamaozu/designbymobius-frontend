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
    nutshell: 'Contracted as a Full-Stack Developer for Marketing project',
    notes: [
      <>
        Site: <a href="https://web.archive.org/web/20111008175913/http://www.mizbeach.com/" target="_blank" rel="noreferrer">mizbeach.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build with wordpress'
            description={
              <ul>
                <li>convert static mockups to custom wordpress theme</li>
                <li>build custom admin interfaces to streamline workflow</li>
              </ul>
            }
          />
          <ExperienceNoteSectionListItem
            title='build frontend with react'
            description='webapp for quickly managing inventory prices'
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='designed pricing app to work offline'
            description='offline price updates are stored on device and updated when network connection is detected'
          />
        </ul>
      </ExperienceNoteSection>
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
    nutshell: 'Contracted as a Full-Stack Developer for Entertainment project',
    notes: [
      <>
        Site: <a href="http://yknightlights.designbymobi.us/" target="_blank" rel="noreferrer">yknightlights.designbymobi.us</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build with wordpress'
            description={
              <ul>
                <li>convert static mockups to custom wordpress theme</li>
                <li>customize wordpress admin to streamline workflow</li>
              </ul>
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='built context-aware custom keyboard controls'
            description='arrow keys jumped between site sections and scrolled sliders'
          />
        </ul>
      </ExperienceNoteSection>
    ],
  },
  {
    slug: 'hypenotic',
    label: 'Hypenotic',
    start: '2012',
    end: '2012',
    type: 'contract',
    technologies: [
      'wordpress',
    ],
    nutshell: 'Contracted as a Full-Stack Developer for Marketing projects',
    notes: [
      <>
        Site: <a href="https://hypenotic.com/" target="_blank" rel="noreferrer">hypenotic.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build with wordpress'
            description={
              <ul>
                <li>debug and fix broken functionality</li>
                <li>implement new features</li>
              </ul>
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='restored hacked site by recreating from Internet Archives'
            description='compromised server, no backups, no version control - restored functionality by writing features from scratch'
          />
        </ul>
      </ExperienceNoteSection>,
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
    nutshell: 'Authored an Open-Source Library for Custom WordPress Admin Interfaces',
    notes: [
      <>
        Site: <a href="https://github.com/akamaozu/dxm-wp-metabox" target="_blank" rel="noreferrer">github.com/akamaozu/dxm-wp-metabox</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='design api for creating admin interfaces'
            description='wrapped wp-enqueue and wp-hooks, provided simple yet powerful, configurable api'
          />
        </ul>
      </ExperienceNoteSection>,
    ],
  },
  {
    slug: 'ladies-learning-code',
    label: 'Ladies Learning Code',
    start: '2012',
    end: '2012',
    type: 'volunteer',
    nutshell: 'Volunteered to Support new WordPress Developers',
    technologies: [
      'wordpress',
    ],
    notes: [
      <>
        Site: <a href="https://www.canadalearningcode.ca">canadalearningcode.ca</a>
        <br />
        <br />
        <i>formerly Ladies Learning Code - see <a href="https://en.wikipedia.org/wiki/Ladies_Learning_Code" target="_blank" rel="noreferrer">wikipedia.org/wiki/ladies_learning_code</a></i>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='Guided students through setting up a WordPress development environment on their computer (Mac / Windows)'
          />
        </ul>
      </ExperienceNoteSection>,
      '',
    ],
  },
  {
    slug: 'catalyst-workshop',
    label: 'Catalyst Workshop',
    start: '2013',
    end: '2013',
    type: 'contract',
    technologies: [
      'wordpress',
    ],
    nutshell: 'Contracted as a Full-Stack Developer for Marketing projects',
    notes: [
      <>
        Site: <a href="https://catalystworkshop.com" target="_blank" rel="noreferrer">catalystworkshop.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build with wordpress'
            description={
              <ul>
                <li>convert static mockups into custom wordpress theme</li>
                <li>enable interactive experiences with jquery</li>
                <li>extend wordpress admin with custom metaboxes</li>
              </ul>
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection
        title='Accomplishments'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='reduced key user interaction from 3s to 10ms'
            description='used in-memory cache instead of repeated api requests'
          />
        </ul>
      </ExperienceNoteSection>,
    ],
  },
  {
    slug: 'blueport',
    label: 'Blueport Software',
    start: '2015',
    end: '2015',
    type: 'contract',
    nutshell: 'Contracted as Full-Stack Developer for Education project',
    notes: [
      <>
        Site: <a href="http://blueportsoftware.com" target="_blank" rel="noreferrer">blueportsoftware.com</a>
      </>,
      <ExperienceNoteSection
        title='Responsibilities'
      >
        <ul>
          <ExperienceNoteSectionListItem
            title='build features with meteor'
            description={
              <ul>
                <li>user invitation system</li>
                <li>notification engine <i>(in-app, email)</i></li>
                <li>automatic business report generation</li>
                <li>excel exports for generated reports</li>
              </ul>
            }
          />
        </ul>
      </ExperienceNoteSection>
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
      <ExperienceNoteSection title='Objectives'>
        <ul>
          <ExperienceNoteSectionListItem
            title='simple api to monitor and manage node.js processes'
            description='restart crashed processes, page on-call engineers after multiple crashes, et cetera'
          />
          <ExperienceNoteSectionListItem
            title='enable inter-process communication patterns between node.js processes'
            description='implemented signal (direct), pub-sub (indirect), mailbox (blocking) messaging'
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection title='Responsibilities'>
        <ul>
          <ExperienceNoteSectionListItem
            title='design core components, messaging primitives and lifecycle events'
            description='module pattern made it easy to add/modify/override functionality'
          />
          <ExperienceNoteSectionListItem
            title='write tests to verify api properties and behavior'
            description='verifiable definition of what a node-supe instance is and how it works'
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection title='Accomplishments'>
        <ul>
          <ExperienceNoteSectionListItem
            title="over 90% test code coverage"
            description={
              <a
                href="https://coveralls.io/github/Akamaozu/node-supe?branch=master"
                target="_blank"
                rel="noreferrer"
              >
                coveralls.io/github/akamaozu/node-supe
              </a>
            }
          />
        </ul>
      </ExperienceNoteSection>
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
      <ExperienceNoteSection title='About'>
        <ul>
          <ExperienceNoteSectionListItem
            title="communication and billing software-as-a-service for montessori schools"
            description="key features: digital forms, privacy-focused group communication, invoicing and payments"
          />
        </ul>
      </ExperienceNoteSection>,
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
      'heroku',
    ],
  },
  {
    slug: 'torontojs',
    label: 'TorontoJS',
    start: '2017',
    end: '2017',
    type: 'volunteer',
    nutshell: 'Volunteered to Lead a Node.js Workshop on Fault Tolerance',
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
            <a href="https://www.indiehackers.com/product/spotgetter/revenue" target="_blank" rel="noreferrer">indiehackers.com/product/spotgetter/revenue</a>
          </li>
          <li>
            <a href="https://www.facebook.com/spotgetter/reviews" target="_blank" rel="noreferrer">facebook.com/spotgetter/reviews</a>
          </li>
        </ul>
      </>,
      <ExperienceNoteSection title='About'>
        <ul>
          <ExperienceNoteSectionListItem
            title="software-as-a-service that streamlined finding and booking a US Medical Licensing Exam (USMLE Step 2 CS) spot"
            description="key value: cost-effective (1/5th the cost of our cheapest competitor -- $64 vs $300)"
          />
        </ul>
      </ExperienceNoteSection>,
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
      'heroku',
    ],
  },
  {
    slug: 'jackrabbit',
    label: 'jackrabbit',
    start: '2019',
    type: 'open-source',
    nutshell: 'Contributed to an Open-Source Node.js RabbitMQ Library',
    notes: [
      <ExperienceNoteSection title='Accomplishments'>
        <ul>
          <ExperienceNoteSectionListItem
            title='diagnosed and fixed multiple race conditions'
            description={
              <span>
                { '1. fix "ready" event race-condition - ' }
                <a className="inline-block" href="https://web.archive.org/web/20201013012511/https://github.com/pagerinc/jackrabbit/pull/40" target="_blank" rel="noreferrer">
                  github.com/pagerinc/jackrabbit/pull/40
                </a>
                <br />
                { '2. fix hoisted callback race-condition - ' }
                <a className="inline-block" href="https://web.archive.org/web/20221224105929/https://github.com/pagerinc/jackrabbit/pull/88" target="_blank" rel="noreferrer">
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
                <a className="inline-block" href="https://web.archive.org/web/20201013012404/https://github.com/pagerinc/jackrabbit/pull/74" target="_blank" rel="noreferrer">
                  github.com/pagerinc/jackrabbit/pull/74
                </a>
              </span>
            }
          />
          <ExperienceNoteSectionListItem
            title='maintain a fork'
            description={
              <span>
                <a className="inline-block" href="https://github.com/Akamaozu/tibbarkcaj" target="_blank" rel="noreferrer">
                  github.com/Akamaozu/tibbarkcaj
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
      'github-actions'
    ],
  },
  {
    slug: 'cjs-indexing-hash',
    label: 'cjs-indexing-hash',
    start: '2020',
    type: 'open-source',
    nutshell: 'Authored an Open-Source JavaScript In-Memory Data Store',
    notes: [
      <>
        Site: <a href="https://github.com/akamaozu/cjs-indexing-hash" target="_blank" rel="noreferrer">github.com/akamaozu/cjs-indexing-hash</a>
      </>,
      <ExperienceNoteSection title='Objectives'>
        <ul>
          <ExperienceNoteSectionListItem
            title="self-managing indexes"
            description="automatically reindex when an entry changes, keeping indexes in sync with the dataset"
          />
          <ExperienceNoteSectionListItem
            title="simple api to run code after dataset changes"
            description="send emails when entries are created, update logs when entries get deleted, et cetera"
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection title='Responsibilities'>
        <ul>
          <ExperienceNoteSectionListItem
            title='design dataset and indexing engine, api and lifecycle events'
            description={
              'module pattern made it easy to add/modify/override functionality'
            }
          />
          <ExperienceNoteSectionListItem
            title='write tests to verify api properties and behavior'
            description={
              'verifiable definition of the datastore instance, from capabilities to failure modes'
            }
          />
        </ul>
      </ExperienceNoteSection>,
      <ExperienceNoteSection title='Accomplishments'>
        <ul>
          <ExperienceNoteSectionListItem
            title="over 90% test code coverage"
            description={
              <a
                href="https://coveralls.io/github/Akamaozu/cjs-indexing-hash?branch=master"
                target="_blank"
                rel="noreferrer"
              >
                coveralls.io/github/akamaozu/cjs-indexing-hash
              </a>
            }
          />
        </ul>
      </ExperienceNoteSection>
    ],
    technologies: [
      'javascript',
      'github-actions'
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
      <ExperienceNoteSection title='About'>
        <ul>
          <ExperienceNoteSectionListItem
            title="software development consultancy for medium and large businesses"
            description="typical clients: banks, universities, airlines, start-ups"
          />
        </ul>
      </ExperienceNoteSection>,
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
      'aws',
      'docker'
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
      'railway'
    ],
    nutshell: 'Running a Data Explorer service for Mozilla\'s Pocket users',
    notes: [
      <>
        Site: <a href="https://www.sparkpocketjoy.com" target="_blank" rel="noreferrer">sparkpocketjoy.com</a>
      </>,
      <ExperienceNoteSection title='About'>
        <ul>
          <ExperienceNoteSectionListItem
            title="software-as-a-service offering dataset exploration tools for mozilla's pocket users"
            description="flagship tool: lightning-fast multi-attribute search, uses in-memory client-side search design"
          />
        </ul>
      </ExperienceNoteSection>,
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
