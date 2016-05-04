#!/bin/bash

mkdir srcjson
mkdir srcjson/schools
mkdir srcjson/buildings
mkdir srcjson/building_elements

onaAuth=$(../auth/onadata-auth.sh)

##schools##
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113422.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/kd.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113425.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/dk.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113429.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/bda.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113432.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/schools/pace.json
####

##buildings##
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113423.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/kd.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113426.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/dk.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113430.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/bda.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113433.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/buildings/pace.json
####

##building_elements##
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113424.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/kd.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113427.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/dk.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113431.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/bda.json
curl -X GET -u $onaAuth https://api.ona.io/api/v1/data/113434.json | ./slashslasher-for-wbsida-export-tool-v2.py > srcjson/building_elements/pace.json
####





./merge-source-json.py















































