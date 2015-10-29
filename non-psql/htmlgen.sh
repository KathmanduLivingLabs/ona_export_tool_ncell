#!/bin/bash

mkdir output
mkdir _temp

output=$(./filter-data-by-emis.js $1 $2.json) 

cd SIDAHTML
node index.js ../_temp/$output $2_labels.json $2