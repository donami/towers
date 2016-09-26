var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('sass', function() {
  return gulp.src('app/scss/layout.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
  return gulp.src('app/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify().on('error', function() {
      gutil.log()
    }))
    .pipe(gulp.dest('public/js'));
})

gulp.task('views', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('public'));

  gulp.src('app/views/**/*')
    .pipe(gulp.dest('public/views'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['jshint', 'build-js']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch(['app/index.html', 'app/views/**/*'], ['views']);
});
