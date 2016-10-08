// angular
//   .module('towersApp')
//   .config(exceptionConfig);
//
// exceptionConfig.$inject = ['$provide'];
//
// function exceptionConfig($provide) {
//   $provide.decorator('$exceptionHandler', extendExceptionHandler);
// }
//
// extendExceptionHandler.$inject = ['$delegate', '$injector', 'ErrorFactory'];
//
// function extendExceptionHandler($delegate, $injector, ErrorFactory) {
//   return function(exception, cause) {
//     var toastr = $injector.get('toastr');
//
//     var errorData = {
//       exception: exception,
//       cause: cause
//     };
//
//     switch (ErrorFactory.handleError(errorData)) {
//       case 'toast':
//           toastr.error(cause.message, errorData);
//         break;
//       case 'hard':
//           $delegate(exception, cause);
//         break;
//       case 'log':
//           console.log(exception, cause);
//         break;
//
//       default:
//     }
//
//   };
// }
