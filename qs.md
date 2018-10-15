开始的串口 指的是什么
``````基本概念``` start``````
libserial_port是为了安卓设备操作串口
1. extends LinearLayout 是自定义view
2. Adapter是连接后端数据和前端显示的适配器接口，是数据和UI（View）之间一个重要的纽带。可以理解和view为绑定关系
 + 数据适配器BaseAdapter 
	public int getCount(): 适配器中数据集的数据个数；

	public Object getItem(int position): 获取数据集中与索引对应的数据项；

	public long getItemId(int position): 获取指定行对应的ID；

	public View getView(int position,View convertView,ViewGroup parent): 获取没一行Item的显示内容。
	参考：https://www.cnblogs.com/caobotao/p/5061627.html
 + 

3. ViewPager ViewPager的功能就是可以使视图滑动,setCurrentItem(int index)方法主要用来制定初始化的页面。例如加入3个页面通过setCurrentItem(0)制定第一个页面为当前页面
   ViewPager 详解（一）---基本入门参考：https://blog.csdn.net/suyimin2010/article/details/80659993
   设置当前选中的页面setCurrentItem
4. Intent 一个消息传递对象,基本用例包括##启动Activity## ##启动服务## ## 传递广播## Intent 过滤器是应用清单文件中的一个表达式，它指定该组件要接收的 Intent 类型 当Intent在组件间传递时，组件如果想告知Android系统自己能够响应和处理哪些Intent，那么就需要用到IntentFilter对象
除开过滤广播的的IntentFilter可以在代码中创建外，其它的IntentFilter都得在AndroidManifest.xml中给设置。
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
    runnable接口启动线程 类实现Runnable接口，实现run方法
    若要循环的执行，就是每隔2s去执行一次线程，就用递归，在run()中执行
		Runnable runnable=new Runnable(){  
		   @Override  
		   public void run() {  
		    // TODO Auto-generated method stub  
		    //要做的事情，这里再次调用此Runnable对象，以实现每两秒实现一次的定时器操作  
		    handler.postDelayed(this, 2000);  
		   }     
		};  
		handler.postDelayed(this, 2000);
    ** handleMessage 处理消息的方法
    ** sendEmptyMessage(int what):发送空消息
13. AsyncTask,即异步任务,是Android给我们提供的一个处理异步任务的类.通过此类,可以实现UI线程和后台线程进行通讯,后台线程执行异步任务,并把结果返回给UI线程.比如网络操作,文件读取等耗时操作  //通过调用execute方法开始处理异步任务.相当于线程中的start方法.
参考blog: https://blog.csdn.net/u013164293/article/details/51506835 https://www.cnblogs.com/caobotao/p/5020857.html
14. <action android:name="android.intent.action.MAIN" /> action节点中的android.intent.action.MAIN表明它所在的Activity是整个应用程序的入口点，category中的android.intent.category.LAUNCHER意思是把这个Activityg归属到加载器类,即把这个Activity标注为自动会加载和启动的Activity,这样程序启动时候就先加载这个Activity了.
15. 
在当前Activity1使用startActvity(intent)或者startActivityForResult(intent, code)方法跳转到另一个Activity2之前，如果要传递数据给Activity2，则会执行:

Activity1:

intent.putExtra("String str1", "String Key1")或intent.putExtra("Int str1", "Int Key1")

将String数据打包到Intent中，并给它一个Key标识。

在Activity2当中：

1.getIntent()方法获得这个intent，
2.然后再getStringExtra("Key")，获得string型变量值，getIntExtra("Key")，获得int型变量值。不加引号是获得常量值。
16. str = new String(byte[] bytes, "UTF-8");重新用utf-8编码

17. 
dip: device independent pixels(设备独立像素). 不同设备有不同的显示效果
sp: scaled pixels(放大像素). 主要用于字体显示best for textsize。
18. LinearLayout(线性布局)，RelativeLayout(相对布局)，TableLayout(表格布局) FrameLayout(帧布局)，AbsoluteLayout(绝对布局)


19. fragment 碎片
Fragment是依赖于Activity的，不能独立存在的。
一个Activity里可以有多个Fragment。
一个Fragment可以被多个Activity重用。
Fragment有自己的生命周期，并能接收输入事件。
我们能在Activity运行时动态地添加或删除Fragment。

优势：
模块化（Modularity）：我们不必把所有代码全部写在Activity中，而是把代码写在各自的Fragment中。
可重用（Reusability）：多个Activity可以重用一个Fragment。
可适配（Adaptability）：根据硬件的屏幕尺寸、屏幕方向，能够方便地实现不同的布局，这样用户体验更好。



`````end```````


````
#####    MainActivity.java  #######
生命周期onCreate中的this指的是当前的activity
inflate ------- 加载布局的方法
LayoutInflater是一个抽象类 对于一个没有被载入或者想要动态载入的界面，都需要使用LayoutInflater.inflate()来载入
通过getLayoutInflater( )方法或getSystemService( )方法来获得与当前Context绑定的 LayoutInflater实例! 参考：http://www.runoob.com/w3cnote/android-tutorial-layoutinflater.html
 + 加载布局的方法：inflate (int resource, ViewGroup root, boolean attachToRoot) 
 + 通过LayoutInflater.LayoutParams来设置相关的属性。
LocalBroadcastManager 是Android Support包提供了一个工具，用于在同一个应用内的不同组件间发送Broadcast。
 + LocalBroadcastManager对象的创建 getInstance
 + 注册广播接收器 registerReceiver
 + 发送广播 sendBroadcast
 + 取消注册广播接收器 unregisterReceiver

'
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

#################################################

条形码项目


#################################################
1. ProgressDialog 置顶界面元素的对话框 dismiss关闭
2.  重写：返回值和形参都不能改变
3. 声明抽象方法会造成以下两个结果：

如果一个类包含抽象方法，那么该类必须是抽象类。
任何子类必须重写父类的抽象方法，或者声明自身为抽象类。

4. application 一个apk对应一个  在获取Application时，如果是在Context的情况下可以就可以直接通过(MyApplication)getApplication()来获取getApplicationContext() 是返回应用的上下文，也就是把Application作为Context，生命周期是整个应用，应用摧毁它才摧毁。
onTerminate 当终止应用程序对象时调用




################
demo目标：
一个界面(使用已经选好的ui框架) 界面传参
扫描器读取二维码后写入电子标签
显示条形码和电子标签()
存入数据库
读取数据库信息
远程接口访问 并存取数据(数据库或框架) 通过一些封装的方法


+ view.getId()获取不同控件的id
addView指定的布局中添加一个view
+ 隐藏状态栏
  //去除title
		requestWindowFeature(Window.FEATURE_NO_TITLE);
  //去掉Activity上面的状态栏        
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
### 数据库有关
+ ContentValues介绍及使用
	它其实很像一个字典对象，可以用来存储键值对
+ Cursor cursor是每行的集合。你必须知道每一列的名称。你必须知道每一列的数据类型。Cursor 是一个随机的数据源。所有的数据都是通过下标取得。
	c.move(int offset); //以当前位置为参考,移动到指定行  
	c.moveToFirst();    //移动到第一行  
	c.moveToLast();     //移动到最后一行  
	c.moveToPosition(int position); //移动到指定行  
	c.moveToPrevious(); //移动到前一行  
	c.moveToNext();     //移动到下一行  
	c.isFirst();        //是否指向第一条  
	c.isLast();     //是否指向最后一条  
	c.isBeforeFirst();  //是否指向第一条之前  
	c.isAfterLast();    //是否指向最后一条之后  
	c.isNull(int columnIndex);  //指定列是否为空(列基数为0)  
	c.isClosed();       //游标是否已关闭  
	c.getCount();       //总数据项数  
	c.getPosition();    //返回当前游标所指向的行数  
	c.getColumnIndex(String columnName);//返回某列名对应的列索引值，如果不存在返回-1  
	c.getString(int columnIndex);   //返回当前行指定列的值  
	c·getColumnIndexOrThrow(String columnName)——从零开始返回指定列名称，如果不存在将抛出IllegalArgumentException 异常。
	c.close()——关闭游标，释放资源
+ sqlite3相关
.help -- 这是一个简单的注释



#### context对象
context理解为上下文或者场景，是Activity，Application，Service的父类。对象在程序中所处的一个环境，一个与系统交互的过程。Context提供了关于应用环境全局信息的接口。它是一个抽象类，它的执行被Android系统所提供。它允许获取以应用为特征的资源和类型，是一个统领一些资源（应用程序环境变量等）的上下文。
Context类本身是一个纯abstract类，它有两个具体的实现子类：ContextImpl和ContextWrapper。ContextImpl是Context的具体实现类，ContextWrapper是Context的包装类。Activity，Application，Service都继承自ContextWrapper，但它们初始化的过程中都会创建ContextImpl对象，由ContextImpl实现Context中的方法。

#### application
系统组件，一个程序只有一个，生命周期等于程序的生命周期。**在安卓中我们可以避免使用静态变量来存储长久保存的值，而用Application。**
通常Application全局对象是通过Context或者Activity的getApplicationContext()方法获得的比如我们在应用程序中想要获得我们刚刚定义的AppContext对象，就需要在activity中这样做：

appContext = (your application obj)this.getApplicationContext();

如果有Context对象mContext，还可以：appContext = (your application obj)mContext.getApplicationContext();
参考：https://blog.csdn.net/cswhale/article/details/38659245

``````````````````````````
+ SimpleDateFormat格式化时间类

+ String 是java中的字符串，它继承于CharSequence，CharSequence是一个接口 StringBuilder 和 StringBuffer都是可变的字符序列。

+ SpannableString(主要功能是设置复合文本) SpannableString与SpannableStringBuilder都可以将某段文本设置成一个Span，在Android中，Span表示一段文本的效果，例如，链接形式、图像、带背景的文本等。参考：https://blog.csdn.net/u011494050/article/details/38460537
+ SharedPreferences的使用非常简单，能够轻松的存放数据和读取数据。SharedPreferences只能保存简单类型的数据，例如，String、int等。一般会将复杂类型的数据转换成Base64编码，然后将转换后的数据以字符串的形式保存在 XML文件中，再用SharedPreferences保存。
	获取SharedPreferences的实例：
			context.getSharedPreference(name, mode);
			PreferenceManager.getDefaultSharedPreferences(context);
  参考：https://blog.csdn.net/wxyyxc1992/article/details/17222841
+ onTerminate 当终止应用程序对象时调用，不保证一定被调用，当程序是被内核终止以便为其他应用程序释放资源，那么将不会提醒，并且不调用应用程序的对象的onTerminate方法而直接终止进程

+ 控件方法setEnabled是否激活该控件以便响应事件
+ getResources读取系统资源res
+ RecyclerView 和 listview  参考：https://www.jianshu.com/p/bb6b029de04f
+ 泛型泛型，即“参数化类型”。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量参数，此时类型也定义成参数形式（可以称之为类型形参），然后在使用/调用时传入具体的类型（类型实参）。
+ Gson java对象和JSon之间的互转 https://www.cnblogs.com/majay/p/6336918.html
+ MPAndroidChart:  https://blog.csdn.net/ww897532167/article/details/77334345     参考本地两个Mpandroidchart项目


+ WindowManager主要用来管理窗口的一些状态、属性、view增加、删除、更新、窗口顺序、消息收集和处理等。通过Context.getSystemService(Context.WINDOW_SERVICE)的方式可以获得WindowManager的实例 一般的开发过程中，我们操作的是 UI 框架层，对 Window 的操作通过 WindowManager 即可完成，而 WindowManagerService 作为系统级服务运行在一个单独的进程，所以 WindowManager 和 WindowManagerService 的交互是一个 IPC(进程间通信) 过程。
+ Android中实现view的更新有两组方法，一组是invalidate，另一组是postInvalidate  Android提供了Invalidate方法实现界面刷新，但是Invalidate不能直接在线程中调用，因为他是违背了单线程模型：Android UI操作并不是线程安全的，并且这些操作必须在UI线程中调用。
+ 集合的长度是可变的 java中集合Collection,List,ArrayList关系 ArrayList是具体的实现类,实现了List接口
  List是接口,继承了Collection接口 List继承了Collection接口   但是List是可以重复的并且有序的集合 Collection是不可重复且无序的
  List接口不能被构造 也就是我们说的不能创建实例对象 但是我们可以像下面那样为List接口创建一个指向自己的对象引用 
  而ArrayList实现类的实例对象就在这充当了这个指向List接口的对象引用 这也是多态的一种:`List<String> list = new ArrayList<String>();`
  + 第一次给集合添加元素的时候 集合中数组的长度会被设置成10   每次数组元素满了以后 重新给数组设置的长度为  原数组长度+(原数组长度/2)

