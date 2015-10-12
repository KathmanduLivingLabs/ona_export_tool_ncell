#!/bin/bash
from_date=$1
to_date=$2
auth=$(../../keygen.sh)
curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://ona.io/api/v1/data/$4.json >$3.json
./zipList.sh $from_date $to_date $3.json