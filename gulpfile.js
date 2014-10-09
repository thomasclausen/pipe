var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-cssmin'),
    uncss = require('gulp-uncss'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    zip = require('gulp-zip'),
    ftp = require('gulp-ftp'),
    psi = require('psi'),
    pkg = require('./package.json');

var paths = {
  styles: [
    'src/assets/css/normalize.css',
    'src/assets/css/style.scss'
  ],
  scripts: [
    'src/assets/js/classie.js',
    'src/assets/js/imagesloaded.pkgd.js',
    'src/assets/js/script.js',
  ],
  images: 'src/assets/images/*',

  copy: {
    root: [
      'src/*.hbs',
      'src/*.json'
    ],
    fonts: 'src/assets/fonts/*',
    js: '',
    partials_root: 'src/partials/*.hbs',
    partials_custom: 'src/partials/custom/*.hbs'
  }
};

gulp.task('clean', function() {
  return gulp.src(pkg.name, {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat(pkg.name + '.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'));
});
gulp.task('styles-test', ['styles'], function() {
  return gulp.src(pkg.name + '/assets/css/style.css')
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter());
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat(pkg.name + '.js', {newLine: ';'}))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/js'));
});
gulp.task('scripts-test', ['scripts'], function() {
  return gulp.src('src/assets/js/script.js')
    .pipe(jshint('jshintrc.json'))
    .pipe(jshint.reporter());
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest(pkg.name + '/assets/images'));
});

gulp.task('copy', function() {
  gulp.src(paths.copy.root)
    .pipe(gulp.dest(pkg.name));
  gulp.src(paths.copy.fonts)
    .pipe(gulp.dest(pkg.name + '/assets/fonts/'));
  gulp.src(paths.copy.js)
    .pipe(gulp.dest(pkg.name + '/assets/js/'));
  gulp.src(paths.copy.partials_root)
    .pipe(gulp.dest(pkg.name + '/partials/'));
  gulp.src(paths.copy.partials_custom)
    .pipe(gulp.dest(pkg.name + '/partials/custom/'));
});

gulp.task('replace', ['copy'], function() {
  gulp.src('src/default.hbs')
    .pipe(htmlreplace({
      css: {
        src: '{{asset "css/' + pkg.name + '.min.css"}}',
        tpl: '<link rel="stylesheet" id="' + pkg.name + '-css" href="%s" />'
      },
      js: {
        src: '{{asset "js/' + pkg.name + '.min.js"}}',
        tpl: '<script src="%s" async></script>'
      }
    }))
    .pipe(gulp.dest(pkg.name));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.copy.root, ['replace']);
  gulp.watch(paths.copy.fonts, ['replace']);
  gulp.watch(paths.copy.js, ['replace']);
  gulp.watch(paths.copy.partials_root, ['replace']);
  gulp.watch(paths.copy.partials_custom, ['replace']);
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

gulp.task('psi-mobile', function (cb) {
  psi({
    nokey: 'true',
    url: 'http://user.ghost.io',
    locale: 'da_DK',
    strategy: 'mobile',
    threshold: 80
  }, cb);
});
gulp.task('psi-desktop', function (cb) {
  psi({
    nokey: 'true',
    url: 'http://user.ghost.io',
    locale: 'da_DK',
    threshold: 80
  }, cb);
});