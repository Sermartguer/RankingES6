const gulp = require('gulp');
const babel = require('gulp-babel');
var browserify = require("browserify");
var fs = require("fs");
var webserver = require('gulp-webserver');

gulp.task("default", function () {
    gulp.start(["browserify","webserver","watch"]);
  });
  if (!fs.existsSync('bin')){
    fs.mkdirSync('bin');
}
  gulp.task('browserify', function() {
    browserify("./src/main.js")
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(fs.createWriteStream("bin/main.js"));
    });

    gulp.task('webserver', function() {
      gulp.src('./')
      .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
      }));
    });
    
// Gulp watch syntax
gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['browserify']); 
  // Other watchers
})