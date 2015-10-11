#!/bin/bash
cd ~/worldbank/sida/
from_date="2015-10-02"
to_date="2015-10-10"
curl -X GET -u "$sida_user:$sida_pass" https://ona.io/api/v1/data/68589.json >school.json
ona-extract-by-date.js $from_date $to_date