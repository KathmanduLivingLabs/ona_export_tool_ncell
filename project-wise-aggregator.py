#!/usr/bin/env python3

import sys
import json

dictListData = None

with sys.stdin as jsonFile:
    dictListData = json.loads(jsonFile)
    jsonFile.close()

aggSumDict = {}

for item in dictListData:
    for k,v in item.items():
        try:
            if k in aggSumDict:
                aggSumDict[k] += float(v)
            else:
                aggSumDict[k] = float(v)
        except ValueError as e:
            pass
            
print(json.dumps(aggSumDict))






