
export default function cacheFactoryProvider(CacheFactoryProvider) {
  'ngInject';

  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
}
// app.config(['CacheFactoryProvider', function (CacheFactoryProvider) {
//   angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
// }]);
