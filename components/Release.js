import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import remark from 'remark';
import github from 'remark-github';
import emoji from 'remark-emoji';
import reactRenderer from 'remark-react';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';

const ReleaseWrap = styled.div`
  margin: 2rem 4rem;
`;

const List = styled.ul`
  padding: 0;
  list-style-type: disc;
  list-style-position: inside;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
`;

const H3 = styled.h3`
  margin: 1rem 0;
`;

const H1 = styled.h1`
  margin-bottom: 1rem;
  display: flex;
`;

const PreRelease = styled.span`
  border: 1px solid #b71c1c;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-left: 2rem;
`;

const Release = ({
  version,
  notes,
  date,
  isPrerelease,
  intl: { formatRelative },
}) => (
  <ReleaseWrap>
    <H1>
      <Link href={`https://github.com/mcansh/blog/releases/${version}`}>
        <a>Version {version}</a>
      </Link>
      {isPrerelease && <PreRelease>Pre-Release</PreRelease>}
    </H1>
    <h2>{formatRelative(date)}</h2>
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
  isPrerelease: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Release);
