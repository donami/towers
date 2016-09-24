angular.module('towersApp')
  .controller('testCtrl', ['$scope', 'TowerFactory', '$q', '$filter', function ($scope, TowerFactory, $q, $filter) {
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
      })
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
      })
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
      })
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
      })
    }

    // Filter the results for a given time interval
    $scope.filterResults = function() {
      var filter = $scope.filterByDate;

      switch (filter) {
        case 'last_week':
          var startDate = moment().startOf('isoweek').subtract(2, 'weeks').format('YYYY-MM-DD');
          var endDate = moment().startOf('isoweek').subtract(1, 'weeks').subtract(1, 'days').format('YYYY-MM-DD');

          init();
          loadData(startDate, endDate);
          break;

        case 'last_seven_days':
          var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
          var endDate = moment().format('YYYY-MM-DD');

          init();
          loadData(startDate, endDate);
          break;

        case 'today':
          var startDate = moment().format('YYYY-MM-DD');
          var endDate = moment().add(1, 'days').format('YYYY-MM-DD');

          init();
          loadData(startDate, endDate);
          break;

        case 'yesterday':
          var startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          var endDate = moment().format('YYYY-MM-DD');

          init();
          loadData(startDate, endDate);
          break;


        case 'current_year':
          var startDate = moment().startOf('year').format('YYYY-MM-DD');
          var endDate = moment().endOf('year').format('YYYY-MM-DD');

          init();
          loadData(startDate, endDate);
          break;

        case 'specific_year':

          break;

        default:

      }

    }

  }]);
