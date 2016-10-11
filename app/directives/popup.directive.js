export default class popup {
  constructor() {
    this.restrict = 'AE';
    this.scope = {
      claims: '='
    };
  }

  link(scope, elem, attrs) {
    var text = 'You claimed ' + scope.claims.length + ' towers this day';

    if (scope.claims.length == 1) {
      text = 'You claimed ' + scope.claims.length + ' tower this day';
    }

    elem
      .addClass('tool-tip')
      .append(angular.element(
          '<div class="tooltip-container"><h3>Claims</h3><p>' + text + '</p></div>'
      ));

  }

}

// export default function popup() {
//   return {
//     restrict: 'AE',
//     scope: {
//       claims: '='
//     },
//     link: function(scope, elem, attrs) {
//       var text = 'You claimed ' + scope.claims.length + ' towers this day';
//
//       if (scope.claims.length == 1) {
//         text = 'You claimed ' + scope.claims.length + ' tower this day';
//       }
//
//       elem
//         .addClass('tool-tip')
//         .append(angular.element(
//             '<div class="tooltip-container"><h3>Claims</h3><p>' + text + '</p></div>'
//         ));
//
//     }
//   };
// }
