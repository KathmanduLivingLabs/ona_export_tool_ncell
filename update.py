import time
import subprocess

while True:
    subprocess.call('./fetchData-v2.sh', shell=True)
    print('done..!! will update again in 6 hours..')
    time.sleep(6 * 60 * 60)
