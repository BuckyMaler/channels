const moment = require('moment');

export function fromNow(date: string, format: string) {
  return moment(date, format).fromNow();
}
