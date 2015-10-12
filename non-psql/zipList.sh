#!/bin/bash
zipList=$(./ona-extract-by-date.js $1 $2 $3)
zip -Tm $zipList