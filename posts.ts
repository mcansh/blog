import { Post } from './components/PostCard';

const learningSoftwareDevelopment = {
  url: '/why-im-learning-software-development',
  title: "Why I'm learning software development",
  date: 1475452800000,
  image: {
    imageUrl: 'luke-pamer-5951.jpg',
    photographer: 'Luke Pamer',
    url: 'https://unsplash.com/photos/oUhr-qMTJoc',
  },
};
const html5Progress = {
  url: '/html5-progress-element',
  title: 'The HTML5 progress element',
  date: 1476403200000,
  image: {
    imageUrl: 'matthew-kane-146076.jpg',
    photographer: 'Matthew Kane',
    url: 'https://unsplash.com/photos/9EM7s13H2I0',
  },
};
const objectLifecycle = {
  url: '/object-lifecycle-cheatsheet',
  title: 'Object lifecycle cheatsheet',
  date: 1478217600000,
  image: {
    imageUrl: 'matthew-henry-49707.jpg',
    photographer: 'Matthew Henry',
    url: 'https://unsplash.com/photos/VviFtDJakYk',
  },
};
const javascriptClasses = {
  url: '/javascript-classes',
  title: 'JavaScript classes key concepts',
  date: 1479686400000,
  image: {
    imageUrl: 'mia-baker-322594.jpg',
    photographer: 'Mia Baker',
    url: 'https://unsplash.com/photos/klRB1BB9pV8',
  },
};
const rackKeyConcepts = {
  url: '/rack-key-concepts',
  title: 'Rack key concepts',
  date: 1481068800000,
  image: {
    imageUrl: 'derek-liang-239062.jpg',
    photographer: 'Derek Liang',
    url: 'https://unsplash.com/photos/2h_i_BB_X2E',
  },
};
const lifeAndCode = {
  url: '/similarities-between-life-and-code',
  title: 'Similarities between life and code',
  date: 1482624000000,
  image: {
    imageUrl: 'joshua-sortino-228788.jpg',
    photographer: 'Joshua Sortino',
    url: 'https://unsplash.com/photos/71vAb1FXB6g',
  },
};
const timeToHex = {
  url: '/time-to-hex',
  title: 'How to convert the current time to a hexadecimal',
  date: 1484006400000,
  image: {
    imageUrl: 'team-ui8-199275.jpg',
    photographer: 'Team UI8',
    url: 'https://unsplash.com/photos/z8lfwpQVXJo',
  },
};
const sinatraProject = {
  url: '/sinatra-project',
  title: 'Sinatra project',
  date: 1493078400000,
  image: {
    imageUrl: 'brevite-434280.jpg',
    photographer: 'Brevitē',
    url: 'https://unsplash.com/photos/4qAxSfftA5I',
  },
};
const railsProject = {
  url: '/rails-project',
  title: 'Rails project',
  date: 1503619200000,
  image: {
    imageUrl: '1_Wmv8hfi_bTHuHyV5CawnCw.jpg',
  },
};
const rubyProject = {
  url: '/ruby-project',
  title: 'Ruby project',
  date: 1512795600000,
  image: {
    imageUrl: 'stacy-wyss-702.jpg',
    photographer: 'Stacy Wyss',
    url: 'https://unsplash.com/photos/-aDl1z8_nGY',
  },
};

const posts: Post[] = [
  learningSoftwareDevelopment,
  html5Progress,
  objectLifecycle,
  javascriptClasses,
  rackKeyConcepts,
  lifeAndCode,
  timeToHex,
  sinatraProject,
  railsProject,
  rubyProject,
];

const sortedByDate = posts
  .filter(p => p.url)
  .sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });

export {
  posts,
  learningSoftwareDevelopment,
  html5Progress,
  objectLifecycle,
  javascriptClasses,
  rackKeyConcepts,
  lifeAndCode,
  timeToHex,
  sinatraProject,
  railsProject,
  rubyProject,
};
export default sortedByDate;
