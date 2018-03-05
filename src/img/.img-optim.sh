#!/bin/bash
# .img-optim.sh

for file in ./*
do
	echo "$file"
	convert $file -strip $file
	convert $file -resize 1000x1000\> $file
done
echo -e "\e[32m* Removed all metadata, max resolution 1000x1000 *\e[0m"
