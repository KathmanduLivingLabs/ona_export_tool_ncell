cd /root/jedi-Knight/ona-data-date-filtered-archives/non-psql
aws s3 cp s3://onadata/wbsida321/attachments/ ./ --recursive --exclude "*" --include "*-large.jpg"
rename 's/-large.jpg/.jpg/' *.jpg

