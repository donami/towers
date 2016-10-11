import moment from 'moment';
import 'moment-range';

export default class DateService {
  constructor() {

  }

  getDaysInWeek() {
    let start = new Date(moment().startOf('isoweek'));
    let end   = new Date(moment().endOf('isoweek'));
    let range = moment.range(start, end);
    let days = [];

    range.by('days', function(moment) {
      days.push(moment.format('YYYY-MM-DD'));
    });

    return days;
  }
}
