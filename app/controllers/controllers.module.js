import {
  MenuController,
  AboutController,
  FooterController,
  AchievementController,
  HallOfFameController,
  LoginController,
  GraphController,
  LeaderboardController,
  TowerController,
  MeController,
} from './';

var module = angular.module('towersApp.controllers', [])
  .controller('MenuController', MenuController)
  .controller('AboutController', AboutController)
  .controller('FooterController', FooterController)
  .controller('AchievementController', AchievementController)
  .controller('TowerController', TowerController)
  .controller('HallOfFameController', HallOfFameController)
  .controller('LeaderboardController', LeaderboardController)
  .controller('LoginController', LoginController)
  .controller('MeController', MeController)
  .controller('GraphController', GraphController);

export default module;
