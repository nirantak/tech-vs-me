const gulp = require('gulp');
const uglify = require('gulp-uglify');
// const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const ghPages = require('gulp-gh-pages');

const sass_Options = {
	errLogToConsole: true,
	outputStyle: 'compressed'
};
const cleancss_Options = {
	debug: true
};
const htmlmin_Options = {
	collapseWhitespace: true
};
const imagemin_Plugins = [
	imagemin.gifsicle({ interlaced: true }),
	imagemin.jpegtran({ progressive: true }),
	imagemin.optipng({ optimizationLevel: 5 }),
	imagemin.svgo({
		plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
	})
];
const imagemin_Options = {
	verbose: true
};

//Optimize Images
gulp.task('img-min', function() {
	return gulp
		.src('src/img/*')
		.pipe(imagemin(imagemin_Plugins, imagemin_Options))
		.pipe(gulp.dest('images/'));
});

// Minify CSS
gulp.task('minify-css', function() {
	return gulp
		.src('src/css/main.css')
		.pipe(cleancss(cleancss_Options))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('assets/css/'));
});

// Merge CSS files
gulp.task('merge-css', function() {
	return gulp
		.src(['assets/css/theme.min.css', 'assets/css/main.min.css'])
		.pipe(concat('styles.css', { newLine: ';' }))
		.pipe(gulp.dest('assets/css/'));
});

// Uglify JS
gulp.task('uglify-js', function() {
	return gulp
	.src('src/js/main.js')
	.pipe(uglify().on('error', function(e) {
		console.log(e);
	}))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('assets/js/'));
});

gulp.task('uglify-js2', function () {
	return gulp
		.src('src/js/service-worker.js')
		.pipe(uglify().on('error', function (e) {
			console.log(e);
		}))
		.pipe(gulp.dest('./'));
});

// Merge JS files
gulp.task('merge-js', function() {
	return gulp
	.src([
		'assets/js/jquery.scrollex.min.js',
		'assets/js/jquery.scrolly.min.js',
		'assets/js/skel.min.js',
		'assets/js/util.min.js',
		'assets/js/theme.min.js',
		'assets/js/main.min.js'
	])
	.pipe(concat('scripts.js', { newLine: ';' }))
	.pipe(gulp.dest('assets/js/'));
});

gulp.task('img', gulp.series('img-min'));
gulp.task('css', gulp.series('minify-css', 'merge-css'));
gulp.task('js', gulp.series(gulp.parallel('uglify-js', 'uglify-js2'), 'merge-js'));

gulp.task('default', gulp.series(gulp.parallel('img-min', 'minify-css', 'uglify-js', 'uglify-js2'), gulp.parallel('merge-css', 'merge-js')));

// Deply _site subdir to branch gh-pages
gulp.task('deploy', gulp.series('default', function () {
	return gulp.src('_site/**/*')
		.pipe($.ghPages());
}));

gulp.task('watch', function() {
	gulp.watch('src/css/main.css', gulp.series('minify-css', 'merge-css'));
	gulp.watch('src/js/main.js', gulp.series('uglify-js', 'merge-js'));
	gulp.watch('src/js/service-worker.js', gulp.series('uglify-js2', 'merge-js'));
	gulp.watch('src/img/*', gulp.parallel('img-min'));
});
