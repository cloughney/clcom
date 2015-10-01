'use strict';

var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    uglify = require('gulp-uglify');

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build", function () {
	var result = tsProject.src()
    .pipe(tsc(tsProject));

	return result.js
		.pipe(uglify())
		.on('error', function(error) {
	  		console.error(error.message);
		})
		.pipe(gulp.dest(""));
});

gulp.task("watch", function() {
	gulp.watch(tsProject.options.files, ["build"]);
});

gulp.task("default", ["build"], function () {

});
