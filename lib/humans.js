const { author } = require('../package.json');

module.exports = () => `
  /* TEAM */
  Creator: ${author.name}
  Contact: ${author.email}
  Twitter: logansmcansh
  GitHub: mcansh

  /* SITE */
  Components: React, Next.js, Styled-JSX
  Software: Atom, Hyper
  Hosted On: Now.sh
`;
