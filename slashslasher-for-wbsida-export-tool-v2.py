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

dupliCounter = 0

cleanedData = []

def jsonArrayKeyShortener(jsonArray):
    outputJsonArray = []
    for item in jsonArray:
        cleanedItem = {}
        for item_1, val_1 in item.items():
            if(item_1 in duplicatedKeys):
              item_1 = item_1+dupliCounter
              dupliCounter += 1
            if type(val_1) is str:
                cleanedItem[re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)] = val_1.replace("\n","")
            elif type(val_1) is int or type(val_1) is float:
                cleanedItem[re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)] = val_1
            elif type(val_1) is list:
                if len(val_1) and type(val_1[0]) is dict:
                    cleanedItem[re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)] = jsonArrayKeyShortener(val_1)
                else:
                    cleanedItem[re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)] = val_1
        outputJsonArray.append(cleanedItem)
    return outputJsonArray


print(json.dumps(jsonArrayKeyShortener(data)))
