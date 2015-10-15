#!/bin/bash
zipList=$(./ona-extract-by-date.js $1 $2 $3)
zip $zipList>dump
echo ${zipList[0]}
