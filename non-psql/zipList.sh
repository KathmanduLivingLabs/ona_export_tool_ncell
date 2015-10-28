#!/bin/bash
zipList=$(./ona-extract-from-csv-by-date.js $1 $2 $3)
zip $zipList>dump
#a="$(stat --printf="%s" ${zipList[0]})"
IFS=' ' read -a filenames <<< "${zipList[0]}"
a="$(stat --printf="%s" ${filenames[1]})"
echo ${filenames[1]}
if[ "$a" == "0"]
if (( a == 0 ))
then
	echo "0"
else
	echo ${zipList[0]}
fi
