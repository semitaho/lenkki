var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'), 
  html = 'app/**/*.html',
  styles = 'styles/lenkki.styl';
 
gulp.task('webserver', function() {
  gulp.src('www')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('copyhtml', function(){
  return gulp.src(html)
    .pipe(gulp.dest('www'));
});

gulp.task('styles', function(){
  return gulp.src(styles)
    .pipe(stylus())
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('scripts', function() {
  return browserify({
    entries: './app/js/app.js'})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('www/js'));
  
});

gulp.task('watch', function(){
  gulp.watch(html, ['copyhtml']);
  gulp.watch(styles, ['styles']);

});

gulp.task('default', ['copyhtml', 'styles', 'scripts', 'webserver', 'watch']);