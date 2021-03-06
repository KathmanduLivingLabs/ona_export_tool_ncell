var fs = require('fs');
var _ = require('underscore-plus');
var $ = require('cheerio').load('');

var data = fs.readFileSync(process.argv[2], "utf-8");

var sessionKey = process.argv[4];

var ignoreList = fs.readFileSync("ignorelist.lst", "utf-8");
var emisnum = process.argv[3];


data = JSON.parse(data);

var mergedHTML = '';
var tempEmis;
var indicatorMsges = (data.length-1) ? '_has_' + data.length + '_duplicate_EMIS_entries' : '';


//page.find("#page-title").append($("<h1></h1>").text(pagetitle));

_.map(data, function(item, index) {

	var emis = function() {
		var key = Object.keys(item[0])[0];
		return item[0][key][1];
	}();
	var pagetitle = function() {

		return "ID: "+emisnum;
	/*	if (emis.match(/EMIS[0-9]+-[a-z0-9]+-[0-9]+/gi)) {
			return "Building Element: " + emis.replace(/EMIS\d\d(.*)/, "EMIS$1") + indicatorMsges.replace(/_/g, " ");
		}else if(emis.match(/EMIS[0-9]+-[a-z0-9]+/gi)){
			return "Building: " + emis + indicatorMsges.replace(/_/g, " ");
		}else{
			return "School: " + emis + indicatorMsges.replace(/_/g, " ");
		}*/
	}();

	//var html = '<html><head></head><body><style>.has-photo .value,img{text-align:center}#page-title{width:100%;margin-top:30px}#page-container{width:100%;padding-bottom:10px}#table-container{padding-bottom:20px}.table-row{line-height:1.8em;font-size:1.2em;font-family:Verdana;padding:0 8px;display:table-row}.key,.value{display:inline-block;display:table-cell;outline:#ccc solid thin;width:40%;padding:0 8px}.section-break{line-height:2em;margin-top:1em;width:81.6%}.section-name{padding:0 8px;margin-left:-2px;display:block;width:197.8%;font-weight:600;line-height:2.4em;margin-top:20px}img{display:block;height:20em}.has-photo .key,.has-photo .value{display:block;display:table-cell;width:81.26%} .undefined{background-color:#ffaa99;}</style><div id="page-title"><h2>'+pagetitle+'</h2></div><div id="table-container"></div></body></html>';
	var html = '<div><style>.has-photo .value,img{text-align:center}#page-title{width:100%;margin-top:30px}#page-container{width:100%;padding-bottom:10px}#table-container{padding-bottom:20px}.table-row{line-height:1.8em;font-size:1.2em;font-family:Verdana;padding:0 8px;display:table-row; page-break-inside: avoid;}.key,.value{display:inline-block;display:table-cell;border:#ccc solid thin;width:40%;padding:0 8px}.section-break{line-height:2em;margin-top:1em;width:81.6%}.section-name{padding:0 8px;margin-left:-2px;display:block;width:197.8%;font-weight:600;line-height:2.4em;margin-top:20px}img{display:block;height:20em}.has-photo .key,.has-photo .value{display:block;display:table-cell;width:81.26%} .undefined{background-color:#ffaa99;}</style><div id="page-title"><h2>'+pagetitle+'</h2></div><div id="table-container"></div></div>';

	var page = $(html);
	var container = page.find("#table-container");

	

	//container.find("#page-title").append($("<h2></h2>").text(pagetitle));

	_.map(item, function(item_1, index_1) {

		if(item_1.push){
			var tableRow = $("<div class='table-row'></div>").addClass("section-break");
			tableRow.append($("<div class='section-name'></div>").text(item_1[0]));
			try {
			container.append(tableRow);
		} catch (e) {
			throw e;
			console.log(item_1);
		}
			return;
		}

		var key = Object.keys(item_1)[0];

		if(unescape(item_1[key][1])==="undefined" && ignoreList.match(key)){
			return;
		}

		var tableRow = $("<div class='table-row'></div>").addClass(key);
		tableRow.append($("<div class='key'></div>").text(item_1[key][0] + ""));
		tableRow.append($("<div class='value'></div>").text(unescape(item_1[key][1])) + "");
		if(unescape(item_1[key][1])==="undefined"){
			tableRow.find(".value").text("n/a");
			tableRow.addClass("undefined");
		}

		if(unescape(item_1[key][1]).match(".jpg")){
			tableRow.find(".value").append($("<a/>").append($("<img/>").attr({
				src: "https://ona.io/attachment/medium?media_file=ncell/attachments/"+unescape(item_1[key][1]).split(".")[0]+".jpg"
			})).attr({
				href: "https://ona.io/attachment/medium?media_file=ncell/attachments/"+unescape(item_1[key][1]).split(".")[0]+".jpg",
				target: "_blank"
			}));
			tableRow.addClass("has-photo");
		}

		try {
			container.append(tableRow);
		} catch (e) {
			throw e;
			console.log(item_1);
		}
		//container.append($(tableRow).html());
	});

	tempEmis = emis; 
	if (emis.match(/EMIS[0-9a-zA-Z]+-[a-z0-9]+-[0-9]+/gi)) {
			tempEmis = emis.replace(/EMIS[0-9][0-9]/, "EMIS");
		}

	mergedHTML += page.html();


});

fs.writeFileSync("output/"+emisnum+".html", mergedHTML);














