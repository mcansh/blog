import React from 'react';
import format from 'date-fns/format';
import { FormattedDate } from 'react-intl';

export const expanded = date => (
  <FormattedDate
    value={new Date(date)}
    year="numeric"
    month="long"
    day="numeric"
  />
);

const ISO8601 = date => format(new Date(date), 'YYYY-MM-DD');

export default ISO8601;
