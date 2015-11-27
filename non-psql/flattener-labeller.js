var fs = require('fs');
var _ = require('underscore-plus');

var data = fs.readFileSync(process.argv[2],"utf8");

//data.replace(/\\"/g, "''")

var def = fs.readFileSync(process.argv[3], "utf8");

var data = JSON.parse(data);
var def = JSON.parse(def);

var flattened = [];

var units = {
	1: "-st",
	2: "-nd",
	3: "-rd"
};


var output = _.map(data, function(dataItem, dataIndex){
	var ithFlattened = [];
	_.map(def, function(defItem, defIndex){
		if(typeof defItem === "string"){
			if(defIndex==="section-break"){
				ithFlattened.push([defItem]);
			}else{
			ithFlattened.push(eval({
				//[defIndex]: [defItem, escape(dataItem[defIndex])==="undefined"?"na":escape(dataItem[defIndex])]
				[defIndex]: [defItem, escape(dataItem[defIndex])]
			}));
		}
		}else if(defItem && defItem.push){
			_.map(dataItem[defIndex], function(gDataItem_1, gDataIndex_1){
				_.map(defItem, function(gDefItem_1, gDefIndex_1){
					if(!gDefIndex_1){
						ithFlattened.push([gDefItem_1["label"].replace("$1", (gDataIndex_1+1)+(units[gDataIndex_1+1]?units[gDataIndex_1+1]:"th"))]);
						return;
					}

					var gDefItemKey_1 = Object.keys(gDefItem_1)[0];


					if(gDefItem_1 && typeof gDefItem_1 === "object" && !gDefItem_1.push){
						//console.log((gDataIndex_1-1) && !gDefItem_1["position"]+","+!(gDefItem_1["position"] === (gDataIndex_1-1)));
						//if((gDataIndex_1) && !gDefItem_1["position"]) console.log((gDataIndex_1)+","+!gDefItem_1["position"]);
						
						if((gDataIndex_1) && !gDefItem_1["position"]) return;
						//if(gDefItem_1["position"] && (gDefItem_1["position"] > (gDataIndex_1))) console.log((gDataIndex_1)+","+gDefItem_1["position"]);
						if(gDefItem_1["position"] && gDefItem_1["position"][0] > gDataIndex_1+1) return;
						if(gDefItem_1["position"] && gDefItem_1["position"][0]<0 && ((dataItem[defIndex].length+gDefItem_1["position"][0])>gDataIndex_1)) return;
						ithFlattened.push({
							//[gDefItemKey_1]: [gDefItem_1[gDefItemKey_1], escape(gDataItem_1[defIndex+"/"+gDefItemKey_1])==="undefined" ? "na" :escape(gDataItem_1[defIndex+"/"+gDefItemKey_1])]
							[gDefItemKey_1]: [gDefItem_1[gDefItemKey_1], escape(gDataItem_1[defIndex+"/"+gDefItemKey_1])]
						});
					}else if(gDefItem_1 && typeof gDefItem_1 === "object"){
						_.map(gDefItem_1, function(gDefItem_c_1, gDefIndex_c_1){
						
						var _mutualXORGroup = _.map(gDefItem_c_1, function(conditionalItemDef_1, conditionalItemDefIndex_1){
												var _key = Object.keys(conditionalItemDef_1)[0];
												
													return {
														//[_key]: [conditionalItemDef_1[_key], ((escape(gDataItem_1[defIndex+"/"+_key])==="undefined")? "na" : escape(gDataItem_1[defIndex+"/"+_key]))]
														[_key]: [conditionalItemDef_1[_key], escape(gDataItem_1[defIndex+"/"+_key])]
													};
												});
						//console.log(_mutualXORGroup);
						var testerStringArray = _.map(_mutualXORGroup, function(_item, _index){
							//console.log(_item);
												var _key = Object.keys(_item)[0];
												//console.log(_item[_key][1]);
												return _item[_key][1];
											}).join("").match(/undefined/gi);

						//console.log(testerStringArray.length);
						if (!(testerStringArray && testerStringArray.length===_mutualXORGroup.length)){
							_.map(_mutualXORGroup, function(_item, _index){
								ithFlattened.push(_item);
							});
						}
					});
					}
				});
			});
			
		}
	});
	return ithFlattened;
});

console.log(JSON.stringify(output));
















