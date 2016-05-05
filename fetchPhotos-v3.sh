#!/bin/bash

find . -name '*.jpg' -print | grep -o "[0-9]\{3,13\}-large.jpg" | perl -p -e "s/-large//g" > photoshere.data.list

cat schools.json buildings.json building_elements.json | grep -o "filename=wbsida321\/attachments\/[a-zA-Z0-9\_\-]\{3,26\}\.jpg&suffix=medium" > photostaken.fullquerypath.data.list

cat photostaken.fullquerypath.data.list | grep -o "[a-zA-Z0-9\_\-]\{3,26\}\.jpg" > photostaken.data.list

./set-a-minus-b.py photostaken.data.list photoshere.data.list > photostodownload.data.list

php picfetch.php
