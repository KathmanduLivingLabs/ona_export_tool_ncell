#!/bin/bash

mkdir srcjson
mkdir srcjson/schools
mkdir srcjson/buildings
mkdir srcjson/building_elements

onaAuth=$(../auth/onadata-auth.sh)

##schools##
./ona-json-export-with-pagination.py 113422 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/kd.json
./ona-json-export-with-pagination.py 113425 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/dk.json
./ona-json-export-with-pagination.py 113429 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/bda.json
./ona-json-export-with-pagination.py 113432 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/pace.json

curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113422.csv > schoolkd10.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113425.csv > schooldk12.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113429.csv > schoolbda30.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113432.csv > schoolpace12.csv
####

##buildings##
./ona-json-export-with-pagination.py 113423 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/kd.json
./ona-json-export-with-pagination.py 113426 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/dk.json
./ona-json-export-with-pagination.py 113430 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/bda.json
./ona-json-export-with-pagination.py 113433 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/pace.json

curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113423.csv > buildingkd10.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113426.csv > buildingdk12.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113430.csv > buildingbda30.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113433.csv > buildingpace12.csv
####

##building_elements##
./ona-json-export-with-pagination.py 113424 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/kd.json
./ona-json-export-with-pagination.py 113427 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/dk.json
./ona-json-export-with-pagination.py 113431 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/bda.json
./ona-json-export-with-pagination.py 113434 $onaAuth | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/pace.json

curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113424.csv > buildingelementkd10.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113427.csv > buildingelementdk12.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113431.csv > buildingelementbda30.csv
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113434.csv > buildingelementpace12.csv
####





./merge-source-json-v2.py















































