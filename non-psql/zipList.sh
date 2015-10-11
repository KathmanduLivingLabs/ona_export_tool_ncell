#!/bin/bash
echo $1 $2 $3
zipList=$(./ona-datewise-extractor.js $1 $2 $3)
echo $zipList
zip -Tm $zipList