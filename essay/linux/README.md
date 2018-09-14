## new

### 日常用到的命令 
+ netstat -ano  查看占用端口号
+ lsof -i:3000 查看端口是否被占用
+ ctrl + R 反撤销 u 撤销

### tar命令详解

+ -c: 建立压缩档案

+ -x：解压

+ -t：查看内容

+ -r：向压缩归档文件末尾追加文件

+ -u：更新原压缩包中的文件

这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。

下面的参数是根据需要在压缩或解压档案时可选的。

+ -z：有gzip属性的

+ -j：有bz2属性的

+ -Z：有compress属性的

+ -v：显示所有过程

+ -O：将文件解开到标准输出



+ 8.21update
`ssh-copy-id -i ~/.ssh/id_rsa.pub`复制到服务器上的~/.ssh/authorized_keys中免密登录  
自己写的一个上传服务器文件的脚本
  
      if [ !-n $1 ]; then
       echo "请输入参数"
       exit
      fi
      if [ $1 = "test" ]; then
      echo "上传至测试服务器"
      scp -r ./dist/ roo@testuri:/home/zhaoyu/docker/app/www/
      elif [ $1 = "pro" ]; then
      echo "上传至正式服务器"
      scp -r ./dist/ root@prouri:/var/www/
      else
      echo "请填写参数test或pro"
      fi


+ 关于 | 管道符 多命令符 ; && || 各个符号的用法
  + 1. | 管道符把前结果的正确输出给另一个命令作为输入之用
  + 2. ;命令1;命令2      多个命令顺序执行，命令之间无任何逻辑关系
  + 3. &&               命令1&&命令2            逻辑与：当命令1正确执行后，命令2才会正确执行，否则命令2不会执行
  + 4. ||               命令1||命令2            逻辑或：当命令1不正确执行后，命令2才会正确执行，否则命令2不会执行
