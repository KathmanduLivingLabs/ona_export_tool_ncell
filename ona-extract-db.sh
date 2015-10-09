#!/bin/bash
cd ~/worldbank/sida/
curl -X GET -u "$sida_user:$sida_pass" https://ona.io/api/v1/data/68589.json >school.json
ona-extract-psql-db.js $sida_user $sida_pass
