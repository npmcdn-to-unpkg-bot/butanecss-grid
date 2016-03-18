var gulp         = require('gulp'),
    cssnext      = require('cssnext'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    banner       = require('gulp-banner'),
    pkg          = require('./package.json'),
    browserSync  = require('browser-sync').create();

var comment = '/*!\n' +
  ' * <%= pkg.name %> <%= pkg.version %>\n' +
  ' * <%= pkg.description %>\n' +
  ' *\n' +
  ' * Copyright '+new Date().getFullYear()+', <%= pkg.author %>\n' +
  '*/\n\n';

gulp.task('compile', function () {
  return gulp.src('./index.css')
  .pipe(postcss([
    cssnext({
      features: {
        pixrem: false
      },
      compress: true
    })
  ]))
  .pipe(autoprefixer({browsers: ['last 2 version']}))
  .pipe(banner(comment, { pkg: pkg }))
  .pipe(rename({
    basename: 'butanecss-grid',
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream())
});

gulp.task('watch', function() {
  gulp.watch(['./*.css', './lib/*.css'], ['compile'])
});

gulp.task('default', ['watch']);
gulp.task('build', ['compile']);
