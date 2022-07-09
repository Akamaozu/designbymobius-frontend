const experienceTypes = [
  {
    slug: 'employment',
    label: 'Employment',
    description: 'Full-time Employment',
  },
  {
    slug: 'contract',
    label: 'contract',
    description: 'Contract or Part-time Employment',
  }
]

const experiences = [
  {
    title: 'CyclusBreak',
    start: '2015',
    end: '2015',
    type: 'contract',
    notes: [
      'item one',
      'item two',
    ],
  },
  {
    title: 'Hubbli',
    start: '2016',
    end: '2018',
    type: 'employment',
    notes: [
      'item one',
      'item two',
    ],
  },
  {
    title: 'Spotgetter',
    start: '2018',
    end: '2020',
    type: 'employment',
    notes: [
      'item one',
      'item two',
    ],
  },
  {
    title: 'Robots and Pencils',
    start: '2021',
    end: '2022',
    type: 'employment',
    notes: [
      'item one',
      'item two',
    ],
  },
]

export default {
  types: experienceTypes,
  items: experiences,
}
