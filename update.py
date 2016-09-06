#!/usr/bin/env python3

import time
import subprocess

while True:
    #subprocess.call('./fetchData-v2.sh', shell=True)
    subprocess.call('./fetchData-v3.sh', shell=True)
    print('done..!! will update again in 6 hours..')
    subprocess.call('/var/www/html/aggregator/aggregateProject.sh', shell=True)
    time.sleep(6 * 60 * 60)