var fs = require('fs');
var uglify = require('uglify-js');

function minify(files, target, debug) {
  var all = '';

  files.forEach(function(file, i) {
      all += fs.readFileSync(file).toString();
  });

  var out = fs.openSync(target, 'w+');

  if(!debug) {
    var ast = uglify.parser.parse(all);
    ast = uglify.uglify.ast_mangle(ast);
    ast = uglify.uglify.ast_squeeze(ast);
    fs.writeSync(out, uglify.uglify.gen_code(ast));
  } else {
    fs.writeSync(out, all);
  }

}

desc('Uglify JS');
task('minify', [], function(debug) {
  var files = [ 'ext/js/jquery.js',
                'js/util.js',
                'js/graphics-canvas.js',
                'js/world.js',
                'js/objects.js',
                'js/objects/player.js',
                'js/objects/fixed.js',
                'js/objects/edge_portal.js',
                'js/objects/hud.js',
                'js/objects/item.js',
                'js/objects/portal.js',
                'js/objects/background.js',
                'js/objects/textbox.js',
                'js/input.js',
                'js/item_db.js',
                'js/events.js',
                'js/action_queue.js',
                'js/actions/textbox.js',
                'js/actions/teleport.js',
                'js/inventory.js',
                'js/menu.js',
                'js/main.js' 
              ];
  minify(files, 'pub/all.js', debug);

  var tools = [ 'ext/js/jquery.js',
                'js/util.js',
                'js/graphics-canvas.js',
                'js/tools/sprite_viewer.js' ]
  minify(tools, 'pub/sprite_viewer.js', debug);

});

task('default', [], function(params) {
    jake.Task['minify'].invoke(true /* debug */);
});

task('release', [], function(params) {
    jake.Task['minify'].invoke();
});
