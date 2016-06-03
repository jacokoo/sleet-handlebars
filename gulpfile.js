var gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint');

gulp.task('clean', function(cb) {
    return del(['./lib']);
});

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('build', ['clean', 'lint'], function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('lib'));
});

gulp.task('default', ['build']);
