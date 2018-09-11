开始的串口 指的是什么
``````基本概念``` start``````
libserial_port是为了安卓设备操作串口
1. extends LinearLayout 是自定义view
2. Adapter是连接后端数据和前端显示的适配器接口，是数据和UI（View）之间一个重要的纽带。可以理解和view为绑定关系
3. ViewPager ViewPager的功能就是可以使视图滑动,setCurrentItem(int index)方法主要用来制定初始化的页面。例如加入3个页面通过setCurrentItem(0)制定第一个页面为当前页面
4. Intent 一个消息传递对象,基本用例包括##启动Activity## ##启动服务## ## 传递广播## Intent 过滤器是应用清单文件中的一个表达式，它指定该组件要接收的 Intent 类型
5. Service 是一个不使用用户界面而在后台执行操作的组件。
6. Activity 表示应用中的一个屏幕
7. 上位机概念(上位机是指可以直接发出操控命令的计算机),在本项目中上位机通过串行通信接口操作读写器的通信，本软件就属于上位机
8. FLASH(闪存) 读写器有的内容会存在闪存中，闪存中的内容断电后也不会丢失
9. ISO18000-6C电子标签是指符合ISO 18000-6C空中接口协议的电子标签。同理ISO18000-6B
10. Thread类 线程有关 
    + start()用来启动一个线程 
    + run()方法是不需要用户来调用的，当通过start方法启动一个线程之后，当线程获得了CPU执行时间，便进入run方法体去执行具体的任务。
      注意，继承Thread类必须重写run方法，在run方法中定义具体要执行的任务。
    + interrupt方法 interrupt，顾名思义，即中断的意思。单独调用interrupt方法可以使得处于阻塞状态的线程抛出一个异常，也就说，
      它可以用来中断一个正处于阻塞状态的线程；另外，通过interrupt方法和isInterrupted()方法来停止正在运行的线程
11. rfid是和二维码同级别的
12. Handler来根据接收的消息，处理UI更新。Thread线程发出Handler消息，通知更新UI。**方法postDelayed的作用是延迟多少毫秒后开始运行，而removeCallbacks方法是删除指定的Runnable对象，使线程对象停止运行。
13. AsyncTask,即异步任务,是Android给我们提供的一个处理异步任务的类.通过此类,可以实现UI线程和后台线程进行通讯,后台线程执行异步任务,并把结果返回给UI线程.比如网络操作,文件读取等耗时操作  //通过调用execute方法开始处理异步任务.相当于线程中的start方法.
参考blog: https://blog.csdn.net/u013164293/article/details/51506835 https://www.cnblogs.com/caobotao/p/5020857.html
14. <action android:name="android.intent.action.MAIN" /> action节点中的android.intent.action.MAIN表明它所在的Activity是整个应用程序的入口点，category中的android.intent.category.LAUNCHER意思是把这个Activityg归属到加载器类,即把这个Activity标注为自动会加载和启动的Activity,这样程序启动时候就先加载这个Activity了.
`````end```````


````
#####    MainActivity.java  #######
生命周期onCreate中的this指的是当前的activity
inflate ------- 加载布局的方法
LayoutInflater是一个抽象类 对于一个没有被载入或者想要动态载入的界面，都需要使用LayoutInflater.inflate()来载入
LocalBroadcastManager 是Android Support包提供了一个工具，用于在同一个应用内的不同组件间发送Broadcast。
 + LocalBroadcastManager对象的创建 getInstance
 + 注册广播接收器 registerReceiver
 + 发送广播 sendBroadcast
 + 取消注册广播接收器 unregisterReceiver

````



````
##### 文件 popupMenu.java
LayoutInflater布局服务
(LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE) // 获取当前实例
加载布局的方法inflate

````


```````reader``````
####reader文件夹有关的解析#####
 + CMD：存放指令集
 + readerHelper: 根据指令analyData执行相关操作，
 + readerBase: 用户操作，封装的reader的一些方法
 + InventoryBuffer： 应该是一个零时存放标签数据的对象
```````````````````

````````页面有关的java```````````
#####页面有关的java###
1. pageTagAccess.java 页面设置页
2. PageInventoryReal.java 页面操作
3. startstop -----------> 开始存盘

``````````````end``````````````````

```````````
### PageInventoryReal ###
refreshStartStop -- 存盘
m_curInventoryBuffer.bLoopInventoryReal 应该是个定时器的状态
```````````



