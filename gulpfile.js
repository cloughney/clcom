'use strict';

var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    change = require('gulp-change');

gulp.task("build", function () {
	var result = gulp.src("src/**/*.ts")
		.pipe(tsc({
			noImplicitAny: true,
			out: "gitshell.js",
			target: "ES6"
		}));

	return result.js
		.pipe(uglify())
		.on('error', function(error) {
	  		console.error(error.message);
		})
		.pipe(change(function (fileContents) {
			return "#!/usr/local/bin/node\n" + fileContents;
		}))
		.pipe(gulp.dest("bin"));
});

gulp.task("watch", function() {
	gulp.watch("www/**/*.ts", ["build"]);
});

gulp.task("default", ["build"], function () {

});