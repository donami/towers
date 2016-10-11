import moment from 'moment';
import 'moment-range';

CalendarController.$inject = ['$scope', 'MeFactory'];
function CalendarController($scope, MeFactory) {

  var vm = this;

  vm.currDate = moment();
  vm.startDate = null;
  vm.endDate = null;

  vm.prevMonth = prevMonth;
  vm.nextMonth = nextMonth;
  vm.range = range;

  initCalendar();

  function getDaysInMonth(startDate) {
    vm.startDate = new Date(startDate.startOf('month'));
    vm.endDate   = new Date(startDate.endOf('month'));
    var range = moment.range(vm.startDate, vm.endDate);
    var days = [];

    range.by('days', function(moment) {
      days.push({
        date: moment,
        claims: []
      });
    });

    return days;
  }

  function range(n) {
    return new Array(n);
  }

  function prevMonth() {
    vm.currDate = moment(vm.currDate).subtract(1, 'months');
    initCalendar();
  }

  function nextMonth() {
    vm.currDate = moment(vm.currDate).add(1, 'months');
    initCalendar();
  }

  function initCalendar() {
    vm.days = getDaysInMonth(vm.currDate);

    MeFactory.getClaims(vm.startDate, vm.endDate)
      .then(function(response) {
        handleData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // Handle the claims and attatch it to the calendar day
  function handleData(data) {
    vm.days.map(function(day) {
      var claims = data.filter(function(obj) {
        return moment(obj.claimed_on).format('YYYY-MM-DD') == day.date.format('YYYY-MM-DD');
      });

      if (claims.length) {
        day.claims = day.claims.concat(claims);
      }
    });
  }

}

export default class calendar {
  constructor() {
    this.restrict = 'AE';
    this.templateUrl = 'templates/calendar.html';
    this.controller = CalendarController;
    this.controllerAs = 'vm';
    this.bindToController = true;
  }
}
