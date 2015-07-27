var funnel = require('broccoli-funnel');

var mergeTrees = require('broccoli-merge-trees');

var transpile = require('broccoli-babel-transpiler');

var sourceTree = funnel(transpile('src'), { destDir: 'src' });

var vendorTree = funnel('vendor', { destDir: 'vendor' });
var bowerTree = funnel('bower_components', { destDir: 'bower_components' });

var examples = funnel('examples');

module.exports =  mergeTrees([vendorTree, bowerTree, examples, sourceTree]);
