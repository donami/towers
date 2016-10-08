(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('MeController', MeController);

  MeController.$inject = ['$scope', '$state', '$cookies', '$filter', 'MeFactory', 'DateService', 'DataFactory'];

  function MeController($scope, $state, $cookies, $filter, MeFactory, DateService, DataFactory) {
    var vm = this;
    vm.userApiKey = $cookies.get('userApiKey');
    vm.state = {
      view: $state.current.name
    };
    vm.claimedTowers = [];
    vm.totalItems = 0;
    vm.currentPage = 1;
    vm.numPerPage = 5;
    vm.orderBy = 'claimed_on';
    vm.reverse = true;
    vm.paginate = paginate;
    vm.sortBy = sortBy;
    vm.lastClaimedTower = {
      tower_id: 0,
      info: [],
      stats: []
    };

    // For displaying of graphs
    vm.graphData = {
      claimDays: {
        title: '_DAYS_WITH_MOST_CLAIMS',
        type: 'bar',
        data: [],
        labels: [],
        series: ['Days with most claims'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        }
      },
      claimsPerDay: {
        title: 'Claims per day this week',
        type: 'bar',
        data: [],
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        series: ['Claims per day this week'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1,
                min: 0,
              }
            }]
          }
        }
      }
    };

    init();

    function init() {
      getClaims();
      getLatestClaimedTower();
    }

    $scope.$watch(function() {
      return $state.current.name;
    }, function(newVal, oldVal) {
      vm.state.view = newVal;
    });

    // Get your claims
    function getClaims() {
      return MeFactory.getClaims()
        .then(function(response) {
          DataFactory.attatchMetaToClaims(response.data)
            .then(function(data) {
              vm.claimedTowers = $filter('orderBy')(data, vm.orderBy, vm.reverse);
              vm.totalItems = data.length;
            })
            .catch(function(error) {
              console.log(error);
            });

          getDaysWithMostClaims(response.data);
          getClaimsPerDay(response.data);

        }, function(error) {
          console.log(error);
        });
    }

    // Get the latest claimed tower
    function getLatestClaimedTower() {
      return MeFactory.getLatestClaimedTower()
        .then(function(response) {
          var claimedTower = {};

          var towerId = response.data[0].lastClaimedTowerId;

          var info = response.data[1].find(function(obj) {
            return obj.tower_id == towerId;
          });

          var stats = response.data[2].find(function(obj) {
            return obj.tower_id == towerId;
          });

          claimedTower.tower_id = towerId;
          claimedTower.info = info;
          claimedTower.stats = stats;

          vm.lastClaimedTower = claimedTower;
        }, function(error) {
          console.log(error);
        });
    }

    // Filter for paginating the results
    function paginate(value) {
      var begin, end, index;
      begin = (vm.currentPage - 1) * vm.numPerPage;
      end = begin + vm.numPerPage;
      index = vm.claimedTowers.indexOf(value);
      return (begin <= index && index < end);
    }

    // Sort the table
    function sortBy(property, parseFloat) {
      vm.reverse = !vm.reverse;
      vm.orderBy = property;

      if (parseFloat) {
        vm.claimedTowers.forEach(function(obj) {
          if (obj[property] !== '')
            obj[property] = parseInt(obj[property]);
        });
      }

      vm.claimedTowers = $filter('orderBy')(vm.claimedTowers, vm.orderBy, vm.reverse);
    }


    // Get the days that user has claimed the most towers
    function getDaysWithMostClaims(data) {
      data = data.map(function(obj) {
        obj.claimed_on = obj.claimed_on.substr(0, 10);
        return obj;
      });

      var counts = _.countBy(data, 'claimed_on');
      var sortable = _.pairs(counts);

      sortable.sort(function(a, b) {
        return b[1] - a[1];
      });

      sortable = sortable.slice(0, 10);

      sortable.forEach(function(obj) {
        vm.graphData.claimDays.labels.push(obj[0]);
        vm.graphData.claimDays.data.push(obj[1]);
      });
    }

    // Get data for graph, displaying all claims made current week
    var getClaimsPerDay = function(data) {
      var thisYear = moment().format('YYYY');

      // Get only the day without the time and remove dates from other year
      data = data.filter(function(obj) {
        if (obj.claimed_on.substring(0, 4) !== thisYear)
          return null;

        obj.claimed_on = obj.claimed_on.substring(0, 10);
        return obj;
      });

      // Get the number of claims per day
      data = _.countBy(data, function(obj) {
        return obj.claimed_on;
      });

      var countsByDay = [];

      // Return the count if exists, otherwise return 0
      DateService.getDaysInWeek().forEach(function(obj) {
        if (obj in data)
          countsByDay.push(data[obj]);
        else
          countsByDay.push(0);
      });

      // Set max value based on max value of week
      vm.graphData.claimsPerDay.options.scales.yAxes[0].ticks.max = (Math.max.apply(Math, countsByDay) + 1);
      vm.graphData.claimsPerDay.data = [countsByDay];
    };

  }
})();
