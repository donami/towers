// Filter for checking if it's a valid date, returns formated date if valid
angular.module('towersApp').filter('validDate', ['$filter', function($filter) {
  return function(input) {
    if (input == '0000-00-00T00:00:00Z') {
      return '-';
    }
    return $filter('date')(input);
  };
}]);

// Filtering of new moons to make sure that user don't select incorrect dates
angular.module('towersApp').filter('filterMoons', ['$filter', function($filter) {
  return function(secondSelect, firstSelect) {

    if (!firstSelect)
      return secondSelect;

    var fromDate = new Date(firstSelect.iso8601);

    secondSelect = secondSelect.filter(function(obj) {
      if (new Date(obj.iso8601) >= fromDate) {
        return obj;
      }
    });

    return secondSelect;
  };
}]);
