#!/bin/bash

## Get into Current Dir to call python file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

#./fetchData-v3.sh
#./fetchData-v3.1-ona-issue-temporary-workaround.sh

./fetchPhotos-v3.sh

date -d 'now' +%s > .updatetime



