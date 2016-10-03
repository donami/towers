angular.module('towersApp')
  .controller('GraphController', ['$scope', 'TowerFactory', 'DataFactory', 'MoonFactory', '$q', '$filter', 'toastr', '$state', '$location', 'smoothScroll', function ($scope, TowerFactory, DataFactory, MoonFactory, $q, $filter, toastr, $state, $location, smoothScroll) {

    init();
    loadData();

    $scope.moons = [];
    $scope.filter = {};

    MoonFactory.getNewMoons()
      .then(function(response) {
        $scope.moons = response.data;
      }, function(error) {
        console.log(error);
      });

    $scope.yearOptions = [
      { name: '2016', value: '2016' },
      { name: '2015', value: '2015'},
      { name: '2014', value: '2013'},
      { name: '2013', value: '2014'},
    ];

    $scope.filterOptions = [
      { name: 'No filter', value: 'no_filter' },
      { name: 'Last week', value: 'last_week' },
      { name: 'Last seven days', value: 'last_seven_days' },
      { name: 'Today', value: 'today' },
      { name: 'Yesterday', value: 'yesterday' },
      { name: 'This year', value: 'current_year' },
      { name: 'Specific year', value: 'filter_by_year' },
      { name: 'Between new moons', value: 'filter_by_new_moons' }
    ];
    $scope.filter = $scope.filterOptions[0];


    function init() {
      // Click event for graph
      var graphOnClick = function(evt) {
        var element = this.getElementsAtEvent(evt)[0];
        if (!element)
          return false;

        var index = element._index;

        if (!element._chart.config.data.datasets[0][index])
          return false;

        var link = element._chart.config.data.datasets[0][index].link;
        $state.go('app.towerSingle', {id: link});
      }

      // Default options for graph
      var graphDefaultOptions = {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,         // Graph starting at
            }
          }]
        },
        onClick: graphOnClick
      };

      $scope.graphData = {
        towersByCity: {
          title: '_CITIES_WITH_MOST_TOWERS',
          type: 'bar',
          data: [],
          series: ['Cities with most towers'],
          labels: [],
          options: graphDefaultOptions,
        },
        towerPlayerCount: {
          title: '_TOWERS_WITH_MOST_PLAYER_COUNT',
          type: 'bar',
          data: [],
          series: ['Towers with most player count'],
          labels: [],
          options: graphDefaultOptions,
          dataset: []
        },
        towerHighestClaim: {
          title: '_TOWERS_WITH_MOST_CLAIMS',
          type: 'bar',
          data: [],
          series: ['Towers with most claims'],
          labels: [],
          dataset: [],
          options: graphDefaultOptions,
        },
        geldBonus: {
          title: '_HIGHEST_GELD_BONUS',
          type: 'bar',
          data: [],
          series: ['Highest geld bonus'],
          labels: [],
          options: graphDefaultOptions,
        },
        towersBuilt: {
          title: '_MOST_TOWERS_BUILT',
          type: 'bar',
          data: [],
          series: ['Most towers built'],
          labels: [],
          options: graphDefaultOptions,
        },
        geldCollected: {
          title: '_MOST_GELD_COLLECTED',
          type: 'bar',
          data: [],
          series: ['Most geld collected'],
          labels: [],
          options: graphDefaultOptions,
        },
        claimCount: {
          title: '_MOST_TOWERS_CLAIMED',
          type: 'bar',
          data: [],
          series: ['Most towers claimed'],
          labels: [],
          options: graphDefaultOptions,
        },
      };
    }

    function loadData(startDate, endDate) {
      if (!startDate) startDate = '2000-01-01';
      if (!endDate) endDate = moment().add(10, 'years').format('YYYY-MM-DD');

      var deferred = $q.defer();

      deferred.promise
        .then(function(response) {
          // Get data for players with most claims
          DataFactory.handleTopClaims(response.data).forEach(function(obj) {
            $scope.graphData.claimCount.data.push(obj.claim_count);
            $scope.graphData.claimCount.labels.push(obj.player_alias);
          });

          // Get the data for players collecting most geld
          DataFactory.handleMostGeldCollected(response.data).forEach(function(obj) {
            $scope.graphData.geldCollected.data.push(obj.geld_collected);
            $scope.graphData.geldCollected.labels.push(obj.player_alias);
          });

          // Get data for players who built the most towers
          DataFactory.handleMostTowersBuilt(response.data).forEach(function(obj) {
            $scope.graphData.towersBuilt.data.push(obj.tower_count);
            $scope.graphData.towersBuilt.labels.push(obj.player_alias);
          });

          // Get data for players with most geld bonus
          DataFactory.handleMostGeldBonus(response.data).forEach(function(obj) {
            $scope.graphData.geldBonus.data.push(obj.geld_bonus);
            $scope.graphData.geldBonus.labels.push(obj.player_alias);
          });

        }, function(error) {
          console.log(error);
        });


      TowerFactory.getLeaderboard(startDate, endDate)
        .then(function(response) {
          deferred.resolve({
            data: response.data
          });
        }, function(error) {
          console.log(error);
        });

      TowerFactory.getStats(startDate, endDate)
        .then(function(response) {
          // Filter data to get towerst with most claims
          $scope.graphData.towerHighestClaim = Object.assign($scope.graphData.towerHighestClaim, DataFactory.handleTowersTopClaimed(response.data));

          // Filter out data to get towers with highest player count
          $scope.graphData.towerPlayerCount = Object.assign($scope.graphData.towerPlayerCount, DataFactory.handleTowersPlayerCount(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });

      TowerFactory.getTowers(startDate, endDate)
        .then(function(response) {
          // Filter data to get cities with most towers built
          DataFactory.handleCitiesWithMostTowers(response.data).forEach(function(obj) {
            $scope.graphData.towersByCity.data.push(obj.claims);
            $scope.graphData.towersByCity.labels.push(obj.city);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    $scope.filterData = function() {
      var value = $scope.filter.value;

      switch (value) {
        case 'no_filter':
          var endDate = moment().add(10, 'years').format('YYYY-MM-DD');

          doFilter('2000-01-01', endDate);
        break;
        case 'last_week':
          var startDate = moment().startOf('isoweek').subtract(2, 'weeks').format('YYYY-MM-DD');
          var endDate = moment().startOf('isoweek').subtract(1, 'weeks').subtract(1, 'days').format('YYYY-MM-DD');

          doFilter(startDate, endDate);
          break;

        case 'last_seven_days':
          var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
          var endDate = moment().format('YYYY-MM-DD');

          doFilter(startDate, endDate);
          break;

        case 'today':
          var startDate = moment().format('YYYY-MM-DD');
          var endDate = moment().add(1, 'days').format('YYYY-MM-DD');

          doFilter(startDate, endDate);
          break;

        case 'yesterday':
          var startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          var endDate = moment().format('YYYY-MM-DD');

          doFilter(startDate, endDate);
          break;


        case 'current_year':
          var startDate = moment().startOf('year').format('YYYY-MM-DD');
          var endDate = moment().endOf('year').format('YYYY-MM-DD');

          doFilter(startDate, endDate);
          break;

        case 'filter_by_year':
          if (!$scope.selectedYear) {
            toastr.error('Please select a year', 'No date');
            return false;
          }
          var filteredYear = $scope.selectedYear.value;

          var startDate = moment(filteredYear + '-01-01').startOf('year').format('YYYY-MM-DD');
          var endDate = moment(filteredYear + '-01-01').endOf('year').format('YYYY-MM-DD');

          doFilter(startDate, endDate);
          break;

        case 'filter_by_new_moons':
          var startDate = moment($scope.filterByMoonStart.iso8601).format('YYYY-MM-DD');
          var endDate = moment($scope.filterByMoonEnd.iso8601).format('YYYY-MM-DD');

          if (startDate > endDate) {
            toastr.error('The last new moon could not be before the first', 'Ooops..');
          }
          else {
            toastr.clear();
            doFilter(startDate, endDate);
          }
          break;

        default:

      }
    };

    function doFilter(startDate, endDate) {
      init();
      loadData(startDate, endDate);
    }

    // Reset filter
    $scope.clearFilter = function() {
      init();
      loadData();
    }

    // Scroll to anchor
    $scope.gotoAnchor = function(x) {
      var element = document.getElementById('anchor' + x);
      var options = {
        duration: 700,
        easing: 'easeInQuad',
        offset: 0,
      }
      smoothScroll(element, options);
    };

  }]);
