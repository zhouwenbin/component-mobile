var gulp = require('gulp');
var svgSprite = require("gulp-svg-sprites");

gulp.task('default', function () {
    return gulp.src('app/static/svg/*.svg')
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest("app/static/inlinesvg"))
});