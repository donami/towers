// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
  'underscore',
  'moment',
];
// keep a count of the times a task refires
var scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
  bundleApp(false);
});

gulp.task('deploy', function (){
  bundleApp(true);
});

gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/css'));
});

gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('views', function() {
  gulp.src('app/index.html')
  .pipe(gulp.dest('public'));

  gulp.src('app/directives/templates/**/*')
  .pipe(gulp.dest('public/partials'));

  gulp.src('app/views/**/*')
  .pipe(gulp.dest('public/views'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/**/*.js'], ['scripts', 'jshint']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch(['app/index.html', 'app/views/**/*', 'app/directives/templates/**/*'], ['views']);
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch', 'views', 'sass', 'jshint']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
  scriptsCount++;
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './app/app.js',
    debug: true
  })

  // If it's not for production, a separate vendors.js file will be created
  // the first time gulp is run so that we don't have to rebundle things like
  // react everytime there's a change in the js file
  if (!isProduction && scriptsCount === 1){
    // create vendors.js for dev environment.
    browserify({
      require: dependencies,
      debug: true
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('./public/js/'));
  }
  if (!isProduction){
    // make the dependencies external so they dont get bundled by the
    // app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
    dependencies.forEach(function(dep){
      appBundler.external(dep);
    })
  }

  appBundler
  // transform ES6 and JSX to ES5 with babelify
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
  .on('error',gutil.log)
  .pipe(source('bundle.js'))
  .pipe(ngAnnotate({
    // true helps add where @ngInject is not used. It infers.
    // Doesn't work with resolve, so we must be explicit there
    add: true
  }))
  .pipe(gulp.dest('./public/js'));
}
