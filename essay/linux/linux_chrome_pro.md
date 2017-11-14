## linux ubuntu在通过software updater升级chrome时会报一个这样的错误

    nss_util.cc(632)] NSS_VersionCheck("3.26") failed. NSS >= 3.26 is required. Please upgrade to the latest NSS, and if you still get this error, contact your distribution maintainer.

但是执行

    sudo apt-get install libnss3
    sudo apt-get update

会提示nss3已经是最新的
所以需要打开update installer设置,把'important Security Updates勾上 它会更新cache
然后在执行

    sudo apt-get install libnss3
    ||
    sudo apt-get install --reinstall libnss3

就可以打开chrome了
    