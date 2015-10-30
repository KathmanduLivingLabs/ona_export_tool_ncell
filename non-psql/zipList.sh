#!/bin/bash
zipList=$(./ona-extract-from-csv-by-date.js  –max-old-space-size=2048 $1 $2 $3)
zip $zipList>dump
echo $zipList
