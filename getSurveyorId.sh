#!/bin/bash

cat ../auth/surveyor_id.txt | egrep -o "$1 \w+"| sed -E "s/$1 (\w+)/\1/"
