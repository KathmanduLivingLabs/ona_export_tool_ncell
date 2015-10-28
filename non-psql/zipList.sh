#!/bin/bash
zipList=$(./ona-extract-from-csv-by-date.js $1 $2 $3)
zip $zipList>dump
echo $zipList
