var builder = require('bloccoliBuilder');

var requestedFolder = process.argv[2];

process.stdout.write(builder(requestedFolder));