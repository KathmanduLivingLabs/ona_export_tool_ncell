#!/usr/bin/env python3

from os import listdir
import json

##aggregates##

dirpath = 'aggregates'
outputFileName = 'aggregates'

sourceFiles = listdir(dirpath)

rawDataList = []

for sourceFile in sourceFiles:
	with open(dirpath+'/'+sourceFile, 'r', encoding='utf-8') as jsonArrayFile:
		jsonArray = json.loads(jsonArrayFile.read())
		rawDataList += jsonArray
		jsonArrayFile.close()

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	mergedJSONArrayFile.write(json.dumps(rawDataList))
	mergedJSONArrayFile.close()

####