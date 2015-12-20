#!/bin/bash
zipList="no"
#zipList=$(./ona-extract-from-csv-by-date-v2.js $1 $2 $3)>>dump
zipList=$(python ona-extract-from-csv-by-date-v2.py $1 $2 $3)>>dump
echo $zipList
