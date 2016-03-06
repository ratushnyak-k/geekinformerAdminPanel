var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tsProject = tsc.createProject('tsconfig.json'),
    config = require('./gulp.config')(),
    util = require('gulp-util'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
    stylus = require('gulp-stylus'),
    prefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    reload = browserSync.reload;

function Gdelete(error, deletedFiles) {
    if (error) error(error);
    util.log(util.colors.yellow('Files deleted: ', deletedFiles.join(', ')));
}

function error(error) {
    util.log(util.colors.red(error.toString()));
}

function change(event) {
    util.log(util.colors.blue('File ' + event.path + ' was ' + event.type));
}

gulp.task('ts-lint', function() {
    return gulp.src(config.allTs)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
});

gulp.task('compile-ts', function() {
    var sourceTsFiles = [
        config.allTs
    ];

    var tsResult = gulp
        .src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

browserSync({
    port: 3000,
    files: ['index.html', '**/*.js', 'app/static/styles/src/*.styl', 'app/components/**/*.html'],
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'silent',
    notify: true,
    reloadDelay: 0,
    server: {
        baseDir: ['./'],
        middleware: superstatic({ debug: false })
    }
});

gulp.task('watch', function() {
    var styleWatcher = gulp.watch(['app/static/styles/src/*.styl'], ['style:dev']);
    var jsWatcher = gulp.watch([config.allTs], ['ts-lint', 'compile-ts']);
    var imgWatcher = gulp.watch(['app/static/images/src/*.*'], ['image']);
    var spriteWatcher = gulp.watch(['src/img/sprite/*.png'], ['sprite']);

});
gulp.task('style:dev', ['css:del'], function() {
    return gulp.src('app/static/styles/src/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus()).on('error', error)
        .pipe(prefixer({ browsers: ['last 2 version'], cascade: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/static/styles/dist/'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('css:del', function() {
    del('app/static/styles/dist/*.css', Gdelete);
});

gulp.task('image', ['img:del'], function() {
    return gulp.src('app/static/images/src/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        })).on('error', error)
        .pipe(gulp.dest('app/static/images/dist'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('img:del', function() {
    del('app/static/images/dist', Gdelete);
});
gulp.task('default', ['compile-ts', 'watch', 'style:dev', 'image']);
