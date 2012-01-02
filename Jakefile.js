var fs = require('fs');
var uglify = require('uglify-js');

desc('Uglify JS');
task('minify', [], function(params) {
  var all = '';
  var files = [ 'ext/js/jquery.js',
                'ext/js/glMatrix-0.9.5.min.js',
                'js/graphics.js',
                'js/world.js',
                'js/objects.js',
                'js/main.js' ];
  files.forEach(function(file, i) {
      all += fs.readFileSync(file).toString();
  });

  var ast = uglify.parser.parse(all);
  var out = fs.openSync('pub/all.js', 'w+');
  if(!params) {
    ast = uglify.uglify.ast_mangle(ast);
    ast = uglify.uglify.ast_squeeze(ast);
  }
  fs.writeSync(out, uglify.uglify.gen_code(ast));
});

task('default', [], function(params) {
    jake.Task['minify'].invoke(true /* debug */);
});

task('release', [], function(params) {
    jake.Task['minify'].invoke();
});
