#!/bin/bash
c1="22"
printf 'hwhw\n'
printf "%-5s %-10s %-4.2f\n" 02 Jack 89.2345
printf "%-5s %-10s %-4.2f\n" 03 Jeff 98.4323
echo -e "\033[37;31;5m this is red text\033[39;49;0m"
echo -e "\033[37;31;5mMySQL Server Stop...\033[39;49;0m"
no1=2;
no2=3;
result=$((no1+no2))
echo ${result};
echo $PATH;
#read -n 2 first;
#echo ${first};
#cat 3.sh tee 2.txt
cat <<EOF>text.log
this is a text line1
this is a text line2
this is a text line3
EOF
cat text.log
