var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-cssmin'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    zip = require('gulp-zip'),
    ftp = require('gulp-ftp'),
    pkg = require('./package.json');

var paths = {
  styles: [
    'src/assets/css/normalize.css',
    'src/assets/css/style.css'
  ],
  scripts: [
    'src/assets/js/jquery.fitvids.js',
    'src/assets/js/script.js',
  ],
  images: 'src/assets/images/*',

  copy: {
    root: [
      'src/*.hbs',
      'src/*.json'
    ],
    partials_root: 'src/partials/*.hbs',
    partials_custom: 'src/partials/custom/*.hbs',
    fonts: 'src/assets/fonts/*',
    js: [
      'src/assets/js/jquery-1.10.2.min.js',
      'src/assets/js/html5shiv.js',
      'src/assets/js/respond.min.js'
    ]
  }
};

gulp.task('clean', function() {
  return gulp.src(pkg.name, {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat(pkg.name + '.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'))
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
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/js'))
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
    .pipe(gulp.dest(pkg.name + '/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copy', function() {
  gulp.src(paths.copy.root)
    .pipe(gulp.dest(pkg.name));
  gulp.src(paths.copy.partials_root)
    .pipe(gulp.dest(pkg.name + '/partials/'));
  gulp.src(paths.copy.partials_custom)
    .pipe(gulp.dest(pkg.name + '/partials/custom/'));
  gulp.src(paths.copy.fonts)
    .pipe(gulp.dest(pkg.name + '/assets/fonts/'));
  gulp.src(paths.copy.js)
    .pipe(gulp.dest(pkg.name + '/assets/js/'));
});

gulp.task('replace', ['copy'], function() {
  gulp.src('src/default.hbs')
    .pipe(htmlreplace({
      'css': '<link rel="stylesheet" id="' + pkg.name + '-css" href="{{asset "css/' + pkg.name + '.min.css"}}" />',
      'js': '<script src="{{asset "js/' + pkg.name + '.min.js"}}" async></script>'
    }))
    .pipe(gulp.dest(pkg.name));
});

gulp.task('wath', function() {
  gulp.watch(paths.styles, ['styles-test', 'styles']);
  gulp.watch(paths.scripts, ['scripts-test', 'scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.copy.root, ['replace']);
  gulp.watch(paths.copy.partials_root, ['replace']);
  gulp.watch(paths.copy.partials_custom, ['replace']);
  gulp.watch(paths.copy.fonts, ['replace']);
  gulp.watch(paths.copy.js, ['replace']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'replace');
});

gulp.task('test', function() {
  gulp.start('styles-test', 'scripts-test');
});

gulp.task('zip', function() {
  gulp.src('**', { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(zip(pkg.name + '-ghost.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('upload', function () {
  gulp.src('**', { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(ftp({
      host: 'website.com',
      user: 'johndoe',
      pass: '1234',
      remotePath: '/html/'
    }));
});