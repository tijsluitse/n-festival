var gulp = require('gulp');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var Promise = require('es6-promise').Promise;

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
        .pipe(postcss([ autoprefixer({ browsers: ['> 0%'] }) ]))
        .pipe(gulp.dest('public/dist/css'));
});

//gulp.task('css', function () {
//    return gulp.src('public/src/css/style.css')
//        .pipe(autoprefixer({
//            browsers: ['last 5 versions'],
//            cascade: false
//        }))
//        .pipe(gulp.dest('public/dist/css'));
//});