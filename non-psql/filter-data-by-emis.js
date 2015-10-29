#!/usr/local/bin/node

var fs = require('fs');
var glob = require('glob');
var data = fs.readFileSync('../' + process.argv[3], "utf8");
//dataFile=dataFile.replace(/_submission_time":"201509/g, '_submission_time":"2015-09-');
var data = JSON.parse(data);
var filtered = [];
var emis = process.argv[2];


var outputFileName = process.argv[2] + "_" + process.argv[3];
glob("../_temp/*_"+outputFileName, function(err, fileList) {

	if (err) throw err;

	outputFileName = fileList.length + "_" + outputFileName;

	data.forEach(function(item, index) {
		if (JSON.stringify(item).match(new RegExp(process.argv[2], "i"))) {
			filtered.push(item);
		}
	});

	fs.writeFileSync("../output/"+outputFileName, JSON.stringify(filtered));

	console.log(outputFileName);

});