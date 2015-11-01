#!/bin/bash

s3cmd get s3://onadata/wbsida321/attachments/$1 > /dev/null || { echo "error downloading file $1" >>s3errors.log; }
./picscale.sh 4 $1  || { echo "error downloading file $1" >>picscalesherrors.log; }
rename 's/.jpg/-large.jpg/' $1 || { echo "error downloading file $1" >>renameerrors.log; }
