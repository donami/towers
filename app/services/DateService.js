angular.module('towersApp')
  .service('DateService', [function() {
    this.getDaysInWeek = function() {
      var start = new Date(moment().startOf('isoweek'));
      var end   = new Date(moment().endOf('isoweek'));
      var range = moment.range(start, end);
      var days = [];

      range.by('days', function(moment) {
        days.push(moment.format('YYYY-MM-DD'));
      });

      return days;
    }
  }]);
