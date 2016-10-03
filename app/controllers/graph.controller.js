angular.module('towersApp')
  .controller('GraphController', ['$scope', 'TowerFactory', 'MoonFactory', '$q', '$filter', 'toastr', '$state', '$location', 'smoothScroll', function ($scope, TowerFactory, MoonFactory, $q, $filter, toastr, $state, $location, smoothScroll) {

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
          options: {},
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
          getTopClaims(response.data);
          getMostGeldCollected(response.data);
          getMostTowersBuilt(response.data);
          getMostGeldBonus(response.data);
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
          getTowersTopClaimed(response.data);
          getTowersTopPlayerCount(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      TowerFactory.getTowers(startDate, endDate)
        .then(function(response) {
          getCitiesWithMostTowers(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // Get data for players with most claims
    function getTopClaims(data) {
      // Sort based on claim count
      var sortedData = data.sort(function(a, b) {
        return b.claim_count - a.claim_count;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      sortedData.forEach(function(obj) {
        $scope.graphData.claimCount.data.push(obj.claim_count);
        $scope.graphData.claimCount.labels.push(obj.player_alias);
      });
    }

    // Get the data for players collecting most geld
    function getMostGeldCollected(data) {
      // Sort based on geld collected count
      var sortedData = data.sort(function(a, b) {
        return b.geld_collected - a.geld_collected;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      sortedData.forEach(function(obj) {
        $scope.graphData.geldCollected.data.push(obj.geld_collected);
        $scope.graphData.geldCollected.labels.push(obj.player_alias);
      });
    }

    // Get data for players who built the most towers
    function getMostTowersBuilt(data) {
      // Sort based on towers built
      var sortedData = data.sort(function(a, b) {
        return b.tower_count - a.tower_count;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      sortedData.forEach(function(obj) {
        $scope.graphData.towersBuilt.data.push(obj.tower_count);
        $scope.graphData.towersBuilt.labels.push(obj.player_alias);
      });
    }

    // Get data for players with most geld bonus
    function getMostGeldBonus(data) {
      // Sort based on geld bonus
      var sortedData = data.sort(function(a, b) {
        return b.geld_bonus - a.geld_bonus;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      sortedData.forEach(function(obj) {
        $scope.graphData.geldBonus.data.push(obj.geld_bonus);
        $scope.graphData.geldBonus.labels.push(obj.player_alias);
      });
    }

    // Get the towers with highest claim count
    function getTowersTopClaimed(data) {
      // Sort data based on claim_count
      data.sort(function(a, b) {
        if (a.claim_count < b.claim_count) return 1;
        if (a.claim_count > b.claim_count) return -1;
        return 0;
      });

      // Get only the top of the sorted data
      data = data.slice(0, 10);

      TowerFactory.getTowers()
        .then(function(response) {
          return response.data;
        })
        .then(function(towers) {
          data.forEach(function(obj) {

            // Get the info for the tower to get the tower name
            var tower = towers.find(function(found) {
              return found.tower_id == obj.tower_id;
            });

            // Check if tower is undefind, if it is, display ID instead of name
            if (tower) {
              if (tower.tower_name) {
                $scope.graphData.towerHighestClaim.labels.push(tower.tower_name);
              }
              else {
                $scope.graphData.towerHighestClaim.labels.push('Tower#' + obj.tower_id);
              }
            }
            else {
              $scope.graphData.towerHighestClaim.labels.push('Tower#' + obj.tower_id);
            }

            $scope.graphData.towerHighestClaim.dataset.push({link: obj.tower_id});
            $scope.graphData.towerHighestClaim.data.push(obj.claim_count);
          });
        });
    }

    // Get the towers with highest player count
    function getTowersTopPlayerCount(data) {
      // Sort data based on player_count
      data.sort(function(a, b) {
        if (a.player_count < b.player_count) return 1;
        if (a.player_count > b.player_count) return -1;
        return 0;
      });

      // Get only the top of the sorted data
      data = data.slice(0, 10);

      TowerFactory.getTowers()
        .then(function(response) {
          return response.data;
        })
        .then(function(towers) {
          data.forEach(function(obj) {

            // Get the info for the tower to get the tower name
            var tower = towers.find(function(found) {
              return found.tower_id == obj.tower_id;
            });

            // Check if tower is undefind, if it is, display ID instead of name
            if (tower) {
              if (tower.tower_name) {
                $scope.graphData.towerPlayerCount.labels.push(tower.tower_name);
              }
              else {
                $scope.graphData.towerPlayerCount.labels.push('Tower#' + obj.tower_id);
              }
            }
            else {
              $scope.graphData.towerPlayerCount.labels.push('Tower#' + obj.tower_id);
            }

            $scope.graphData.towerPlayerCount.data.push(obj.player_count);
            $scope.graphData.towerPlayerCount.dataset.push({link: obj.tower_id});
          });

          if (data.length && data[0].player_count) {
            $scope.graphData.towerPlayerCount.options.scales = {
              yAxes: [{
                ticks: {
                  min: 0,
                  max: data[0].player_count + 3,
                  stepSize: 1
                }
              }]
            };
          }
        });
    }

    // Get the cities that has the most towers built
    function getCitiesWithMostTowers(data) {
      var data = _.reject(data, function(obj) {
        return obj.city == null;
      });

      var result = _.chain(data)
        .countBy('city')
        .pairs()
        .sortBy(1).reverse()
        .slice(0, 10)
        .value();

      result.forEach(function(obj) {
        $scope.graphData.towersByCity.data.push(obj[1]);
        $scope.graphData.towersByCity.labels.push(obj[0]);
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
