#!/usr/local/bin/node
var fs = require('fs');
var json2csv = require('json-2-csv');
var dataFile = fs.readFileSync("school.json");
dataFile=JSON.stringify(JSON.parse(dataFile));
dataFile=dataFile.replace(/_version":"201509/g, '_version":"2015-09-');
var data = JSON.parse(dataFile);
var filtered = [];
var startDate = "2015-09-02";
var endDate = "2015-10-04";
var output_filenameRoot = "schools-"+startDate+endDate;
var zipList = output_filenameRoot+".zip "+output_filenameRoot+".csv ";
data.forEach(function(item, index){
	if(item._version>startDate && item._version<endDate){
		var attachments = [];
		item._attachments.forEach(function(item_1, index_1){
			var filename = JSON.stringify(item_1.filename).split("/");
			filename = filename[filename.length-1];
			attachments.push(filename);
		});
		item._pictures = attachments.join(",").replace(/"/g,"");
		zipList += attachments.join(" ").replace(/"/g, "");
		filtered.push(item);
	}
});

json2csv.json2csv(data, function(err, csv){
	if (err) throw err;
	console.log(csv);
});