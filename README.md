# gulp-routedoc
> Gulp plugin for [routedoc](https://github.com/mattpowell/routedoc).

Example
-------
```js
var gulp = require('gulp');
var routedoc = require('gulp-routedoc');

gulp.task('generate-urls', function() {
  return gulp.src('./web/routes')
    .pipe(routedoc({
      as: 'es6'
    })
    .pipe(gulp.dest('build/public/js/routes'));
});
```

The above example will parse the routes file (located in `web/routes`) and output as an es6 module in `build/public/js/routes`.

Options
-------
* Setting `as` as either `es6`, `commonjs`, `amd`, or `json` will cause the output format to be the corresponding type.
* Setting `mode` as `strict` (or `strict: true`) will cause the routedoc parser to run in strict mode.

License
-------
MIT