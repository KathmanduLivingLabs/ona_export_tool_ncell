#!/bin/bash

aws s3 cp s3://onadata/wbsida321/attachments/$1 ./
mogrify -resize 25% $1
rename 's/.jpg/-large.jpg/' $1.jpg