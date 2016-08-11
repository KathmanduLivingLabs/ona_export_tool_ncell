#!/usr/bin/env node

var fs = require('fs');
var dataFile = fs.readFileSync("schools.json", "utf8");
dataFile = JSON.stringify(JSON.parse(dataFile));
var data = JSON.parse(dataFile);
dataFile = null;
var districtNames = JSON.parse(fs.readFileSync("district-code-name.json","utf8"));
var vdcNames = JSON.parse(fs.readFileSync("vdc-code-name.json","utf8"));	
var emis = [];
var project_id = [];
var submissionTime = [];
var surveyorID = [];
var district = [];
var vdc = [];
var ward = [];
var government_auth = [];
var community_auth = [];
var project_manager = [];
var number_of_volunteers_central = [];
var number_of_volunteers_local = [];
var number_of_members = [];
var number_of_children = [];
var material_used = [];
var builder_name = [];

data.forEach(function(item, index) {
	/*if (process.argv[2] !== '999' && !process.argv[2].match(new RegExp(item.surveyor_id, 'i'))) {
		return;
	}*/
	var itemSubmissionDate = item._submission_time.split("T")[0];
	//emis.push(item["_id"].replace("EMIS", ""));
	emis.push(item["_id"]);
    project_id.push(item["project_id"])
	submissionTime.push(itemSubmissionDate);
	//surveyorID.push(item.surveyor_id);
    district.push(districtNames[item.district]);
    vdc.push(vdcNames[item.district+'00'+item.vdc.substring(item.vdc.length-2)]);
    ward.push(item.ward);
    government_auth.push(item.gov_auth);
    community_auth.push(item.community_auth);
    project_manager.push(item.project_manager);
    number_of_volunteers_central.push(item.number_of_volunteers_central);
    number_of_volunteers_local.push(item.number_of_volunteers_local);
    number_of_members.push(item.number_of_members);
    number_of_children.push(item.number_of_children);
    material_used.push(item.material_used);
    builder_name.push(item.builder_name);
});

console.log(
            emis.join(";") + "|" 
            + submissionTime.join(";") + "|" 
            + district.join(";") + "|"
            + vdc.join(";") + "|" 
            + ward.join(";") + "|" 
            + government_auth.join(";") + "|"
            + community_auth.join(";") + "|"
            + project_manager.join(";") + "|"
            + number_of_volunteers_central.join(";") + "|" 
            + number_of_volunteers_local.join(";") + "|"
            + number_of_members.join(";") + "|"
            + number_of_children.join(";") + "|"
            + material_used.join(";") + "|"
            + builder_name.join(";") + "|"
            + project_id.join(";")
            );
