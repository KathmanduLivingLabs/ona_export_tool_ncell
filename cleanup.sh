#!/bin/bash

## Get into Current Dir to call python file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

mkdir _archives
mv *.addr _archives/
rm _temp/EMIS*
rm output/*
rm -rf downloads/*



