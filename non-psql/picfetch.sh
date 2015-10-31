#!/bin/bash

#aws s3 cp s3://onadata/wbsida321/attachments/$1 ./ >>awslog.log
#mogrify -resize 25% $1 >>morgifylog.log
s3cmd get s3://onadata/wbsida321/attachments/$1 > /dev/null || { echo "error downloading file $1" >s3errors.log }
./picscale 4 $1 || { echo "error downloading file $1" >picscaleerrors.log }
rename 's/.jpg/-large.jpg/' $1
