var gulp = require('gulp')
var tslint = require('gulp-tslint')
var ts = require('gulp-typescript')

var tsProject = ts.createProject({
  removeComments: true,
  noImplicitAny: true, // 在表达式和声明上有隐含的any类型时报错
  target: 'ES3',
  module: 'commonjs',
  declarationFiles: false, // 生成响应的.d.ts
})

var tsTestProject = ts.createProject({
  removeComments: true,
  noImplicitAny: true, // 在表达式和声明上有隐含的any类型时报错
  target: 'ES3',
  module: 'commonjs',
  declarationFiles: false, // 生成响应的.d.ts
})

gulp.task('tsc', function () {
  return gulp.src('./source/ts/**/**.ts')
    .pipe(ts(tsProject))
    .js.pipe(gulp.dest('./temp/source/js'))
})

gulp.task('tsc-tests', function () {
  return gulp.src('./test/**/**.ts')
    .pipe(ts(tsTestProject))
    .js.pipe(gulp.dest('./temp/test'))
})

gulp.task('lint', function () {
  return gulp.src([
    './source/ts/**/**.ts',
    './test/**/**.test.ts',
  ]).pipe(tslint())
    .pipe(tslint.report('vebose'))
})



gulp.task('default', ['lint', 'tsc', 'tsc-tests'])