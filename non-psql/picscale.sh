#!/bin/bash

imgdimstr=$(identify -format "%wx%h" $2)
imgdim=(${imgdimstr//x/ })
imgdim[0]=$((${imgdim[0]} / $1))
imgdim[1]=$((${imgdim[1]} / $1))
newdimstr="${imgdim[0]}x${imgdim[1]}"
gm mogrify -size $newdimstr $2 -resize $newdimstr