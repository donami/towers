(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('GraphController', GraphController);

  GraphController.$inject = ['TowerFactory', 'DataFactory', 'MoonFactory', '$q', '$filter', 'toastr', '$state', '$location', 'smoothScroll', 'GraphFilter'];
  function GraphController(TowerFactory, DataFactory, MoonFactory, $q, $filter, toastr, $state, $location, smoothScroll, GraphFilter) {
    var vm = this;

    init();
    loadData();

    vm.moons = [];
    vm.filter = {};

    vm.yearOptions = GraphFilter.getYearOptions();
    vm.filterOptions = GraphFilter.getFilterOptions();
    vm.filter = vm.filterOptions[0];
    vm.filterData = filterData;
    vm.clearFilter = clearFilter;
    vm.gotoAnchor = gotoAnchor;

    function init() {

      getNewMoons();

      // Fetch new moons
      function getNewMoons() {
        return MoonFactory.getNewMoons()
          .then(function(response) {
            vm.moons = response.data;
          }, function(error) {
            console.log(error);
          });
      }

      vm.graphData = GraphFilter.getGraphData();
    }

    function loadData(startDate, endDate) {
      if (!startDate) startDate = '2000-01-01';
      if (!endDate) endDate = moment().add(10, 'years').format('YYYY-MM-DD');

      TowerFactory.getLeaderboard(startDate, endDate)
        .then(function(response) {
          DataFactory.handleTopClaims(response.data).forEach(function(obj) {
            vm.graphData.claimCount.data.push(obj.claim_count);
            vm.graphData.claimCount.labels.push(obj.player_alias);
          });

          // Get the data for players collecting most geld
          DataFactory.handleMostGeldCollected(response.data).forEach(function(obj) {
            vm.graphData.geldCollected.data.push(obj.geld_collected);
            vm.graphData.geldCollected.labels.push(obj.player_alias);
          });

          // Get data for players with most geld bonus
          DataFactory.handleMostGeldBonus(response.data).forEach(function(obj) {
            vm.graphData.geldBonus.data.push(obj.geld_bonus);
            vm.graphData.geldBonus.labels.push(obj.player_alias);
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      TowerFactory.getLeaderboardTowerBuilder(startDate, endDate)
        .then(function(response) {
          // Get data for players who built the most towers
          DataFactory.handleMostTowersBuilt(response.data).forEach(function(obj) {
            vm.graphData.towersBuilt.data.push(obj.count);
            vm.graphData.towersBuilt.labels.push(obj.player_alias);
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      TowerFactory.getStats(startDate, endDate)
        .then(function(response) {
          // Filter data to get towerst with most claims
          vm.graphData.towerHighestClaim = Object.assign(vm.graphData.towerHighestClaim, DataFactory.handleTowersTopClaimed(response.data));

          // Filter out data to get towers with highest player count
          vm.graphData.towerPlayerCount = Object.assign(vm.graphData.towerPlayerCount, DataFactory.handleTowersPlayerCount(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });

      TowerFactory.getTowers(startDate, endDate)
        .then(function(response) {
          // Filter data to get cities with most towers built
          DataFactory.handleCitiesWithMostTowers(response.data).forEach(function(obj) {
            vm.graphData.towersByCity.data.push(obj.amount);
            vm.graphData.towersByCity.labels.push(obj.city);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function filterData() {
      var value = vm.filter.value;

      var options = {
        selectedYear: vm.selectedYear,
        filterByMoonStart: vm.filterByMoonStart,
        filterByMoonEnd: vm.filterByMoonEnd,
      };

      var filter = GraphFilter.applyFilter(value, options);

      if (filter.error) {
        toastr.error(filter.error.message, filter.error.title);
      }
      else {
        toastr.clear();
        init();
        loadData(filter.startDate, filter.endDate);
      }
    }

    // Reset filter
    function clearFilter() {
      init();
      loadData();
    }

    // Scroll to anchor
    function gotoAnchor(x) {
      var element = document.getElementById('anchor' + x);
      var options = {
        duration: 700,
        easing: 'easeInQuad',
        offset: 0,
      };
      smoothScroll(element, options);
    }

  }

})();
