#!/bin/bash

#cat ../../user.txt

cat ../../auth.txt | egrep -o "$1"
