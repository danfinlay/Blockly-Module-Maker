var fs = require('fs');
var folderName = process.argv[2];

var blockDefinitions = '';

module.exports = function(path_to_build){
  blockDefinitions = '';

  var requestedPath = __dirname + '/' + folderName;
  var categoryXML = xmlForPath(requestedPath);

  return [categoryXML, blockDefinitions];

}

function xmlForPath(pathFromHere){
  var result = '';
  var categoryXML = '';

  if(fs.statSync(pathFromHere).isDirectory()){

    result += '<category name="'+nameForPath(pathFromHere)+'">';

    var folderContents = fs.readdirSync(pathFromHere);
    for(thing in folderContents){
      if(folderContents[thing]!=='.DS_Store')
        result += xmlForPath(pathFromHere + '/' + folderContents[thing]);
    }

    result += '</category>';

  }else{

    var parsedPath = pathFromHere.split('/');
    var fileName = parsedPath[parsedPath.length-1];
    result += '<block type="'+fileName+'"></block>';

    blockDefinitions += fs.readFileSync(pathFromHere);

  }
  return result;
}

function nameForPath(path){
  var parsed = path.split('/');
  return parsed[parsed.length-1];
}