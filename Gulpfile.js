var gulp         = require('gulp'),
    cssnext      = require('cssnext'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create();

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
		  .pipe(rename({
		    basename: 'butanecss-grid',
		    suffix: '.min'
		  }))
		  .pipe(gulp.dest('./public'))
		  .pipe(browserSync.stream())
		})

		gulp.task('serve', function() {
		  browserSync.init({
		    server: {
		      baseDir: './public'
		    }
		  })
		})

		gulp.task('html', function() {
		  return gulp.src('./test/index.html')
		  .pipe(gulp.dest('./public/'))
		  .pipe(browserSync.stream());
		});

		gulp.task('watch', function() {
		  gulp.watch(['./*.css', './lib/*.css'], ['compile'])
		  gulp.watch('./test/index.html', ['html'])
		})

		gulp.task('build', ['compile', 'html']);
		gulp.task('default', ['build', 'serve', 'watch']);
