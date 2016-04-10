import sys
import csv
import re

datafile = open(sys.argv[3], 'r')

startDate = sys.argv[1]
endDate = sys.argv[2]

zipList = ''


data = csv.reader(datafile)

headers = data.next()

dateColumn = headers.index('_submission_time')

filtered = [','.join(headers)]

def getFileNameRoot(name):
        prefix = name.split('.')
        prefix.pop()
        '.'.join(prefix)
        return prefix

for item in data:
        itemSubmissionDate = item[dateColumn].split('T',1)[0]
        if itemSubmissionDate >= startDate and itemSubmissionDate <= endDate:
                filtered.append('"'+'","'.join(item)+'"')
                #zipList += " " + item.join(";").match(/(\d)+.jpg/gi).join(" ").replace(/.jpg/gi, "-large.jpg");
                zipList += ' ' + re.compile('(\d+).jpg').sub('\\1-large.jpg',' '.join(re.compile('\d+.jpg', re.IGNORECASE).findall(';'.join(item))))
        else:
                item = []
data = []

output_filenameRoot = getFileNameRoot(sys.argv[3])[0] + '_' + startDate.replace('-', '_') + '_' + endDate.replace('-', '_') + '_records_' + str((len(filtered) - 1)) + '_pictures_' + str((len(zipList.split(' ')) - 2)) 

zipList = output_filenameRoot + '.zip ' + output_filenameRoot + '.csv' + zipList


open(output_filenameRoot+'.csv', 'w').write('\n'.join(filtered))

print(zipList)


