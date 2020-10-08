const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps');


// Compile SASS
gulp.task('sass', function (cb) {
    gulp.src('./src/assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded"
        }).on("error", sass.logError))
        .pipe(
            prefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: false
            })
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('./src/assets/css'))
    cb();
});

//Watch
gulp.task('watch', function () {
    browserSync.init({
		server: {
			baseDir: "./src/",
            index: "index.html",
        },
        port: 6416,
        notify: false
    });
    
    gulp.watch(['./src/**/*.html', './src/**/*.scss', './src/**/*.js'], gulp.series('sass')).on("change", browserSync.reload);
    
})

//Default Task
gulp.task('default', gulp.parallel('sass', 'watch'));