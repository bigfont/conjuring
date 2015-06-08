var gulp = require('gulp');
var less = require('gulp-less');
var path = require('gulp-rename');
var rename = require('gulp-rename');

gulp.task('default', function () {



});

gulp.task('less', function () {

    return gulp.src('./Content/app.less')
        .pipe(less())        
        .pipe(gulp.dest('./Content/'));

});