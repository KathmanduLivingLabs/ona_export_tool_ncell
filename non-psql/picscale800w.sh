#!/bin/bash

imgdimstr=$(identify -format "%wx%h" $1)
imgdim=(${imgdimstr//x/ })
#imgdim[0]=$((${imgdim[0]} / $1))
imgdim[1]=$((${imgdim[1]} / (imgdim[0]/800)))
newdimstr="800x${imgdim[1]}"
gm mogrify -size $newdimstr $1 -resize $newdimstr