var gulp = require('gulp');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var Promise = require('es6-promise').Promise;
var removePrefixes = require('postcss-remove-prefixes');

gulp.task('js', function () {
    return gulp.src('public/src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('lib', function () {
    return gulp.src('public/src/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/lib'));
});

gulp.task('css', function () {
    return gulp.src('public/src/css/*.css')
//        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
//        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/css'));
});

//
//gulp.task('css', function () {
//    var processors = [
//        autoprefixer({
//            browsers: ['last 2 version']
//        })
//    ];
//    return gulp.src('public/src/css/*.css')
//        .pipe(postcss(processors))
//        .pipe(gulp.dest('public/dist/css'));
//});


//gulp.task('autoprefixer', function () {
//    var postcss    = require('gulp-postcss');
//    var sourcemaps   = require('gulp-sourcemaps');
//    var autoprefixer = require('autoprefixer');
//
//    return gulp.src('public/src/css/*.css')
//        .pipe(sourcemaps.init())
//        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest('public/dist/css'));
//});

//
//gulp.task('css', function () {
//    var postcss    = require('gulp-postcss');
//    var sourcemaps = require('gulp-sourcemaps');
// 
//    return gulp.src('public/src/css/*.css')
//        .pipe( sourcemaps.init() )
//        .pipe( postcss([ require('autoprefixer'), require('precss') ]) )
//        .pipe( sourcemaps.write('.') )
//        .pipe( gulp.dest('public/dist/css') );
//});