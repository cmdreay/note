#! /bin/zsh
echo 'git自动提交'
git add --all
git commit -m 'update'
git pull
git push
echo 'git执行完成'
