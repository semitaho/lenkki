var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'), 
  html = 'app/**/*.html',
  styles = 'styles/lenkki.styl',
  scriptfiles = 'app/js/**';
 
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

gulp.task('copyfonts', function(){
  return gulp.src('node_modules/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('www/fonts'));
});

gulp.task('styles', function(){
  return gulp.src(styles)
    .pipe(stylus({
      'include css': true
      }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('scripts', function() {
  return browserify({
      entries: './app/js/app.js', 
      extensions: ['.js', '.jsx'],
      debug: true
    })
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('www/js'));
  
});

gulp.task('watch', function(){
  gulp.watch(html, ['copyhtml']);
  gulp.watch(styles, ['styles']);
  gulp.watch(scriptfiles, ['scripts']);

});

gulp.task('default', ['copyhtml', 'styles', 'scripts', 'copyfonts', 'webserver', 'watch']);