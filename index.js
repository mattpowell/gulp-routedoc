var Through2 = require('through2');
var Path = require('path');
var Gutil = require('gulp-util');
var Routedoc = require('routedoc');

module.exports = function (opts) {
  opts = opts || {};

  if (typeof opts.as !== 'string') {
    opts.as = 'json';
  }

  return Through2.obj(function(file, encoding, callback) {
    var routes = null;
    var err;
    
    if (['commonjs', 'amd', 'json', 'es6'].indexOf(opts.as.toLowerCase()) === -1) {
      this.emit('error', new Gutil.PluginError('gulp-routedoc', new Error('Unknown `as` option: ' + opts.as), {
        fileName: file.path
      }));
      return;
    }

    try {
      routes = Routedoc({
        conf: file.contents,
        mode: opts.strict ? 'strict' : (opts.mode ? opts.mode : null)
      });
    }catch(e) {
      err = e;
    }

    if (routes) {
      var result = JSON.stringify(routes, null, 2);

      if (opts.as === 'commonjs') {
        result = 'module.exports = ' + result;
      }else if (opts.as === 'amd') {
        result = 'define(function() { return ' + result + '})';
      }else if (opts.as === 'es6') {
        result = 'export default ' + result;
      }
      
      file.path += '.js';
      file.contents = new Buffer(result);
    }

    callback(err, file);

  });
}
