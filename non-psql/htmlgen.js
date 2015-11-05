var fs = require('fs');
var _ = require('underscore-plus');
var $ = require('cheerio').load('');

var data = fs.readFileSync(process.argv[2], "utf-8");



data = JSON.parse(data);


//page.find("#page-title").append($("<h1></h1>").text(pagetitle));

_.map(data, function(item, index) {

	var emis = function() {
		var key = Object.keys(item[0])[0];
		return item[0][key][1];
	}();
	var pagetitle = function() {
		if (emis.match(/EMIS[0-9]+-[a-z]+-[0-9]+/gi)) {
			return "Building Element " + emis;
		}
	}();

	var html = '<html><head><link rel="stylesheet" href="../page-style.css"/></head><body><div id="page-title"><h2>'+pagetitle+'</h2></div><div id="table-container"></div></body></html>';

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

		var tableRow = $("<tr class='table-row'></tr>").addClass(key);
		tableRow.append($("<td class='key'></td>").text(item_1[key][0] + ""));
		tableRow.append($("<td class='value'></td>").text(unescape(item_1[key][1])) + "");
		if(unescape(item_1[key][1])==="undefined"){
			tableRow.find(".value").text("n/a");
			tableRow.addClass("undefined");
		}

		if(unescape(item_1[key][1]).match(".jpg")){
			tableRow.find(".value").append($("<img/>").attr({
				src: "../"+unescape(item_1[key][1])
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

	fs.writeFileSync("output/"+emis+".html", page.html());


});
