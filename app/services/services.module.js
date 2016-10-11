import {
  AuthService,
  MeFactory,
  TowerFactory,
  MoonFactory,
  AchievementFactory,
  DataFactory,
  DataCache,
  DateService,
  MapService,
  GraphFilter,
  LanguageService,
} from './';

var module = angular.module('towersApp.services', [])
  .factory('MeFactory', ['$http', 'DataCache', ($http, DataCache) => new MeFactory($http, DataCache)])
  .factory('TowerFactory', ['$http', 'DataCache', ($http, DataCache) => new TowerFactory($http, DataCache)])
  .factory('MoonFactory', ['$http', 'DataCache', ($http, DataCache) => new MoonFactory($http, DataCache)])
  .factory('DataFactory', ['TowerFactory', '$q', (TowerFactory, $q) => new DataFactory(TowerFactory, $q)])
  .factory('AchievementFactory', ['$http', ($http) => new AchievementFactory($http)])
  .factory('DataCache', ['CacheFactory', (CacheFactory) => new DataCache(CacheFactory)])
  .service('AuthService', AuthService)
  .service('DateService', DateService)
  .service('MapService', MapService)
  .service('GraphFilter', GraphFilter)
  .service('LanguageService', LanguageService);

export default module;
