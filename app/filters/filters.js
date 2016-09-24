// Filter for checking if it's a valid date, returns formated date if valid
angular.module('towersApp').filter('validDate', ['$filter', function($filter) {
  return function(input) {
    if (input == '0000-00-00T00:00:00Z') {
      return '-';
    }
    return $filter('date')(input);
  };
}]);
