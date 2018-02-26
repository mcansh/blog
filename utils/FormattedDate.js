import format from 'date-fns/format';

const FormattedDate = date => format(new Date(date), 'YYYY-MM-DD');

export default FormattedDate;
