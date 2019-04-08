var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');


gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))

})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8688,
            proxies: [{
                source: '/info/getData',
                target: 'http://localhost:3000/info/getData'
            }]
        }))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))