import React from 'react';

import Link from '~/components/link';

const links = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'GitHub',
    slug: `https://github.com/${process.env.GITHUB}`,
  },
  {
    name: 'Twitter',
    slug: `https://twitter.com/${process.env.TWITTER}`,
  },
  {
    name: 'Instagram',
    slug: `https://instagram.com/${process.env.INSTAGRAM}`,
  },
  {
    name: 'Email',
    slug: `mailto:${process.env.EMAIL}`,
  },
  {
    name: 'Changelog',
    slug: `${process.env.GITHUB_URL}/releases`,
  },
];

const Navigation: React.VFC = () => (
  <nav>
    <ul className="flex items-center justify-center py-6 space-x-3 text-xl font-medium">
      {links.map(link => (
        <li key={link.name}>
          <Link href={link.slug}>
            <a>{link.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
