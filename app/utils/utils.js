// @flow
export function commaSeparateNumber(value: string | number): string {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return 'NaN';
  }
  return Number(value).toLocaleString();
}
