const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

const sassOptions = {
	errLogToConsole: true,
	outputStyle: "compressed"
};
const minifyCssOptions = {
	debug: true
};

// Minify CSS
gulp.task("minify-css", function() {
	return gulp
		.src("assets/css/main.css")
		.pipe(cleancss(minifyCssOptions))
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("assets/css/"));
});

// Merge CSS files
gulp.task("merge-css", function() {
	return gulp
		.src(["assets/css/theme.min.css", "assets/css/main.min.css"])
		.pipe(concat("styles.css", { newLine: ";" }))
		.pipe(gulp.dest("assets/css/"));
});

// Uglify JS
gulp.task("uglify-js", function() {
	return gulp
	.src("assets/js/main.js")
	.pipe(uglify().on("error", function(e) {
		console.log(e);
	}))
	.pipe(rename({ suffix: ".min" }))
	.pipe(gulp.dest("assets/js"));
});

// Merge JS files
gulp.task("merge-js", function() {
	return gulp
	.src([
		"assets/js/jquery.min.js",
		"assets/js/jquery.scrollex.min.js",
		"assets/js/jquery.scrolly.min.js",
		"assets/js/skel.min.js",
		"assets/js/util.min.js",
		"assets/js/theme.min.js",
		"assets/js/main.min.js"
	])
	.pipe(concat("scripts.js", { newLine: ";" }))
	.pipe(gulp.dest("assets/js"));
});

gulp.task("css", ["minify-css", "merge-css"]);
gulp.task("js", ["uglify-js", "merge-js"]);
gulp.task("default", ["minify-css", "uglify-js", "merge-css", "merge-js"]);

gulp.task("watch", function() {
	gulp.watch("assets/css/main.css", ["minify-css"]);
	gulp.watch("assets/css/*.css", ["merge-css"]);
	gulp.watch("assets/js/main.js", ["uglify-js"]);
	gulp.watch("assets/js/*.js", ["merge-js"]);
});
