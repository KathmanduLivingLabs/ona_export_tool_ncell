#!/bin/bash

#cat ../../user.txt

cat ../auth/auth.txt | egrep -o "$1"
