'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('styles', function() {
  gulp.src('source/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssnano())
      .pipe(gulp.dest('build/'))
      .pipe(reload({ stream: true }));
});

gulp.task('assets', function() {
  gulp.src(['source/*.html', 'source/*.png', 'source/*.woff'])
      .pipe(gulp.dest('build/'))
      .pipe(reload({ stream: true }));
});

gulp.task('build', ['styles', 'assets']);

gulp.task('clean', function() {
  del(['build/**']);
});

gulp.task('start', ['clean', 'build'], function() {
  browserSync({
    server: {
      baseDir: 'build/'
    }
  });

  gulp.watch('source/**/*', ['build']);
});

gulp.task('default', ['build']);
