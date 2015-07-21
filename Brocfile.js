var funnel = require('broccoli-funnel');

var mergeTrees = require('broccoli-merge-trees');

var sourceTree = funnel('src', { destDir: 'src' });

var vendorTree = funnel('vendor', { destDir: 'vendor' });

var examples = funnel('examples');

module.exports =  mergeTrees([vendorTree, examples, sourceTree]);

