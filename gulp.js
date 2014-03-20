// gulp config


var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var livereload   = require('gulp-livereload');
var lr           = require('tiny-lr');
var server       = lr();


// compile sass files

gulp.task('styles', function() {
  return gulp.src('scss/base.scss')
    .pipe(sass({style: 'compressed'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios6', 'android 4'))
    .pipe(gulp.dest('css/base.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('css/base.css'))
    .pipe(livereload(server));
});

gulp.task('watch', function() {
  server.listen(35729, function (err) {

    if (err) {
      return console.log(err);
    }

    // watch .scss files
    gulp.watch('scss/**/*.scss', ['styles']);

  });
});

gulp.task('default', function() {
  gulp.start( 'styles', 'watch');
});