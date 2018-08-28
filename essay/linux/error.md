### Error: watch ENOSPC的解决方案
+ 新建的eggjs项目报这个错误但是代码没有错误，搜了一下是跟踪项目的文件数有限制
+ 解决方案 `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
