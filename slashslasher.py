#python3 remove groupnames from formhub/ona jsonarray output :: ie. transform ../../../var_name --> var_name on each item
#syntax:
#     curl -g -X GET -u "username:password" https://api.ona.io/api/v1/data/projectid.json?query='{"_submission_time":{"$gte":"yyyy-mm-ddT00:00:00","$lt":"yyyy-mm-dd2T00:00:00"}}' | python3 slashslasher.py >output.json


import json
import sys
import re

data = json.loads(open(sys.argv[1],'r',encoding='utf-8').read())

cleanedData = []

def jsonArrayKeyShortener(jsonArray):
    outputJsonArray = []
    for item in jsonArray:
        #print(json.dumps(jsonArray))
        cleanedItem = {}
        for item_1, val_1 in item.items():
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




#for item in data:
#    #print(item)
#    cleanedItem = {}
#    for item_1, val_1 in item.items():
#        if type(val_1) is (str or int or float or long or complex):
#            cleanedItem[re.sub(r'(^.).*(.)/(\w+$)', r'\3', item_1)] = val_1
#        else if type(val_1) is list:
#     