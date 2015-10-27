#!/usr/local/bin/node
var fs = require('fs');
var json2csv = require('json2csv');
var dataFile = fs.readFileSync(process.argv[4], "utf8");

var startDate = process.argv[2];
var endDate = process.argv[3];
var output_filenameRoot = (function(name){
	var prefix = name.split(".");
	prefix.pop();
	prefix.join(".");
	return prefix;
}(process.argv[4]))+"_"+startDate.replace(/-/g,"_")+"_"+endDate.replace(/-/g,"_");
var zipList = output_filenameRoot+".zip "+output_filenameRoot+".csv ";


// This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
                ){
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[ 3 ];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
    }



var data = CSVToArray(dataFile, ',');

var headers = data.shift();

var dateColumn = headers.indexOf("_submission_time");
var emisColumn = headers.indexOf("general_detail/emis/school_emis");


var filtered = [headers.join(",")];
var emis = "";

data.forEach(function(item, index){
	try{
	var itemSubmissionDate = item[dateColumn].split("T")[0];
	if(itemSubmissionDate>=startDate && itemSubmissionDate<=endDate){
		filtered.push(item.join(","));
		emis += ", "+item[emisColumn];
        zipList += " " + item.join(";").match(/(\d)+.jpg/gi).join(" ");
	}
}catch(e){
	//console.log("error: empty line or submission date not found");
	//console.log(item);
}

});


fs.writeFileSync(output_filenameRoot+".csv", filtered.join("\n"));
fs.writeFileSync("emis.txt", emis);

console.log(zipList);


/*var filtered = [];
var startDate = process.argv[2];
var endDate = process.argv[3];
var output_filenameRoot = (function(name){
	var prefix = name.split(".");
	prefix.pop();
	prefix.join(".");
	return prefix;
}(process.argv[4]))+"_"+startDate.replace(/-/g,"_")+endDate.replace(/-/g,"_");
var zipList = output_filenameRoot+".zip "+output_filenameRoot+".csv ";
var headers = [];
var emis = "";
data.forEach(function(item, index){
var itemSubmissionDate = item._submission_time.split("T")[0];
	if(itemSubmissionDate>=startDate && itemSubmissionDate<=endDate){
		var attachments = [];
		item._attachments.forEach(function(item_1, index_1){
			var filename = JSON.stringify(item_1.filename).split("/");
			filename = filename[filename.length-1];
			attachments.push(filename);
		});

		emis += ", "+item["general_detail/verification/save_name"];

		Object.keys(item).forEach(function(key_1, index_1){
			item[key_1] = JSON.stringify(item[key_1]);
			if(!(headers.indexOf(key_1)+1)){
				headers.push(key_1);
			}
		});
		item._pictures = attachments.join(",").replace(/"/g,"");
		zipList += attachments.join(" ").replace(/"/g, "");
		filtered.push(item);
	}
});

json2csv({data: data, fields: headers}, function(err, csv){
	if (err) throw err;
	fs.writeFileSync(output_filenameRoot+".csv", csv);
	fs.writeFileSync("emis.txt", emis);
	console.log(zipList);
});
*/











