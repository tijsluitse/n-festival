var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    cssmin          = require('gulp-cssmin');
    browserSync     = require('browser-sync').create(),
    reload          = browserSync.reload;

gulp.task('jsmin', function() {
    gulp.src('./static/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function () {
    gulp.src('./static/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('watch', function() {
    gulp.watch('./static/js/*.js', ['jsmin', reload]);
    gulp.watch('./static/css/*.css', ['cssmin', reload]);
});

gulp.task('default', ['jsmin', 'cssmin', 'watch']);