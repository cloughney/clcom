'use strict';

//TODO make a gulp config file

var styleDir = "./style/**/*.scss";

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rjsOptimize = require('gulp-requirejs-optimize');
var sass = require('gulp-sass');
var replace = require('gulp-replace');

var tsProject = tsc.createProject("tsconfig.json");

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

gulp.task("compile-sass", function () {
    return gulp.src(styleDir)
        .pipe(sass({ outputStyle: "compressed" })
            .on("error", function (error) { console.log(error); }))
        .pipe(gulp.dest("./www/css"));
});

gulp.task("version-files", function () {
	var buildVersion = (function (prevBuildVer) {
		return (new Date()).getTime();
	})();

	return gulp.src(["./www/index.html"])
		.pipe(replace(/(<link\s.*href=)"(css\/[a-z-_\/\.]+\.css(\?v=(\d+))?)"/gi, '$1"$2?v=' + buildVersion + '"'))
		.pipe(replace(/(<script\s.*src=)"(app\/[a-z-_\/\.]+\.js(\?v=(\d+))?)"/gi, '$1"$2?v=' + buildVersion + '"'))
		.on("error", function () { console.log(error.message); })
		.pipe(gulp.dest("./www"));
});

gulp.task("watch-ts", function () { gulp.watch(tsProject.options.files, ["build-ts"]); });
gulp.task("watch-sass", function () { gulp.watch(styleDir, ["compile-sass"]); });
gulp.task("watch", ["watch-ts", "watch-sass"], function() {});

gulp.task("release", ["requirejs-optimize", "compile-sass", "version-files"], function () {});

gulp.task("default", function () {});
