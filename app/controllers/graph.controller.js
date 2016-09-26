angular.module('towersApp')
  .controller('GraphController', ['$scope', 'TowerFactory', 'MoonFactory', '$q', '$filter', 'toastr', function ($scope, TowerFactory, MoonFactory, $q, $filter, toastr) {
    // $scope.labels = [
    //   1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    // ];
    // $scope.series = ['Takeovers'];
    //
    // $scope.data = [
    //   [65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 8]
    // ];


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
      { name: 'Last week', value: 'last_week' },
      { name: 'Last seven days', value: 'last_seven_days' },
      { name: 'Today', value: 'today' },
      { name: 'Yesterday', value: 'yesterday' },
      { name: 'This year', value: 'current_year' },
      { name: 'Specific year', value: 'filter_by_year' },
      { name: 'Between new moons', value: 'filter_by_new_moons' }
    ];

    function init() {
      $scope.claimCountLabels = [];
      $scope.claimCountSeries = ['Most towers claimed'];
      $scope.claimCountData = [];

      $scope.geldCollectedLabels = [];
      $scope.geldCollectedSeries = ['Most geld collected'];
      $scope.geldCollectedData = [];

      $scope.towersBuiltLabels = [];
      $scope.towersBuiltSeries = ['Most towers built'];
      $scope.towersBuiltData = [];

      $scope.geldBonusLabels = [];
      $scope.geldBonusSeries = ['Highest geld bonus'];
      $scope.geldBonusData = [];

      $scope.towerHighestClaimLabels = [];
      $scope.towerHighestClaimSeries = ['Towers with most claims'];
      $scope.towerHighestClaimData = [];

      $scope.towerTopPlayerCountLabels = [];
      $scope.towerTopPlayerCountSeries = ['Towers with most player count'];
      $scope.towerTopPlayerCountData = [];
      $scope.towerTopPlayerCountOptions = {};
    }

    function loadData(startDate, endDate) {
      if (!startDate) startDate = '2016-01-01';
      if (!endDate) endDate = '2017-01-01';

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
        $scope.claimCountData.push(obj.claim_count);
        $scope.claimCountLabels.push(obj.player_alias);
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
        $scope.geldCollectedData.push(obj.geld_collected);
        $scope.geldCollectedLabels.push(obj.player_alias);
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
        $scope.towersBuiltData.push(obj.tower_count);
        $scope.towersBuiltLabels.push(obj.player_alias);
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
        $scope.geldBonusData.push(obj.geld_bonus);
        $scope.geldBonusLabels.push(obj.player_alias);
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
              if (tower.tower_name)
                $scope.towerHighestClaimLabels.push(tower.tower_name);
              else
                $scope.towerHighestClaimLabels.push('Tower#' + obj.tower_id);
            }
            else {
              $scope.towerHighestClaimLabels.push('Tower#' + obj.tower_id);
            }

            $scope.towerHighestClaimData.push(obj.claim_count);
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
              if (tower.tower_name)
                $scope.towerTopPlayerCountLabels.push(tower.tower_name);
              else
                $scope.towerTopPlayerCountLabels.push('Tower#' + obj.tower_id);
            }
            else {
              $scope.towerTopPlayerCountLabels.push('Tower#' + obj.tower_id);
            }

            $scope.towerTopPlayerCountData.push(obj.player_count);
          });

          $scope.towerTopPlayerCountOptions = {
            scales: {
              yAxes: [{
                ticks: {
                  min: 0,
                  max: data[0].player_count + 3,
                  stepSize: 1
                }
              }]
            }
          };
        });
    }

    $scope.filterData = function() {
      var value = $scope.filter.value;

      switch (value) {
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

  }]);
