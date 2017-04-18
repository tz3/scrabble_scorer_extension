const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');

gulp.task('background', function () {
    return gulp.src('src/index.es6')
        .pipe(babel())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task("content", function () {
    return gulp.src("src/content.es6")
        .pipe(babel())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task("default", ["background", "content"])