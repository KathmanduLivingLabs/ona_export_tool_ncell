#!/bin/bash

touch schools.json

while [ $(stat --printf="%s" schools.json) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.json >schools.json
done

touch buildings.json

while [ $(stat --printf="%s" buildings.json) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.json >buildings.json
done

touch building_elements.json

while [ $(stat --printf="%s" building_elements.json) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.json >building_elements.json
done

touch school.csv

while [ $(stat --printf="%s" school.csv) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.csv >school.csv
done

touch building.csv

while [ $(stat --printf="%s" building.csv) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.csv >building.csv
done

touch buildingelement.csv

while [ $(stat --printf="%s" buildingelement.csv) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.csv >buildingelement.csv
done

#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.json >schools.json
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.json >buildings.json
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.json >building_elements.json


#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.csv >school.csv
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.csv >building.csv
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.csv >buildingelement.csv




