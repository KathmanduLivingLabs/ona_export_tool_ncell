#!/usr/bin/env node

var fs = require('fs');
var dataFile = fs.readFileSync("schools.json", "utf8");
dataFile = JSON.stringify(JSON.parse(dataFile));
var data = JSON.parse(dataFile);
var emis = [];
var submissionTime = [];
var surveyorID = [];

data.forEach(function(item, index) {
	if (process.argv[2] !== '999' && !process.argv[2].match(new RegExp(item.surveyor_id, 'i'))) {
		return;
	}
	var itemSubmissionDate = item._submission_time.split("T")[0];
	emis.push(item["school_emis"].replace("EMIS", ""));
	submissionTime.push(itemSubmissionDate);
	surveyorID.push(item.surveyor_id);
});

console.log(emis.join(";") + "|" + submissionTime.join(";") + "|" + surveyorID.join(";"));
