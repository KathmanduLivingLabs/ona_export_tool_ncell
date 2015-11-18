#!/bin/bash

#aws s3 sync s3://onadata/wbsida321/attachments/ ./ --exclude "*" --include "*-large.jpg" >photolog.txt
#aws s3 sync s3://onadata/wbsida321/attachments/ ./ --exclude "*" --include "*-large.jpg" >>photolog.txt

#aws s3 ls s3://onadata/wbsida321/attachments/ > filelist.txt

s3cmd ls s3://onadata/wbsida321/attachments/ > filelist.txt

array=$(cat filelist.txt | grep -o "[0-9]\{3,13\}.jpg")

echo $array>arraylist.src.txt

(ls *.jpg | grep -o "[0-9]\{3,13\}-large.jpg" | perl -p -e "s/-large//g") | Rscript newpiclist.r > arraylist.txt

php picfetch.php
