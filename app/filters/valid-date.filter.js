validDate.$inject = ['$filter'];
export default function validDate($filter) {
  return function(input) {
    if (input == '0000-00-00T00:00:00Z') {
      return '-';
    }
    return $filter('date')(input);
  };
}
