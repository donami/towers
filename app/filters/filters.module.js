import {
  DateToIsoFilter,
  MoonFilter,
  ValidDateFilter,
} from './';

var module = angular.module('towersApp.filters', [])
  .filter('dateToISO', DateToIsoFilter)
  .filter('filterMoons', MoonFilter)
  .filter('validDate', ValidDateFilter);

export default module;
