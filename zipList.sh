#!/bin/bash
mkdir downloads
mkdir downloads/$5
zipList=$(python ona-extract-from-csv-by-date-v2.py $1 $2 $3 $4) && zip downloads/$5/$zipList>dump
echo $zipList
