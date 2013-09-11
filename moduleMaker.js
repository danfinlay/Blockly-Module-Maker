var fs = require('fs');
var folderName = process.argv[2];
console.log("Requested folder: "+folderName);


module.exports = function(path_to_build){
  var requestedPath = __dirname + '/' + folderName;
  categoryXML += xmlForPath(requestedPath);

  var blockDefinitions = '';

  return [categoryXML, blockDefinitions];

}

function xmlForPath(pathFromHere){
  var result = '';

  if(fs.statSync(pathFromHere).isDirectory()){

    result += '<category name="'+pathFromHere+'">';

    var folderContents = fs.readdirSync(pathFromHere);
    for(thing in folderContents){
      result += xmlForPath(pathFromHere + '/' + folderContents[thing]);
    }

    result += '</category>';

  }else{

    var parsedPath = pathFromHere.split('/');
    var fileName = parsedPath[parsedPath.length-1];

    result += '<block type="'+fileName+'"></block>';
    categoryXML += fs.readFileSync(pathFromHere);
  }
  return result;
}