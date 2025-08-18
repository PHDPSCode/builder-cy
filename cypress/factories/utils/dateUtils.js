import moment from 'moment-timezone';

moment.tz.setDefault('America/Sao_Paulo');

moment.locale('pt-br', {
  monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
});

export { moment };

export const TODAY = moment();
export const YESTERDAY = moment().subtract(1, 'day');
export const THIRTY_DAYS_AGO = moment().subtract(30, 'day');
export const THREE_WEEKS_AGO = moment().subtract(3, 'week');
export const SIX_MONTHS_AGO = moment().subtract(6, 'month');
export const FIRST_DAY_OF_MONTH = moment().startOf('month');
export const LAST_DAY_OF_MONTH = moment().endOf('month');
export const AMERICAN_DATE_PATTERN = 'YYYY-MM-DD';
export const AMERICAN_DATE_TIME_PATTERN = 'YYYY-MM-DD HH:mm:ss';
export const BRAZILIAN_DATE_PATTERN_DAY_MONTH = 'DD/MM';
export const BRAZILIAN_DATE_PATTERN = 'DD/MM/YYYY';
export const TIME_PATTERN = 'HH:mm:ss';
export const INVALID_DATE_PATTERN = 'Invalid date';
export const DEFAULT_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
export const DATEPICKER_PATTERN = 'YYYY-MM-DD 12:00:00';

export function now () {
  return moment();
}

export const TOMORROW = moment()
  .add(1, 'day')
  .startOf('day')
  .toDate();

export function periodFirstDayOfMonth () {
  const period = {
    begin: FIRST_DAY_OF_MONTH,
    end: YESTERDAY
  };

  const differenceBetweenDates = period.end.diff(period.begin, 'day');

  if (differenceBetweenDates < 0) {
    period.end = period.begin;
  }

  return {
    begin: formatDate(period.begin, AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN),
    end: formatDate(period.end, AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN)
  };
}

export function dateTimeDifference (minuendDateTime, subtrahendDateTime, measure = 'days') {
  const supportedMeasures = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

  if (supportedMeasures.some(element => element === measure) === false) {
    throw new Error('Not Supported Measure');
  }

  return moment(minuendDateTime).diff(subtrahendDateTime, measure);
}

export function periodLastThirtyDays () {
  return {
    begin: formatDate(THIRTY_DAYS_AGO, AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN),
    end: formatDate(TODAY, AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN)
  };
}

export const TRES_SEMANAS_ATRAS_PERIODO = {
  begin: THREE_WEEKS_AGO.format(BRAZILIAN_DATE_PATTERN),
  end: TODAY.format(BRAZILIAN_DATE_PATTERN)
};

export function periodLastThreeWeeks () {
  return {
    begin: formatDate(THREE_WEEKS_AGO, BRAZILIAN_DATE_PATTERN, AMERICAN_DATE_PATTERN),
    end: formatDate(TODAY, BRAZILIAN_DATE_PATTERN, AMERICAN_DATE_PATTERN)
  };
}

export function periodLastSixMonths () {
  return {
    begin: formatDate(SIX_MONTHS_AGO.startOf('month'), AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN),
    end: formatDate(TODAY, AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN),
  };
}

export function dePtBrParaEnUs (date) {
  return formatDate(date, BRAZILIAN_DATE_PATTERN, AMERICAN_DATE_PATTERN);
}

export function formatDate (date, currentFormat, newFormat) {
  return moment(date, currentFormat).format(newFormat);
}

export function formatDateTime (date, currentFormat, newFormat) {
  return moment(date, currentFormat).format(`${newFormat} ${TIME_PATTERN}`);
}

export function formatAmericanToBrazilianDate (date) {
  return formatDate(date, AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN);
}

export function isValidDate (date, currentFormat) {
  return date !== INVALID_DATE_PATTERN && moment(date, currentFormat).isValid();
}

export const deEnUsPara = ({ date, pattern }) => {
  return moment(date, AMERICAN_DATE_PATTERN)
    .locale('pt-br')
    .format(pattern);
};

export const deEnUsParaDiaMes = data =>
  formatToDayMonth(data, AMERICAN_DATE_PATTERN);

export const isSameDateOrAfter = ({ date, date1, precision } = {}) => {
  const momentDate = moment(date);
  const momentDate1 = moment(date1);

  if (momentDate.isValid() === false ||
        momentDate1.isValid() === false) {
    return false;
  }

  return momentDate
    .isSameOrAfter(momentDate1, precision);
};

/**
 * @param date {Moment|String|Number|Date}
 * @param format {String}
 * @returns {Moment}
 */
const getMoment = ({ date, format }) => {
  return date ? moment(date, format) : moment();
};

/**
 * @param comparatorDate {Moment|String|Number|Date}
 * @param comparedDate {Moment|String|Number|Date}
 * @param precision {String}
 * @param format {String}
 * @returns {Boolean}
 */
export const isSame = ({ comparatorDate, comparedDate, precision, format }) => {
  const momentComparatorDate = getMoment({ date: comparatorDate, format });
  const momentComparedDate = getMoment({ date: comparedDate, format });
  return momentComparedDate.isSame(momentComparatorDate, precision);
};

/**
 * @param comparatorDate {Moment|String|Number|Date}
 * @param comparedDate {Moment|String|Number|Date}
 * @param precision {String}
 * @param format {String}
 * @returns {Boolean}
 */
export const isSameOrAfter = ({ comparatorDate, comparedDate, precision, format }) => {
  const momentComparatorDate = getMoment({ date: comparatorDate, format });
  const momentComparedDate = getMoment({ date: comparedDate, format });
  return momentComparedDate.isSameOrAfter(momentComparatorDate, precision);
};

/**
 * @param comparatorDate {Moment|String|Number|Date}
 * @param comparedDate {Moment|String|Number|Date}
 * @param precision {String}
 * @param format {String}
 * @returns {Boolean}
 */
export const isAfter = ({ comparatorDate, comparedDate, precision, format }) => {
  const momentComparatorDate = getMoment({ date: comparatorDate, format });
  const momentComparedDate = getMoment({ date: comparedDate, format });
  return momentComparedDate.isAfter(momentComparatorDate, precision);
};

/**
 * @param date {Moment|String|Number|Date}
 * @param precision {String}
 * @param format {String}
 * @returns {Boolean}
 */
export function isSameThanNow ({ date, format, precision }) {
  return isSame({
    comparedDate: date,
    format,
    precision
  });
}

/**
 * @param date {Moment|String|Number|Date}
 * @param precision {String}
 * @param format {String}
 * @returns {Boolean}
 */
export function isAfterThanNow ({ date, format, precision }) {
  return isAfter({
    comparedDate: date,
    format,
    precision
  });
}

export function formatToDayMonth (date, atualFormat) {
  return formatDate(date, atualFormat, BRAZILIAN_DATE_PATTERN_DAY_MONTH);
}

const END_OF_TODAY = TODAY
  .clone()
  .endOf('day')
  .toDate();

export function isFutureDate (date) {
  return date > END_OF_TODAY;
}

const PATTERNS = [
  BRAZILIAN_DATE_PATTERN,
  AMERICAN_DATE_PATTERN
];
/**
 * Obtém período em dias
 * @param {Object} dateRange datas de início e fim
 * @param {Moment|String|Number|Date} dateRange.begin data de início
 * @param {Moment|String|Number|Date} dateRange.end data fim
 * @returns {Number} quantidade de dias do período
 */
export function getPeriod ({ begin, end }) {
  const from = moment(begin, PATTERNS);
  const to = moment(end, PATTERNS);

  return to.diff(from, 'days');
}

// ddmmYYYY to YYYY-mm-dd
export function formataDataNascimento (data) {
  data = data.split('');
  return `${data[4]}${data[5]}${data[6]}${data[7]}-${data[2]}${data[3]}-${data[0]}${data[1]}`;
};

// 'yyyy-mm-dd hh:mm:ss' to 'dd-mm-yyyy hh:mm:ss'
export function trataDataAnalise (data) {
  const dataFormatada = data.split();
  dataFormatada[0] = formatDate(dataFormatada[0], AMERICAN_DATE_PATTERN, BRAZILIAN_DATE_PATTERN);
  data = dataFormatada.join('');
  return data;
}
