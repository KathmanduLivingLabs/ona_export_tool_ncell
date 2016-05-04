#!/usr/bin/env python3

from os import listdir
import json


##schools##

dirpath = 'srcjson/schools'
outputFileName = 'schools'

sourceFiles = listdir(dirpath)

rawDataList = []

for sourceFile in sourceFiles:
	with open(dirpath+'/'+sourceFile, 'r', encoding='utf-8') as jsonArrayFile:
		#rawDataList.append(jsonArrayFile.read()[1:-1])
		#jsonArrayFile.close()
		jsonArray = json.loads(jsonArrayFile.read())
		rawDataList += jsonArray

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	mergedJSONArrayFile.write('['+','.join(rawDataList)+']')
	mergedJSONArrayFile.close()

####

##buildings##

dirpath = 'srcjson/buildings'
outputFileName = 'buildings'

sourceFiles = listdir(dirpath)

rawDataList = []

for sourceFile in sourceFiles:
	with open(dirpath+'/'+sourceFile, 'r', encoding='utf-8') as jsonArrayFile:
		jsonArray = json.loads(jsonArrayFile.read())
		rawDataList += jsonArray

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	mergedJSONArrayFile.write('['+','.join(rawDataList)+']')
	mergedJSONArrayFile.close()

####

##building_elements##

dirpath = 'srcjson/building_elements'
outputFileName = 'building_elements'

sourceFiles = listdir(dirpath)

rawDataList = []

for sourceFile in sourceFiles:
	with open(dirpath+'/'+sourceFile, 'r', encoding='utf-8') as jsonArrayFile:
		jsonArray = json.loads(jsonArrayFile.read())
		rawDataList += jsonArray

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	mergedJSONArrayFile.write('['+','.join(rawDataList)+']')
	mergedJSONArrayFile.close()

####





