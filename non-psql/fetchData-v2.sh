#!/bin/bash

touch schools_temp.json

while [ $(stat --printf="%s" schools_temp.json) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.json >schools_temp.json
done

touch buildings_temp.json

while [ $(stat --printf="%s" buildings_temp.json) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.json >buildings_temp.json
done

touch building_elements_temp.json

while [ $(stat --printf="%s" building_elements_temp.json) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.json >building_elements_temp.json
done

touch school_temp.csv

while [ $(stat --printf="%s" school_temp.csv) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.csv >school_temp.csv
done

touch building_temp.csv

while [ $(stat --printf="%s" building_temp.csv) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.csv >building_temp.csv
done

touch buildingelement_temp.csv

while [ $(stat --printf="%s" buildingelement_temp.csv) -eq 0 ]
do
	curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.csv >buildingelement_temp.csv
done

mv schools_temp.json schools.json
mv buildings_temp.json buildings.json
mv building_elements_temp.json building_elements.json

mv school_temp.csv school.csv
mv building_temp.csv building.csv
mv buildingelement_temp.csv buildingelement.csv

./fetchPhotos.sh

date +%s >.updatetime

#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.json >schools.json
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.json >buildings.json
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.json >building_elements.json


#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.csv >school.csv
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.csv >building.csv
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.csv >buildingelement.csv




