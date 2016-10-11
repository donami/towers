import {
  GraphDirective,
  AchievementDirective,
  CalendarDirective,
  HallOfFameDirective,
  MedalDirective,
  PopupDirective,
  SpinnerDirective,
} from './';

var module = angular.module('towersApp.directives', [])
  .directive('graph', GraphDirective.directiveFactory)
  .directive('achievement', () => new AchievementDirective())
  .directive('calendar', () => new CalendarDirective())
  .directive('hallOfFame', () => new HallOfFameDirective())
  .directive('medal', () => new MedalDirective())
  .directive('popup', () => new PopupDirective())
  .directive('spinner', () => new SpinnerDirective());

export default module;
