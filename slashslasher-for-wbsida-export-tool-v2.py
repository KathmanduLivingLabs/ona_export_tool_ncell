#!/usr/bin/env python3

#python3 remove groupnames from formhub/ona jsonarray output :: ie. transform ../../../var_name --> var_name on each item
#syntax:
#     curl -g -X GET -u "username:password" https://api.ona.io/api/v1/data/projectid.json?query='{"_submission_time":{"$gte":"yyyy-mm-ddT00:00:00","$lt":"yyyy-mm-dd2T00:00:00"}}' | python3 slashslasher.py >output.json


import json
import sys
import re
import fileinput

data = []
duplicatedKeys = []

for line in fileinput.input():
    data = json.loads(line)

#with open(sys.argv[1],'r',encoding='utf-8') as rawDataJSONFile:
#    data = json.loads(rawDataJSONFile.read())
#    rawDataJSONFile.close()

with open('duplicated-keys.list', 'r') as duplicatedKeysListFile:
    duplicatedKeys = duplicatedKeysListFile.read().rstrip().split(',')
    duplicatedKeysListFile.close()


def jsonArrayKeyShortener(jsonArray):
    outputJsonArray = []
    for item in jsonArray:
        dupliCounter = {}
        cleanedItem = {}
        for item_1, val_1 in item.items():
            slashSlasshededKey = re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)
            slashSlasshededKeyOrig = re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)
            if(slashSlasshededKey in duplicatedKeys):
                if(slashSlasshededKey in dupliCounter):
                    slashSlasshededKey = slashSlasshededKey+'_'+str(dupliCounter[slashSlasshededKey])
                else:
                    dupliCounter[slashSlasshededKey] = 0
                    slashSlasshededKey = slashSlasshededKey+'_'+str(dupliCounter[slashSlasshededKey])
                dupliCounter[slashSlasshededKeyOrig] += 1
            if type(val_1) is str:
                cleanedItem[slashSlasshededKey] = val_1.replace("\n","")
            elif type(val_1) is int or type(val_1) is float:
                cleanedItem[slashSlasshededKey] = val_1
            elif type(val_1) is list:
                if len(val_1) and type(val_1[0]) is dict:
                    cleanedItem[slashSlasshededKey] = jsonArrayKeyShortener(val_1)
                else:
                    cleanedItem[slashSlasshededKey] = val_1
        outputJsonArray.append(cleanedItem)
    return outputJsonArray


print(json.dumps(jsonArrayKeyShortener(data)))
