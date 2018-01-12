#! /bin/zsh
echo 'git自动提交'
git add --all
git commit -m $1
git pull 
git push 
