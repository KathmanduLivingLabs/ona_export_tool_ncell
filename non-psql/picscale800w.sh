#!/bin/bash

#imgdimstr=$(identify -format "%wx%h" $1)
#imgdim=(${imgdimstr//x/ })
#####imgdim[0]=$((${imgdim[0]} / $1))
#####echo ${imgdim[0]} | bc
#ratio=$(bc <<< "scale=2; ${imgdim[0]}/800")
#####echo $ratio
#imgh=$(bc <<< "${imgdim[1]}/$ratio")
#imgh=$(echo $imgh)
#newdimstr="800x$imgh"
####echo $newdimstr
#gm mogrify -size $newdimstr $1 -resize $newdimstr
gm mogrify -size 800x800 -resize 800x800 $1
