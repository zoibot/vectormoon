var fs = require('fs');
var uglify = require('uglify-js');

desc('Uglify JS');
task('minify', [], function(debug) {
  var all = '';
  var files = [ 'ext/js/jquery.js',
                'js/util.js',
                'js/graphics-canvas.js',
                'js/world.js',
                'js/objects.js',
                'js/objects/player.js',
                'js/objects/fixed.js',
                'js/objects/background.js',
                'js/objects/textbox.js',
                'js/input.js',
                'js/events.js',
                'js/menu.js',
                'js/main.js' 
              ];
  files.forEach(function(file, i) {
      all += fs.readFileSync(file).toString();
  });

  var out = fs.openSync('pub/all.js', 'w+');
  if(!debug) {
    var ast = uglify.parser.parse(all);
    ast = uglify.uglify.ast_mangle(ast);
    ast = uglify.uglify.ast_squeeze(ast);
    fs.writeSync(out, uglify.uglify.gen_code(ast));
  } else {
    fs.writeSync(out, all);
  }
});

task('default', [], function(params) {
    jake.Task['minify'].invoke(true /* debug */);
});

task('release', [], function(params) {
    jake.Task['minify'].invoke();
});
