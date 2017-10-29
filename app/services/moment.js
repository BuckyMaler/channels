const moment = require('moment');

export function fromNow(date: string, format: string): string {
  return moment(date, format).fromNow();
}
