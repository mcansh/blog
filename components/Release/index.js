import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import remark from 'remark';
import github from 'remark-github';
import emoji from 'remark-emoji';
import reactRenderer from 'remark-react';
import { FormattedRelative } from 'react-intl';
import { H1, H3 } from './heading';
import ReleaseWrap from './wrap';
import List from './list';
import ListItem from './item';

const Release = ({ version, notes, date }) => (
  <ReleaseWrap>
    <H1>
      <Link href={`https://github.com/mcansh/blog/releases/${version}`}>
        <a>Version {version}</a>
      </Link>
    </H1>
    <h2>
      <FormattedRelative value={date} />
    </h2>
    {
      remark()
        .use(reactRenderer, {
          remarkReactComponents: {
            ul: List,
            h3: H3,
            li: ListItem,
          },
        })
        .use(github, {
          repository: 'mcansh/blog',
        })
        .use(emoji)
        .processSync(notes).contents
    }
  </ReleaseWrap>
);

Release.propTypes = {
  version: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Release;
