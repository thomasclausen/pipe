var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify');

var paths = {
  copy: {
    root: [
      'src/*.hbs',
      'src/README.md'
    ],
    partials_root: 'src/partials/*.hbs',
    partials_custom: 'src/partials/custom/*.hbs',
    fonts: 'src/assets/fonts/*',
    js: [
      'src/assets/js/jquery-1.10.2.min.js',
      'src/assets/js/html5shiv.js',
      'src/assets/js/respond.min.js'
    ]
  },
  styles: [
    'src/assets/css/normalize.css',
    'src/assets/css/style.css'
  ],
  scripts: 'src/assets/js/script.js',
  images: 'src/assets/images/*'
};

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat('pipe.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('pipe.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copy', function() {
  gulp.src(paths.copy.root)
    .pipe(gulp.dest('dist/'));
  gulp.src(paths.copy.partials_root)
    .pipe(gulp.dest('dist/partials/'));
  gulp.src(paths.copy.partials_custom)
    .pipe(gulp.dest('dist/partials/custom/'));
  gulp.src(paths.copy.fonts)
    .pipe(gulp.dest('dist/assets/fonts/'));
  gulp.src(paths.copy.js)
    .pipe(gulp.dest('dist/assets/js/'));
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images', 'copy');
});