#!/bin/bash

mkdir output
mkdir _temp

read -r -a output <<< $(./filter-data-by-emis.js $1 $2.json)

for filename in ${output[@]}
do
	echo $filename
	flattened=$(node flattener-labeller.js _temp/$filename $2.def.json)
	echo $flattened >_temp/$filename
	node htmlgen.js _temp/$filename $2 $3
done