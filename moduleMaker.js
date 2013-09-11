var fs = require('fs');
var folderName = process.argv[2];
var _ = require('lodash');

var blockDefinitions = '';
var helpUrl = '';

module.exports = function(path_to_build){
  blockDefinitions = '';

  var requestedPath = __dirname + '/' + folderName;
  var categoryXML = xmlForPath(requestedPath);

  return [categoryXML, blockDefinitions];

}

function xmlForPath(pathFromHere){
  var result = '';
  var categoryXML = '';
  blockDefinitions += 'var helpUrl = "";';

  if(fs.statSync(pathFromHere).isDirectory()){

    result += '<category name="'+nameForPath(pathFromHere)+'">';

    var folderContents = fs.readdirSync(pathFromHere);
    if(_.contains(folderContents, 'help')){
      helpUrl += fs.readFileSync( pathFromHere+ '/help' );
    }
    for(thing in folderContents){
      if(folderContents[thing]!=='.DS_Store' && folderContents[thing] !== 'help')
        result += xmlForPath(pathFromHere + '/' + folderContents[thing]);
    }

    result += '</category>';

  }else{

    var parsedPath = pathFromHere.split('/');
    var fileName = parsedPath[parsedPath.length-1];
    result += '<block type="'+fileName+'"></block>';

    blockDefinitions += 'helpUrl = "'+ helpUrl +'";';
    blockDefinitions += fs.readFileSync(pathFromHere);

  }
  return result;
}

function nameForPath(path){
  var parsed = path.split('/');
  return parsed[parsed.length-1];
}