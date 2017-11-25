const moment = require('moment');

export function fromNow(date: string, format: string): string {
  return moment.utc(date, format).fromNow();
}
