var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    cp          = require('child_process'),
    jade        = require('gulp-jade'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    deploy      = require('gulp-gh-pages');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/* Build the Jekyll Site */
gulp.task('jekyll-dev', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config_dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

/* Build the Jekyll Site */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('close', done);
});



/* Rebuild Jekyll & do page reload */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});
gulp.task('jekyll-rebuild-dev', ['jekyll-dev'], function () {
    browserSync.reload();
});


/* Wait for jekyll-dev, then launch the Server */
gulp.task('browser-sync-dev', ['sass', 'jekyll-dev'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});



/* Compile files from _sass into both _site/assets/css (for live injecting) and _sass (for future jekyll builds) */
gulp.task('sass', function () {
 return gulp.src('_sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('_site/assets/css'))
  .pipe(browserSync.reload({stream:true}))
});


/* Compile files from _jadefiles into _/includes */
gulp.task('jade', function(){
  return gulp.src('_jadefiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('_includes'));
});


/* combile javascript into 1 file main.js in _js then minfiy, map, and rename it to main.min.js in _site/assets/js */
gulp.task('scripts', function() {
  return gulp.src(['_js/jquery-3.1.1.min.js', '_js/myfunctions.js', '_js/youscrolledhowmuch.js', '_js/color.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('_js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/assets/js'));
});


/* Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync */
gulp.task('watch', function () {
    gulp.watch('_sass/**/*.sass', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*', '_posts/*'], ['jekyll-rebuild', 'sass', 'scripts']);
    gulp.watch('_js/*.js', ['scripts']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
});

gulp.task('watch-dev', function () {
    gulp.watch('_sass/**/*.sass', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*', '_posts/*'], ['jekyll-rebuild-dev', 'sass', 'scripts']);
    gulp.watch('_js/*.js', ['scripts']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
});

/* Default task, running just `gulp` will compile the sass,
 * Compile the jekyll site, launch BrowserSync & watch files. */
gulp.task('default', ['browser-sync', 'watch', 'sass', 'scripts']);
gulp.task('dev', ['browser-sync-dev', 'watch-dev', 'sass', 'scripts']);



/* Push build to gh-pages */
// gulp.task('deploy', function () {
//   return gulp.src("_site/**/*")
//     .pipe(deploy())
// });
