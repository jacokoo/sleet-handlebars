p = require './package.json'
gulp = require 'gulp'
clean = require 'gulp-clean'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
uglify = require 'gulp-uglify'
template = require 'gulp-template'
mocha = require 'gulp-mocha'

gulp.task 'clean', ->
    gulp.src 'lib', read: false
        .pipe clean()

gulp.task 'build', ['clean'], ->
    gulp.src 'src/**/*.coffee'
        .pipe coffeelint '.coffeelint'
        .pipe coffeelint.reporter()
        .pipe coffee bare: true
        .pipe template version: p.version
        .pipe uglify()
        .pipe gulp.dest('lib')

gulp.task 'default', ['build']

gulp.task 'test', ->
    gulp.src 'test/*.coffee', read: false
        .pipe mocha()
