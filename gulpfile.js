var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserifyHandlebars = require('browserify-handlebars');

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('js/main.js')
        .pipe(browserify({
			transform: [browserifyHandlebars],
			debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['scripts']);