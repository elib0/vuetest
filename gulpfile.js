var gulp = require('gulp');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('move-src', function() {
  // Sirviendo archivos vendor
  gulp.src(['node_modules/animate.css/*.min.css']).pipe(gulp.dest('dist/css/vendor'));
  gulp.src(['node_modules/bootstrap/dist/css/*.min.css']).pipe(gulp.dest('dist/css/vendor'));
  gulp.src(['node_modules/bootstrap/fonts/*.*']).pipe(gulp.dest('dist/css/fonts'));
});

gulp.task('browserify', function() {  
  return browserify('./src/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// Ve cambios en archivos y recarga
gulp.task('demo', ['browserify','move-src'], function() {
	browserSync({
		port: 5000,
		notify: false,
		logPrefix: 'vue-test',
		server: {
			baseDir: ['src','dist']
		}
    });

	gulp.watch(['src/css/**/*.css'], reload);
	gulp.watch(['src/images/**/*'], reload);
	gulp.watch(['src/*.js'], reload);
	gulp.watch(['src/*.html'], reload);
});

gulp.task('default',['browserify','move-src']);