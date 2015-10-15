#!/usr/bin/node
var fs = require('fs');
var json2csv = require('json2csv');
var dataFile = fs.readFileSync(process.argv[4]);
dataFile=JSON.stringify(JSON.parse(dataFile));
dataFile=dataFile.replace(/_version":"201509/g, '_version":"2015-09-');
var data = JSON.parse(dataFile);
var filtered = [];
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
data.forEach(function(item, index){
	if(item._version>=startDate && item._version<=endDate){
		var attachments = [];
		item._attachments.forEach(function(item_1, index_1){
			var filename = JSON.stringify(item_1.filename).split("/");
			filename = filename[filename.length-1];
			attachments.push(filename);
		});

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
	console.log(zipList);
});












