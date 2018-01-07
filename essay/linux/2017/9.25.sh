#! /bin/bash
data="123,22,33,44,55"
oldIFS=$IFS
IFS=,
printf $IFS
for i in $data
 do 
   echo $:$i
done
IFS=$oldIFS
printf $IFS
