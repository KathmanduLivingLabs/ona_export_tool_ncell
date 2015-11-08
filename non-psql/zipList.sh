#!/bin/bash
zipList="no"
zipList=$(./ona-extract-from-csv-by-date-v2.js $1 $2 $3) && zip $zipList>dump
echo $zipList
