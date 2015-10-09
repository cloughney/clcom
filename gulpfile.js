'use strict';

var styleDir = "./style/**/*.scss";

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rjsOptimize = require('gulp-requirejs-optimize');
var sass = require('gulp-sass');

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("requirejs-optimize", ["build-ts"], function () {
	return gulp.src("./www/app/bootstrap.js")
		.pipe(rjsOptimize({
			paths: {
				"jquery": "empty:",
				"knockout": "empty:"
			}
		}).on("error", function(error) { console.error(error.message); }))
		.pipe(gulp.dest("./www/app"));
});

gulp.task("build-ts", function () {
	var result = tsProject.src()
    	.pipe(tsc(tsProject));

	return result.js
		.pipe(uglify())
		.on("error", function(error) {
	  		console.error(error.message);
		})
		.pipe(gulp.dest("./www"));
});

gulp.task("compile-sass", function () {
    return gulp.src(styleDir)
        .pipe(sass({ outputStyle: "compressed" })
            .on("error", function (error) { console.log(error); }))
        .pipe(gulp.dest("./www/css"));
});

gulp.task("watch-ts", function () { gulp.watch(tsProject.options.files, ["build-ts"]); });
gulp.task("watch-sass", function () { gulp.watch(styleDir, ["compile-sass"]); });
gulp.task("watch", ["watch-ts", "watch-sass"], function() {});

gulp.task("default", ["build-ts", "compile-sass"], function () {

});
