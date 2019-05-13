cur_date=$(date "+%Y-%m-%d %H:%M:%S")
echo "请输入修改内容的备注信息:"
read message
git add --all
##git commit -m 'udpate ${cur_date} ' + $1
##gitdd pull
##git push
git commit -m "update ${cur_date} ${message}"
git pull
git push
