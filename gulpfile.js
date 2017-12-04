'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rsync = require('gulp-rsync'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('styles', function() {
  gulp.src('source/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('build/'))
      .pipe(reload({ stream: true }));
});

gulp.task('assets', function() {
  gulp.src(['source/*.html', 'source/*.png', 'source/*.woff'])
      .pipe(gulp.dest('build/'))
      .pipe(reload({ stream: true }));
});

gulp.task('build', ['styles', 'assets'], function() {
  del(['build/**']);
});

gulp.task('deploy', ['build'], function() {
  gulp.src('build/**')
      .pipe(rsync({
        root: 'build/',
        hostname: 'gorilla',
        destination: '/srv/www/fancyasfuck.ca/www/html',
        clean: true,
        exclude: ['.DS_Store']
      }));
});

gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'build/'
    }
  });

  gulp.watch('source/**/*', ['build']);
});

gulp.task('default', ['build']);
