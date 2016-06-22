#!/usr/bin/env python3

import pycurl
import io
import sys

pk = sys.argv[1]
authString =sys.argv[2]

urlstring = 'https://api.ona.io/api/v1/data/'+pk+'.json?page=1&page_size=5000'

buffer = io.BytesIO()

curlObj = pycurl.Curl()
curlObj.setopt(curlObj.URL, urlstring)
curlObj.setopt(curlObj.WRITEFUNCTION, buffer.write)
curlObj.setopt(curlObj.USERPWD, authString)
curlObj.perform()
curlObj.close()

print(buffer.getvalue().decode('utf-8'))
