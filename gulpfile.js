/* Require packages */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    Promise = require('es6-promise').Promise,
    cssnano = require('gulp-cssnano');

/* Uglify scripts */
gulp.task('js', function () {
    return gulp.src('public/src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});

/* Uglify Javascript Libraries */
gulp.task('lib', function () {
    return gulp.src('public/src/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/lib'));
});

/* Prefix CSS */
gulp.task('css', function () {
    return gulp.src('public/src/css/*.css')
        .pipe(postcss([autoprefixer({
            browsers: ['> 0%']
        })]))
        .pipe(cssnano())
        .pipe(gulp.dest('public/dist/css'));
});