// @flow
export function stringOrEmpty(value: any): string {
  if (value == null || typeof value !== 'string') {
    return '';
  }
  return value;
}

export function commaSeparateNumber(value: any): string {
  if (value == null || (typeof value !== 'string')) {
    return 'NaN';
  }
  return Number(value).toLocaleString();
}
