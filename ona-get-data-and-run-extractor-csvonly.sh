#!/bin/bash
from_date=$1
to_date=$2
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/$4.csv >$3.csv
./csvname.sh $from_date $to_date $3.csv $4
