+ configLotteryInfo之后adjustfySizeInfo
+ initTableContent

    var updateWebsocketStateFlag = true
    //更新websocket状态flag 帐号异常（下线、到期等）时置为false 当为false时 不需要重新连接了，进入模态了，需要客服重启处理了
    var gNewYlFlag = false;
    //liutest 1124  是判断当前遗漏是否画了出来的flag 为遗漏和广告轮播服务

    var lotteryConfig//配置config 存放各种配置信息  包括所有版式遗漏广告等
var lotteryTypeList//配置信息列表 
var curLotteryTypeIndex = 0//当前所在的彩票类型 0代表地一个  1代表第二个  以此推类 
var curLotteryTypeName//当前彩票版式名字
var curLotteryTypeDataList//存放当前彩种数据的变量

var curLotteryTypeStyleIndex=0 //当前所在的彩票版式 0代表地一个  1代表第二个  以此推类 
var curLotteryTypeStyleName //todo addcurLotteryStyleName 当前版式名字
var curLotteryTypeStyleList//存放版式类型的变量

var trendWidthRedundantPixels=0 //宽度冗余像素
var heightRedundantPixels = 0 //高度冗余像素
var curTrendWidthRedundantPixels=0 //当前宽度冗余像素
var curHeightRedundantPixels = 0 //当前高度冗余像素
var widthSquarCount = 28 //宽度分割的方格数



var componentList//存放一个版式内的元素的list  会遍历  然后依次执行 将对应函数画出来
var reservedLines = 3// 元素之间线所占的像素
//global
var rootTable// 初始化
var tableContainer
var prizeNumLength//开奖信息号码的长度
var prizeNumMax//开奖信息号码的最大值 用于画元素多少个竖方格
var prizeNumMin//开奖信息号码的最小值 用于画元素多少个竖方格
var prizeNumAvailableNumCount//画多少竖行的计数

//var prizeNumIssueWidth = 60
var captionHeight //=tableCellHeight*2+多余空间 表头高度
var headRowsNum = 2//表头所占的行数 就是标题
var footRowsNum = 1//表尾所占的行数 遗漏广告通用


var destPrizeItemCount = 40//竖版默认显示40期比赛
var landDestPrizeItemCount = 24//横版默认显示24场比赛

var showPrizeItemCount//u存放显示多少场比赛的信息变量

var tableColumCount=0
var tableRowCount=0  //行数
var trendCellCount=0

var tableCellWidth = 18
var tableCellHeight = 20
var trendCellWidth =12

var prevAreaPrizeNumMax = 33  //ssq; 35for dlt 双色球前区33
var backAreaPrizeNumMax = 16 //ssq; 12for dlt 双色球后区16
var prevAreaPrizeNumLength = 5 //ssq ;6 for dlt //双色球号码长度 就是几个号码

var tableCaption   //2rows height表头
var titleDiv //显示标题


var bodyContentTr////bodyContentTr = document.getElementById("bodyContentTr") 

var tableWidth //元素表的宽
var tableHeight//元素表的高
var tbodyHeight//整个程序的高  就是包括表头表尾所有加载一起

var notificationAreaEnable //1rows height//20170105通知区域 当配置中有通知时 此flag会被置为true  此时会走到显示通知函数
var notifyRowsNum = 1//通知所占的行数  固定为1
var advertisingAreaEnable  //5rows height
var advertisingRowsNum = 5//广告所占的行数  和遗漏是放在一起的 同一个区域

var curOrientation="port"//存放当前是什么版式  横版还是竖版
var adLandSpace=240 //遗漏广告区域的高度

var justUpdatePrizeNumAreaFlag=false//只更新开奖号码区域  就是如果切换版式  彩种没变 则下方遗漏区域不需要重绘 只需要更新开奖号码版式

//liutest beign
var yilouAreaEnable = false//遗漏区域flag  如果是true 就将遗漏画出来
var yltable//遗漏的table
var historyNumbers= [];//存放历史号码的变量
var gLotteryDataList85 = [];//存放全部期开奖号码的变量 
var gFirstLoadFlag = false;





        createOneOfPrizeNumTrend
        单独一个号码的走势
	     position,title,bgColor,typek3,typek3JB,typek12Qian,type11x5Green,type11x5Green13,type11x5Green2,typeP5AndQxc)
	      position 传入int数字：代表第几个数字
	     title 传入字符串，是显示第几位数字的eg：”第一位“


         function createPrizeNumRepeatTimesTrend //重号走势
         function createPrizeNumDistanceTrend  //跨度走势函数
         function createOneOfPrizeNum012Trend  //单独一个号码的012走势函数
         function createPrizeNumSumTrend    //和值走势函数
         function createPrizeNumSumBig30SmallTrend //和值大30小 函数
         function createPrizeNumFormTrend            //豹连双单函数
         function createPrizeNumOddTrend  //奇数走势函数
         function createPrizeNumSum012Trend //号码012走势函数 有跨度012  和值012 和尾012
         function createPrizeNumSumbigAndOddTrend // begin 0917 for K3吉林版




         //function
         function getMaxMinVal // dataArray传入开奖号码用于计算 返回两个数   最大值和最小值
 function createInnerTable(cellWidth,cellHeight,rows,wRedundantPixels,cols,hRedundantPixels,clsName) //创建每一个元素表格  每一个创建元素的函数都会用到
/**
	 * (cellWidth,cellHeight,rows,wRedundantPixels,cols,hRedundantPixels,clsName)
	 * cellWidth 表格宽
	 * cellHeight 表格高
	 * rows 横行多少行 一共的行数
	 * wRedundantPixels 宽度多余像素
	 * cols 可理解为多少期开奖号
	 * hRedundantPixels 高度多余像素
	 * clsName classname 需添加  才能将css执行进去
	 */




 function getCellHTML //设置表格字体大小函数  后续表格元素内只要添加数字就需要使用这个函数  

        createAver4PrizeNumDistribution  //四分区号码分布