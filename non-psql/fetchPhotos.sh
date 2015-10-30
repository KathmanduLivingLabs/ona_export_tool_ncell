#!/bin/bash

#aws s3 sync s3://onadata/wbsida321/attachments/ ./ --exclude "*" --include "*-large.jpg" >photolog.txt
#aws s3 sync s3://onadata/wbsida321/attachments/ ./ --exclude "*" --include "*-large.jpg" >>photolog.txt

aws s3 ls s3://onadata/wbsida321/attachments/ > filelist.txt

array=$(cat filelist.txt | grep -o "[0-9]\{3,13\}.jpg")

echo $array>arraylist.txt

for i in "${array[@]}"
do
	aws s3 cp s3://onadata/wbsida321/attachments/$i ./
	mogrify -resize 25% $i
	rename 's/.jpg/-large.jpg/' *.jpg
done

