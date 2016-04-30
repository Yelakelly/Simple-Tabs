var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");

gulp.task('copyfonts', function() {
   gulp.src('./fonts/**/*')
   .pipe(gulp.dest('dist/fonts'));
});

gulp.task('useref', function(){
  return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulp.dest('dist'));
});


gulp.task('sprite', function () {
  var spriteData = gulp.src('img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss'
  }));
  return spriteData.pipe(gulp.dest('img/sprite/'));
});

gulp.task('watch', ['sass','jade'], function(gulpCallback) {
  browserSync.init({
    // serve out of app/
    server: './',
    // launch default browser as soon as server is up
    open: true,
    index: "index.html"
  }, function callback() {
    // (server is now up)

    gulp.watch(["./**/*.jade"], ['jade']);

    // watch html and reload browsers when it changes
    gulp.watch('./*.html', browserSync.reload);

    // when sass files change run specified gulp task
    gulp.watch('./sass/**/*.scss', ['sass']);

    gulp.watch("./js/**/*.js", browserSync.reload);

    gulp.watch("./img/**/*.*", browserSync.reload);

    // notify gulp that this task is done
    gulpCallback();
  });
});


gulp.task('jade', function() {
  gulp.src('./**/*.jade')
    .pipe(plumber(function(error){
        notify.onError({
            title:    "Sass - error",
            subtitle: "You prat! What've you done now?!",
            message:  "Error: " + error.message,
            sound:    "Beep"
          })(error);
        this.emit('end');
    }))
    .pipe(jade({
      pretty:true
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss*')
    .pipe(plumber(function(error){
        notify.onError({
            title:    "Sass - error",
            subtitle: "You prat! What've you done now?!",
            message:  "Error: " + error.message,
            sound:    "Beep"
          })(error);
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('css/'))
    // if BrowserSync's static server isn't running this stream is a no-op passthrough
    .pipe(browserSync.stream());
});


gulp.task('default', ['watch']);
