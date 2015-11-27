#!/bin/bash

#cat ../../pass.txt
cat ../../auth.txt | egrep -o "$1 \w+"| sed -E "s/$1 (\w+)/\1/"

