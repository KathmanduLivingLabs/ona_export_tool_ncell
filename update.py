import time
import os

while True:
    os.popen('./fetchData-v2.sh')
    time.sleep(6 * 60 * 60)
