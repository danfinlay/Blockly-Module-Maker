var maker = require('./moduleMaker');

module.exports = function(requestedFolder){

  var blocks = maker(requestedFolder);
  var finalResult = 'extensionXml += unescape("' + escape(blocks[0]) + '");';
  finalResult += blocks[1];

  return finalResult;

}