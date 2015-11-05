#!/bin/bash

mkdir output
mkdir _temp

output=$(./filter-data-by-emis.js $1 $2.json)


flattened=$(node flattener-labeller.js _temp/$output $2.def.json)

cat _temp/$output >_temp/backup.json

echo $flattened >_temp/$output

node htmlgen.js _temp/$output $2 $1