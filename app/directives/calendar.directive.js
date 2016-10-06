angular.module('towersApp')
  .directive('calendar', [function() {
    return {
      restrict: 'AE',
      templateUrl: 'templates/calendar.html',
      controller: 'CalendarController',
      controllerAs: 'Calendar',
      bindToController: true
    };
  }])
  .controller('CalendarController', ['$scope', 'MeFactory', function($scope, MeFactory) {

    var Calendar = this;

    this.currDate = moment();
    this.startDate = null;
    this.endDate = null;

    this.getDaysInMonth = function(startDate) {
      Calendar.startDate = new Date(startDate.startOf('month'));
      Calendar.endDate   = new Date(startDate.endOf('month'));
      var range = moment.range(Calendar.startDate, Calendar.endDate);
      var days = [];

      range.by('days', function(moment) {
        days.push({
          date: moment,
          claims: []
        });
      });

      return days;
    }

    $scope.range = function(n) {
      return new Array(n);
    }

    $scope.prevMonth = function() {
      Calendar.currDate = moment(Calendar.currDate).subtract(1, 'months');
      Calendar.initCalendar();
    };

    $scope.nextMonth = function() {
      Calendar.currDate = moment(Calendar.currDate).add(1, 'months');
      Calendar.initCalendar();
    };

    this.initCalendar = function() {
      Calendar.days = this.getDaysInMonth(Calendar.currDate);

      MeFactory.getClaims(Calendar.startDate, Calendar.endDate)
        .then(function(response) {
          Calendar.handleData(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    // Handle the claims and attatch it to the calendar day
    this.handleData = function(data) {
      Calendar.days.map(function(day) {
        var claims = data.filter(function(obj) {
          return moment(obj.claimed_on).format('YYYY-MM-DD') == day.date.format('YYYY-MM-DD');
        });

        if (claims.length) {
          day.claims = day.claims.concat(claims);
        }
      });
    };

    this.initCalendar();

  }]);
