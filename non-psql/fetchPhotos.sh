#!/bin/bash

aws s3 sync s3://onadata/wbsida321/attachments/ ./ --exclude "*" --include "*-large.jpg" >photolog.txt
aws s3 sync s3://onadata/wbsida321/attachments/ ./ --exclude "*" --include "*-large.jpg" >>photolog.txt

