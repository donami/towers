angular.module('towersApp')
  .factory('DataFactory', ['TowerFactory', function(TowerFactory) {

    var DataFactory = {};

    // Handle data to get a sorted list of cities with most towers built
    DataFactory.handleCitiesWithMostTowers = function(data) {
      var data = _.reject(data, function(obj) {
        return obj.city == null;
      });

      var result = _.chain(data)
        .countBy('city')
        .pairs()
        .sortBy(1).reverse()
        .slice(0, 10)
        .value();

      result = result.map(function(obj) {
        return {
          city: obj[0],
          amount: obj[1]
        };
      });

      return result;
    };

    // Handle data to get the towers with highest player count
    DataFactory.handleTowersPlayerCount = function(data) {
      // Sort data based on player_count
      data.sort(function(a, b) {
        if (a.player_count < b.player_count) return 1;
        if (a.player_count > b.player_count) return -1;
        return 0;
      });

      // Get only the top of the sorted data
      data = data.slice(0, 10);

      var labels = [];
      var dataset = [];
      var values = [];

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
                labels.push(tower.tower_name);
              }
              else {
                labels.push('Tower#' + obj.tower_id);
              }
            }
            else {
              labels.push('Tower#' + obj.tower_id);
            }

            values.push(obj.player_count);
            dataset.push({link: obj.tower_id});
          });

        });

      return {
        labels: labels,
        dataset: dataset,
        data: values,
      };
    };

    DataFactory.handleTowersTopClaimed = function(data) {
      // Sort data based on claim_count
      data.sort(function(a, b) {
        if (a.claim_count < b.claim_count) return 1;
        if (a.claim_count > b.claim_count) return -1;
        return 0;
      });

      // Get only the top of the sorted data
      data = data.slice(0, 10);

      var labels = [];
      var dataset = [];
      var values = [];

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
                labels.push(tower.tower_name);
              }
              else {
                labels.push('Tower#' + obj.tower_id);
              }
            }
            else {
              labels.push('Tower#' + obj.tower_id);
            }

            dataset.push({link: obj.tower_id});
            values.push(obj.claim_count);
          });
        });

      return {
        labels: labels,
        dataset: dataset,
        data: values,
      };
    };

    // Sort data to get the players with most geld bonus
    DataFactory.handleMostGeldBonus = function(data) {
      // Sort based on geld bonus
      var sortedData = data.sort(function(a, b) {
        return b.geld_bonus - a.geld_bonus;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      return sortedData;
    };

    // Sort data to get the players who have built most towers
    DataFactory.handleMostTowersBuilt = function(data) {
      // Sort based on towers built
      var sortedData = data.sort(function(a, b) {
        return b.tower_count - a.tower_count;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      return sortedData;
    };

    // Sort data to get players who collected most geld
    DataFactory.handleMostGeldCollected = function(data) {
      // Sort based on geld collected count
      var sortedData = data.sort(function(a, b) {
        return b.geld_collected - a.geld_collected;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      return sortedData;
    };

    // Sort data to get players who claimed most towers
    DataFactory.handleTopClaims = function(data) {
      // Sort based on claim count
      var sortedData = data.sort(function(a, b) {
        return b.claim_count - a.claim_count;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      return sortedData;
    };

    return DataFactory;
  }]);
