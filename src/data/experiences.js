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
    description: 'Business Owner / Operator'
  }
]

const experiences = [
  {
    title: 'YKNightlights',
    start: '2011',
    end: '2011',
    type: 'contract',
  },
  {
    title: 'Marine Magnetics Site Recovery',
    start: '2012',
    end: '2012',
    type: 'contract',
  },
  {
    title: 'Sprout at Work',
    start: '2013',
    end: '2013',
    type: 'contract',
  },
  {
    title: 'Tour D\'Afrique',
    start: '2013',
    end: '2013',
    type: 'contract',
  },
  {
    title: 'Mizbeach Pricelist Editor',
    start: '2014',
    end: '2014',
    type: 'contract',
  },
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
    title: 'Receipt Printer Software',
    start: '2016',
    end: '2016',
    type: 'contract',
    notes: [
      'paragraph 1',
      'paragraph 2',
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
    type: 'entrepreneur',
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
