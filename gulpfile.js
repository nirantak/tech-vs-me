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

gulp.task("merge-css", function() {
	return gulp
		.src(["assets/css/theme.min.css", "assets/css/main.min.css"])
		.pipe(concat("styles.css", { newLine: ";" }))
		.pipe(gulp.dest("assets/css/"));
});

gulp.task("default", ["minify-css", "merge-css"]);

// // Uglify JS
// gulp.task("uglify-js", function() {
// 	return gulp
// 		.src("/static/src/js/main.js")
// 		.pipe(
// 			uglify().on("error", function(e) {
// 				console.log(e);
// 			})
// 		)
// 		.pipe(rename({ suffix: ".min" }))
// 		.pipe(gulp.dest("/static/src/js"));
// });

// gulp.task("merge", function() {
// 	return gulp
// 		.src([
// 			"/static/src/js/jquery.min.js",
// 			"/static/src/js/bootstrap.min.js",
// 			"/static/src/js/main.min.js"
// 		])
// 		.pipe(concat("scripts.js"))
// 		.pipe(gulp.dest("/static/js"));
// });

// gulp.task("default", ["sass", "uglify-js", "minify-css", "merge"]);

// gulp.task("watch", function() {
// 	gulp.watch("/static/src/sass/*.scss", ["sass"]);
// 	gulp.watch("/static/src/js/main.js", ["uglify-js"]);
// 	gulp.watch("/static/src/sass/*.css", ["minify-css"]);
// 	gulp.watch("/static/src/js/*.js", ["merge"]);
// });
