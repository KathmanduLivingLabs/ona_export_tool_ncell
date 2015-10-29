/// node index_buildings.js dataFile.json labelMap.json


var fs = require('fs');
var conversion = require("phantom-html-to-pdf")();

var schoolData;
var schoolLabels;
var branchingKeys;
var buildingData;
var buildingElementsData;
var outputFilePrefix;
var jsonIndex;
var districtLabel = 'District:';
var vdcLabel = 'VDC / Municipality';

if(process.argv[4].toLowerCase().trim() === 'schools') {
	outputFilePrefix = 'school';
	jsonIndex = 'general_detail/emis/school_emis';
	districtLabel = '1.1) District:';
	vdcLabel = '1.2) VDC / Municipality';
} else if(process.argv[4].toLowerCase().trim() == 'buildings') {
	outputFilePrefix = 'buildings';
	jsonIndex = 'building_assessment/general_building_info/general_building_info_1/building_code/building_ref_no';
} else if(process.argv[4].toLowerCase().trim() === 'building_elements') {
	outputFilePrefix = 'building_elements';
	jsonIndex = 'piece_assessment/building_peice_code/piece_reference';
} else 
		throw 'err';

var IMAGE_URL = 'http://ona.io/api/v1/files/615342?filename=wbsida321/attachments/';

//second argument label maps
schoolLabelsGlobal = fs.readFileSync('files/' + process.argv[3], 'utf8');
//schoolLabels = fs.readFileSync('school_label.json', 'utf8');
schoolLabelsGlobal =  JSON.parse(schoolLabelsGlobal);

branchingKeys = fs.readFileSync('files/' + process.argv[3]+".branchingkeys.json", "utf8");
branchingKeys = JSON.parse(branchingKeys);

//first argument data file
//schoolData = fs.readFileSync('files/' + process.argv[2], 'utf8');
schoolData = fs.readFileSync(process.argv[2], 'utf8');
//schoolData = fs.readFileSync('school.json', 'utf8');
schoolData = JSON.parse(schoolData);

var district_codes = fs.readFileSync('files/district_codes.json', 'utf8');
district_codes = JSON.parse(district_codes);
var vdc_codes = fs.readFileSync('files/vdc_codes.json', 'utf8');
vdc_codes = JSON.parse(vdc_codes);

var schoolLabelUsed = [];

var count = false;

var headerHTML = '<html><head><title></title>';
var tableHTML = '<div style="margin-left: 0%"><table><tr><th>Question</th><th>Response</th></tr>';
var trHTML = '';
var footerHTML = '</table></div></body></html>';
var styles = '<style>' + 
                                                        'table{width: 100%; table-layout: fixed}' + 
                                                        ' th{background-color: lightgrey; -webkit-print-color-adjust: exact; text-align: left; border-width: 0px; height: 45px;' +
                                                        'padding: 3px 7px 2px 7px;} td{text-align: left; width: 20px;' + 
                                                        ' word-wrap: break-word;border: 1px solid #BDBDBD;}' + 
                                                        '.contact-group-border-top{border-bottom: 2px solid black; border-top: 0px;' + 
                                                        ' border-left: 0px; border-right: 0px; width: 1px}' +
                                                        '.contact-group-border-bottom{border-top: 2px solid black; border-bottom: 0px;' + 
                                                        ' border-left: 0px; border-right: 0px; width: 1px}' +
                                                        '.remove{display: none;}' +
                                                        '</style></head><body>'


var lastSubmissionTime;
schoolData.map(function(schoolItem, schoolIndex) {

allKeys = Object.keys(schoolItem);

var schoolLabels = JSON.parse(JSON.stringify(schoolLabelsGlobal));


branchingKeys.forEach(function(item, index){
	item["label-index"] = [];
	schoolLabels.forEach(function(labelDef, index_1){
		
		item["sub-keys"].forEach(function(subKey, index_2){
			
			if(subKey === labelDef.name){
				item["label-index"].push(index_1);
			}
		});


		
	});
	
	allKeys.forEach(function(schoolItemKey, index_1){
		var keyTail = schoolItemKey.split("/");



		//if(keyTail[keyTail.length-1] === item.key && schoolItem[schoolItemKey]===item["remove-if"]){
		if(keyTail[keyTail.length-1] === item.key && schoolItem[schoolItemKey].toString().match && schoolItem[schoolItemKey].toString().match(new RegExp(item["remove-if"]))){
			item["label-index"].forEach(function(labelIndex, index_2){
				schoolLabels[labelIndex] = {
					"name": "remove",
					"label": "remove",
					"repeate": "remove"
				};
			});
			//schoolLabels[item["label-index"]] = 0;
		}
	});
});




	schoolLabels.map(function(labelItem) {
		
		if(labelItem.repeate !== '0') {
			for(var i = 0; i < allKeys.length; i++) {
				if(allKeys[i].toLowerCase().trim() === labelItem.repeate.toLowerCase().trim()) {
						for(var m = 0; m < schoolItem[allKeys[i]].length; m++) {
							var repeatedItem = schoolItem[allKeys[i]][m];
							var insideKeys = Object.keys(repeatedItem);
							trHTML += '<tr><td colspan=2 class="contact-group-border-top"></td></tr>';
						for(var j = 0; j < insideKeys.length; j++) {
							for(var k = 0; k < schoolLabels.length; k++) {
								var splitOfInsideKey = insideKeys[j].split('/');
								if(splitOfInsideKey[splitOfInsideKey.length - 1].toLowerCase().trim() === schoolLabels[k].name.toLowerCase().trim()) {
									if(repeatedItem[insideKeys[j]].toString().toLowerCase().indexOf('jpg') !== -1) {
										trHTML += '<tr class="'+labelItem.name+'"><td colspan=2>' + schoolLabels[k].label + '</td></tr>';
										trHTML += '<tr class="'+labelItem.name+'"><td colspan=2 style="text-align: center;">' +
															'<image src="../' + repeatedItem[insideKeys[j]].toString().split(".")[0] + '-small.jpg" width="300" /></td></tr>';
										schoolLabelUsed.push(schoolLabels[k].label);
									}
									else {
										if(schoolLabels[k].label === districtLabel) {
											for(var a = 0; a < district_codes.length; a++) {
												if(repeatedItem[insideKeys[j]] === district_codes[a].codes) {
														trHTML += '<tr class="'+labelItem.name+'"><td>' + schoolLabels[k].label + '</td><td>' + district_codes[a].name + '</td></tr>';
														schoolLabelUsed.push(schoolLabels[k].label);
												}
											}

										} else if(schoolLabels[k].label === vdcLabel) {
											for(var a = 0; a < vdc_codes.length; a++) {
												if(repeatedItem[insideKeys[j]] === vdc_codes[a].codes) {
														trHTML += '<tr class="'+labelItem.name+'"><td>' + schoolLabels[k].label + '</td><td>' + vdc_codes[a].name + '</td></tr>';
														schoolLabelUsed.push(schoolLabels[k].label);
												}
											}

										} else {
											trHTML += '<tr class="'+labelItem.name+'"><td>' + schoolLabels[k].label + '</td><td>' + repeatedItem[insideKeys[j]] + '</td></tr>';
											schoolLabelUsed.push(schoolLabels[k].label);
										}
									}
								}
							}
						}
						trHTML += '<tr class="'+labelItem.name+'"><td colspan=2 class="contact-group-border-bottom"></td></tr>';
					}
				}
			}
		}
		for(var i = 0; i < allKeys.length; i++) {
			var splitLongName = allKeys[i].split('/');
			if(splitLongName[splitLongName.length - 1].toLowerCase().trim() === labelItem.name.toLowerCase().trim()) {
				if(schoolItem[allKeys[i]].toString().toLowerCase().indexOf('jpg') !== -1) {
					trHTML += '<tr class="'+labelItem.name+'"><td colspan=2>' + labelItem.label + '</td></tr>';
					trHTML += '<tr class="'+labelItem.name+'"><td colspan=2 style="text-align: center;">' +
										'<image src="../' + schoolItem[allKeys[i]].toString().split(".")[0] + '-small.jpg" width="300" /></td></tr>';
					schoolLabelUsed.push(labelItem.label);
				}
				else {
					if(labelItem.label === districtLabel) {
						for(var a = 0; a < district_codes.length; a++) {
							if(schoolItem[allKeys[i]] === district_codes[a].codes) {
								trHTML += '<tr><td>' + labelItem.label + '</td><td>' + district_codes[a].name + '</td></tr>';
								schoolLabelUsed.push(labelItem.label);
							}
						}

					} else if(labelItem.label === vdcLabel) {
						for(var a = 0; a < vdc_codes.length; a++) {
							if(schoolItem[allKeys[i]] === vdc_codes[a].codes) {
								trHTML += '<tr class="'+labelItem.name+'"><td>' + labelItem.label + '</td><td>' + vdc_codes[a].name + '</td></tr>';
								schoolLabelUsed.push(labelItem.label);
							}
						}

					} else
							trHTML += '<tr class="'+labelItem.name+'"><td>' + labelItem.label + '</td><td>' + schoolItem[allKeys[i]] + '</td></tr>';
							schoolLabelUsed.push(labelItem.label);
				}
				break;
			}
		}
		if(trHTML.indexOf(labelItem.label) === -1)
			trHTML += '<tr class="'+labelItem.name+'" style="background-color: red; -webkit-print-color-adjust: exact;"><td>' + labelItem.label + '</td><td>N/A</td></tr>';
	});



	++count;
	//console.log(count);
	lastSubmissionTime = fs.readFileSync('files/last_submission_time.txt', 'utf8').trim();
	//console.log(lastSubmissionTime);
	//console.log(headerHTML + styles + tableHTML + trHTML + footerHTML);
	lastSubmissionTime = new Date(lastSubmissionTime);
	var currentSubmissionTime = schoolItem["_submission_time"].split('T')[0];
	var sub = schoolItem["_submission_time"].split('T')[0];
	currentSubmissionTime = new Date(currentSubmissionTime);
	/*if(currentSubmissionTime > lastSubmissionTime) {
		lastSubmissionTime = currentSubmissionTime;
		try{
		fs.mkdirSync('output_' + outputFilePrefix + '/' +  outputFilePrefix + sub);
		} catch(e) {
		}
		/*var outfile = 'output_' + outputFilePrefix + '/' + outputFilePrefix + sub + '/' + outputFilePrefix  + 
				schoolItem[jsonIndex] + '.html';
		var outfile = "../output/"+schoolItem[jsonIndex]+".html";
		console.log(outfile);
		fs.writeFileSync(outfile, headerHTML + styles + tableHTML + trHTML + footerHTML);
	}*/
	var outfile = "../output/"+schoolItem[jsonIndex]+".html";
	console.log(outfile);
	fs.writeFileSync(outfile, headerHTML + styles + tableHTML + trHTML + footerHTML);

	trHTML = '';
	lastSubmissionTime = schoolItem["_submission_time"].split('T')[0];
});
fs.writeFileSync('files/last_submission_time.txt', lastSubmissionTime);
