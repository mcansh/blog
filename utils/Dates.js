import React from 'react';
import format from 'date-fns/format';
import { FormattedDate } from 'react-intl';

export const expanded = date => (
  <FormattedDate value={date} year="numeric" month="long" day="numeric" />
);

export const expandedString = date => format(new Date(date), 'MMMM D, YYYY');

export default date => format(new Date(date), 'YYYY-MM-DD');
