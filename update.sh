#!/bin/bash

## Get into Current Dir to call python file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

./fetchData-v3.sh

./fetchPhotos-v3.sh

date -d 'now' +%s > .updatetime



