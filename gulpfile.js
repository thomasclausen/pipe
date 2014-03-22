var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-cssmin'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    zip = require('gulp-zip'),
    ftp = require('gulp-ftp'),
    pkg = require('./package.json');

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

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat(pkg.name + '.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
gulp.task('styles-test', function() {
  return gulp.src(paths.styles)
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat(pkg.name + '.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('scripts-test', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter());
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

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles-test', 'styles']);
  gulp.watch(paths.scripts, ['scripts-test', 'scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.copy.root, ['copy']);
  gulp.watch(paths.copy.partials_root, ['copy']);
  gulp.watch(paths.copy.partials_custom, ['copy']);
  gulp.watch(paths.copy.fonts, ['copy']);
  gulp.watch(paths.copy.js, ['copy']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'copy');
});

gulp.task('test', function() {
  gulp.start('styles-test', 'scripts-test');
});

gulp.task('zip', function() {
  gulp.src('**', { cwd: path.join(process.cwd(), 'dist')})
    .pipe(zip(pkg.name + '-ghost.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('upload', function () {
  gulp.src('**', { cwd: path.join(process.cwd(), 'dist')})
    .pipe(ftp({
      host: 'website.com',
      user: 'johndoe',
      pass: '1234',
      remotePath: '/html/'
    }));
});