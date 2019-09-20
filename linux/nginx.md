#### nginx相关

> nginx配置不同域名指向同一个ip下的不同目录(端口)
```shell
server {
        listen 80;
        listen [::]:80;
        server_name web1.web.com;
        root /var/www/pro1;
        index index.html;
        proxy_pass    http://127.0.0.1:3001/;

}
server {
        listen 80;
        listen [::]:80;

        server_name web2.web.com;
        root /var/www/pro2;
        proxy_pass    http://127.0.0.1:3000/;
        index index.html;

}
# 注意listen 端口都是 80
```
##### 参考
+ [第一章—通过Nginx实现多个域名指向同一个IP。](https://blog.csdn.net/mokeysll/article/details/94858556)
+ [Nginx反向代理实现多个域名指向同一个ip的不同网站解决方法](https://www.linuxidc.com/Linux/2018-10/154702.htm)