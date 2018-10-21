// @flow

import React from 'react';
import Link from 'next/link';
import remark from 'remark';
import github from 'remark-github';
import emoji from 'remark-emoji';
import reactRenderer from 'remark-react';
import { FormattedRelative } from 'react-intl';
import ReleaseWrap from './wrap';
import List from './list';
import ListItem from './item';

type Props = {
  version: string,
  notes: string,
  date: string,
};

const Release = ({ version, notes, date }: Props) => (
  <ReleaseWrap>
    <h1>
      <Link href={`https://github.com/mcansh/blog/releases/${version}`}>
        <a>Version {version}</a>
      </Link>
    </h1>
    <h2>
      <FormattedRelative value={date} />
    </h2>
    {
      remark()
        .use(reactRenderer, {
          remarkReactComponents: {
            ul: List,
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

export default Release;
