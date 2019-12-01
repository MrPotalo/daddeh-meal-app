import padStart from 'lodash/padStart';

export function dayStringFromDate(now) {
  return `${now.getFullYear()}-${padStart(
    now.getMonth() + 1,
    2,
    '0'
  )}-${padStart(now.getDay() + 1, 2, '0')}`;
}
