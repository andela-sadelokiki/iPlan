// Load Node Modules/Plugins
var gulp = require('gulp');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var myth = require('gulp-myth');
// var jshint = require('gulp-jshint');
// var imagemin = require('gulp-imagemin');
// var connect = require('connect');
// var serveStatic = require('serve-static');
// var browsersync = require('browser-sync');
var jade = require('gulp-jade');

// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var plumber = require('gulp-plumber');
// var beeper = require('beeper');
// var del = require('del');
// var sourcemaps = require('gulp-sourcemaps');
// var awspublish = require('gulp-awspublish');
// var fs = require('fs');
// var jshint = require('gulp-jshint');


// Error helper
function onError(e) {
  beeper();
  console.log(e);
}

// Process Styles
gulp.task('styles', function() {
  return gulp.src('app/css/*.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('all.css'))
    .pipe(myth())
    .pipe(gulp.dest('dist/'));
});

// Process Scripts
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

// Process Images
gulp.task('images', function() {
  return gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
});

// Server Task
gulp.task('serve', function() {
  return connect().use(serveStatic(__dirname))
    .listen(1339)
    .on('listening', function() {
      console.log('Server Running: View at http://localhost:8080');
    });
});

// BrowserSync Task
gulp.task('browsersync', function(cb) {
  return browsersync({
    server: {
      baseDir: './'
    }
  }, cb);
});

// Browserify Task
gulp.task('browserify', function() {
  return browserify('./app/js/app.js')
    .bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
    .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/'));
});

// Clean Task
gulp.task('clean', function(cb) {
  return del(['dist/*'], cb)
});

// Code lint Task
gulp.task('lint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Deploy Task
gulp.task('deploy', function() {
  var aws = JSON.parse(fs.readFileSync('./aws.json')),
      publisher = awspublish.create({
        key: aws.key,
        secret: aws.secret,
        bucket: '<BUCKETURL>',
      }),
      headers = {
        'Cache-Control': 'max-age=86400000, public', //1 day
      };

  gulp.src('./dist/**')
    .pipe(publisher.publish(headers))
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});

// Jade
gulp.task('jade', function() {
  return gulp.src(['public/*.jade', 'public/**/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('public'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  // gulp.watch('app/css/*.css', ['styles', browsersync.reload]);
  // gulp.watch('app/js/*.js', ['scripts', browsersync.reload]);
  // gulp.watch('app/img/*', ['images', browsersync.reload]);
  gulp.watch(['public/*.jade', 'public/**/*.jade'], ['jade']);
});

// Default Task
gulp.task('default', ['jade', 'watch']);
