// Karma configuration
// Generated on Tue Sep 27 2016 13:32:12 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-cookies/angular-cookies.min.js',
      'bower_components/angular-translate/angular-translate.min.js',
      'bower_components/angular-toastr/dist/angular-toastr.min.js',
      'bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js',
      'bower_components/chart.js/dist/Chart.bundle.min.js',
      'bower_components/angular-chart.js/dist/angular-chart.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-cache/dist/angular-cache.js',
      'bower_components/underscore/underscore-min.js',
      'app/languages/en.js',
      'app/languages/se.js',
      'app/core.js',
      'app/services/DataFactory.js',
      'app/services/TowerFactory.js',
      'app/services/AchievementFactory.js',
      'app/services/DataCache.js',
      "app/**/**/*.html",
      'app/directives/graph.directive.js',
      'app/filters/date-to-iso.filter.js',
      'app/filters/filter-moons.filter.js',
      'app/filters/valid-date.filter.js',
      'app/controllers/home.controller.js',
      'app/controllers/achievement.controller.js',

      'app/test/directives/graph.spec.js',
      'app/test/directives/medal.spec.js',
      'app/test/filters/filters.spec.js',
      'app/test/controllers/achievement.controller.spec.js',
      'app/test/services/TowerFactory.spec.js',
      'app/test/services/DataFactory.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // "app/views/**/*.html": ["ng-html2js"],
      // "public/partials/**/*.html": ["ng-html2js"],
      "app/directives/templates/**/*.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
        // If your build process changes the path to your templates,
        // use stripPrefix and prependPrefix to adjust it.
        stripPrefix: "app/directives/templates",
        prependPrefix: "templates",

        // the name of the Angular module to create
        moduleName: "my.templates"
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
