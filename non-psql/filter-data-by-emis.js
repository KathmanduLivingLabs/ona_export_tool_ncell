#!/usr/local/bin/node

var fs = require('fs');
var glob = require('glob');
var data = fs.readFileSync(process.argv[3], "utf8");
//dataFile=dataFile.replace(/_submission_time":"201509/g, '_submission_time":"2015-09-');
var data = JSON.parse(data);
var filtered = [];
//var filteredInnerArray = [];
var emis = process.argv[2];


var outputFileName = process.argv[2] + "_" + process.argv[3];
glob("./_temp/*_"+outputFileName, function(err, fileList) {

	if (err) throw err;

	outputFileName = fileList.length + "_" + outputFileName;
var fileNameList=[];
	data.forEach(function(item, index) {
//		var fileNameList = [];
JSON.stringify(item).match(new RegExp((process.argv[2]+"-\w+"), "i"))?console.log(JSON.stringify(item).match(new RegExp((process.argv[2]+"-\w+"), "i"))):1;
		if (JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+-\d", "i"))) {
			console.log(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+-\d", "i")));
			if(filtered.length){
			filtered.forEach(function(item_1, index_1){
				if (JSON.stringify(item_1).match(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+-\d+", "i"))[0])){
					filtered[index_1].push(item);
				}
			});
		}else{
			filtered.push([item]);
		}

		fileNameList.push(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+-\d+", "i"))[0]+".json");

		}else if(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+", "i"))){
console.log(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+", "i")));

			if(filtered.length){
			filtered.forEach(function(item_1, index_1){
				if (JSON.stringify(item_1).match(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+", "i"))[0])){
					filtered[index_1].push(item);
				}
			});
		}else{
			filtered.push([item]);
		}

		fileNameList.push(JSON.stringify(item).match(new RegExp(process.argv[2]+"-\w+", "i"))[0]+".json");

		}else if(JSON.stringify(item).match(new RegExp(process.argv[2], "i"))){
			filtered.push([item]);
			fileNameList.push(JSON.stringify(item).match(new RegExp(process.argv[2], "i"))[0]+".json");
		}
	});

	

	filtered.forEach(function(item, index){
		fs.writeFileSync("./_temp/"+fileNameList[index], JSON.stringify(item));
	});

	//fs.writeFileSync("./_temp/"+outputFileName, JSON.stringify(filtered));

	console.log(fileNameList.join(" "));

});
