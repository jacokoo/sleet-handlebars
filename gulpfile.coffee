gulp = require 'gulp'
clean = require 'gulp-clean'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
uglify = require 'gulp-uglify'

gulp.task 'clean', ->
    gulp.src 'lib', read: false
        .pipe clean()

gulp.task 'build', ['clean'], ->
    gulp.src 'src/**/*.coffee'
        .pipe coffeelint '.coffeelint'
        .pipe coffeelint.reporter()
        .pipe coffee bare: true
        .pipe uglify()
        .pipe gulp.dest('lib')

gulp.task 'default', ['build']
