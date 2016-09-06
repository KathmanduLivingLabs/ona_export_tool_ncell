#!/usr/bin/env python3
import os
from os import listdir 
from shutil import copyfile
import json


##schools##

dirpath = 'srcjson/schools'
outputFileName = 'schools'
destFolder = '/var/www/html/aggregator/helpnepal'
if not os.path.exists(destFolder):
    os.makedirs(destFolder)


sourceFiles = listdir(dirpath)

rawDataList = []

for sourceFile in sourceFiles:
	with open(dirpath+'/'+sourceFile, 'r', encoding='utf-8') as jsonArrayFile:
		#rawDataList.append(jsonArrayFile.read()[1:-1])
		#jsonArrayFile.close()
		jsonArray = json.loads(jsonArrayFile.read())
		rawDataList += jsonArray
		jsonArrayFile.close()

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	#mergedJSONArrayFile.write('['+','.join(rawDataList)+']')
	mergedJSONArrayFile.write(json.dumps(rawDataList))
	mergedJSONArrayFile.close()
destFile = open(destFolder+"/toilet.json",'w')
copyfile(outputFileName+".json",destFolder+"/toilet.json")
destFile.close()
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
		jsonArrayFile.close()

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	mergedJSONArrayFile.write(json.dumps(rawDataList))
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
		jsonArrayFile.close()

with open(outputFileName+'.json', 'w', encoding='utf-8') as mergedJSONArrayFile:
	mergedJSONArrayFile.write(json.dumps(rawDataList))
	mergedJSONArrayFile.close()

####





