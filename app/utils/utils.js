// @flow
export function commaSeparateNumber(value: any): string {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return 'NaN';
  }
  return Number(value).toLocaleString();
}
