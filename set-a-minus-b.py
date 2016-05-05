#!/usr/bin/env python3

import sys

setA = 0
setB = 0
setX = 0

with open(sys.argv[1], 'r', encoding='utf-8') as setAListFile:
	setA = set(setAListFile.read().rstrip().split("\n"))
	setAListFile.close()

with open(sys.argv[2], 'r', encoding='utf-8') as setBListFile:
	setB = set(setBListFile.read().rstrip().split("\n"))
	setBListFile.close()

print("\n".join(setA - setB))

