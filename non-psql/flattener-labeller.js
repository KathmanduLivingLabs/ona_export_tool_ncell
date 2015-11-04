var fs = require('fs');
var _ = require('underscore-plus');

var data = fs.readFileSync(process.argv[2],"utf8");

var def = fs.readFileSync(process.argv[3], "utf8");

var data = JSON.parse(data);
var def = JSON.parse(def);

var flattened = [];


_.map(data, function(dataItem, dataIndex){
	var ithFlattened = [];
	_.map(def, function(defItem, defIndex){
		if(typeof defItem === "string"){
			ithFlattened.push(eval({
				[defIndex]: [defItem, dataItem[defIndex]]
			}));
		}
	});
	console.log(ithFlattened);
});
















