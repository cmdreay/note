# /bin/bash
echo '13'
echo '13'
file_name="9.12.sh"
name=${0%.*}
w_name=${file_name%%.*}
echo file name is :$name
echo wrong name is:$w_name
suffix=${file_name##*.}
suffixx=${file_name#*.}
echo forward is :$suffix
echo forward wrong is :$suffixx
