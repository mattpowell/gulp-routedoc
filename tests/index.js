var assert = require('assert');
var file = require('vinyl');
var routedoc = require('../');

var expected = {
  es6: [
    'export default [',
    '  {',
    '    "method": "GET",',
    '    "name": "routedoc_path_here",',
    '    "doc": null,',
    '    "path": {',
    '      "value": "/path/:id",',
    '      "regex": {}',
    '    },',
    '    "params": {',
    '      "id": {',
    '        "type": {',
    '          "type": "NameExpression",',
    '          "name": "string"',
    '        },',
    '        "doc": null',
    '      }',
    '    },',
    '    "returns": null,',
    '    "tags": {}',
    '  }',
    ']'
  ].join('\n'),

  commonjs: [
    'module.exports = [',
    '  {',
    '    "method": "GET",',
    '    "name": "routedoc_path_here",',
    '    "doc": null,',
    '    "path": {',
    '      "value": "/path/:id",',
    '      "regex": {}',
    '    },',
    '    "params": {',
    '      "id": {',
    '        "type": {',
    '          "type": "NameExpression",',
    '          "name": "string"',
    '        },',
    '        "doc": null',
    '      }',
    '    },',
    '    "returns": null,',
    '    "tags": {}',
    '  }',
    ']'
  ].join('\n'),

  amd: [
    'define(function() { return [',
    '  {',
    '    "method": "GET",',
    '    "name": "routedoc_path_here",',
    '    "doc": null,',
    '    "path": {',
    '      "value": "/path/:id",',
    '      "regex": {}',
    '    },',
    '    "params": {',
    '      "id": {',
    '        "type": {',
    '          "type": "NameExpression",',
    '          "name": "string"',
    '        },',
    '        "doc": null',
    '      }',
    '    },',
    '    "returns": null,',
    '    "tags": {}',
    '  }',
    ']})'
  ].join('\n'),

  json: [
    '[',
    '  {',
    '    "method": "GET",',
    '    "name": "routedoc_path_here",',
    '    "doc": null,',
    '    "path": {',
    '      "value": "/path/:id",',
    '      "regex": {}',
    '    },',
    '    "params": {',
    '      "id": {',
    '        "type": {',
    '          "type": "NameExpression",',
    '          "name": "string"',
    '        },',
    '        "doc": null',
    '      }',
    '    },',
    '    "returns": null,',
    '    "tags": {}',
    '  }',
    ']'
  ].join('\n')
};

var tests = Object.keys(expected);
(function next() {
  var test = tests.pop();
  if (test) {

    var input = new file({
      contents: new Buffer([
        '/**',
        ' * @name routedoc_path_here',
        ' */',
        'GET /path/:id',
        '',
      ].join('\n')),
      path: 'route.conf'
    });

    var plugin = routedoc({
      as: test
    });

    plugin.once('data', function(file) {
      var actual = file.contents.toString().trim();
      assert.equal(actual, expected[test]);
      next();
    });

    plugin.write(input);

  }else {
    console.log('Tests passed!');
  }
}())
