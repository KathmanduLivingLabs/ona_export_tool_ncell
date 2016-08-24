#!/bin/bash

mkdir srcjson
mkdir srcjson/schools
mkdir srcjson/buildings
mkdir srcjson/building_elements

onaAuth=$(../auth/onadata-auth.sh)

##schools##
curl -X GET -u "ncell:Ncellnepal" https://api.ona.io/api/v1/data/98392.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/kd.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113425.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/dk.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113429.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/bda.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113432.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/pace.json

#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113422.csv > schoolkd10.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113425.csv > schooldk12.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113429.csv > schoolbda30.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113432.csv > schoolpace12.csv
####

##buildings##
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113423.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/kd.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113426.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/dk.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113430.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/bda.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113433.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/pace.json

#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113423.csv > buildingkd10.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113426.csv > buildingdk12.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113430.csv > buildingbda30.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113433.csv > buildingpace12.csv
####

##building_elements##
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113424.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/kd.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113427.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/dk.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113431.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/bda.json
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113434.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/pace.json

#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113424.csv > buildingelementkd10.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113427.csv > buildingelementdk12.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113431.csv > buildingelementbda30.csv
#curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113434.csv > buildingelementpace12.csv
####





./merge-source-json-v2.py















































