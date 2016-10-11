import angular from 'angular';
import 'angular-ui-router';
import 'angular-translate';
import 'angular-cookies';
import 'angular-cache';
import 'angular-ui-bootstrap';
import 'angular-toastr';
import 'chart.js';
import 'angular-chart.js';
import '../bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js';

import Controllers from './controllers/controllers.module';
import Services from './services/services.module';
import Directives from './directives/directives.module';
import Filters from './filters/filters.module';

import routing from './router';
import CacheFactoryProvider from './config/CacheFactoryProvider';
import authCheck from './config/AuthCheck';
import redirectTo from './config/RedirectTo';
import translations from './config/Translations';
import cookieLanguage from './config/CookieLanguage';

angular.module('towersApp', [
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'toastr',
    'chart.js',
    'pascalprecht.translate',
    'angular-cache',
    'smoothScroll',
    Controllers.name,
    Services.name,
    Directives.name,
    Filters.name
  ])
  .config(routing)
  .config(CacheFactoryProvider)
  .config(translations)
  .run(cookieLanguage)
  .run(authCheck)
  .run(redirectTo);
