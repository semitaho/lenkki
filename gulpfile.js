require('babel-core/register');
var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  mocha = require('gulp-mocha'),
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

var buildTasks = ['copyhtml', 'styles', 'scripts', 'copyfonts'];
gulp.task('default', buildTasks.concat(['webserver', 'watch']));
gulp.task('build', buildTasks);
gulp.task('test', function(){
  return gulp.src('test/**.js')
    .pipe(mocha());

});
