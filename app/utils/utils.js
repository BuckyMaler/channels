// @flow
export function stringOrEmpty(value: string): string {
  if (value == null || typeof value !== 'string') {
    return '';
  }
  return value;
}

export function commaSeparateNumber(value: string): string {
  if (value == null || (typeof value !== 'string')) {
    return 'NaN';
  }
  return Number(value).toLocaleString();
}
