#!/bin/bash
#echo this is a test line > input.txt
#exec 3<input.txt 
#cat <&3
#exec 4>out.txt
#echo this is a new line>&4
#cat out.txt
array_pt=( 0 1 2 3 4 5 6 );
array_pt[0]="text1";
array_pt[1]="tet2";
array_pt[2]="textttt3";
array_pt[3]="text4";
array_pt[4]="text5";
array_pt[5]="text6";
#unset array_pt[6]
#echo ${array_pt[@]}
#echo ${#array_pt[*]}
#echo ${array_pt[@]:1:2}
#echo ${array_pt[*]:2:3}
#echo ${array_pt[@]##t*e}
#echo ${array_pt[@]//t/c}
#echo ${!array_pt[@]}
#function name(){
#echo $1
#name hello
#sleep 5s
#}
#if test
#then  echo 111
#else echo 222
#fi
case $1 in
start)
  echo "start mysql"
;;
stop)
  echo "stop mysql"
;;
*)
  echo "usage: $0 start|stop"
;;
esac
