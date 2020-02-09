var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ rename: { 'gulp-if': 'if' } });
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var csslint = require('gulp-csslint');
var jest = require('gulp-jest').default;

const JEST_CONFIG = {
	"preprocessorIgnorePatterns": [
		"<rootDir>/dist/", "<rootDir>/node_modules/"
	],
	"automock": false
}
const VERSION_CONFIG = {
	'value': '%MDS%',
	'append': {
		'key': 'v',
		'to': ['css', 'js'],
	},
};

/* Clean Dist */
function clear() {
	return gulp.src('dist/*', { read: false })
	.pipe($.clean())
	.pipe(gulp.dest('dist/css'))
	.pipe(gulp.dest('dist/js'))
	.pipe(gulp.dest('dist/assets'))
	.pipe(gulp.dest('dist/assets/img'));	
}
exports.clear = clear;
exports.wipe = clear;

/* Minifies Solo*/
function minifyJs() {
	return gulp.src('src/**/*.js')
		.pipe($.uglify())
		.pipe($.versionNumber(VERSION_CONFIG))
		.pipe(gulp.dest('dist/'));
}
exports.minifyJs = minifyJs;

function minifyCss() {
	return gulp.src('src/**/*.css')
		.pipe($.cssnano({ safe: true }))
		.pipe($.versionNumber(VERSION_CONFIG))
		.pipe(gulp.dest('dist/'));
}
exports.minifyCss = minifyCss;

function minifyHtml() {
	return gulp.src('src/**/*.html')
		.pipe($.inlineSource())
		.pipe($.htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'));
}
exports.minifyHtml = minifyHtml;

function images() {
	return gulp.src('src/assets/img/*')
		.pipe($.imagemin({
			progressive: true,
			svgoPlugins: [
				{ removeViewBox: false },
				{ cleanupIDs: false }
			]
		}))
		.pipe(gulp.dest('dist/assets/img'));
}
exports.images = images;

/* Concat Import*/
function userefConcat() {
	return gulp.src('src/*.html')
	.pipe($.useref())
	.pipe($.if('*.html', $.inlineSource()))
	.pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
	.pipe($.if('*.js', $.uglify()))
	.pipe($.if('*.css', $.cssnano({ safe: true })))
	.pipe($.versionNumber(VERSION_CONFIG))
	.pipe(gulp.dest('dist'));
}
exports.userefConcat = userefConcat;

/* Sass */
function css() {
	return gulp.src('src/scss/*.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('src/css/'))
	.pipe(reload({ stream: true }));
}
exports.css = css;

/* Browser Sync */
function server(done) {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
		port        : 8000,
		open        : false
	});
	done();
}

/* Watcher*/
function watch(done) {
	gulp.watch('src/scss/*.scss', css);

	gulp.watch('src/js/*.js').on('change', function (event) {
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStylish));
	});

	gulp.watch('src/css/*.css').on('change', function (event) {
		gulp.src(event.path)
			.pipe(csslint())
			.pipe(csslint.formatter());
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);

	done();
}

/* Tests */
function tests() {
	// process.env.NODE_ENV = 'test';
	return gulp.src('__tests__')
		.pipe(jest(JEST_CONFIG));
}
exports.tests = tests;

/* Default Task */
exports.default = gulp.series(css, server, watch);

/* Build */
exports.build = gulp.series(clear, images, userefConcat);