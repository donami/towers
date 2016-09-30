angular.module('towersApp')
  .controller('MeController', ['$scope', '$cookies', '$filter', 'MeFactory',
  function($scope, $cookies, $filter, MeFactory) {

    $scope.userApiKey = $cookies.get('userApiKey');

    $scope.claimedTowers = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.orderBy = 'claimed_on';
    $scope.reverse = true;

    // For displaying of graphs
    $scope.graphData = {
      claimDays: {
        data: [],
        labels: [],
        series: ['Days with most claims'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,         // Graph starting at
              }
            }]
          }
        }
      },
    };

    $scope.lastClaimedTower = {
      tower_id: 0,
      info: [],
      stats: []
    };

    MeFactory.getClaims()
      .then(function(response) {
        $scope.claimedTowers = $filter('orderBy')(response.data, $scope.orderBy, $scope.reverse);
        $scope.totalItems = response.data.length;

        getDaysWithMostClaims(response.data);

      }, function(error) {
        console.log(error);
      });

    // Get the latest claimed tower
    MeFactory.getLatestClaimedTower()
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

        $scope.lastClaimedTower = claimedTower;
      }, function(error) {
        console.log(error);
      });

    // Filter for paginating the results
    $scope.paginate = function(value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.claimedTowers.indexOf(value);
      return (begin <= index && index < end);
    };

    // Sort the table
    $scope.sortBy = function(property, parseFloat) {
      $scope.reverse = !$scope.reverse;
      $scope.orderBy = property;

      if (parseFloat) {
        $scope.claimedTowers.forEach(function(obj) {
          if (obj[property] !== '')
            obj[property] = parseInt(obj[property]);
        });
      }

      $scope.claimedTowers = $filter('orderBy')($scope.claimedTowers, $scope.orderBy, $scope.reverse);
    };


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
        $scope.graphData.claimDays.labels.push(obj[0]);
        $scope.graphData.claimDays.data.push(obj[1]);
      });
    }
  }]);
