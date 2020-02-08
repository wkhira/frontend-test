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
gulp.task('clean', function () {
	return gulp.src('dist/*', { read: false })
		.pipe($.clean())
		.pipe(gulp.dest('dist/css'))
		.pipe(gulp.dest('dist/js'))
		.pipe(gulp.dest('dist/assets'))
		.pipe(gulp.dest('dist/assets/img'));
});

/* Minifies Solo*/
gulp.task('minify-js', function () {
	return gulp.src('src/**/*.js')
		.pipe($.uglify())
		.pipe($.versionNumber(VERSION_CONFIG))
		.pipe(gulp.dest('dist/'))
});

gulp.task('minify-css', function () {
	return gulp.src('src/**/*.css')
		.pipe($.cssnano({ safe: true }))
		.pipe($.versionNumber(VERSION_CONFIG))
		.pipe(gulp.dest('dist/'))
});

gulp.task('minify-html', function () {
	return gulp.src('src/**/*.html')
		.pipe($.inlineSource())
		.pipe($.htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'))
});

gulp.task('imagemin', function () {
	return gulp.src('src/assets/img/*')
		.pipe($.imagemin({
			progressive: true,
			svgoPlugins: [
				{ removeViewBox: false },
				{ cleanupIDs: false }
			]
		}))
		.pipe(gulp.dest('dist/assets/img'));
});

/* Concat Import*/
gulp.task('useref', function () {
	return gulp.src('src/*.html')
		.pipe($.useref())
		.pipe($.if('*.html', $.inlineSource()))
		.pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cssnano({ safe: true })))
		.pipe($.versionNumber(VERSION_CONFIG))
		.pipe(gulp.dest('dist'));
});

/* Sass */
gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('src/css/'))
		.pipe(reload({ stream: true }));
});

/* Browser Sync */
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});

/* Default Watcher*/
gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch('src/scss/*.scss', ['sass']);

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
});

/* Build */
gulp.task('build', ['clean'], function (callback) {
	return $.sequence(['imagemin'], 'useref')(callback)
});

/* Tests */
gulp.task('test', function () {
	// process.env.NODE_ENV = 'test';
	return gulp.src('__tests__')
		.pipe(jest(JEST_CONFIG));
});



