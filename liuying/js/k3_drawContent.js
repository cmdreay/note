var rootTable// 初始化
var tableContainer
var tableCaption   //2rows height表头
var bodyContentTr   ////bodyContentTr = document.getElementById("bodyContentTr")
var yltable//遗漏的table
var gNewYlFlag = false;    //liutest 1124  是判断当前遗漏是否画了出来的flag 为遗漏和广告轮播服务
var rootTable// 初始化
var justUpdatePrizeNumAreaFlag=false//只更新开奖号码区域  就是如果切换版式  彩种没变 则下方遗漏区域不需要重绘 只需要更新开奖号码版式
//////////////////////////////////
//advertising area end
//////////////////////////////////
var adList
var curAdIndex=0
var adSwitchInterval = 3000 //1s
var curAdSwitchInterval=0

var adImgObj
var adHDivContainer
var gNewYlFlag = false;

var curLotteryTypeIndex = 0//当前所在的彩票类型 0代表地一个  1代表第二个  以此推类 
var curLotteryTypeName//当前彩票版式名字
var lotteryTypeList//配置信息列表 
var updateADAndYL = false//高低频之间切换的flag
var curLotteryTypePeriod//得到当前期数   以判断是否大于100   覆盖高频彩的div
var DueTime//得到的当前时间
var overdueDiv//覆盖走势图div
var curLotteryTypeStyleList//存放版式类型的变量
var curLotteryTypeStyleName //todo addcurLotteryStyleName 当前版式名字
var curLotteryTypeStyleIndex=0 //当前所在的彩票版式 0代表地一个  1代表第二个  以此推类 
var systemUpdateFlag=false  //systemUpdateFlag  //系统是否需要更新 更新号码时置为true 当为true时去更新号码
var curOrientation="port"//存放当前是什么版式  横版还是竖版
var destPrizeItemCount = 40//竖版默认显示40期比赛
var landDestPrizeItemCount = 24//横版默认显示24场比赛
var xmlhttp;
var advertisingAreaEnable  //5rows height
var tableWidth //元素表的宽
var tableHeight//元素表的高
var tbodyHeight//整个程序的高  就是包括表头表尾所有加载一起
var tableColumCount=0    //不需要画线的格数
var tableRowCount=0  //行数
var trendCellCount=0  //需要画曲线的列个数
var prevAreaPrizeNumMax = 33  //ssq; 35for dlt 双色球前区33
var backAreaPrizeNumMax = 16 //ssq; 12for dlt 双色球后区16
var prevAreaPrizeNumLength = 5 //ssq ;6 for dlt //双色球号码长度 就是几个号码
var prizeNumLength
var prizeNumMax
var prizeNumMin
var prizeNumAvailableNumCount
var componentList//存放一个版式内的元素的list  会遍历  然后依次执行 将对应函数画出来
var widthSquarCount = 28 //宽度分割的方格数
var showPrizeItemCount
var reservedLines = 3// 元素之间线所占的像素
var notificationAreaEnable //1rows height
var notifyRowsNum = 1
var advertisingRowsNum = 5//广告所占的行数  和遗漏是放在一起的 同一个区域
var tableCellWidth = 18
var tableCellHeight = 20
var trendCellWidth =12
var trendWidthRedundantPixels=0 //宽度冗余像素
var heightRedundantPixels = 0 //高度冗余像素
var curTrendWidthRedundantPixels=0 //当前宽度冗余像素
var curHeightRedundantPixels = 0 //当前高度冗余像素
var captionHeight //=tableCellHeight*2+多余空间 表头高度
var innerTableCount=0  // 用于记录表格边框占据的像素，会将表格撑大超出
var kuaicaiDiv//0510 快彩 表头部分
var imgObj
var titleDiv
var styleTitleDiv
var agentphoneNumber
var progressDiv
var timeDiv
var curLotteryTypeStartTime="9:00" //24hour 彩票开始销售的时间
var curLotteryTypeInterval = "10" //sec 时间间隔  高频彩10分钟一开奖
var curLotteryTypeMaxPeriod=80//最大期数   所要显示的最大期数 
var startSecondOfDay;
var endSecondOfDay; 
var intervalTime; //min
var curLotteryTypeDataList//存放当前彩种数据的变量
var needInitNumberMatrix = true
var numberMatrix=[];
var setIntervalId //遗漏广告轮播id
var intervalExistFlag = false;	//相当于当轮播开始后  此flag便为true,以用于停止setInterval
var supportYilouCaizhongFlag = false;//k3  k115  k10   是需要画遗漏彩种的一个flag
var backgroundNumberEnabled=false
var tipsInfoDiv
var gVersion= "3.426"
var adLandSpace=240 
var lotteryConfig
var fakek3YCYLDate = {one:{},two:{},three:{},sum:{}}
var curLotteryTypeYiLouDatalist
// //快3遗漏测试数据
var fakek3YLDate = {day1:{},day2:{},day3:{}}
var fakek10YLDate = {zuq3:{},r3:{},r5:{},r4:{},zxq3:{}}//liutest
var divObjyl = document.createElement("div")//之前divObj是一个全局变量,复用率较高,现在轮播需要分开单独.
var advertisingArea = false
var divObjad = document.createElement("div")



function yilouDataRequest(){//20170414 遗漏数据加载 function
	var url = 'http://123.57.223.54:4001/newYLinfo?caizhong='
	var name = curLotteryTypeName
	if(name.indexOf('11选5')>=0 || name.indexOf('快乐彩')>=0||name.indexOf('快3') >= 0||name.indexOf('快乐十') >= 0){
		url += name;
	}else{
		return ;
	}
	var yilouxmlhttp = new XMLHttpRequest();
	yilouxmlhttp.onreadystatechange = function(){
		if (yilouxmlhttp.readyState==4){
			if(yilouxmlhttp.status==200){
				var result= JSON.parse(yilouxmlhttp.responseText);
				_handlePushmsg({
					channel:name,
					cmd:"pushmsg",
					msg:JSON.stringify(result)
				});
			}else{
				console.log(yilouxmlhttp.status)
			}
		}
	}
	
	yilouxmlhttp.open("GET",url,true);
	yilouxmlhttp.send();
	//liutest end for yiloudata update 20170405
}

function requestLotteryData(name,count)
{
	count = count > 100?40:count;
	systemUpdateFlag = false
	//console.log("requestLotteryData lotteryTypeName:"+name+":"+count)
	if(count< 0 || count > 85)
	{
		count = lotteryTypeList[curLotteryTypeIndex].periods
	}
	
	localStorage.lastLotteryTypeName = name	
	if(curOrientation=="land")
	{
		destPrizeItemCount = landDestPrizeItemCount
		//console.log("curOrientation land"+destPrizeItemCount+landDestPrizeItemCount)
	}
	else
	{
		localStorage.lastPeriods = count
		destPrizeItemCount = count
		//console.log("curOrientation port count"+destPrizeItemCount+count)
	}
	curLotteryTypeName = name	

	xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = handleRequestLotteryDataResponse
	//liutest begin for ZC0912
	// xmlhttp.open("GET","http://123.57.212.33/wserver/histnum?uid="+localStorage.sn+"&channel="+name+"&count="+destPrizeItemCount,true);
	xmlhttp.open("GET","http://123.57.212.33/wserver/histnum?uid="+localStorage.sn+"&channel="+name+"&count=85",true);
	//liutest end for ZC0912
	xmlhttp.send();

	overdueDiv = document.getElementById("overdueDiv")//覆盖位置
	switch(parseInt(destPrizeItemCount)){
		case 40:overdueDiv.style.marginTop = "754px";break;
		case 45:overdueDiv.style.marginTop = "768px";break;
		case 50:overdueDiv.style.marginTop = "780px";break;
		case 55:overdueDiv.style.marginTop = "792px";break;
		case 60:overdueDiv.style.marginTop = "802px";break;
		case 65:overdueDiv.style.marginTop = "809px";break;
		case 70:overdueDiv.style.marginTop = "816px";break;
		case 35:overdueDiv.style.marginTop = "738px";break;
		default:overdueDiv.style.marginTop = "825px";
	}
	

	//liutest begin for yiloudata update 20170214
	yilouDataRequest()//20170414 遗漏数据加载
	//liutest end for yiloudata update 20170214
	
}








function handlekeyright(){
	var lotteryName1;
	var lotteryName2;
    justUpdatePrizeNumAreaFlag=true
	//liutest begin for 单彩种多版式右键切换版式问题
	if(curLotteryTypeStyleIndex == curLotteryTypeStyleList.length-1)//最后一个版式，需要考虑切换彩种或第一个版式
	{
		curLotteryTypeStyleIndex = 0;//置为第一个版式
		if(curLotteryTypeIndex == lotteryTypeList.length-1)//最后一个彩种
		{
			lotteryName1 = lotteryTypeList[curLotteryTypeIndex].interval

			curLotteryTypeIndex=0//置为第一个彩种

			lotteryName2 = lotteryTypeList[curLotteryTypeIndex].interval
			
			if(curLotteryTypeIndex != lotteryTypeList.length-1)//不是单彩种
			{
				if ((lotteryName1>500&&lotteryName2===0)||(lotteryName1===0&&lotteryName2>500)) {
					updateADAndYL = true;
				}else{
					updateADAndYL = false
				}
				curLotteryTypeStyleList=lotteryTypeList[curLotteryTypeIndex].formats
				curLotteryTypeStyleName = curLotteryTypeStyleList[curLotteryTypeStyleIndex][0]
				gNewYlFlag = true;//liutest 1124
				requestLotteryData(lotteryTypeList[curLotteryTypeIndex].name,lotteryTypeList[curLotteryTypeIndex].periods)
			}
			else
			{
				updateADAndYL = false;
				curLotteryTypeStyleName = curLotteryTypeStyleList[curLotteryTypeStyleIndex][0];
				gNewYlFlag = false;//liutest 1124
				initTableContent();
			}
		//liutest end
		}
		else
		{
			lotteryName1 = lotteryTypeList[curLotteryTypeIndex].interval

			curLotteryTypeIndex++

			lotteryName2 = lotteryTypeList[curLotteryTypeIndex].interval

			if ((lotteryName1>500&&lotteryName2===0)||(lotteryName1===0&&lotteryName2>500)) {
				updateADAndYL = true;
			}else{
				updateADAndYL = false
			}
			curLotteryTypeStyleList=lotteryTypeList[curLotteryTypeIndex].formats
			curLotteryTypeStyleName = curLotteryTypeStyleList[curLotteryTypeStyleIndex][0]
			gNewYlFlag = true;//liutest 1124
			requestLotteryData(lotteryTypeList[curLotteryTypeIndex].name,lotteryTypeList[curLotteryTypeIndex].periods)
		}
		
	}
	else
	{
		
		updateADAndYL = false;
		curLotteryTypeStyleIndex++
		curLotteryTypeStyleName = curLotteryTypeStyleList[curLotteryTypeStyleIndex][0]
		gNewYlFlag = false;//liutest 1124
		initTableContent()
	}
	localStorage.lastLotteryTypeStyleName = curLotteryTypeStyleName
}
//重置
function resetTable()
{
	//liutest begin
	if(yltable){
		if(yltable.className && gNewYlFlag){//liutest 1124
			for(r=yltable.rows.length-1;r>=0;r--){
				yltable.deleteRow(r);				
			}
			gNewYlFlag =false;//liutest 1124
		}
	}
	//liutest end
	
	for(var j=rootTable.rows.length-1;j>=0;j--)
	{
		if(j==0)
		{
			for(var i=bodyContentTr.cells.length-1;i>=0;i--)
				bodyContentTr.removeChild(bodyContentTr.cells[i])
		}
		else
		{
			if(justUpdatePrizeNumAreaFlag==false)
				rootTable.deleteRow(j)
		}
	}
	if(justUpdatePrizeNumAreaFlag==false && adHDivContainer)
	{
		document.body.removeChild(adHDivContainer)
		adHDivContainer=undefined
	}
	
}














//绘图start






function getRowsCount()
{
	var initCount = showPrizeItemCount + reservedLines + 2  + 2 //reservedLines,2 header row,2table caption
	if(notificationAreaEnable)  //in tfootArea
		initCount += notifyRowsNum
	if(advertisingAreaEnable && curOrientation=="port")  //in tfootArea
		initCount += advertisingRowsNum
	return initCount
}
function getOutTableLines()
{
	var linexPixels=1   //caption
	if(notificationAreaEnable)
		linexPixels += 1
	if(advertisingAreaEnable && curOrientation=="port")  //in tfootArea
		linexPixels += 1
	return linexPixels

}


function initDurationOfDay()
{
	var timeArray = curLotteryTypeStartTime.split(":")
	var sec=9*60*60;
	if(timeArray.length==2)
		sec=parseInt(timeArray[0])*60*60+parseInt(timeArray[1]*60)
	if(timeArray.length==3)
		sec=parseInt(timeArray[0])*60*60+parseInt(timeArray[1]*60)+parseInt(timeArray[2])
	
	startSecondOfDay = sec;
	//console.log("startSecondOfDay:"+startSecondOfDay)
	intervalStartSecondOfDay =18*60*60+40*60  //陕西快乐十分 开奖时间间隔问题
	intervalEndSecondOfDay = 20*60*60//+parseInt(timeArray[1]*60)+parseInt(timeArray[2])
	intervalTime = parseInt(curLotteryTypeInterval)  //sec
	if (curLotteryTypeName.indexOf("陕西快乐十")>=0) { //陕西快乐十分 时间问题
		var qihaoString = curLotteryTypeDataList[curLotteryTypeDataList.length-1].issue
		var qihao = parseInt(qihaoString.substring(qihaoString.length-2))
		if (qihao<=11) {
			intervalTime = intervalTime+6
		}else{
			intervalTime = intervalTime+7
		}
	}
	endSecondOfDay = startSecondOfDay+curLotteryTypeMaxPeriod*intervalTime //sec
	//console.log("endSecondOfDay:"+endSecondOfDay)
}




function updateTitleAreaInfo()
{
	
	curLotteryTypeStartTime=lotteryTypeList[curLotteryTypeIndex].starttime //24hour hour:min:second
	curLotteryTypeInterval = lotteryTypeList[curLotteryTypeIndex].interval //sec
	curLotteryTypeMaxPeriod = lotteryTypeList[curLotteryTypeIndex].maxperiods
	if (curLotteryTypeName.indexOf("重庆快乐十")>=0) {
		titleDiv.innerHTML="重庆幸运农场"
	}else if(curLotteryTypeName.indexOf("大乐透")>=0)
	{
		titleDiv.innerHTML="超级大乐透开奖号码	走势图"
	}else if(curLotteryTypeName.indexOf("七星彩")>=0)
	{
		titleDiv.innerHTML="七星彩开奖号码走势图"
	}else if(curLotteryTypeName.indexOf("金7乐")>=0)
	{
		titleDiv.innerHTML="金7乐"
	}else if(curLotteryTypeName.indexOf("排列3")>=0)
	{
		titleDiv.innerHTML="排列3/5开奖号码走势图"
	}else if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
		titleDiv.innerHTML="<span style=font-size:12px>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本开奖数据仅供参考，实际以官方开奖视频为准  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"</span>"+"<br/>"+"<span style=font-size:15px>"+agentphoneNumber+"</span>"
		//"<div>"+"本开奖数据仅供参考，实际信息以官方开奖视频为准 "+"<br/>"+"     艺彩广告：0431-88917515/15714301099"+"</div>"
		titleDiv.style.lineHeight= captionHeight*0.32+"px"
		titleDiv.style.color = "black"		
		titleDiv.style.marginTop = "-4px"
	}
	else if (curLotteryTypeName.indexOf("天津11选5")>=0) {
		titleDiv.innerHTML=""
	}else if (curLotteryTypeName.indexOf("快乐十")>=0) {
		titleDiv.innerHTML="快乐十分走势图"
	}
	else{
		titleDiv.innerHTML=curLotteryTypeName
	}

	//liutest begin, 修改艺彩为定制, 20170302
	var styleTitleText = curLotteryTypeStyleName;
	if(styleTitleText.indexOf("艺彩")>=0){
		styleTitleText = styleTitleText.replace(/艺彩/, "DYC");
	}
	styleTitleDiv.innerHTML=styleTitleText;
	//liutest end, 修改艺彩为定制, 20170302
	
	initDurationOfDay()
}


function adjustTitleDivSize()
{
	if(kuaicaiDiv==undefined)//0510 快彩 表头部分 将原来的覆盖
	{
		kuaicaiDiv = document.getElementById("kuaicaiDiv")
	}
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {	
		kuaicaiDiv.style.display = "block"
		// kuaicaiDiv.style.width=tableWidth-2+"px" //not contain border
		if (curOrientation==="port") {
			kuaicaiDiv.style.width = "642px"
		}else{
			kuaicaiDiv.style.width = "963px"
		}		
		kuaicaiDiv.style.marginLeft = "80px"
		kuaicaiDiv.style.height=captionHeight+"px"
		// kuaicaiDiv.style.backgroundColor = "blue"
		kuaicaiDiv.style.lineHeight = captionHeight+"px"
		kuaicaiDiv.style.fontSize="20px"
		kuaicaiDiv.innerHTML = curLotteryTypeName+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"左右键切换页面"+"&nbsp&nbsp&nbsp&nbsp"+"<span style=font-size:17px>"+agentphoneNumber+"</span>"
	}else{
		kuaicaiDiv.style.display = "none"
	}

	if(imgObj == undefined)
	{
		imgObj = document.getElementById("logoImg")
	}
	imgObj.height=captionHeight	
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {
		imgObj.width=captionHeight
	}else{
		imgObj.width=Math.floor(captionHeight/58*129)
	}
	if(logoImgContainer == undefined)//0510 原默认图片底色白色 改快彩版底色需变色
	{
		logoImgContainer = document.getElementById("logoImgContainer")
	}
	 logoImgContainer.style.backgroundColor = "white"
	
	

	if (curLotteryTypeName.indexOf("天津快乐十")>=0) {		
		imgObj.src="images/tupiao.svg";
		imgObj.style.marginLeft="65px";
	}else if (curLotteryTypeName.indexOf("天津11选5")>=0){
		imgObj.src="images/11x5.jpg";
		imgObj.width=575.2
		imgObj.style.marginLeft="auto"
		
	}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0510 logo需要改变
		imgObj.src="images/kclogo.png"				
		imgObj.style.marginLeft="30px";
		logoImgContainer.style.backgroundColor = "#8B2500"
	}else{		
		imgObj.src="images/logo.png"
		imgObj.style.marginLeft="auto";

	 }

	
	if(titleDiv==undefined)
	{
		titleDiv = document.getElementById("titleDiv")
	}
	titleDiv.style.height = captionHeight+"px"
	titleDiv.style.lineHeight = captionHeight+"px"
	//titleDiv.style.fontSize = Math.floor(captionHeight*0.85)+"px"

              if (curLotteryTypeName.indexOf("天津快乐十")>=0) {
		//titleDiv.style.fontSize = Math.floor(captionHeight*0.65)+"px"
		titleDiv.style.fontSize = Math.floor(captionHeight*0.63)+"px"//20161011 解决意见新版"快乐十分开奖号码走势图"字体稍大
		titleDiv.style.fontFamily ="kuaishiFont"
		titleDiv.style.fontWeight="lighter"
		titleDiv.style.color = "#b51808"
	}else if (curLotteryTypeName.indexOf("快乐十")>=0) {
		titleDiv.style.fontFamily = "kuaishiFont"
		titleDiv.style.fontWeight="lighter"		
		titleDiv.style.fontSize = Math.floor(captionHeight*0.85)+"px"
		titleDiv.style.color = ""
	}else if ((curLotteryTypeName.indexOf("大乐透")>=0||curLotteryTypeName.indexOf("排列")>=0||curLotteryTypeName.indexOf("七星彩")>=0)&&curOrientation==="port") {		
			titleDiv.style.fontSize = Math.floor(captionHeight*0.6)+"px"	
	}else{
		titleDiv.style.backgroundColor = ""
		titleDiv.style.fontFamily = ""
		titleDiv.style.fontWeight=""
		titleDiv.style.color = ""
		titleDiv.style.fontSize = Math.floor(captionHeight*0.85)+"px"
	}
	
	if(styleTitleDiv==undefined)
	{
		styleTitleDiv = document.getElementById("styleTitleDiv")
	}
	styleTitleDiv.style.lineHeight = Math.floor(captionHeight/2)+"px"
	styleTitleDiv.style.fontSize = Math.floor(captionHeight/2*0.7)+"px"
	
	
		
	
	
	if(progressDiv==undefined)
	{
		progressDiv = document.getElementById("progressDiv")
	}
	if(timeDiv==undefined)
	{
		timeDiv = document.getElementById("timeDiv")
	}
	timeDiv.style.lineHeight=Math.floor(captionHeight/2)+"px"
	timeDiv.style.fontSize = Math.floor(captionHeight/2*0.85)+"px"
	if ((curLotteryTypeName.indexOf("大乐透")>=0||curLotteryTypeName.indexOf("排列")>=0||curLotteryTypeName.indexOf("七星彩")>=0)&&curOrientation==="port"){
			timeDiv.style.fontSize = Math.floor(captionHeight/2*0.6)+"px"
	}

	//快彩倒计时部分 
	if (kuaicaiTimeDiv==undefined) {
		kuaicaiTimeDiv = document.getElementById("kuaicaiTimeDiv")

	}
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {
		kuaicaiTimeDiv.style.display = "block"
	}else{
		kuaicaiTimeDiv.style.display = "none"
	}

	kuaicaiTimeDiv.style.width=tableWidth/2+"px" //not contain border
	kuaicaiTimeDiv.style.height=tableCellHeight+"px"
	kuaicaiTimeDiv.style.lineHeight = tableCellHeight+"px"
	kuaicaiTimeDiv.style.marginLeft = "-60px"
	// kuaicaiTimeDiv.style.fontSize=tableCellHeight*0.7+"px"
	kuaicaiTimeDiv.style.top=(tableCellHeight+1) * (showPrizeItemCount + 2 + 2 + 1)+Math.min(heightRedundantPixels,(showPrizeItemCount  + 2  + 2 +2))+"px"
	
	
	updateTitleAreaInfo()
}

function adjustfySizeInfo()
{
	tableRowCount = getRowsCount()
	var tableRowLinesPixels=getOutTableLines()
	// console.log(tableRowCount);
	// console.log(tableRowLinesPixels);
	tableCellHeight = Math.floor((tableHeight-tableRowCount-tableRowLinesPixels*2) / tableRowCount)
	// console.log(tableCellHeight);
	heightRedundantPixels = (tableHeight-tableRowCount-tableRowLinesPixels*2)%tableRowCount 
	// console.log(curHeightRedundantPixels);
	captionHeight = (tableCellHeight)*2+1  // 2 rows height
	tableCaption.style.height = captionHeight+'px'
	
	tableColumCount =0
	var innerTableCount=0  // 用于记录表格边框占据的像素，会将表格撑大超出
	// console.log(componentList)
	for(i in componentList)
	{
		switch(componentList[i])
		{
			case "1":
			case 1:
			case "prizeIssue":
				tableColumCount += 1
				innerTableCount++
				break;
			case "2":
			case 2:
			case "prizeNum":
				tableColumCount += prizeNumLength
				innerTableCount++
				break;
			case "3":
			case 3:
			case "prev3PrizeNum":
				tableColumCount +=3
				innerTableCount++
				break;
			case "4":
			case 4:
			case "prev3PrizeNumTrend":
				//tableColumCount +=3*prizeNumAvailableNumCount
				trendCellCount += 3*prizeNumAvailableNumCount
				innerTableCount+=3
				break;
			case "5":
			case 5:
			case "prizeNumDistribution":
				tableColumCount +=prizeNumAvailableNumCount
				innerTableCount++
				break;
			case "6":
			case 6:
			case "prizeNumDistributionAsBall":
			    tableColumCount +=prizeNumAvailableNumCount
				innerTableCount++
				break;
			case "7":
			case 7:
			case "prev3PrizeNumDistribution":
			    tableColumCount +=prizeNumAvailableNumCount
				innerTableCount++
				break;
			case "8":
			case 8:
			case "prizeNumRepeatTimes":
				tableColumCount +=1
				innerTableCount++
				break;	
			case "9":
			case 9:
			case "prev3PrizeNumRepeatTimes":
				tableColumCount +=1
				innerTableCount++
				break;	
			
			case "10":
			case 10:
			case "prev3PrizeNumSum":
				tableColumCount +=1
				innerTableCount++
				break;				
			
			case "11":
			case 11:
			case "prev3PrizeNumDistance":
				tableColumCount +=1
				innerTableCount++
				break;
			case "12":
			case 12:
			case "prizeNumDistance":
				tableColumCount +=1
				innerTableCount++
				break;
			case "13":
			case 13:
			case "prev3PrizeNumDistanceTrend":
				//tableColumCount +=prizeNumMax-3+1  
				trendCellCount  +=(prizeNumMax-3+1) 
				innerTableCount++
				break;
			case "14":
			case 14:
			case "prizeNumDistanceTrend":
				//tableColumCount += prizeNumMax-prizeNumLength+1 
				trendCellCount += (prizeNumMax-prizeNumLength+1) 
				innerTableCount++
				break;			
			case "15":
			case 15:
			case "prev3PrizeNumWith012Trend":
				//tableColumCount += 3*(prizeNumAvailableNumCount)
				trendCellCount += (3*(prizeNumAvailableNumCount+3))
				innerTableCount+=6
				break;
			
			case "16":
			case 16:
			case "testNum":
				tableColumCount += 3
				innerTableCount++
				break;
			case "17":
			case 17:
			case "prevAreaPrizeNumDistribution":
				tableColumCount += prevAreaPrizeNumMax
				innerTableCount++
				break;
			
			
			case "18":
			case 18:
			case "backAreaPrizeTrend":
				trendCellCount += backAreaPrizeNumMax
				innerTableCount++
				break;
			case "19":
			case 19:
			case "backAreaPrizeNumDistribution":
				tableColumCount += backAreaPrizeNumMax
				innerTableCount++
				break;
			case "20":
			case 20:
			case "k3prizeNumSumTrend":////快3 基本版  高级版 
			            trendCellCount  +=16//k3和值走势
			            innerTableCount++
			            break;
			
			case "21":
			case 21:
			case "k3GJprizeNumSum012Trend"://快3  高级版
			            trendCellCount  +=3//快3和值012路	
			            innerTableCount++       
			            break;			

			case "22":
			case 22:
			case "prizeNumFormTrend"://快3高级 金七乐2 
			                 trendCellCount+= 4
			                 innerTableCount++
			                break;

			case 23:
			case "23":
			case "k3prizeNum"://快3 珍藏版 高级版 基本版
			             tableColumCount +=prizeNumLength
				 innerTableCount++
				break;	
			            
				

			case "24":
			case 24:
			case "k3prizeNumDistribution"://快3 珍藏版 高级版 基本版
				tableColumCount +=prizeNumAvailableNumCount
				 innerTableCount++
				break;

			case "25":
			case 25:
			case "k3JBPrizeNumTrend"://快3 基本
					if(curLotteryTypeName.indexOf("481")>=0){
						trendCellCount += 4*prizeNumAvailableNumCount
						innerTableCount +=4
					}else{
			          	trendCellCount += 3*prizeNumAvailableNumCount
			          	innerTableCount+=3
			      	}
			        
			        break;

			case "26":
			case 26:
			case "k3GaojiprizeNumDistanceTrend"://快3 高级				
				trendCellCount += 6				
				 innerTableCount++
				break;

			case "27":
			case 27:
			case "k3ZCprizeNumSumTrend"://快3 珍藏
			            trendCellCount  +=16		
			             innerTableCount++	            
			            break;
			case "28":
			case 28:
			case "k3ZChistoryPrizeIssue"://快3 珍藏
				tableColumCount += 1
				 innerTableCount++
				break;
			case "29":
			case 29:
			case "k3ZChistoryPrizeNum"://快3 珍藏历史
				tableColumCount +=prizeNumLength
				 innerTableCount++
				break;	

			

			case "30":
			case 30:
			case "aver4PrizeNumDistribution"://快10四分区
			          tableColumCount +=20
			           innerTableCount++
			          break;
			case "31":
			case 31:
			case "k10Aver2Prev3PrizeNum"://快10 四分区 前三中奖号
			          tableColumCount +=3
			           innerTableCount++
			          break;


			 case "32":
			 case 32:
			 case "k10Aver4PrizeNumRepeatTimes"://快10 四分区
			            tableColumCount += 1
			             innerTableCount++
			            break;

			case "33":
			case 33:
			case "aver2PrizeNumDistribution"://快10 二分区
			          tableColumCount +=20
			           innerTableCount++
			          break;	

			case "34":
			case 34:
			case "k10Aver2PrizeNumRepeatTimes": //快10 二分区
				tableColumCount +=1
				 innerTableCount++
				break;	
			 case "35":
			 case 35:
			 case "k10PrizeNumOdd"://快10 二分区 奇数
			            tableColumCount += 1
			             innerTableCount++
			            break;	
			case "36":
			case 36:
			case "k10Aver2Prev3PrizeNum"://快10 二分区
			             tableColumCount +=3
				 innerTableCount++
				break;		

			case "37":
			 case 37:
			 case "k10PrizeIssue"://快10  二分区  四分区
			            tableColumCount += 1
			            innerTableCount++
			            break;

			case "38":
			case 38:
			case "k10GreenPrizeNumDistance"://快10 绿色
			          tableColumCount +=1
			           innerTableCount++
			          break;

			case "39":
			 case 39:
			 case "k10GreenPrizeNumOdd"://奇数 快10绿色版
			            tableColumCount += 1
			            innerTableCount++
			            break;

			case "40":
			case 40:
			case "k10prev3GreenPrizeNum"://快10 绿色版
			          tableColumCount +=3	  
			          innerTableCount++        
			          break;

			case "41":
			case 41:
			case "k10GreenPrizeIssue"://快10 绿色版
			          tableColumCount +=1        
			          innerTableCount++  
			          break;


			case "42":
			case 42:
			case "k10GreenPrizeNumDistribution"://快10 绿色版
			          tableColumCount +=20       
			           innerTableCount++
			          break;

			case "43":
			case 43:
			case "k10GreenPrizeNumRepeatTimes"://快10 绿色版
			          tableColumCount +=1
			          innerTableCount++
			          break;		             

	                            case "44":
			case 44:
			case "prev3j7PrizeNumTrend"://金七乐1前区走势
			          trendCellCount += 3*prizeNumAvailableNumCount			
			          innerTableCount+=3
			          break;

			case "45":
			case 45:
			case "j7l1lprizeNumDistribution":// 金七乐1前区开奖
				tableColumCount +=prizeNumAvailableNumCount				
				 innerTableCount++
				break;

	                           case "46":
			case 46:
			case "j7l1prizeNumSum"://金七乐1
			          tableColumCount +=1		
			           innerTableCount++          
			          break;

			 case "47":
			 case 47:
			 case "j7l1prizeNumOdd"://金七乐1
			          tableColumCount += 1			       
			           innerTableCount++
			            break;

			case "48":
			case 48:
			case "j7l1PrizeNum"://金七乐1
			          tableColumCount +=4	          
			           innerTableCount++
			          break;

			case "49":
			case 49:
			case "j72prizeNumDistribution"://金七乐　２
				tableColumCount +=prizeNumAvailableNumCount
				 innerTableCount++
				break;

			case "50":
			case 50:
			case "j7l2PrizeNum"://金七乐2
			         tableColumCount +=4	        
			           // trendCellCount += 3
			           innerTableCount++  
			          break;

			case "51":
			case 51:
			case "j7backAreaPrizeNum012Val": //金七乐1   2
			         tableColumCount +=3	
			            // trendCellCount += 3     
			           innerTableCount++ 
			          break;
			case "52":
			case 52:
			case "j7l2prizeNumDistanceTrend"://金七乐2 跨度走势
				//tableColumCount +=prizeNumMax-3+1  
				trendCellCount += prizeNumMax-prizeNumMin+1 
				 innerTableCount++
				break;

			case "53":
			case 53:
			case "j7l2prizeNumSumTrend"://金七乐2 和值走势图
			             trendCellCount  +=21		
			             innerTableCount++      
			            break;
			case 54:
			case "54":
			case "k12Qianprev3PrizeNumDistance"://快乐 12  前置版 前三跨度
				tableColumCount +=1
			              innerTableCount++
				break;	

			case "55":
			case 55:
			case "k12QianPrev3prizeNumSum"://快乐12 前置版 前三中奖号和值
			          tableColumCount +=1
			            innerTableCount++       
			          break;

			case "56":
			case 56:
			case "k12prizeNumDistribution"://快乐12  前置版 后置版
			             tableColumCount +=prizeNumAvailableNumCount
				 innerTableCount++
			           break;


			case "57":
			case 57:
			case "k12prev3PrizeNumTrend"://快乐12  前置版 后置版
				//tableColumCount +=3*prizeNumAvailableNumCount
				trendCellCount += 3*prizeNumAvailableNumCount
				 innerTableCount+=3
				break;	
			
			case "58":
			case 58:
			case "k12HouprizeNumSum"://快乐12 后置版 全部中奖号和值
			          tableColumCount +=1	
			          innerTableCount++	          
			          break;		
	
			case "59":
			case 59:
			case "k12HouprizeNumDistance"://快乐12 后置版 全部中奖号跨度
			          tableColumCount +=1	
			           innerTableCount++	          
			          break;

			case "60":
			case 60:
			case "k12prizeNumRepeatTimes"://快乐12 前置版后置版
			          tableColumCount +=1
			          innerTableCount++      
			          break;       
	               	case "61":
			case 61:
			case "k12JDhistoryPrizeIssue"://快12 经典历史
				tableColumCount += 1
				 innerTableCount++
				break;			

			 case "62":
			case 62:
			case "k12JDprizeNum"://快乐12 经典 开奖顺序
				tableColumCount +=prizeNumLength
				 innerTableCount++
				break;	

			case "63":
			case 63:
			case "k12JDhistoryPrizeNum"://快乐12 经典  历史数据
				tableColumCount +=prizeNumLength
				 innerTableCount++
				break;	

			case "64":
			case 64:
			case "k12JDPrizeNumSum": ///快乐12 经典 全部中奖号 和值
				tableColumCount +=1
				 innerTableCount++
				break;

			case "65":
			case 65:
			case "k12JDPrizeNumDistance": //快乐12 经典 全部中奖号跨度
				tableColumCount +=1
				 innerTableCount++
				break;		
			

			
			case "66":
			case 66:
			case "k12JDprizeNumDistribution"://  快乐12 经典
			             tableColumCount +=prizeNumAvailableNumCount
				 innerTableCount++
			       
			          break;

			 case "67":
			case 67:
			case "k12JDPrizeNumRepeatTimes": //快乐12 经典
			             tableColumCount +=1
				 innerTableCount++
				break;

			case "68":
			case 68:
			case "K3Distance012"://快3跨度012路
				trendCellCount += 3
			           	innerTableCount++  
	                      	             break;
			case "69":
			case 69:
			case "K3PrizeSumendTrend"://快3和尾走势
				trendCellCount += 10
				innerTableCount++
				break;
			case "70":
			case 70:
			case "K3PrizeSumend012"://快3和尾012路
				trendCellCount += 3     
			              innerTableCount++ 
				break;
			case "71":
			case 71:
			case "K3PrizeSumBig"://快3和值大小走势
				tableColumCount +=2
			          	innerTableCount++
				break;
			case "72":
			case 72:
			case "K3PrizeSumendOdd"://快3和尾单双走势
				tableColumCount +=2
				innerTableCount++
				break;

			case "73"://11选5绿色期号
			case 73:
			case "11x5GreenPrizeIssue"://11选5绿色版期号
				tableColumCount += 1
			        innerTableCount++
			        break;
			case "74"://11选5绿色走势
			case 74:            
			case "11x5GreenPrizeNumDistribution"://11选5绿色版开奖走势
				tableColumCount +=prizeNumAvailableNumCount				
				innerTableCount++
				break;
			 case "75"://11选5绿色中奖号重号
			 case 75:                     
			 case "11x5GreenPrizeNumRepeatTmes"://11选5绿色版中奖号重号
			 	tableColumCount +=1		
			        innerTableCount++    
			        break;
			 case "76"://11选5绿色中奖号跨度
			 case 76:                       
			 case "11x5GreenPrizeNumDistance"://11选5绿色版中奖号跨度
			        tableColumCount += 1			       
			        innerTableCount++
			        break;
			 case "77"://11选5绿色中奖号前三走势
			 case 77:                      
			 case "11x5GreenPrev3PrizeNumTrend"://11选5绿色版中奖号前三走势
			 	trendCellCount += 3*prizeNumAvailableNumCount       
			        innerTableCount+=3
			        break;
			 case "78"://11选5绿色中奖号前三和值
			 case 78:                      
			 case "11x5GreenPrizeNumSum"://11选5绿色版中奖号前三和值
			 	tableColumCount += 1
				innerTableCount++
			        break;
			        
			case "79"://大乐透-版式2 前区
			case 79:   
			case "daLeTouPrevAreaPrizeNumDistribution"://大乐透-版式2 前区
				tableColumCount += prevAreaPrizeNumMax//35
				innerTableCount++
			        break;
			case "80"://大乐透-版式2 后区
			case 80:   
			case "daLeTouBackAreaPrizeNumDistribution"://大乐透-版式2 后区
				tableColumCount += backAreaPrizeNumMax//12
				innerTableCount++
			        break;

			case "81":
			case 81:
			case "pai5PrizeNumSum"://排五中奖号码和值
			        tableColumCount += 1
			        innerTableCount++
				break;

			case "82":
			case 82:
			case "pai5PrizeNumBig"://排五中奖号码大小
				tableColumCount +=5
			          	innerTableCount++
				break;
			case "83":
			case 83:
			case "pai5BigOdd"://排五中奖号码单双
				tableColumCount +=5
				innerTableCount++
				break;

			case "84":
			case 84:
			case "pai5PrizeNumTrend"://排列五中奖号码走势图
				trendCellCount += 5*prizeNumAvailableNumCount
				innerTableCount+=5
			
		        break;

			case "85":
			case 85:
			case "pai3PrizeNum"://排列三中奖号码
				tableColumCount +=3
				innerTableCount++
			        break;

			case "86":
			case 86:
			case "pai3PrizeNum012Value"://排列三中奖号012路数
				//trendCellCount +=3
				tableColumCount +=3
				innerTableCount++
			        break;

			case "87":
			case 87:
			case "7XingCaiPrizeNum"://七星彩中奖号码
				tableColumCount +=7
				innerTableCount++
			        break;

		             case "88":
			case 88:
			case "7XingCaiPrizeNumTrend"://七星彩中奖号码走势图
				trendCellCount += 7*prizeNumAvailableNumCount
				innerTableCount+=7
			        break; 
			 
			case "89":
			case 89:
			case "k3prizeNumShuDistribution"://快3  
				tableColumCount +=prizeNumAvailableNumCount//快3数字号码分布
				 innerTableCount++
				break;

			case "90":
			case 90:
			case "prizeNumRepeatTimesTrend":
			             trendCellCount += 6   
			             innerTableCount++ 
			         break;
			case "91":
			case 91:
			case "prizeNumSumBig30SmallTrend":
			            tableColumCount +=3
			            innerTableCount++ 
			         break;

			case "92":
			case 92:
			case "prizeNumSumOdd":
			           tableColumCount +=2
			           innerTableCount++
			         break;

			case "93":
			case 93:
			case "prizeNumMantissa":
				tableColumCount +=10
				innerTableCount++
			         break;

			case "94":
			case 94:
			case "mahjongDistribution":
				tableColumCount +=20       
				innerTableCount++
			break;   

			case "95":
			case 95:
			case "PrizeNumOddTrend":
				trendCellCount  +=6
				innerTableCount++
			break;

			case "96":
			case 96:
			case "PrizeNumBigNum":
				tableColumCount += 1
				innerTableCount++
			break;


		}
	}
	console.log(widthSquarCount);
	tableCellWidth = Math.floor((tableWidth -(innerTableCount-1)-tableColumCount - trendCellCount-innerTableCount) / widthSquarCount);   //cell border-width:1px
                    //因为表格边框重复的是表格数-1个
	var trendWidth = ((tableWidth -(innerTableCount-1)-tableColumCount - trendCellCount)-tableCellWidth*tableColumCount) //考虑border-width
	if(trendCellCount > 0)
	{
		trendWidthRedundantPixels = trendWidth%trendCellCount
		trendCellWidth = Math.floor((trendWidth)/trendCellCount)
		// console.log(trendCellWidth)
		// console.log(trendWidthRedundantPixels)
    }
    else
    {
    	trendWidthRedundantPixels = trendWidth
    }
	
	tbodyHeight = (tableCellHeight+1) * (showPrizeItemCount+reservedLines+2)+1+Math.min(showPrizeItemCount+reservedLines+2,heightRedundantPixels) //border lines
	
	
	rootTable.style.width = tableWidth+'px' 
	
	rootTable.style.height =tableHeight-captionHeight+'px' //captionHeight maybe in tableHeight or not
	
	tableContainer.style.width = rootTable.style.width
	tableContainer.style.height = rootTable.style.height
	
	//console.log("document.documentElement.clientHeight:"+document.documentElement.clientHeight+"tableHeight:"+tableHeight+"rootTable.style.height:"+rootTable.style.height+" tableCellHeight:"+tableCellHeight+" tbodyHeight:"+tbodyHeight+"tableRowCount"+tableRowCount+"heightRedundantPixels"+heightRedundantPixels)
	
	
	adjustTitleDivSize();
}




function configLotteryInfo()
{
	var tmpName = curLotteryTypeName
	if(tmpName.indexOf("11选5")>=0)
	{
		tmpName = "快11选5"
	}else if(tmpName.indexOf("快乐十")>=0){

		tmpName = "快乐十"
	}else if (tmpName.indexOf("金7乐")>=0) {
		tmpName = "金7乐"
	}else if (tmpName.indexOf("快3")>=0) {
		tmpName = "快3"
	}else if (tmpName.indexOf("快乐12")>=0||tmpName.indexOf("快乐十二")>=0||tmpName.indexOf("快乐彩")>=0) {
		tmpName = "快乐12"
	}
	else if(tmpName.indexOf("481")>=0) {
		tmpName = "泳坛夺金"
	}
	switch(tmpName)
	{
		case "大乐透": //5+2  35 12
			prevAreaPrizeNumMax = 35  
			backAreaPrizeNumMax = 12 
			prevAreaPrizeNumLength = 5 
			prizeNumLength = 7
			prizeNumMax = 35
			prizeNumMin = 1
			prizeNumAvailableNumCount = 35

			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;
		case "双色球": //6+1 prevArea:1~33 backArea:1~16
			prevAreaPrizeNumMax = 33  
			backAreaPrizeNumMax = 16 
			prevAreaPrizeNumLength = 6 
			prizeNumLength = 7
			prizeNumMax = 33
			prizeNumMin = 1
			prizeNumAvailableNumCount = 33
			//componentList=["prizeIssue","prevAreaPrizeNumDistribution","backAreaPrizeTrend"]
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;
		case "3D":
			prizeNumLength = 3
			prizeNumMax = 9
			prizeNumMin = 0
			prizeNumAvailableNumCount = 10
			//tableCellWidth=22
			//componentList=["prizeIssue","testNum","prizeNum","prev3PrizeNumWith012Trend","prizeNumSum"]
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;
		case "快11选5":
			prizeNumLength = 5
			prizeNumMax = 11
			prizeNumMin = 1
			prizeNumAvailableNumCount = 11
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
            console.log();
			break;
		case "排列3":
			prizeNumLength = 5
			prizeNumMax = 9
			prizeNumMin = 0
			prizeNumAvailableNumCount = 10
			//tableCellWidth=22
		   //componentList=["prizeIssue","prizeNum","prev3PrizeNumWith012Trend","prev3PrizeNumSum"]
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;

		case "快3":
			prizeNumLength = 3
			prizeNumMax = 6
			prizeNumMin = 1
			prizeNumAvailableNumCount = 6			
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			//widthSquarCount = 30
			break;

		case "快乐十":		            
			prizeNumLength = 8
			prizeNumMax = 20
			prizeNumMin = 1
			prizeNumAvailableNumCount = 20	

			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break; 
		case "快乐12":		            
			prizeNumLength = 5
			prizeNumMax = 12
			prizeNumMin = 1
			prizeNumAvailableNumCount = 12
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;  
		case "金7乐":		          
			prizeNumLength = 3
			prizeNumMax = 7
			prizeNumMin = 1
			prizeNumAvailableNumCount = 7
			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;  

		case "七星彩":
			prizeNumLength = 7
			prizeNumMax = 9
			prizeNumMin = 0
			prizeNumAvailableNumCount = 10

			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;
		case "泳坛夺金":
			prizeNumLength = 4
			prizeNumMax = 8
			prizeNumMin = 1
			prizeNumAvailableNumCount = 8

			componentList = curLotteryTypeStyleList[curLotteryTypeStyleIndex][1]
			widthSquarCount = curLotteryTypeStyleList[curLotteryTypeStyleIndex][2]
			break;
	}
	
	adjustfySizeInfo()
}




function initNumberMatrix(startRow)
{	console.log("sndsnfnsdfnd")
	//console.log("initNumberMatrix 111111",curLotteryTypeDataList.length)
	if(numberMatrix==undefined)
		numberMatrix = new Array()
		console.log(curLotteryTypeDataList);
	for(var i=Math.min(numberMatrix.length,startRow);i<curLotteryTypeDataList.length;i++)
	{
		numberMatrix[i]=new Array();
		for(var j=0;j<prizeNumAvailableNumCount;j++)
		{
			numberMatrix[i][j]=0
			//console.log("initNumberMatrix 2222222222numberMatrix",numberMatrix[i][j])
		}
	}
	//console.log("initNumberMatrix 2222222222")
	//printData(numberMatrix)
}



function getEffectNumberLength()
{
	var tmpName = curLotteryTypeName
	if(tmpName.indexOf("11选5")>=0)
	{
		//console.log("configLotteryInfo:   tmpName contain 11选5:"+tmpName.indexOf("11选5"))
		tmpName = "快11选5"
	}else if(tmpName.indexOf("快乐十")>=0){

		tmpName = "快乐十"
	}else if (tmpName.indexOf("金7乐")>=0) {
		tmpName = "金7乐"
	}else if (tmpName.indexOf("快3")>=0) {
		tmpName = "快3"
	}else if (tmpName.indexOf("快乐12")>=0||tmpName.indexOf("快乐十二")>=0||tmpName.indexOf("快乐彩")>=0) {
		tmpName = "快乐12"
	}else if (tmpName.indexOf("481")>=0) {
		tmpName = "泳坛夺金"
	}
	switch(tmpName)
	{
		case "大乐透": //5+2  35 12
        case "双色球": //6+1 prevArea:1~33 backArea:1~16
			return prevAreaPrizeNumLength
		case "3D":
		case "快11选5":
        case "快3":
        case "快乐十":
        case "快乐12":
			return prizeNumLength		
		case "排列35":
			return prizeNumLength = 5
		case "金7乐":
			return prizeNumLength = 3
		case "七星彩":
			return prizeNumLength = 7
		case "泳坛夺金":
			return prizeNumLength = 4
	}
}


//判断泳坛夺金481号码形态
function Check481NumberForm(o){
	var a =  parseInt(curLotteryTypeDataList[o].numbers[0]).toString()
	var b =  parseInt(curLotteryTypeDataList[o].numbers[1]).toString()
	var c =  parseInt(curLotteryTypeDataList[o].numbers[2]).toString()
	var d =  parseInt(curLotteryTypeDataList[o].numbers[3]).toString()

	var NumberArray = a+b+c+d

	var a_nums = NumberArray.split(a).length - 1
	var b_nums = NumberArray.split(b).length - 1
	var c_nums = NumberArray.split(c).length - 1
	var d_nums = NumberArray.split(d).length - 1
	var abcd_sum = a_nums + b_nums + c_nums + d_nums

	if(abcd_sum == 16){
		return "豹子"
	}
	if(abcd_sum == 10){
		return "组4"
	}
	if(abcd_sum == 8){
		return "组6"
	}
	if(abcd_sum == 6){
		return "组12"
	}
	if(abcd_sum == 4){
		return "组24"
	}
}
function adjustColIndex(colIndex)
{
	if(prizeNumMin==0)
	{
		return colIndex;
	}
	else
	{
		return colIndex-1
	}
}

//0:none number 1:has number 2:series num
function checkLeft(row,col)
{
	var ret=false;
	var norNumberPosition=col;
	if(col>0)
	{
		for(var i=col-1;i>=0;i--)
		{
			if(numberMatrix[row][i]==0)
			{
				norNumberPosition = i;
				break;
			}
			else if(i==0)
			{
				norNumberPosition = i-1;
				break;
			}
		}
		if((col-norNumberPosition>2))
		{
			for(var j=norNumberPosition+1;j<col;j++)
			{
				numberMatrix[row][j]=2
			}
			ret = true
		}
	}
	return ret;
}



//0:none number 1:has number 2:series num
function checkLeftTop(row,col)
{
	var ret=false;
	var norNumberPositionRow=row;
	var norNumberPositionCol=col;
	if(row>0&&col>0)
	{
		for(var i=row-1, j=col-1;i>=0&&j>=0;i--,j--)
		{
			if(numberMatrix[i][j]==0)
			{
				norNumberPositionRow = i;
				norNumberPositionCol = j;
				break;
			}
			else if(i==0 || j==0)
			{
				norNumberPositionRow = i-1;
				norNumberPositionCol = j-1;
				break;
			}
		}
		if((row-norNumberPositionRow>2)) //step 3
		{
			for(var i=norNumberPositionRow+1,j=norNumberPositionCol+1;i<row,j<col;i++,j++)
			{
				numberMatrix[i][j]=2
			}
			ret = true
		}
	}
	return ret;
}
//0:none number 1:has number 2:series num
function checkTop(row,col)
{
	var ret=false;
	var norNumberPosition=row;
	if(row>0)
	{
		for(var i=row-1;i>=0;i--)
		{
			if(numberMatrix[i][col]==0)
			{
				norNumberPosition = i;
				break;
			}
			else if(i==0)
			{
				norNumberPosition = i-1;
				break;
			}
		}
		if((row-norNumberPosition>2)) //step 3
		{
			for(var j=norNumberPosition+1;j<row;j++)
			{
				numberMatrix[j][col]=2
			}
			ret = true
		}
	}
	return ret;
}

//0:none number 1:has number 2:series num
function checkRightTop(row,col)
{
	var ret=false;
	var norNumberPositionRow=row;
	var norNumberPositionCol=col;
	if(row>0&& col<prizeNumAvailableNumCount)
	{
		for(var i=row-1,j=col+1;i>=0&&j<prizeNumAvailableNumCount;i--,j++)
		{
			/*if(numberMatrix[i][j]==2)
			{
				ret = true;
				break;
			}
			else */if(numberMatrix[i][j]==0)
			{
				norNumberPositionRow = i;
				norNumberPositionCol = j;
				break;
			}
			else if(i==0 || j==prizeNumAvailableNumCount-1)
			{
				norNumberPositionRow = i-1;
				norNumberPositionCol = j+1;
				break;
			}
		}
		if(/*!ret && */(row-norNumberPositionRow>2) )//step 3
		{
			for(var i=norNumberPositionRow+1,j=norNumberPositionCol-1;i<row,j>col;i++,j--)
			{
				numberMatrix[i][j]=2
			}
			ret = true
		}
	}
	return ret;
}
function updateNumberMatrix(startRow)
{
	initNumberMatrix(startRow)
	
	var startCol=0
	for(;startRow<curLotteryTypeDataList.length;startRow++)
	{	
		for(startCol=0;startCol<getEffectNumberLength();startCol++) 
		{
			var colIndex=adjustColIndex( parseInt(curLotteryTypeDataList[startRow].numbers[startCol]) )
			numberMatrix[startRow][colIndex]=1
		}		
		for(startCol=0;startCol<prizeNumAvailableNumCount;startCol++)
		{
			if(numberMatrix[startRow][startCol]==1){
				var colIndex=startCol//adjustColIndex(parseInt(curLotteryTypeDataList[startRow].numbers[startCol]))
				//console.log("updateNumberMatrix:colIndex:",colIndex)
				if(checkLeft(startRow,colIndex))
				{
					numberMatrix[startRow][colIndex]=2
					
				}
				if(curLotteryTypeName == "大乐透" || curLotteryTypeName =="双色球")
				{
				
					if(checkLeftTop(startRow,colIndex))
					{
						numberMatrix[startRow][colIndex]=2
						//continue
					}
					if(checkTop(startRow,colIndex))
					{
						numberMatrix[startRow][colIndex]=2
						//continue
					}
					
					if(checkRightTop(startRow,colIndex))
					{
						numberMatrix[startRow][colIndex]=2
						//continue
					}
				}
			}			
		}
	}	
}
//create table
function createInnerTable(cellWidth,cellHeight,rows,wRedundantPixels,cols,hRedundantPixels,clsName)
{
	var mtable = document.createElement("table")
	mtable.style.width = (cellWidth+1)*cols+Math.min(cols,wRedundantPixels)+1+'px'  //n+1 pixels
	mtable.style.height=(cellHeight+1)*rows+Math.min(rows,hRedundantPixels)+1+'px' 
	
	//console.log("createInnerTable mtable.style.height"+mtable.style.height)
	mtable.cellspacing=0 
	mtable.cellpadding=0
	mtable.border=1
	//mtable.style.borderWidth="1px"
	if(clsName != undefined)
		mtable.className = clsName
	else
		mtable.className = "innerTable"
	//init col
	// console.log(cols);
	for(var i=0;i<cols;i++)
	{
		var col = document.createElement("col")
		if(wRedundantPixels>0)
		{
			col.width=cellWidth+1 //just content width
			wRedundantPixels--
		}
		else
		{
			col.width=cellWidth
		}
		mtable.appendChild(col)
	}
	return mtable;
}

function _createHeaderk10(tableObj,titleTxt,w,h,typek10Aver2,typek10Green,typek10GreenZiSe,typek10Green3,typek12JDHistory,type11x5Green)
{
	var r = tableObj.insertRow(tableObj.rows.length)
	r1 = tableObj.insertRow(tableObj.rows.length)
	var td = r.insertCell(0)
	td.style.borderBottom="1px solid black" 
	//td.style.borderLeft = "1px solid red"
	if (typek12JDHistory) {
		td.style.borderLeft = "3px solid red"
	}
	td.rowSpan = 2
	if (typek10Green3) {td.colSpan = 3}
	if(curHeightRedundantPixels>0)
	{
		td.height = h*2+1 + Math.min(2,curHeightRedundantPixels) //1px border between two rows
	}
	else{
		td.height = h*2+1 
	}
	td.style.fontSize = Math.min(w,h)*0.7+'px'
	curHeightRedundantPixels -= Math.min(2,curHeightRedundantPixels)
	td.innerHTML =titleTxt
	if (typek10Green3) {td.style.color="#7ca899"}
	if (typek10Aver2) {td.style.backgroundColor = "#d8d8d8"}
	if (typek10Green) {td.style.color = "#91695d"}
	if (typek10GreenZiSe) {td.style.color ="#7c0868"}
	if (type11x5Green) {td.style.color = "#91695d"}
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩奇数表头颜色  以及开奖号码没有1-5占5格
		if (titleTxt==="开奖号码") {
			td.colSpan = 5
		}else if (titleTxt==="开奖号") {
			td.colSpan = 3
		}		
		td.style.backgroundColor = "#EFAE6F"
		td.style.color ="white"
	}

}
function returnDiv(type,w,h1,h2,v,f){
    if(f){
        return "<div class='"+type+"' style='width:"+(w)+"px;height:"+(h1)+"px;line-height:"+(h1)+"px; font-size:"+(h2)+"px;'>"+v+"</div>"
    }
    else{
        return "<div class='"+type+"' style='width:"+(w)+"px;height:"+(h1)+"px;line-height:"+(h1)+"px; font-size:"+(h2)+"px;'>"+"<span>"+v+"</span>"+"</div>"
    }
}
function getCellHTML(type,w,h,v,smallFlag,boldFlag,bigFlag,flag)
{
	var minVal = Math.min(w,h)
	if(type=="container")
	{
		if (flag==="YCbig") {
            return returnDiv(type,w-2,h-2,h+7,v,true)
		}else if (boldFlag) {
			if (curLotteryTypeStyleName.indexOf("隔行1")>=0&&curLotteryTypeName.indexOf("吉林快3")>=0) {
               return returnDiv(type,w-2,h-2,h+2,v,true)
			}else{
               return returnDiv(type,w-2,h-2,h,v,true)
			}			
		}else if (bigFlag) {
			if (curLotteryTypeStyleName.indexOf("隔行1")>=0&&curLotteryTypeName.indexOf("吉林快3")>=0) {
               return returnDiv(type,w-2,h-2,h+4,v,true)
			}else{
               return returnDiv(type,w-2,h-2,h+2,v,true)
			}			
		}else if (flag==="titlesmall") {
			return "<div class='"+type+"' style='width:"+(w-2)+"px;height:"+(h-2)+"px;line-height:"+(h-2)+"px;'>"+v+"</div>"
		}
		//快乐十分背景遗漏字体
		// else if (flag==="k10yilou") {
		// 	return "<div class='"+type+"' style='width:"+(w-2)+"px;height:"+(h-2)+"px;line-height:"+(h-2)+"px; font-size:"+(h-7)+"px;'>"+v+"</div>"	
		// }
		else{
            return returnDiv(type,w-2,h-2,h-2,v,true)	
		}
	}
	else if (type=="containerCH") {//20161011 解决重号 奇数 跨度 期号 和值 字体稍大问题 
            return returnDiv(type,w-2,h-2,h-5,v,true)
	}
	else if (type=="containerShape") {
		if (flag==="YCbig") {
            return returnDiv(type,w-2,h-2,h+7,v,false)
		}else if (smallFlag) {
            return returnDiv(type,w-2,h-2,h-5,v,false)
		}else if (bigFlag) {
			if (curLotteryTypeStyleName.indexOf("隔行1")>=0&&curLotteryTypeName.indexOf("吉林快3")>=0) {
                return returnDiv(type,w-2,h-2,h+4,v,false)	
			}else{
                return returnDiv(type,w-2,h-2,h+2,v,false)	
			}			
		}else if (flag==="titlesmall") {
			return "<div class='"+type+"' style='width:"+(w-2)+"px;height:"+(h-2)+"px;line-height:"+(h-2)+"px;'>"+"<span>"+v+"</span>"+"</div>"
		}else if (flag==="fontSmall") {
            return returnDiv(type,w-2,h-2,h-2,v,false)	
		}else{			
            return returnDiv(type,w-2,h-2,h,v,false)	
		}
		
	}
	else if (type=="containerShape10") {
		if (flag==="YCbig") {
           return returnDiv(type,w-2,h-2,h+7,v,false)	
		}else if(flag==="HZsmall") {
            return returnDiv(type,w-2,h-2,h,v,false)		
		}else if (flag==="fontSmall") {
            return returnDiv(type,w-2,h-2,h-3,v,false)			
		}else{
            return returnDiv(type,w-2,h-2,h+4,v,false)		
		}
	}
	//0519 球内数字压缩一下  快彩部分  以后可复用
	else if (flag==="kuaicai") {
		return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal) + "px;'>" +"<div style = transform:scaleX(0.7)>"+ v +"</div>"+ "</div>"
	}else {
		if (flag==="YCbig") {
            return returnDiv(type,minVal,minVal,minVal+4,v,true)	
		}else if (flag==="YC10") {
			return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal+4) + "px;'>" +"<div style = transform:scaleX(0.7)>"+ v +"</div>"+ "</div>"
		}else{
            return returnDiv(type,minVal,minVal,minVal-2,v,true);	
		} 
	}
}
function getCellHTMLk3(type,w,h,v){
	var minVal = Math.min(w,h)
	if(type=="hollowball")
	{
		return "<div>"+"<div class='"+type+"' style='width:"+(minVal-2)+"px;height:"+(minVal-2)+"px;line-height:"+(minVal-2)+"px; font-size:"+(minVal)+"px;'>"+v+"</div>"+"</div>"
	}else if (type==="bigball") {
		return "<div>"+"<div class='"+type+"' style='width:"+(minVal)+"px;height:"+(minVal)+"px;line-height:"+(minVal)+"px; font-size:"+(minVal)+"px;'>"+v+"</div>"+"</div>"
	}else if (type==="smallball") {
		return "<div>"+"<div class='"+type+"' style='width:"+(minVal-8)+"px;height:"+(minVal-8)+"px;line-height:"+(minVal-8)+"px; font-size:"+(minVal-8)+"px;'>"+v+"</div>"+"</div>"
	}else if (type==="oneball") {
		return "<div>"+"<div class='"+type+"' style='width:"+(minVal-11)+"px;height:"+(minVal-11)+"px;line-height:"+(minVal-11)+"px; font-size:"+(minVal-11)+"px;'>"+v+"</div>"+"</div>"
	}else if (type==="twoball") {
		return "<div>"+"<div class='"+type+"' style='width:"+(minVal-11)+"px;height:"+(minVal-11)+"px;line-height:"+(minVal-11)+"px; font-size:"+(minVal-11)+"px;'>"+v+"</div>"+"<div class='"+type+"' style='width:"+(minVal-11)+"px;height:"+(minVal-11)+"px;line-height:"+(minVal-11)+"px; font-size:"+(minVal-11)+"px;'>"+v+"</div>"+"</div>"
	}
}



function _createHeader(tableObj,titleTxt,w,h,minVal,maxVal,typeone,typej7,typek10,typek10Green,typek10Green3,typek3ZC,typek3GJ,typek3JB,typek3JB1,typej7l1,typej7l1JHZS,typej7l2,typek12JD,typek12JDHistory,typeJLK3Danshuang,typeJLK3012,type11x5GreenZuXuan,type11x5Green2,type11x5KDZS,big30Small)
{	
	var r = tableObj.insertRow(tableObj.rows.length)
	console.log(r);
	r1 = tableObj.insertRow(tableObj.rows.length)
	if(minVal ==undefined || maxVal==undefined||typeJLK3Danshuang||typeJLK3012||typej7l1||big30Small)
	{		
		var td = r.insertCell(0)
		td.rowSpan = 2
		td.style.fontSize = Math.min(w,h)*0.7+'px'
		if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩期号头背景色
			td.style.backgroundColor=" #EFAE6F"
			td.style.color ="white"
		}
		if (typeJLK3Danshuang) {
			td.colSpan = 2
		}else if (typej7l1) {
			td.colSpan = 3
			td.style.backgroundColor = "#fcfcd9"
		}else if (big30Small) {
			td.colSpan = 3
		}

		else if (typeJLK3012) {
			td.colSpan = 3
			if (curOrientation=="land") {//20161010 快3和值012 字体过大
				td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,true)				
			}else{
				td.style.fontSize =Math.min(w,h)*1+'px'
				//td.style.backgroundColor = ""
			}
		}
		else{
			td.colSpan = 1
			//td.style.backgroundColor = ""
		}	
		if(curHeightRedundantPixels>0)
		{
			td.height = h*2+1 + Math.min(2,curHeightRedundantPixels) //1px border between two rows
		}
		else{
			td.height = h*2+1 
		}
				
		
		td.style.borderBottom="1px solid black"//设置表头线下黑色
		
		curHeightRedundantPixels -= Math.min(2,curHeightRedundantPixels)
		td.innerHTML =titleTxt //td.innerHTML =getCellHTML("container",w,h,titleTxt,true)
				
	}
	else{		
		var td=r.insertCell(0)
		td.colSpan=maxVal-minVal+1	

		if(curHeightRedundantPixels>0)
		{
			td.height = h+1
		}
		else
		{
			td.height = h
		}
		if(curHeightRedundantPixels>0)
			curHeightRedundantPixels--

		if (typek3ZC) {
			td.style.fontSize = Math.min(w,h)*0.6+'px'//liutest for K3ZC
			td.innerHTML =titleTxt		
		}
		else if (typeone) {//用于k3高级号码形态 设置后 横版有问题
			if (curOrientation=="port") {
				td.style.fontSize = Math.min(w,h)*1+'px'
				td.innerHTML =titleTxt	
			}else
			{
				td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,true)
			}			
		}
		else if (typek3GJ) {//用于 k3高级 和值012 //删除 20161010和值012字体过大
			if (curOrientation=="land") {
				td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,true)				
			}else{
				//td.style.fontSize =Math.min(w,h)*1+'px'
				td.style.fontSize =Math.min(w,h)*1.2+'px'
				td.innerHTML =titleTxt	
			}			
		}
		else if (typek3JB) {
			td.style.fontSize = 17+'px'
			td.innerHTML =titleTxt	
		}
		else if (typej7) {
			td.style.fontSize = 17+'px'
			td.innerHTML =titleTxt	
			td.style.backgroundColor = "#d8e4fe"
		}
		// else if (typej7l1) {
		// 	td.style.fontSize = Math.min(w,h)*1+'px'
		// 	td.innerHTML =titleTxt	
		// 	td.style.backgroundColor =  "#fcfcd9"
		// }
		else if (typej7l1JHZS) {
			td.style.fontSize = Math.min(w,h)*0.9+'px'
			td.innerHTML =titleTxt	
		}
		else if (type11x5KDZS) {
			if (curOrientation=="land") {
				//td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,true)
				td.style.fontSize = Math.min(w,h)*1.3+'px'//11选5 "跨度走势" 字体过大
				td.innerHTML =titleTxt	
			}else{
				td.style.fontSize = Math.min(w,h)*1.5+'px'//11选5 "跨度走势" 字体过大
				td.innerHTML =titleTxt	
			}
		}
		// else if (typej7l2) {
		// 	td.style.fontSize = Math.min(w,h)*1+'px'
		// 	td.innerHTML =titleTxt	
		// 	//td.style.backgroundColor =  "#fcfcd9"
		// }
		else
		{
			td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,true)
			if ((curLotteryTypeName.indexOf("七星彩")>=0||curLotteryTypeName.indexOf("排列3")>=0)&&curOrientation==="port") {				
				if (titleTxt.indexOf("第")>=0||titleTxt.indexOf("排列三")>=0) {
					td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,false,false,false,"titlesmall")
					td.style.fontSize = (h-9)+"px"
				}				
			}			
		}		

		if (typek10Green) {td.style.color="#91695d"}
		if (typek10Green3) {td.style.color="#7ca899"}
		if (typek3ZC) {td.style.backgroundColor = "#d6d8dd"}
		if (type11x5GreenZuXuan) {td.style.color="#53938e"}
		if (type11x5Green2) {td.style.color="#91695d"}
		if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩 1-11数字
			td.style.color = "white"
			td.style.backgroundColor = "#EFAE6F"
		}
		if (titleTxt==="麻将分布") {
			td.style.color = "#91695d"
		}

		if (typej7||typej7l2) {
			for (var i = 0; i < 2; i++) {
				td = r1.insertCell(i)
				td.style.borderBottom="1px solid black"//设置表头线下黑色	
				if (i==0) {
					td.colSpan = 3
					//td.rowSpan = 1
					td.innerHTML = "前区"
					td.style.fontSize = 3+"px"
					//td.style.height = "11px"
					if (typej7) {td.style.backgroundColor = "#d8e4fe"	}					
				}else{
					td.colSpan = 1
					td.innerHTML = "后"
					td.style.fontSize = 1+"px"
					//td.style.height = "11px"
					td.style.backgroundColor =  "#fcfcd9"
				}
			}			
			//td=r1.insertCell(r1.cells.length)
		}
		else{		
			for(var i=minVal;i<=maxVal;i++)
			{				
				td=r1.insertCell(r1.cells.length)
				td.style.borderBottom="1px solid black"//设置表头线下黑色	
				if(curHeightRedundantPixels>0)
				{
					td.height = h+1
				}
				else
				{
					td.height = h
				}
				
				td.style.fontWeight="lighter"
				if (typek3JB1||typek3GJ) {td.innerHTML =getCellHTML("container",0,16,i)}
				// else if(typej7l1JHZS){
				// 	td.innerHTML =getCellHTML("container",0,16,i)
				// }
				else{
					if(i>9){
						td.innerHTML=getCellHTML("containerShape",w,h,i,false,false,false,"titlesmall") 
						td.style.fontSize =(h-4)+"px"
					}else{
						if (curLotteryTypeName.indexOf("排列")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
							td.innerHTML=getCellHTML("containerShape",w,h,i,false,false,false,"titlesmall") 
							td.style.fontSize =(h-4)+"px"
						}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩开奖号码分布  1-11  1-9前有数字0
							i = "0"+i
							td.innerHTML=getCellHTML("containerShape",w,h,i,false,false,false,"titlesmall")
							td.style.fontSize =(h-4)+"px" 
						}else{
							td.innerHTML=getCellHTML("containerCH",w,h,i,true) 
						}						
					}					
				}				
				if (typek10Green) {
					td.style.color="#91695d"
					td.style.fontWeight = "bold"
				}
				if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩开奖号码分布 表头  1-11  背景色 和字体颜色
					td.style.color = "white"
					td.style.backgroundColor = "#EFAE6F"
				}
				if (type11x5GreenZuXuan) {td.style.color="#53938e"}
				if (type11x5Green2) {td.style.color="#91695d"}
				if (typek3ZC) {td.style.backgroundColor = "#d6d8dd"}
				if (typej7l1) {td.style.backgroundColor =  "#fcfcd9"}
				if (typeone) {
					if (curOrientation=="land") {
						if (i===0) {td.innerHTML=getCellHTML("container",w,h,"豹",true)}
					             if (i===1) {td.innerHTML=getCellHTML("container",w,h,"连",true)}							
					             if (i===2) {td.innerHTML=getCellHTML("container",w,h,"双",true)}
						if (i===3) {td.innerHTML=getCellHTML("container",w,h,"单",true)}
				            }else{
					            	if (i===0) {td.innerHTML ="豹"}
					            	if (i===1) {td.innerHTML ="连"}						
						if (i===2) {td.innerHTML ="双"}
					            	if (i===3) {td.innerHTML ="单"}
					            	td.style.fontSize = Math.min(w,h)*0.9+'px'	
				            }						
				}
			            if (typek12JD) {					
				             if (i===1){td.innerHTML=getCellHTML("container",w,h,"一",true)}						
				             if (i===2){td.innerHTML=getCellHTML("container",w,h,"二",true)}						
				             if (i===3){td.innerHTML=getCellHTML("container",w,h,"三",true)}
				             if (i===4){td.innerHTML=getCellHTML("container",w,h,"四",true)}
				             if (i===5){td.innerHTML=getCellHTML("container",w,h,"五",true)}						
				}
				if (titleTxt==="麻将分布") {
					td.style.color = "#91695d"
					if (i===1){td.innerHTML=getCellHTML("container",w,h,"一")}
					if (i===2){td.innerHTML=getCellHTML("container",w,h,"二")}
					if (i===3){td.innerHTML=getCellHTML("container",w,h,"三")}
					if (i===4){td.innerHTML=getCellHTML("container",w,h,"四")}
					if (i===5){td.innerHTML=getCellHTML("container",w,h,"五")}
					if (i===6){td.innerHTML=getCellHTML("container",w,h,"六")}
					if (i===7){td.innerHTML=getCellHTML("container",w,h,"七")}
					if (i===8){td.innerHTML=getCellHTML("container",w,h,"八")}
					if (i===9){td.innerHTML=getCellHTML("container",w,h,"九")}
					if (i===10){td.innerHTML=getCellHTML("container",w,h,"中")}
					if (i===11){td.innerHTML=getCellHTML("container",w,h,"發")}
					if (i===12){td.innerHTML=getCellHTML("container",w,h,"白")}
					if (i===13){td.innerHTML=getCellHTML("container",w,h,"東")}
					if (i===14){td.innerHTML=getCellHTML("container",w,h,"南")}
					if (i===15){td.innerHTML=getCellHTML("container",w,h,"西")}
					if (i===16){td.innerHTML=getCellHTML("container",w,h,"北")}
					if (i===17){td.innerHTML=getCellHTML("container",w,h,"春")}
					if (i===18){td.innerHTML=getCellHTML("container",w,h,"夏")}
					if (i===19){td.innerHTML=getCellHTML("container",w,h,"秋")}
					if (i===20){td.innerHTML=getCellHTML("container",w,h,"冬")}

				}				
			}
		}
		if(curHeightRedundantPixels>0)
			curHeightRedundantPixels--
	}	
}
//////////////////////////////
//计算统计最大最小值 开始
//////////////////////////
function getMaxMinVal(dataArray)
{
	var min=dataArray[0];
	var max=dataArray[0];
	for(var i=0;i<dataArray.length;i++)
	{
		if(max < dataArray[i])
			max = dataArray[i]
		if(min > dataArray[i])
			min = dataArray[i]
	}
	return [max,min]
}
function getDistance(prizeNum,length)
{
	var max=parseInt(prizeNum[0])
	var min = max
	for(var j =0;j<length;j++)
	{
		var ballNumber = parseInt(prizeNum[j])
		if(ballNumber < min)
			min = ballNumber
		if(ballNumber > max)
			max = ballNumber		
	}
	var ret= max-min
	if(isNaN(ret))
	{
		ret = "&nbsp"
	}
	return ret;
}
function _createMultiHeader(tableObj,titleArray,step,w,h,minVal,maxVal,typek10,typek10Aver2)
{
	var r = tableObj.insertRow(tableObj.rows.length)
	r1 = tableObj.insertRow(tableObj.rows.length)
	for(var i=0;i<titleArray.length;i++)
	{
		var td = r.insertCell(i)
		var tStep = 0
		if(maxVal-minVal+1 - i*step > step)
		{
			tStep = step;			
		}
		else
		{
			tStep = maxVal-minVal+1 - i*step
		}
		td.colSpan = tStep
		if(curHeightRedundantPixels>0)
		{
			td.height = h + 1 //1px border between two rows
		}
		else
		{
			td.height = h
		}		
		td.innerHTML = getCellHTML("containerCH",w*tStep,h,titleArray[i],true)	
		if (typek10) {
			if (i==1||i==3) {
				td.style.backgroundColor = "#d5dce9"
			}
		}

	}
	if(curHeightRedundantPixels>0)
		curHeightRedundantPixels--
	for(var i=minVal;i<=maxVal;i++)
	{
		td=r1.insertCell(r1.cells.length)
		if(curHeightRedundantPixels>0)
		{
			td.height = h + 1//1px border between two rows
		}
		else
		{
			td.height = h
		}		
		td.style.fontWeight="lighter"
		td.style.borderBottom="1px solid black"
		if (typek10) {
			if (i>5&&i<11||i>15&&i<21) 
			{
				td.style.background = "#d5dce9"
			}
		}
		if (typek10Aver2) {
			if (i==19||i==20) {
				td.style.color = "red"
			}
		}			
		td.innerHTML=getCellHTML("containerCH",w,h,i,true)
	}
	if(curHeightRedundantPixels>0)
		curHeightRedundantPixels--	
	
}

function getSum(prizeNum,length)
{
/**
 * 计算开奖号码和值  必填
 * prizeNum  开奖号码数组
 * length 开奖号码的长度
 * 返回值sum 就为和值或者和尾
 */
	var sum = 0
	for(var j =0;j<length;j++)
	{
		var ballNumber = parseInt(prizeNum[j])
		sum += ballNumber		
	}
	return sum
}


function getPrizeNumRepeatTimes(prevPrizeNum,curPrizeNum,length)
{

	var repeatNums = 0;
	var repeatArr=[] ;
	if (length===3) {
		prevPrizeNum  = prevPrizeNum.slice(0,3)
	}
	for (var i = 0; i < length; i++) {//20161027 快三中奖号有重复数字  重号新的计算方法
		if (prevPrizeNum.indexOf(curPrizeNum[i])>=0) {
			repeatNums++	
		}
	}

	return repeatNums
}
function checkWZFB(arr,num){
	var count = 0;
	for(var i in arr){
		var a = parseInt(arr[i])
		if(a%10 === num){
			count ++ 
		}
	}
	return count;//return 0,1,2
}
function getPrizeNumOdd(prizeNum,length)
{
	var m = 0
	for(var i = 0;i<length;i++)
	{
		var ballNumber = parseInt(prizeNum[i])
		if (ballNumber%2 != 0)
			m++		
	}
	return m
}


//////case   componentList不同的部分
function createPrizeIssue(typek10Green,typek10Aver2,typek3ZC,typek12JD,typek12JDHistory,typek3ZCHistory,type11x5Green)
{	
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}else{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,1,heightRedundantPixels)
	
	curHeightRedundantPixels = heightRedundantPixels
	if (typek10Aver2||typek12JD) {
		_createHeaderk10(mtable,"期号",tableCellWidth,tableCellHeight,true)
	}else if (typek10Green||type11x5Green) {_createHeaderk10(mtable,"期号",tableCellWidth,tableCellHeight,false,true)
	}else if (typek12JDHistory||typek3ZCHistory) {
		_createHeaderk10(mtable,"期号",tableCellWidth,tableCellHeight,false,false,false,false,true)
	}
	else{_createHeader(mtable,"期号",tableCellWidth,tableCellHeight)}	
	// console.log(showPrizeItemCount+reservedLines);
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{		
		var row = mtable.insertRow(mtable.rows.length)
		var td = row.insertCell(0)
		td.style.fontWeight="Normal"

		if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
			if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩期号10期底部红线
				td.style.borderBottom="1px solid red" 
			}			
		}
		if(o == showPrizeItemCount+reservedLines-1)
		{
			if (typek10Green) {row.style.backgroundColor="#b8ffc4"
			}else if (type11x5Green) {row.style.backgroundColor="#b8ffc4"			
			}else if (typek12JD||typek12JDHistory) {
				row.style.backgroundColor="#ffc0cb"
			}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//期号底部冷热号 背景白色
				row.style.backgroundColor="white"
			}else{
				row.style.backgroundColor="blue"}			
		}
		
		if(curHeightRedundantPixels>0)
		{
			td.height = tableCellHeight+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height = tableCellHeight
		}
	
		if (typek12JDHistory||typek3ZCHistory) {td.style.borderLeft="3px solid red"}

		if(o<showPrizeItemCount)
		{			
			if ((typek12JDHistory||typek3ZCHistory) && historyNumbers.length>0){//liutest for ZC
				var tmpIssue = historyNumbers[o].issue
				var simpleIssue = tmpIssue.substring(tmpIssue.length-2)
				var val = parseInt(simpleIssue)
			}
			else{
				var tmpIssue = curLotteryTypeDataList[o].issue
				var simpleIssue = tmpIssue.substring(tmpIssue.length-2)
				var val = parseInt(simpleIssue)
			}
			if (typek10Green) {td.style.color = "#91695d"}
			else if (type11x5Green) {
				td.style.color = "#91695d"
				if (o%2==0) 
				{
					row.style.backgroundColor= "#d0f1d7" 
				}else
				{
					row.style.backgroundColor= "#e2f6e6"
				}
			}
			if (((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0)||((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("快3")>=0)){
				if (o%2==0) 
				{
					row.style.color="red"
				}else
				{
					row.style.color="black"
				}
			}	
			// if (typek10) {td.style.color = "red"}
			//liutest begin
			var IsNo1Issue = false;
			if(curLotteryTypeName === "北京快3"){
				if((tmpIssue.slice(-5)-73413)%curLotteryTypeMaxPeriod == 0){
					IsNo1Issue = true;
				}
			}else if (curLotteryTypeName === "黑龙江快乐十分麻将") {
				if((tmpIssue-168485)%curLotteryTypeMaxPeriod == 0){
					IsNo1Issue = true;
				}
			}
			else{
				if(val == 1){
					IsNo1Issue = true;
				}
			}
			if(IsNo1Issue){
				if (((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0)||((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("快3")>=0)){
					td.style.backgroundColor="blue"
				}else{	
					if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩期号第一期不要红色
						td.style.backgroundColor=""
					}else{
						td.style.backgroundColor="red"
					}					
				}
			}
			//liutest end
			if(val > 9){
				td.innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,val,true)
			}else{
				if (curLotteryTypeStyleName.indexOf("快彩")>=0) {////0509快彩期号 1-9前有数字0
					val = "0"+val
					td.innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,val,true)	

				}else{
					td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,val,false,false,false,"YCbig")
				}
				
			}
		}else{
			td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
	}
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	// console.log(cell.style.width);
	cell.style.height=mtable.style.height	        
	if (typek10Green) {cell.style.backgroundColor = "#d4efd7"}
	if (type11x5Green) {cell.style.backgroundColor = "#d0f1d7"}
	if (typek3ZC) {cell.style.backgroundColor ="#808080"}
	cell.appendChild(mtable)
	//cell.appendChild(div)
}
function createPrizeNum(length,preAreaLength,testPrizeFlag,typek3,typek10Aver4,typek10Green,typek10Aver2,typek3ZC,typek12JD,typek12JDHistory,typeOddBig,typePaiLie3,historyOddBig)
{
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(length,trendWidthRedundantPixels)
	}else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,length,heightRedundantPixels)
	
	var tmpTitle
	if(testPrizeFlag){tmpTitle = "试机号"}
	else if (typek3) {tmpTitle ="开奖号"}
	else if (typek10Aver4||typek10Aver2) {tmpTitle ="前三直"}
	else if (typek10Green) {tmpTitle ="前三位"}
	//else if () {tmpTitle ="前三直"}
	else if(typek3ZC){tmpTitle ="历史开奖号"}
	else if (typek12JD) {tmpTitle ="开奖顺序"	}
	else if (typek12JDHistory) {tmpTitle ="历史数据"}
	else if (typePaiLie3) {tmpTitle ="排列三"}
	else if (curLotteryTypeStyleName.indexOf("快彩")>0) {//0509 快彩  开奖号码表头汉字	
		if(length===3){
			tmpTitle ="开奖号"
		}else{
			tmpTitle ="开奖号码"
		}
	}
	else{tmpTitle ="开奖号"}

	curHeightRedundantPixels = heightRedundantPixels
	
	//liutest begin for K3ZC
	if (typek10Green) {
		_createHeaderk10(mtable,tmpTitle,tableCellWidth,tableCellHeight,false,false,false,true)
	}
	else if (typek3ZC) {
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,length,false,false,false,false,false,true)
	}
	else if (typek12JD||typek12JDHistory) {
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,length,false,false,false,false,false,false,false,false,false,false,false,false,true)
	}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 开奖号码 表头部分不要0-5号码顺序
		_createHeaderk10(mtable,tmpTitle,tableCellWidth,tableCellHeight)
	}
	else{
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,length)
	}	

	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(testPrizeFlag)
		{
			var testNumLength=3;
			
			for(var i=0;i<3;i++)
			{
				var td = row.insertCell(i)
				if(curHeightRedundantPixels>0)
				{
					td.height = tableCellHeight+1
				}
				else
				{
					td.height = tableCellHeight
				}
			

				if(o<showPrizeItemCount)
				{
					if(i < preAreaLength)
					{
						td.style.color="#8A0000"
					}
					else
					{
						td.style.color="black"
					}
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,curLotteryTypeDataList[o].numbers[curLotteryTypeDataList[o].numbers.length-testNumLength])
					testNumLength--
					
				}
				else
				{
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
					td.style.color="white"
				}
				if(o == showPrizeItemCount+reservedLines-1)
				{
					row.style.backgroundColor = "blue"
				}
			}
		}else{
			

			for(var i=0;i<length;i++)
			{
				var td = row.insertCell(i)
				if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
					td.style.fontFamily = "YCArezzo"
				}

				if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
					//td.style.border="3px solid red"
					if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
						td.style.borderBottom="" 
					}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩 开奖号码10期底部红线
						td.style.borderBottom="1px solid red" 			
					}else{
						td.style.borderBottom="1px solid gray" 
					}
					
				}
				if(curHeightRedundantPixels>0)
				{
					td.height = tableCellHeight+1
				}
				else
				{
					td.height = tableCellHeight
				}
				
				if(o<showPrizeItemCount)
				{
					var  arr = curLotteryTypeDataList[o].numbers//20161014开奖号码全奇全偶加背景色	
					var count = 0;	
					var count1 = 0;
					for(var r=0;r<arr.length;r++){
						if(arr[r].length == 1){
							arr[r] = "0" + arr[r];							
						}						
					}
					if (!(curLotteryTypeStyleName.indexOf("快彩")>=0)){//0509 快彩 开奖号码全奇全偶不要背景色背景色
					for(var r=0;r<5;r++){							
						var arrNum = parseInt(curLotteryTypeDataList[o].numbers[r])
						if (arrNum%2==0) {
							count++
							if (count===5) {
								if (typeOddBig) {
									td.style.backgroundColor = "#989dc6"
								}
							}
						}else if (arrNum%2!=0) {
							count1++
							if (count1===5) {
								if (typeOddBig) {
									td.style.backgroundColor = "#989dc6"
								}
							}
						}		
					}
					}
					var  arr = historyNumbers[o].numbers//20161014历史开奖号码全奇全偶加背景色	
					var count = 0;	
					var count1 = 0;
					for(var r=0;r<arr.length;r++){
						if(arr[r].length == 1){
							arr[r] = "0" + arr[r];							
						}						
					}
					for(var r=0;r<5;r++){							
						var arrNum = parseInt(historyNumbers[o].numbers[r])
						if (arrNum%2==0) {
							count++
							if (count===5) {
								if (historyOddBig) {
									td.style.backgroundColor = "#989dc6"
								}
							}
						}else if (arrNum%2!=0) {
							count1++
							if (count1===5) {
								if (historyOddBig) {
									td.style.backgroundColor = "#989dc6"
								}
							}
						}
					}
					if(i < preAreaLength)
					{
						if (curLotteryTypeName.indexOf("11选5")>=0&&curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							td.style.color="red"
						}else{
							td.style.color="#8A0000"
						}
						if (curLotteryTypeStyleName.indexOf("快彩")>=0) {// 0509快彩开奖号码前三颜色 橙红色
							td.style.color="#FF4500"
						}						
					}
					else
					{						
						if (curLotteryTypeStyleName.indexOf("快彩")>=0) {// 0509快彩开奖号码后二颜色 灰色
							td.style.color="grey"
						}else{
							td.style.color="black"
						}
					}
					 if (typek10Aver4) {td.style.color="red"}
					 if (typek10Aver2) {td.style.color="red"}
					if (typek10Green) {
						td.style.color="#7c0868"//"purple"				
						td.style.fontFamily ="RussoOne"
					}
					if (typek12JD||typek12JDHistory) {
						if (i < preAreaLength) {
							td.style.color="red"
						}
						else
						{
							td.style.color="blue"
						}
					}
					if(curLotteryTypeName.indexOf("481") >= 0){
						var Form481 = Check481NumberForm(o)
						if(Form481 == "豹子") td.style.color = "#006400"
						if(Form481 == "组4") td.style.color = "purple"
						if(Form481 == "组6") td.style.color = "red"
						if(Form481 == "组12") td.style.color = "black"
						if(Form481 == "组24") td.style.color = "blue"
					}
					if (typek3||typek3ZC||typePaiLie3) {
						td.style.color = "black"
						if (typek3||typePaiLie3) {
							var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
							var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
							var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
						}
						if (typek3ZC && historyNumbers.length>0) {//liutest
							var a =  parseInt(historyNumbers[o].numbers[0])
							var b =  parseInt(historyNumbers[o].numbers[1])
							var c =  parseInt(historyNumbers[o].numbers[2])
						}						

						if(a==b&&a==c){
							if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
								td.style.color="blue"
							}else{
								td.style.color="purple"
							}						
						}
						if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
						{
							if ((curLotteryTypeStyleName.indexOf("隔行")>=0||curLotteryTypeStyleName.indexOf("吉林4")>=0)&&curLotteryTypeName.indexOf("吉林快3")>=0) {
	                                                                                         td.style.color=""
						}else if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							td.style.color=""
							}else{
								td.style.color="#AA7700"
							}
							
						}
						if ((a==b&&a!=c)||(a==c&&a!=b)||(b==c&&b!=a)) {td.style.color = "red"}						
					}		　　　　

					if(testPrizeFlag){
						if (curLotteryTypeDataList[o].testnumbers[i]=="") {
							td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,curLotteryTypeDataList[o].testnumbers[i])
						}else
						{
							td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,parseInt(curLotteryTypeDataList[o].testnumbers[i]))
					              }
					}
					else if ((typek3ZC||typek12JDHistory) && historyNumbers.length>0) {
						if (parseInt(historyNumbers[o].numbers[i])>9) {
							td.innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,parseInt(historyNumbers[o].numbers[i]),false,false,false,"fontSmall")
						}else{
							td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,parseInt(historyNumbers[o].numbers[i]))
						}
						
					}else{
						var val = parseInt(curLotteryTypeDataList[o].numbers[i])
						var len = val.toString().length
						if (curLotteryTypeDataList[o].numbers[i]=="") {
							td.innerHTML = getCellHTML("container", tableCellWidth, tableCellHeight, curLotteryTypeDataList[o].numbers[i])
						}else if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							var val = parseInt(curLotteryTypeDataList[o].numbers[i])
							if(len===2){
								td.innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,val,false,false,false,"YCbig")
							}else{
								td.innerHTML = getCellHTML("container", tableCellWidth, tableCellHeight, val, false,false,false,"YCbig")
							}
						}else{							
							if(len===2){
								td.innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,val)
							}else{
								td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,val,false,true)
							}
							//td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,parseInt(curLotteryTypeDataList[o].numbers[i]))
					              }
					}
					if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("快3")>=0){
						if (o%2==0) 
						{
							td.style.color="red"
						}else
						{
							td.style.color="black"
						}
						var tmpIssue = curLotteryTypeDataList[o].issue
						var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
						if (simpleIssue===1) {
							td.style.color="blue"
						}
					}
				}else{
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
					td.style.color="white"
				}

				if(o == showPrizeItemCount+reservedLines-1)
				{
					if (typek10Green) {row.style.backgroundColor = "#b8ffc4"}
					else if (typek12JD) {row.style.backgroundColor="#ffc0cb"	}
					else if (typek10Aver4) {row.style.backgroundColor="blue"}
					else if (typek12JDHistory) {row.style.backgroundColor="#ffc0cb"}
					//else if (testPrizeFlag) {row.style.backgroundColor="blue"}
					else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 冷热好区域 白色底色
						row.style.backgroundColor="white"
					}
					else{row.style.backgroundColor="blue"}				
				}
			}	
		}	
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}		
	}
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	// div.appendChild(canvas)
	// div.appendChild(mtable)
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.style.backgroundColor="#d8e4fe"
	if (typek3) {cell.style.backgroundColor="white"}
	if (typek10Aver4) {cell.style.backgroundColor="#ffc3d6"}
	if (typek10Green) {cell.style.backgroundColor="#f1f3d7"}
	if (typek10Aver2) {cell.style.backgroundColor="#faf2ed"}
	// if (typek3ZC) {cell.style.backgroundColor="#cbe0d4"}
	if (typek3ZC) {cell.style.backgroundColor = "#d6d8dd"}
	if (typek12JD) {cell.style.backgroundColor="white"}
	if (typek12JDHistory) {cell.style.backgroundColor="#d6d8dd"}
	if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
		if (curLotteryTypeName.indexOf("快3")>=0) {
			cell.style.backgroundColor="#f0f0f0"
		}else{
			cell.style.backgroundColor="white"
		}
		
	}
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0510 快彩版 开奖号码背景色谈黄色
		cell.style.backgroundColor="#FFFFE0"
	}
	cell.appendChild(mtable)
	//cell.appendChild(div)
}
function createPrev3PrizeNumTrend(typek12Qian,typej7l1,type11x5Green,typePaiLie5)
{
	if (typek12Qian) {
		createOneOfPrizeNumTrend(0,"第一位","white",false,false,true)
		createOneOfPrizeNumTrend(1,"第二位","#d8e4fe",false,false,true)
		createOneOfPrizeNumTrend(2,"第三位","white",false,false,true)
	}else if (typej7l1) {		
		createOneOfPrizeNumTrend(0,"前区第一位","white",true,true)
		createOneOfPrizeNumTrend(1,"前区第二位","#d8e4fe",true,true)
		createOneOfPrizeNumTrend(2,"前区第三位","white",true,true)
	}
	else if (type11x5Green) {		
		createOneOfPrizeNumTrend(0,"第一位奖号","#f1f3d6",false,false,false,true,true)
		createOneOfPrizeNumTrend(1,"第二位奖号","#e1f7e8",false,false,false,true,false,true)
		createOneOfPrizeNumTrend(2,"第三位奖号","#f1f3d6",false,false,false,true,true)
	}
	else
	{
		createOneOfPrizeNumTrend(0,"第一位")
		if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
			createOneOfPrizeNumTrend(1,"第二位")
		}else{
			createOneOfPrizeNumTrend(1,"第二位","#d8e4fe")
		}		
		createOneOfPrizeNumTrend(2,"第三位")
	}	
}
function createOneOfPrizeNumTrend(position,title,bgColor,typek3,typek3JB,typek12Qian,type11x5Green,type11x5Green13,type11x5Green2,typeP5AndQxc)
{
	// console.log(trendCellWidth)
	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'
	
	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5
	var ctx=canvas.getContext('2d');
	ctx.strokeStyle='#323232';
	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(prizeNumAvailableNumCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	 
	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prizeNumAvailableNumCount,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'
	
	curHeightRedundantPixels = heightRedundantPixels
	if (typek3JB) {
		if (curOrientation=="port") {
			_createHeader(mtable,title,trendCellWidth,tableCellHeight,prizeNumMin,prizeNumMax,false,false,false,false,false,false,false,true)
		}else{
			_createHeader(mtable,title,trendCellWidth,tableCellHeight,prizeNumMin,prizeNumMax)
		}
	}else if (type11x5Green13) {		
		_createHeader(mtable,title,trendCellWidth,tableCellHeight,prizeNumMin,prizeNumMax,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,true)
	}else if (type11x5Green2) {
		_createHeader(mtable,title,trendCellWidth,tableCellHeight,prizeNumMin,prizeNumMax,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true)
	}
	else{
		_createHeader(mtable,title,trendCellWidth,tableCellHeight,prizeNumMin,prizeNumMax)
	}
	
	var ballsCount=new Array()  //for 统计
	var lastDataCount = new Array()
	var curDataCount = new Array()
	for(var i=0;i<prizeNumAvailableNumCount;i++)
	{
		ballsCount[i]=0
		lastDataCount[i]=0
		curDataCount[i]=lastDataCount[i]
	}	
	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height	
	
	var yOffset=2*(tableCellHeight+1)+1
	// console.log(showPrizeItemCount+reservedLines);
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		
		var val = 0;

		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		if(o< showPrizeItemCount)
		{			
			val = parseInt(curLotteryTypeDataList[o].numbers[position])
		}
		// console.log(prizeNumAvailableNumCount); 11
		for(var i=0;i<prizeNumAvailableNumCount;i++)
		{
			var td = row.insertCell(i)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
					td.style.borderBottom="" 
				}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩10期底部红线
					td.style.borderBottom="1px solid red" 
				}else{
					td.style.borderBottom="1px solid gray" 
				}
				
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
				//  console.log(td.width);
			}
			else
			{
				td.height = tableCellHeight
			}
			
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}			
			if(o<showPrizeItemCount)
			{
				if(prizeNumMin == 0)
				{
					curDataCount[i]++

					if(val != i)////i从0开始，val从1开始
					{
						//td.innerHTML = "01"
						if(backgroundNumberEnabled)
							td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,curDataCount[i],true)
						else
							td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
						td.style.color="#ffffff"
					}
					else{
						if(!isNaN(val))
						{
							ballsCount[val]++
						
							//td.innerHTML = "<div>"+val+"</div>"
							td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,true)
						}
						else
						{
							td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"",true)
						}
						td.style.color="#8A0000"
						curDataCount[i]=0
					}
				}
				else
				{
					curDataCount[i]++
					if(val != i+1)// i从0开始，val从1开始
					{
						if(backgroundNumberEnabled)
							td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,curDataCount[i],true)
						else
							td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
						td.style.color="#ffffff"
					}
					else{
						if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0){
							if (o%2==0) 
							{
								td.style.color="red"
							}else
							{
								td.style.color="black"
							}
							var tmpIssue = curLotteryTypeDataList[o].issue
							var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
							if (simpleIssue===1) {
								td.style.color="blue"
							}						
						}	
						if (!isNaN(val)) {
							ballsCount[val-1]++
							curDataCount[val-1]=0
							
							if (typek3) {
								if(curLotteryTypeName.indexOf("481") >= 0){
									var Form481 = Check481NumberForm(o)
									if(Form481 == "豹子") td.style.color = "#006400"
									if(Form481 == "组4") td.style.color = "purple"
									if(Form481 == "组6") td.style.color = "red"
									if(Form481 == "组12") td.style.color = "black"
									if(Form481 == "组24") td.style.color = "blue"
								}else{
									var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
									var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
									var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
									if(a==b&&a==c){td.style.color="purple"}
									if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
									{
										//td.style.color="blue"
										td.style.color="#AA7700"
									}
									if (a==b&&a!=c) 	{td.style.color = "red"}
									if (a==c&&a!=b) 	{td.style.color = "red"}
									if (b==c&&b!=a) 	{td.style.color = "red"}
								}
							}
							if (typek12Qian) {
								if (parseInt(val)>9) {
									td.innerHTML = getCellHTML("containerShape10",trendCellWidth,tableCellHeight,val,false,false,false,"HZsmall")
								}else{
									td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,true)
								}
								td.style.fontFamily = "YCArezzo"
								td.style.color = "#6e0414"
							}else if (type11x5Green) {
								if (val>9) {//11选5绿色版 走势两位数压缩一下
									td.innerHTML = getCellHTML("containerShape10",trendCellWidth,tableCellHeight,val,false,false,false,"HZsmall")
								}else{
									td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,true)
								}
								
								td.style.color = "#9b635f"
								//td.style.fontWeight = "bold"
							}
							else
							{
								var len = val.toString().length
								//td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,true)
								if (curLotteryTypeName.indexOf("快3")>=0) {//20161014 快3走势字体缩小变粗
									//td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,false,true)
									
									if(len===2){
										td.innerHTML = getCellHTML("containerShape",trendCellWidth,tableCellHeight,val)
									}else{
										td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,false,true)
									}
									td.style.fontFamily = "YCArezzo"
									
								}else{
									//td.style.fontFamily = "MyFont"
									if (curLotteryTypeName.indexOf("河北")>=0&&curLotteryTypeStyleName.indexOf("综合3")>=0) {
										td.style.fontFamily = "HBz3Font"
										td.style.color="#8A0000"
										var len = val.toString().length
										if (len === 2) {
										td.innerHTML = getCellHTML("containerShape10", trendCellWidth, tableCellHeight, val)
										} else {
											td.innerHTML = getCellHTML("container", trendCellWidth, tableCellHeight, val, false, true)
										}
									}else{
										if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
											td.style.fontFamily = "YCArezzo"		
											if (len == 2) {
												td.innerHTML = getCellHTML("containerShape10", trendCellWidth, tableCellHeight, val, false, false, false,"YCbig")
											} else {
												td.innerHTML = getCellHTML("container", trendCellWidth, tableCellHeight, val, false, false, false,"YCbig")
											}
										}else{
											td.style.fontFamily = "YCArezzo"
											var len = val.toString().length
											if(len===2){
												td.innerHTML = getCellHTML("containerShape10",trendCellWidth,tableCellHeight,val)
											}else{
												
												td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,false,true)
												// console.log(trendCellWidth);
											}
										}										            
									}
								}
									
								//td.style.fontWeight = "900"
							}
						}
						else{
								console.log(1);
								td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"",true)
						}							
							//td.style.color="#8A0000"

						

					}
				}
			}
			else
			{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
			
		}		
		if(o<showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();
			
				if(prizeNumMin == 0)
				{
					var tmpXPos=0;
					if(curTrendWidthRedundantPixels>0)
					{
						tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
					}
					else
					{
						tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
					}
					var tmpYPos = 0;
					if(curHeightRedundantPixels>0)
					{
						tmpYPos = (tableCellHeight+1+1)/2// ctx.moveTo(val*(trendCellWidth+1)+(trendCellWidth+1)/2,(tableCellHeight+1+1)/2)
					}
					else
					{
						tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels
					
					}
					tmpYPos+=yOffset
					ctx.moveTo(tmpXPos,tmpYPos)
					
				}
				else
				{					
					var tmpXPos=0;
					if(curTrendWidthRedundantPixels>0)
					{
						tmpXPos = (val-1)*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
					}
					else
					{
						tmpXPos = (val-1)*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
					}
					var tmpYPos = 0;
					if(curHeightRedundantPixels>0)
					{
						tmpYPos = (tableCellHeight+1+1)/2
					}
					else
					{
						tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels
					
					}
					tmpYPos+=yOffset
					ctx.moveTo(tmpXPos,tmpYPos)					
				}
			}
			else
			{
				if(prizeNumMin == 0)
				{					
					var tmpXPos=0;
					if(curTrendWidthRedundantPixels>0)
					{
						tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
					}
					else
					{
						tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
					}
					var tmpYPos = 0;
					if(curHeightRedundantPixels>0)
					{
						tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
					}
					else
					{
						tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
					}
					tmpYPos+=yOffset
					ctx.lineTo(tmpXPos,tmpYPos)
					
				}
				else
				{
					
					var tmpXPos=0
					if(curTrendWidthRedundantPixels>0)
					{
						tmpXPos = (val-1)*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
					}
					else
					{
						tmpXPos = (val-1)*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
					}
					var tmpYPos = 0;
					if(curHeightRedundantPixels>0)
					{
						tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
					}
					else
					{
						tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
					}
					tmpYPos+=yOffset
					ctx.lineTo(tmpXPos,tmpYPos)
					//ctx.stroke();	
				}				
			}
		}
		if(o == showPrizeItemCount+reservedLines-1)
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if (typek3) {row.cells[index].style.backgroundColor="blue"}
				else if(typek12Qian){row.cells[index].style.backgroundColor="blue"}
				else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//底部冷热号 背景白色
					// row.cells[index].style.backgroundColor="white"
					row.cells[index].style.color="white"
					if(ballsCount[index]==maxMin[0])
					{
						row.cells[index].style.backgroundColor="red"
					}
					else if(ballsCount[index]==maxMin[1])
					{
						row.cells[index].style.backgroundColor="green"
					}
					else
					{
						row.cells[index].style.backgroundColor="white"
						row.cells[index].style.color="black"
					}

				}else if (type11x5Green) {
					row.cells[index].style.color = "#91695d"
					row.cells[index].style.backgroundColor="#b8ffc4"
					if(ballsCount[index]==maxMin[0])
					{
						row.cells[index].style.backgroundColor="#ed731b"
						row.cells[index].style.color = "white"
					}
					else if(ballsCount[index]==maxMin[1])
					{
						row.cells[index].style.backgroundColor="#71c487"
						row.cells[index].style.color = "white"
					}
				}
				else{
					if(ballsCount[index]==maxMin[0])
					{
						row.cells[index].style.backgroundColor="red"
					}
					else if(ballsCount[index]==maxMin[1])
					{
						row.cells[index].style.backgroundColor="green"
					}
					else
					{
						row.cells[index].style.backgroundColor="blue"
					}
				}
				// if (typek12Qian) {
				// 	row.cells[index].innerHTML = ballsCount[index]
				// 	row.cells[index].style.fontSize = 18  +"px"
				// }else	
				if (ballsCount[index]>9) {
					row.cells[index].innerHTML=getCellHTML("containerShape10",trendCellWidth,tableCellHeight,ballsCount[index],false,false,false,"fontSmall")
				}else{
					row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index],true)
				}			
				
				// row.cells[index].innerHTML=getCellHTML("container",trendCellWidth,tableCellHeight,ballsCount[index])
				
			}
		}		
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels=curHeightRedundantPixels-1
		}
	}
	div.appendChild(mtable)//canvas线上下问题
	div.appendChild(canvas)
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	ctx.stroke()
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= div.style.width
	cell.style.height=div.style.height
	if(bgColor){cell.style.backgroundColor=bgColor}
	cell.appendChild(div)
}
function createPrizeNumDistribution(length,ballflag,typek3,typek12Qian,typej7l1,typej7l2,typek12,typek12JD,type11x5Green,typek3ShuZi)
{
	var ballsCount=new Array()  //for 统计
	var lastDataCount = new Array()
	var curDataCount = new Array()
	for(var i=0;i<prizeNumAvailableNumCount;i++)
	{
		ballsCount[i]=0
		lastDataCount[i]=0
		curDataCount[i]=0
	}
	
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(prizeNumAvailableNumCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prizeNumAvailableNumCount,heightRedundantPixels)

	var tmpTitle
	if (typek3||typek3ShuZi) {tmpTitle = "开奖走势"}
	else if (typek12Qian) {tmpTitle = "开奖号码走势图"}
	else if (typej7l1||typej7l2) {tmpTitle = "前区综合走势图"}
	else if (type11x5Green) {tmpTitle ="组选分布(紫)/任选分布"}
	else if (length===3&&curLotteryTypeStyleName.indexOf("右屏版")>=0) {
		tmpTitle = "前三走势图"
	}else if (length===5&&curLotteryTypeStyleName.indexOf("右屏版")>=0) {
		tmpTitle = "号码走势图"
	}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 奖号分布表头文字
		tmpTitle = "开奖号码分布"
	}
	else{tmpTitle = "奖号分布"}

	curHeightRedundantPixels = heightRedundantPixels
	if (typej7l1||typej7l2) {
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,prizeNumAvailableNumCount,false,false,false,false,false,false,false,false,false,false,true)
	}else if (type11x5Green) {
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,prizeNumAvailableNumCount,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true)
	}
	else
	{
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,prizeNumAvailableNumCount)
	
	}

	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)	
		for(var i=0;i<prizeNumAvailableNumCount;i++)
		{
			var td = row.insertCell(i)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				if (curLotteryTypeStyleName.indexOf("快彩")>=0) {// 0509快彩开奖号码分布 10期下划线颜色
					td.style.borderBottom="1px solid red" 
				}else{
					td.style.borderBottom="1px solid gray" 
				}
								
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			
			if(o< showPrizeItemCount)
			{
				curDataCount[i]++
				if(backgroundNumberEnabled)
					td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,curDataCount[i])
				else
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
			else
			{
				td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if(o< showPrizeItemCount)
		{
			var arr = curLotteryTypeDataList[o].numbers.slice().sort();
			var count = 0;	
			var count1 = 0;
			for(var r=0;r<arr.length;r++){
				if(arr[r].length == 1){
					arr[r] = "0" + arr[r];							
				}						
			}
			if (!(curLotteryTypeStyleName.indexOf("快彩")>=0)) {// 0509快彩开奖号码分布 不显示全奇全偶
			for(var r=0;r<5;r++){							
				var arrNum = parseInt(curLotteryTypeDataList[o].numbers[r])
				if (arrNum%2==0) {//20161025奖号分布判断全偶
					count++
				}else if (arrNum%2!=0) {//20161025奖号分布判断全奇
					count1++
				}		
			}
			}
			var flagarr = [false,false,false,false,false,false,false,false]//new Array(8).fill(false);
			function arrange(source) {
			    var t;
			    var ta;
			    var r = [];

			    source.forEach(function(v) {
			        // console.log(t, v);   // 跟踪调试用
			        v = parseInt(v)
			        if (t === v) {
			            ta.push(t);
			            t++;
			            return;
			        }

			        ta = [v];
			        t = v + 1;
			        r.push(ta);
			    });

			    return r;
			}
			var shunzi =[];
			
			arrange(arr).forEach(function(e){
				if(e.length >= 3){
					shunzi =shunzi.concat(e);
				}
			})
			for(var j =0;j<length;j++)
			{
				var ballNumber = parseInt(curLotteryTypeDataList[o].numbers[j])
				var val = parseInt(ballNumber)
				var len = val.toString().length
				//if (ballNumber === 0) { //20161025作用于全0时  奖号分布不显示报错问题
				//	ballNumber = 22
				//}
				if (type11x5Green) {
					if(shunzi.indexOf(ballNumber )!== -1){
						row.cells[ballNumber-1].style.backgroundColor = "#99f4dd"
					}
				}

				
				var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
				var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
				var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
				
				if(ballNumber <= prizeNumMax)
				{
					if(prizeNumMin == 0)
					{
						ballsCount[ballNumber]++
						curDataCount[ballNumber]=0
						if(ballflag){
							if(j < 3)
							{
								row.cells[ballNumber].innerHTML=getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
							}
							else
							{
								row.cells[ballNumber].innerHTML=getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
							}								
						}else{							
							if(j<3)
							{
								row.cells[ballNumber].style.color="red"
							}
							else
							{
								row.cells[ballNumber].style.color="blue"
							}
							row.cells[ballNumber].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
							
							if(length==3) // 前三或者三个奖号处理
							{								
								if(j==2 && numberMatrix[o][ballNumber]==2)
								{
									var prev3Nums=new Array;
									prev3Nums[0] = parseInt(curLotteryTypeDataList[o].numbers[0])
									prev3Nums[1] = parseInt(curLotteryTypeDataList[o].numbers[1])
									prev3Nums[2] = ballNumber
									var maxMinVal = getMaxMinVal(prev3Nums)
									if(maxMinVal[0]-maxMinVal[1] == 2)  // 最大值减去最小值
									{
										row.cells[prev3Nums[0]].style.backgroundColor="#98AEC7"
										row.cells[prev3Nums[1]].style.backgroundColor="#98AEC7"
										row.cells[prev3Nums[2]].style.backgroundColor="#98AEC7"
									}									
								}
							}else{								
								if(numberMatrix[o][ballNumber]==2)
								{
									row.cells[ballNumber].style.backgroundColor="#98AEC7"
								}
							}
						}						
					}
					else
					{
						ballsCount[ballNumber-1]++
						curDataCount[ballNumber-1]=0
						if(ballflag){
							if (!(curLotteryTypeStyleName.indexOf("快彩")>=0)) {// 0509快彩开奖号码分布 球形显示  不要红篮球
								if(j<3)
								{
									row.cells[ballNumber-1].innerHTML=getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
								}
								else
								{
									row.cells[ballNumber-1].innerHTML=getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
								}
							}else{
								if (ballNumber>9) {
									row.cells[ballNumber-1].innerHTML=getCellHTML("skyblueballKuai",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"kuaicai")
								}else{
									row.cells[ballNumber-1].innerHTML=getCellHTML("skyblueballKuai",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
								}
								
							}
						}else{	
							if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0){
								if (o%2==0) 
								{
									row.cells[ballNumber-1].style.color="red"
								}else
								{
									row.cells[ballNumber-1].style.color="black"
								}
								var tmpIssue = curLotteryTypeDataList[o].issue
								var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
								if (simpleIssue===1) {
									row.cells[ballNumber-1].style.color="blue"
								}														
							}else{
								if(j<3)
								{
									if ((curLotteryTypeName.indexOf("11选5")>=0)&&(curLotteryTypeStyleName.indexOf("吉林综")>=0||curLotteryTypeStyleName.indexOf("艺彩")>=0) ){
										row.cells[ballNumber-1].style.color=""
									}else{
										if(curLotteryTypeStyleName.indexOf("右屏版")>=0&&length===5){
											row.cells[ballNumber-1].style.color=""
										}else{
											row.cells[ballNumber-1].style.color="red"
										}										
									}
												
								}
								else
								{
									row.cells[ballNumber-1].style.color="black"
								}
							}	
							//ballsCount[ballNumber-1]++
							var val = parseInt(curLotteryTypeDataList[o].numbers[j])
							var len = val.toString().length
							if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
								var val = parseInt(curLotteryTypeDataList[o].numbers[j]);
								if(len===2){
									row.cells[ballNumber - 1].innerHTML = getCellHTML("containerShape", tableCellWidth, tableCellHeight, val, false, false,false,"YCbig")
								}else{
									row.cells[ballNumber - 1].innerHTML = getCellHTML("container", tableCellWidth, tableCellHeight, val, false, false,false,"YCbig")
								}								
							} else{							
								if(len===2){								
									row.cells[ballNumber-1].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,val,false,true)
								}else{
									row.cells[ballNumber-1].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,val,false,true)
								}
							}
						
							if (typek3) {
								row.cells[ballNumber-1].innerHTML=getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
							                if(a==b&&a==c)
								{
									row.cells[ballNumber-1].innerHTML=getCellHTML("purpleball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
					
								}
								if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
								{
									row.cells[ballNumber-1].innerHTML = getCellHTML("blackball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)

								}
								if (a==b&&a!=c )
								{
									row.cells[a-1].innerHTML= getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),a)
									// row.cells[c-1].innerHTML =  getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),c)
									row.cells[c-1].innerHTML =  getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),c)

								}
								if (a==c&&a!=b) 
								{
									row.cells[a-1].innerHTML= getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),a)
									// row.cells[b-1].innerHTML =  getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),b)
									row.cells[b-1].innerHTML =  getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),b)
								}
								if (b==c&&b!=a) 
								{
									row.cells[b-1].innerHTML= getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),b)
									// row.cells[a-1].innerHTML =  getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),a)
									row.cells[a-1].innerHTML =  getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),a)
		
								}  
							}
							else if (typej7l1||typej7l2||typek3ShuZi) {
								if(curLotteryTypeName.indexOf("481") >= 0){
									var Form481 = Check481NumberForm(o)
									if(Form481 == "豹子") row.cells[ballNumber-1].style.color = "#006400"
									if(Form481 == "组4") row.cells[ballNumber-1].style.color = "purple"
									if(Form481 == "组6") row.cells[ballNumber-1].style.color = "red"
									if(Form481 == "组12") row.cells[ballNumber-1].style.color = "black"
									if(Form481 == "组24") row.cells[ballNumber-1].style.color = "blue"
								}else{
								
									row.cells[ballNumber-1].style.color="black"

								    if(a==b&&a==c)
									{
										if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
											row.cells[ballNumber-1].style.color="blue"
										}else{
											row.cells[ballNumber-1].style.color="purple"
										}
										
									}
									if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
									{
										if ((curLotteryTypeStyleName.indexOf("隔行")>=0||curLotteryTypeStyleName.indexOf("吉林4")>=0)&&curLotteryTypeName.indexOf("吉林快3")>=0) {
								                                           td.style.color=""
										}
										else if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
											row.cells[ballNumber-1].innerHTML=getCellHTML("skyblueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YCbig")
										}
										else if (typek3ShuZi) {
											row.cells[ballNumber-1].style.color="#AA7700"
										}
										
										else
										{
											row.cells[ballNumber-1].style.color="blue"
										}
										
									}

									if ((a==b&&a!=c)|| (a==c&&a!=b) )
									{
										row.cells[a-1].style.color = "red"
									}
									if (b==c&&b!=a) 
									{
										row.cells[b-1].style.color = "red"										
									}
									if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("快3")>=0){
										if (o%2==0) 
										{
											row.cells[ballNumber-1].style.color="red"
										}else
										{
											row.cells[ballNumber-1].style.color="black"
										}	
										var tmpIssue = curLotteryTypeDataList[o].issue
										var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
										if (simpleIssue===1) {
											row.cells[ballNumber-1].style.color="blue"
										}								
											
										if ((a==b&&a!=c)|| (a==c&&a!=b) )
										{											
											if (o%2==0) 
											{
												row.cells[a-1].style.color="red"
											}else
											{
												row.cells[a-1].style.color="black"
											}
											row.cells[a-1].innerHTML= getCellHTMLk3("hollowball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),a)
										}
										if (b==c&&b!=a) 
										{
											if (o%2==0) 
											{
												row.cells[b-1].style.color="red"
											}else
											{
												row.cells[b-1].style.color="black"
											}
											row.cells[b-1].innerHTML = getCellHTMLk3("hollowball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),b)
																	
										}
										  if(a==b&&a==c)
										{
											row.cells[ballNumber-1].innerHTML=getCellHTMLk3("hollowball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber)
														
										}							
									}	
								}	
								
							}else if(length==3) // 前三或者三个奖号处理
							{
								if(j==2 && numberMatrix[o][ballNumber-1]==2)
								{
									
									var prev3Nums=new Array;
									prev3Nums[0] = parseInt(curLotteryTypeDataList[o].numbers[0])
									prev3Nums[1] = parseInt(curLotteryTypeDataList[o].numbers[1])
									prev3Nums[2] = ballNumber
									var maxMinVal = getMaxMinVal(prev3Nums)
									if(maxMinVal[0]-maxMinVal[1] == 2)  // 最大值减去最小值
									{
										if (curLotteryTypeStyleName.indexOf("右屏版")>=0) {
											row.cells[prev3Nums[0]-1].style.backgroundColor="yellow"
											row.cells[prev3Nums[1]-1].style.backgroundColor="yellow"
											row.cells[prev3Nums[2]-1].style.backgroundColor="yellow"
										}else{
											row.cells[prev3Nums[0]-1].style.backgroundColor="#98AEC7"
											row.cells[prev3Nums[1]-1].style.backgroundColor="#98AEC7"
											row.cells[prev3Nums[2]-1].style.backgroundColor="#98AEC7"
										}
										
									}
									
								}
							}else if (type11x5Green) {
								if(j<3)
								{
									row.cells[ballNumber-1].style.color="#7c0868"
								}
								else
								{
									row.cells[ballNumber-1].style.color="#191d58"
								}
								row.cells[ballNumber-1].style.fontFamily = "RussoOne"
								row.cells[ballNumber-1].style.fontWeight = "lighter"
								if (o%2==0) 
								{
									row.style.backgroundColor= "#d0f1d7" 
								}else
								{
									row.style.backgroundColor= "#e2f6e6"
								}
							}
							else{
								if(numberMatrix[o][ballNumber-1]==2)
								{
									if (curLotteryTypeStyleName.indexOf("艺彩")>=0&&curLotteryTypeName.indexOf("11选5")>=0) {
										if(shunzi.indexOf(ballNumber )!== -1){
											if (shunzi.length===3) {
												if(len===2){
													row.cells[ballNumber-1].innerHTML=getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YC10")													
												}else{												
													row.cells[ballNumber-1].innerHTML=getCellHTML("blueball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YCbig")
												}
											}else if (shunzi.length===4) {
												if(len===2){
													row.cells[ballNumber-1].innerHTML=getCellHTML("purpleball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YC10")									
												}else{												
													row.cells[ballNumber-1].innerHTML=getCellHTML("purpleball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YCbig")
												}
											}else if (shunzi.length===5) {
												if(len===2){
													row.cells[ballNumber-1].innerHTML=getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YC10")									
												}else{												
													row.cells[ballNumber-1].innerHTML=getCellHTML("redball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YCbig")
												}								

											}					
										}
									}else{
										if (curLotteryTypeStyleName.indexOf("右屏版")>=0) {
											row.cells[ballNumber-1].style.backgroundColor="yellow"
										}else{
											row.cells[ballNumber-1].style.backgroundColor="#98AEC7"
										}
										
									}
									
								}
							}

													
						}
					}
				}
				if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
					row.cells[ballNumber-1].style.fontFamily = "YCArezzo"
				}
				
				if ((curLotteryTypeName.indexOf("11选5")>=0)&&(length ===5)) {
					if (ballNumber>0&&ballNumber<13) {//全0和部分为0
						if (count===5) {//20161025 奖号分布全偶	
							if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {						
								if(len===2){									
									row.cells[ballNumber-1].innerHTML=getCellHTML("orangeball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YC10")
								}else{
									row.cells[ballNumber-1].innerHTML=getCellHTML("orangeball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YCbig")
								}
							}else{
								row.cells[ballNumber-1].style.backgroundColor = " #808e9d"//有数字地方加背景色
							}						
							//row.style.backgroundColor = " #4F94CD"//全偶数整行加背景色
						}
						if (count1===5) {							
							if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
								if(len===2){									
									row.cells[ballNumber-1].innerHTML=getCellHTML("orangeball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YC10")
								}else{									
									row.cells[ballNumber-1].innerHTML=getCellHTML("orangeball",Math.min(tableCellWidth,tableCellHeight),Math.min(tableCellWidth,tableCellHeight),ballNumber,false,false,false,"YCbig")
								}									
							}else{
								row.cells[ballNumber-1].style.backgroundColor = " #808e9d"//有数字地方加背景色
							}									
							//row.style.backgroundColor = " #4F94CD"//全奇数数整行加背景色
						}
					}
				}
						
			}
		}		
		if(o == showPrizeItemCount+reservedLines-1)
		{			
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					if (type11x5Green) {
						row.cells[index].style.backgroundColor="#ed731b"
						row.cells[index].style.color = "white"
					}else
					{
						row.cells[index].style.backgroundColor="red"
					}
				}
				else if(ballsCount[index]==maxMin[1])
				{
					if (type11x5Green) {
						row.cells[index].style.backgroundColor="#71c487"
						row.cells[index].style.color = "white"
					}else
					{
						row.cells[index].style.backgroundColor="green"						
					}
					
				}
				else if (typek12JD) {
					row.cells[index].style.backgroundColor="#fcc2cb"
					row.cells[index].style.color = "black"
				}else if (type11x5Green) {
					row.cells[index].style.backgroundColor="#b8ffc4"
					row.cells[index].style.color = "#91695d"

				}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509快彩开奖号码分布冷热号区域颜色
					row.style.backgroundColor="white"
					row.cells[index].style.color = "black"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index],true)//奖号分布下边统计数字太大超出表格问题 压缩一下
			}
		}

		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
	        	}

	}
	 
	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 奖号分布右侧线  蓝色
		cell.style.borderRight = "2px solid #06a8ca"		 	
		cell.style.backgroundColor="red"//"#F2F2F2"
	}
	if (typek12Qian) {cell.style.backgroundColor="white"}
	else if(typej7l1){cell.style.backgroundColor="white"}
	else if (type11x5Green) {cell.style.backgroundColor="#d0f1d7"}		
	else if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
		if (curLotteryTypeName.indexOf("11选5")>=0) {
			if (length===3) {
				cell.style.backgroundColor="#f9f9ce"
			}else{
				cell.style.backgroundColor="#f0f0f0"
			}			
		}else{
			cell.style.backgroundColor="white"
		}	
	}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 奖号分布右侧线  蓝色
		cell.style.borderRight = "2px solid #06a8ca"		 	
		cell.style.backgroundColor="#F2F2F2"
	}
	else{
		cell.style.backgroundColor="#d9e5ff"
	}
	
	//cell.appendChild(div)
	cell.appendChild(mtable)
}

function createPrizeNumRepeatTimes(length,typek10Aver4,typek10Green,typek10Aver2,typek12Qian,typek12JD,type11x5Green)
{
	var tmpWdithRedundantPixels
	if(trendCellCount == 0 && trendWidthRedundantPixels > 0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,1,heightRedundantPixels)

	curHeightRedundantPixels = heightRedundantPixels
	if (typek10Aver2) {
		_createHeaderk10(mtable,"重号",tableCellWidth,tableCellHeight,true)
	}else if (typek10Green) {
		_createHeaderk10(mtable,"重号",tableCellWidth,tableCellHeight,false,false,true)
	}else if (type11x5Green) {
		_createHeaderk10(mtable,"重号",tableCellWidth,tableCellHeight,false,false,false,false,false,true)
	}
	else{
		_createHeader(mtable,"重号",tableCellWidth,tableCellHeight)
	}	
	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(o == showPrizeItemCount+reservedLines-1)
		{
			if (typek10Green) {row.style.backgroundColor = "#b8ffc4"}
			else if (typek12JD) {row.style.backgroundColor = "#fcc2cb"}
			else if (type11x5Green) {row.style.backgroundColor = "#b8ffc4"}	
			else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 重号底部冷热号区域颜色
				row.style.backgroundColor = "white"
			}			
			else{row.style.backgroundColor="blue"}
		}
		var td = row.insertCell(0)
		if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
			if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
				td.style.borderBottom="" 
			}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 10期线颜色
				td.style.borderBottom="1px solid red" 
			}
			else{
				td.style.borderBottom="1px solid gray" 
			}
			
		}
		if(curHeightRedundantPixels>0)
		{
			td.height = tableCellHeight+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height = tableCellHeight
		}

		if(o< showPrizeItemCount)
		{
			if(o == 0)
			{
				var firstLotteryNum= gLotteryDataList85.slice(85-destPrizeItemCount-1,85-destPrizeItemCount);
				if (firstLotteryNum.length===0) {
					td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,getPrizeNumRepeatTimes(curLotteryTypeDataList[o].numbers,curLotteryTypeDataList[o].numbers,length),false,false,false,"YCbig")
				}else{
					td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,getPrizeNumRepeatTimes(firstLotteryNum[o].numbers,curLotteryTypeDataList[o].numbers,length),false,false,false,"YCbig")
				}
			}
			else
			{
				td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,getPrizeNumRepeatTimes(curLotteryTypeDataList[o-1].numbers,curLotteryTypeDataList[o].numbers,length),false,false,false,"YCbig")
			}
			if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0){
				if (o%2==0) 
				{
					td.style.color="red"
				}else
				{
					td.style.color="black"
				}
				var tmpIssue = curLotteryTypeDataList[o].issue
				var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
				if (simpleIssue===1) {
					td.style.color="blue"
				}		
														
							
			}	
			if (typek10Green) {td.style.color="#7c0868"}//"purple"	
			if (type11x5Green) {
				td.style.color="#ec832f"
				if (o%2==0) 
				{
					row.style.backgroundColor= "#d0f1d7" 
				}else
				{
					row.style.backgroundColor= "#e2f6e6"
				}
			}		
		}
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
	}

        trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (typek10Aver4) {cell.style.backgroundColor = "#f0febb"}
	if (typek10Green) {cell.style.backgroundColor = "#f1f3d7"}
	if (typek12Qian) {cell.style.backgroundColor = "#d8e4fe"}
	if (type11x5Green) {cell.style.backgroundColor="#d0f1d7"}	
              cell.appendChild(mtable)

}
function createPrizeNumSum(length,typek12Qian,typek12JD,type11x5Green)
{
	var tmpWdithRedundantPixels
	if(trendCellCount == 0 && trendWidthRedundantPixels > 0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,1,heightRedundantPixels)
	
	curHeightRedundantPixels = heightRedundantPixels

              if (typek12JD) {            
		_createHeaderk10(mtable,"和值",tableCellWidth,tableCellHeight,true)
	}else if (type11x5Green) {
		_createHeaderk10(mtable,"和值",tableCellWidth,tableCellHeight,false,false,false,false,false,true)
	}
	else{
		_createHeader(mtable,"和值",tableCellWidth,tableCellHeight)
	}
	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(o == showPrizeItemCount+reservedLines-1)
		{
			if (typek12JD) {row.style.backgroundColor="#fcc2cb"}
			else if (type11x5Green) {row.style.backgroundColor = "#b8ffc4"}
			else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 和值底部冷热号区域颜色
				row.style.backgroundColor = "white"
			}
			else{row.style.backgroundColor="blue"}			
		}
		var td = row.insertCell(0)
		if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
			if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
				td.style.borderBottom="" 
			}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 10期线颜色
				td.style.borderBottom="1px solid red" 
			}
			else{
				td.style.borderBottom="1px solid gray" 
			}
			
		}

		if(curHeightRedundantPixels>0)
		{
			td.height = tableCellHeight+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height = tableCellHeight
		}		
		
		if(o< showPrizeItemCount)
		{
			var ballsSum=0
			for(var j =0;j<length;j++)
			{
				var ballNumber = parseInt(curLotteryTypeDataList[o].numbers[j])
				ballsSum += ballNumber		
			}
			if (ballsSum>9&&curLotteryTypeName.indexOf("排列")>=0&&curOrientation==="port") {							
				td.innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballsSum,false,false,false,"HZsmall")			
			}else{
				if(ballsSum>9){
					td.innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsSum,true)	
				}else{
					td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,ballsSum,true)
				}	
			}
			
			if (type11x5Green) {
				td.style.color="#ec832f"
				if (o%2==0) 
				{
					row.style.backgroundColor= "#d0f1d7" 
				}else
				{
					row.style.backgroundColor= "#e2f6e6"
				}
			}			
		}
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
	}
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (typek12Qian) {
		if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
			cell.style.backgroundColor = "white"
		}else{
			cell.style.backgroundColor = "#d8e4fe"
		}
		
	}
	else if (type11x5Green) {cell.style.backgroundColor="#d0f1d7"}	
	cell.appendChild(mtable)
}
function createPrizeNumDistance(length,typek10Green,typek12Qian,typek12JD,type11x5Green)
{
	var tmpWdithRedundantPixels
	if(trendCellCount == 0 && trendWidthRedundantPixels > 0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,1,heightRedundantPixels)
	
	curHeightRedundantPixels = heightRedundantPixels
	if (typek10Green) {		
		_createHeaderk10(mtable,"跨度",tableCellWidth,tableCellHeight,false,false,true)
	}else if (typek12JD) {
            
		_createHeaderk10(mtable,"跨度",tableCellWidth,tableCellHeight,true)
	}else if (type11x5Green) {
		_createHeaderk10(mtable,"跨度",tableCellWidth,tableCellHeight,false,false,false,false,false,true)
	}else{
		_createHeader(mtable,"跨度",tableCellWidth,tableCellHeight)
	}
	

	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(o == showPrizeItemCount+reservedLines-1)
		{
			if (typek10Green) {row.style.backgroundColor = "#b8ffc4"}
			else if (typek12JD) {row.style.backgroundColor = "#fcc2cb"}
			else if (type11x5Green) {row.style.backgroundColor = "#b8ffc4"}
			else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 跨度底部冷热号区域颜色
				row.style.backgroundColor = "white"
			}				
			else{row.style.backgroundColor="blue"}
		}
		var td = row.insertCell(0)
		if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
			if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
				td.style.borderBottom="" 
			}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 10期线颜色
				td.style.borderBottom="1px solid red" 
			}
			else{
				td.style.borderBottom="1px solid gray" 
			}
			
		}

		if(curHeightRedundantPixels>0)
		{
			td.height = tableCellHeight+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height = tableCellHeight
		}
		
		if(o< showPrizeItemCount)
		{
			if (getDistance(curLotteryTypeDataList[o].numbers,length)>9) {
				td.innerHTML =  getCellHTML("containerShape",tableCellWidth,tableCellHeight,getDistance(curLotteryTypeDataList[o].numbers,length),true)	
			}else{
				td.innerHTML =  getCellHTML("containerCH",tableCellWidth,tableCellHeight,getDistance(curLotteryTypeDataList[o].numbers,length))	
			}
			
			if (type11x5Green) {
				td.style.color="#ec832f"
				if (o%2==0) 
				{
					row.style.backgroundColor= "#d0f1d7" 
				}else
				{
					row.style.backgroundColor= "#e2f6e6"
				}
			}	
		}
		else
		{
			td.innerHTML =  getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
		if (typek10Green) {td.style.color="#7c0868"}//"purple"		
	}
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 跨度 borderLeft 
		cell.style.borderLeft = "2px solid red"
	}
	
	if (typek10Green) {cell.style.backgroundColor = "#f1f3d7"}
	if (typek12Qian) {cell.style.backgroundColor = "#d8e4fe"}
	if (type11x5Green) {cell.style.backgroundColor="#d0f1d7"}	
	cell.appendChild(mtable)
}
function createPrizeNumDistanceTrend(length,typek3,typej7l2,type11x5)
{
	var minDistance=length-prizeNumMin
	var maxDistance=prizeNumMax-prizeNumMin
	var itemsCount = maxDistance - minDistance +1

	if (typek3||typej7l2) {
		var minDistance=0
		var maxDistance=prizeNumMax-prizeNumMin
		var itemsCount = maxDistance - minDistance +1
	}
		
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<itemsCount;i++)
		ballsCount[i]=0
		
	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity = 0.5
	canvas.style.backgroundColor = "transparent"//20161008跨度走势canvas背景设为透明
	
	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';
	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'

	curHeightRedundantPixels = heightRedundantPixels

	var tmpTitle
	if (length===3 && !typek3) {
		tmpTitle ="前三跨度"		
	}else{
		tmpTitle ="跨度"
	}
	// if (typek3) {tmpTitle ="跨度"}
	// else{tmpTitle ="跨度"}
	
	_createHeader(mtable,tmpTitle,trendCellWidth,tableCellHeight,minDistance,maxDistance)


	
	
	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height
	
	

	var yOffset = (tableCellHeight+1)*2+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var val;
		if(o< showPrizeItemCount)
			val = getDistance(curLotteryTypeDataList[o].numbers,length)
		for(var i=minDistance,j=0;i<=maxDistance;i++,j++)
		{
			var td = row.insertCell(j)	
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				if (curLotteryTypeStyleName.indexOf("快彩")>=0) {// 0509快彩开奖号码分布 10期下划线颜色
					td.style.borderBottom="1px solid red" 
				}else{
					td.style.borderBottom="1px solid gray" 
				}
				
			}		
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}else{
				td.height = tableCellHeight
			}
			if(o< showPrizeItemCount)
			{
				if(val != i)
				{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				}else{
     					//if (curLotteryTypeName.indexOf("快3")>=0) {//20161014 快3走势字体缩小变粗
					// 	td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i,false,true)
					// 	td.style.fontFamily = "YCArezzo"
					// }else{
					// 	//td.style.fontFamily = "MyFont"
					// 	td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i)
					// }
					var len = val.toString().length
					if (curLotteryTypeStyleName.indexOf("艺彩") >= 0) {
						td.style.fontFamily = "YCArezzo";							
						if (len == 2) {
							if (curLotteryTypeStyleName.indexOf("艺彩1")>=0||curLotteryTypeStyleName.indexOf("艺彩3")>=0) {
								td.innerHTML = getCellHTML("containerShape", trendCellWidth, tableCellHeight, val, false, false, false,"YCbig")
							}else{
								td.innerHTML = getCellHTML("containerShape10", trendCellWidth, tableCellHeight, val, false, false, false,"YCbig")
							}							
						} else {
							td.innerHTML = getCellHTML("container", trendCellWidth, tableCellHeight, val, false, false, false,"YCbig")
						}																	
					} else {
						td.style.fontFamily = "YCArezzo"					                       
						if (len === 2) {
							td.innerHTML = getCellHTML("containerShape10", trendCellWidth, tableCellHeight, val)
						 } else {
							if (curLotteryTypeName.indexOf("快3") >= 0) {
								td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,false,false,true)
							}else{
	                                                                                               td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,val,false,true)
							}
						}
					}				
					if (typek3||typej7l2) {
						if(curLotteryTypeName.indexOf("481")>=0){
							var Form481 = Check481NumberForm(o)
							if(Form481 == "豹子") td.style.color = "#006400"
							if(Form481 == "组4") td.style.color = "purple"
							if(Form481 == "组6") td.style.color = "red"
							if(Form481 == "组12") td.style.color = "black"
							if(Form481 == "组24") td.style.color = "blue"
						}else{
							var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
							var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
							var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
							if(a==b&&a==c)	{							
								if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
									td.style.color="blue"
								}else{
									td.style.color="purple"
								}						
														
							}
							if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
							{
								//if (curLotteryTypeStyleName.indexOf("隔行")>=0)||(curLotteryTypeStyleName.indexOf("吉林4")>=0)&&(curLotteryTypeName.indexOf("吉林快3")>=0)||(curLotteryTypeStyleName.indexOf("艺彩")>=0){
								if (((curLotteryTypeStyleName.indexOf("隔行")>=0||curLotteryTypeStyleName.indexOf("吉林4")>=0)&&curLotteryTypeName.indexOf("吉林快3")>=0)||curLotteryTypeStyleName.indexOf("艺彩")>=0) {
									td.style.color=""
								}else{
									td.style.color="#AA7700"
								}
								
							}

							if (a==b&&a!=c) 	{						
								td.style.color = "red"						          
						                }
							 if (a==c&&a!=b) {							
								td.style.color = "red"						 
							}if (b==c&&b!=a) {
								td.style.color = "red"						        
							}
						}
					}else{
						if (curLotteryTypeStyleName.indexOf("艺彩")>=0&&curLotteryTypeName.indexOf("11选5")>=0) {
							if(curLotteryTypeStyleName.indexOf("艺彩5")>=0){
								td.style.color = "red"
							}else{
								td.style.color = "black"
							}
						}else{
							td.style.color = "blue"
						}
						
					}			
					//td.style.color = "blue"							
					val = j
					ballsCount[j]++
				}
				if (((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0)||((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("快3")>=0)){
					if (o%2==0) 
					{
						td.style.color="red"
					}else
					{
						td.style.color="black"
					}
					var tmpIssue = curLotteryTypeDataList[o].issue
					var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
					if (simpleIssue===1) {
						td.style.color="blue"
					}	
				}	
			}
			else
			{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
			
		}
		if(o< showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();

				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.moveTo(tmpXPos,tmpYPos)				
			}
			else
			{
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}				
				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.lineTo(tmpXPos,tmpYPos)				
			}
		}
		else
		{
			td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
		}		
		if(o == showPrizeItemCount+reservedLines-1) //统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if (typek3||typej7l2) {
					row.cells[index].style.backgroundColor="blue"
				}
				else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//期号底部冷热号 背景白色
					// row.cells[index].style.backgroundColor="white"
					row.cells[index].style.color="white"
					if(ballsCount[index]==maxMin[0])
					{
						row.cells[index].style.backgroundColor="red"
					}
					else if(ballsCount[index]==maxMin[1])
					{
						row.cells[index].style.backgroundColor="green"
					}
					else
					{
						row.cells[index].style.backgroundColor="white"
						row.cells[index].style.color="black"
					}

				}else
				{
					if(ballsCount[index]==maxMin[0])
					{
						row.cells[index].style.backgroundColor="red"
					}
					else if(ballsCount[index]==maxMin[1])
					{
						row.cells[index].style.backgroundColor="green"
					}
					else
					{
						row.cells[index].style.backgroundColor="blue"
					}
				}
				if (ballsCount[index]>9) {
					row.cells[index].innerHTML=getCellHTML("containerShape10",trendCellWidth,tableCellHeight,ballsCount[index],false,false,false,"fontSmall")
				}else{
					row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index],true)
				}
				
			}
		}

		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
                           }

	}

	div.appendChild(mtable)//canvas线上下问题
	div.appendChild(canvas)
	

	trendWidthRedundantPixels -= tmpWdithRedundantPixels	
	ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (typek3) {cell.style.backgroundColor ="#FFFFDF"}//20161008添加快三跨度暖色背景色
	if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {cell.style.backgroundColor="white"}
	cell.appendChild(div)
	
}


function createOneOfPrizeNum012Trend(position,bgColor)
{	
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<3;i++)
		ballsCount[i]=0
	
	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'
	
	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5

	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';
	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(3,trendWidthRedundantPixels)
	}else
	{
		tmpWdithRedundantPixels=0
	}
	curHeightRedundantPixels = heightRedundantPixels
	
	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,3,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'

	_createHeader(mtable,"012",trendCellWidth,tableCellHeight,0,2)
	
	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height
	
	var yOffset = (tableCellHeight+1)*2+2
	
	for(var o =0;o<showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var val
		if(o<showPrizeItemCount)
		{
			val = parseInt(curLotteryTypeDataList[o].numbers[position])%3
			if(!isNaN(val))
				ballsCount[val]++
		}
		for(var i=0;i<3;i++)
		{
			var td = row.insertCell(i)
			
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}

			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			if(o<showPrizeItemCount)
			{
				if(val != i)
				{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				}
				else{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i)
				}
			}
			else
			{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}		
		if(o<showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();

				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos = (tableCellHeight+1)/2
				}
				tmpYPos += yOffset
				ctx.moveTo(tmpXPos,tmpYPos)				
			}
			else
			{
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos = o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
				}
				tmpYPos += yOffset
				ctx.lineTo(tmpXPos,tmpYPos)				
			}
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape10",trendCellWidth,tableCellHeight,ballsCount[index],false,false,false,"fontSmall")
			}
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
		
	}
	div.appendChild(mtable)//canvas线上下问题
	div.appendChild(canvas)
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if(bgColor)
		cell.style.backgroundColor=bgColor
	cell.appendChild(div)
}
function createPrev3PrizeNumWith012Trend()
{	
	createOneOfPrizeNumTrend(0,"第一位")
	createOneOfPrizeNum012Trend(0)
	createOneOfPrizeNumTrend(1,"第二位","#d8e4fe")
	createOneOfPrizeNum012Trend(1,"#d8e4fe")
	createOneOfPrizeNumTrend(2,"第三位")
	createOneOfPrizeNum012Trend(2)
	
}

function createPrevAreaPrizeNumDistribution(typeDLT2) //20161009大乐透版式2t
{
	var div = document.createElement("div")
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'	
	canvas.style.opacity = 0.9
	var ctx=canvas.getContext('2d');

	var ballsCount=new Array()  //for 统计
	for(var i=0;i<prevAreaPrizeNumMax;i++)
		ballsCount[i]=0
	
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(prevAreaPrizeNumMax,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	curHeightRedundantPixels = heightRedundantPixels

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prevAreaPrizeNumMax,heightRedundantPixels)
	
	mtable.style.left = '0'	
	mtable.style.top = '0'

	//console.log("createPrevAreaPrizeNumDistribution  mtable.style.height"+mtable.style.height)
	if(prevAreaPrizeNumMax==35){
		_createHeader(mtable,"前区",tableCellWidth,tableCellHeight,1,prevAreaPrizeNumMax)
	}
	else{
		var titleArray=["前区一区","前区二区","前区三区"]
		//var titleArray=["a","b","c"]
		_createMultiHeader(mtable,titleArray,11,tableCellWidth,tableCellHeight,1,prevAreaPrizeNumMax)
	}
	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)

	div.style.width=mtable.style.width
	div.style.height=mtable.style.height

	var yOffset=2*(tableCellHeight+1)+1
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	function drawLine(ctx,x1,y1,x2){//20161012 优化画横线方法
		ctx.beginPath();

		var tmpXPos=0;	
		if(curTrendWidthRedundantPixels>0)
		{				
			tmpXPos = x1*(tableCellWidth+1+1)+(tableCellWidth+1+1)/2
		}else{
			tmpXPos = x1*(tableCellWidth+1)+(tableCellWidth+1)/2+trendWidthRedundantPixels
		}

		var tmpXPos1=0;					
		if(curTrendWidthRedundantPixels>0)
		{				
			tmpXPos1 = x2*(tableCellWidth+1+1)+(tableCellWidth+1+1)/2
		}else{
			tmpXPos1 = x2*(tableCellWidth+1)+(tableCellWidth+1)/2+trendWidthRedundantPixels
		}

		var tmpYPos = 0;
		if (curHeightRedundantPixels>0) {
			if (y1==0) {
				tmpYPos = y1*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2+0.5
			}else{
				tmpYPos = y1*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2//+0.5
			}
			
		}else{
			if (y1==0) {
				
				tmpYPos = y1*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels+0.5
			}else{
				tmpYPos = y1*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels//+0.5
				
			}
			
		}

		tmpYPos += yOffset					
		var xx1 = Math.round(tmpXPos1)+0.5
		var xx2 = Math.round(tmpXPos)+0.5
		var yy1 = Math.round(tmpYPos)+0.5
		// ctx.moveTo(Math.round(tmpXPos1),Math.round(tmpYPos))
		// ctx.lineTo(Math.round(tmpXPos),Math.round(tmpYPos))
		ctx.moveTo(xx1,yy1)
		 ctx.lineTo(xx2,yy1)
		ctx.closePath();
		ctx.stroke();	
	}


	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if (o<showPrizeItemCount) {//用来计算不存在画横线　
			//var arr = curLotteryTypeDataList[o].numbers.sort();//排序 如果在这里排序，后期前三位号就变成就近号变为红色
			
			//var arr = curLotteryTypeDataList[o].numbers
			var arr = curLotteryTypeDataList[o].numbers.slice(0,5)
			for(var r=0;r<arr.length;r++){
				if(arr[r].length == 1){
					arr[r] = "0" + arr[r];
				}
			}		
		}
		
		var flagarr= [false,false,false,false,false,false,false];
		
		if(arr.indexOf('01')===-1 && arr.indexOf('02')===-1&& arr.indexOf('03')===-1&& arr.indexOf('04')===-1&& arr.indexOf('05')===-1){//1 2 3 4 5
			flagarr[0] = true;
		}
		if(arr.indexOf('06')===-1 && arr.indexOf('07')===-1 && arr.indexOf('08')===-1 && arr.indexOf('09')===-1&& arr.indexOf('10')===-1){
			flagarr[1] = true;
		}
		if(arr.indexOf('11')===-1 && arr.indexOf('12')===-1&& arr.indexOf('13')===-1&& arr.indexOf('14')===-1&& arr.indexOf('15')===-1){
			flagarr[2] = true;
		}
		if(arr.indexOf('16')===-1 && arr.indexOf('17')===-1&& arr.indexOf('18')===-1&& arr.indexOf('19')===-1&& arr.indexOf('20')===-1){
			flagarr[3] = true;
		}
		if(arr.indexOf('21')===-1 && arr.indexOf('22')===-1&& arr.indexOf('23')===-1&& arr.indexOf('24')===-1&& arr.indexOf('25')===-1){
			flagarr[4] = true;
		}
		if(arr.indexOf('26')===-1 && arr.indexOf('27')===-1&& arr.indexOf('28')===-1&& arr.indexOf('29')===-1&& arr.indexOf('30')===-1){
			flagarr[5] = true;
		}
		if(arr.indexOf('31')===-1 && arr.indexOf('32')===-1&& arr.indexOf('33')===-1&& arr.indexOf('34')===-1&& arr.indexOf('35')===-1){
			flagarr[6] = true;
		}
		
		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		for(var i=0;i<prevAreaPrizeNumMax;i++)
		{
			var td = row.insertCell(i)
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			if (typeDLT2) {//20161009 大乐透前区黑色线
				if (i==5||i==10||i==15||i==20||i==25||i==30) {
					td.style.borderLeft = "2px solid gray"
				}
				 if (o< showPrizeItemCount+reservedLines-1) {
					if (i>4&&i<10||i>14&&i<20||i>24&&i<30) {
						td.style.background =""
					}else{
						td.style.background = "#d5dce9"
					}				
				}			
			if (flagarr[0]) {
				if (i===0) {	
					if(o< showPrizeItemCount)//20161012 优化花横线方法 下同
					{	
						if (curOrientation==="land") {
							drawLine(ctx,4.3,o,0.05)
						}else{
							drawLine(ctx,4,o,0.05)
						}						
					}				
				}
			}
			if (flagarr[1]) {
				if (i===5) {
					if(o< showPrizeItemCount)
					{
						if (curOrientation==="land") {							
							if (advertisingAreaEnable) {
								drawLine(ctx,9.9,o,5.5)
							}else{						
								drawLine(ctx,9.5,o,5.1)							
							}	
						}else{
							drawLine(ctx,9.2,o,5.1)	
						}						
					}
			              }
		              }
		              if (flagarr[2]) {
				if (i===10) {
					if(o< showPrizeItemCount)
					{
						if (curOrientation==="land") {
							if (advertisingAreaEnable) {
								drawLine(ctx,15.3,o,11)
							}else{
								drawLine(ctx,14.6,o,10.4)
							}
						}else{
							drawLine(ctx,14.1,o,10.1)
						}							
					}				
				}
			}
			if (flagarr[3]&&o< showPrizeItemCount) {
				if (i===15) {
					if(o< showPrizeItemCount)
					{
						if (curOrientation==="land") {
							if (advertisingAreaEnable) {
								drawLine(ctx,20.5,o,16.3)
							}else{
								drawLine(ctx,19.7,o,15.6)
							}
						}else{
							drawLine(ctx,19.1,o,15.1)
						}									
					}
			              }
		              }
		              if (flagarr[4]&&o< showPrizeItemCount) {
				if (i===20) {
					if(o< showPrizeItemCount)
					{
						if (curOrientation==="land") {
							if (advertisingAreaEnable) {
								drawLine(ctx,25.6,o,21.5)
							}else{
								drawLine(ctx,24.9,o,20.9)
							}	
						}else{
							drawLine(ctx,24.1,o,20)
						}					
					}
			              }
		              }
		               if (flagarr[5]&&o< showPrizeItemCount) {
				if (i===25) {
					if(o< showPrizeItemCount)
					{
						if (curOrientation==="land") {
							if (advertisingAreaEnable) {
								drawLine(ctx,30.4,o,26.6)
							}else{
								drawLine(ctx,29.9,o,25.9)
							}
						}else{
							drawLine(ctx,29.1,o,25.1)
						}											
					}
			              }
		              } 
		             if (flagarr[6]&&o<showPrizeItemCount) {
				if (i===30) {
					if(o< showPrizeItemCount)
					{	
						if (curOrientation==="land") {
							if (advertisingAreaEnable) {
								drawLine(ctx,35.3,o,31.4)
							}else{
								drawLine(ctx,34.9,o,30.9)	
							}
						}else{
							drawLine(ctx,34,o,30)
						}									
					}
			              }
		              } 
		          }
			if(o< showPrizeItemCount)
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if(o< showPrizeItemCount)
		{
			for(var j =0;j<prevAreaPrizeNumLength;j++)
			{
				if (typeDLT2) {
					var ballNumber =curLotteryTypeDataList[o].numbers[j] //parseInt(curLotteryTypeDataList[o].numbers[j])
				}else{
					var ballNumber =parseInt(curLotteryTypeDataList[o].numbers[j])

				}
				if(ballNumber <= prevAreaPrizeNumMax)
				{
					if (typeDLT2) {						
						ballsCount[ballNumber-1]++				
						if(numberMatrix[o][ballNumber-1]==2)
						{
							//横竖屏数字都压缩
							// if (curOrientation==="land") {
							// 	row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)
							// }else{
								row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)
							// }							
							row.cells[ballNumber-1].style.color = "red"
						}else{
							//横竖屏数字都压缩
							// if (curOrientation==="land") {
							// 	row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
							// }else{
								row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)								
							// }
							
						}
					}else{				
						ballsCount[ballNumber-1]++				
						if(numberMatrix[o][ballNumber-1]==2)
						{
							if (curOrientation==="land") {
								//球数字压缩
								row.cells[ballNumber-1].innerHTML = getCellHTML("sandyBrownball",tableCellWidth,tableCellHeight,ballNumber,false,false,false,"kuaicai")
							}else{
								if (ballNumber>9) {
									row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)
								}else{
									row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber)
								}
								row.cells[ballNumber-1].style.color = "white"
								row.cells[ballNumber-1].style.backgroundColor = "#800000"
							}
						}
						else
						{
							if (curOrientation==="land") {
								//球数字压缩
								row.cells[ballNumber-1].innerHTML = getCellHTML("crimsonball",tableCellWidth,tableCellHeight,ballNumber,false,false,false,"kuaicai")
							}else{
								if (ballNumber>9) {
									row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)
								}else{
									row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber)
								}
								
								row.cells[ballNumber-1].style.color = "white"
								row.cells[ballNumber-1].style.backgroundColor = "#C3081B"
							}
							
						}
					}
				}							
			}
		}
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				if (ballsCount[index]>9) {
					row.cells[index].innerHTML=getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballsCount[index],false,false,false,"HZsmall")
				}else{
					row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index])
				}
				// row.cells[index].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,ballsCount[index])
			}
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
	}	
	//console.log("createPrevAreaPrizeNumDistribution curHeightRedundantPixels:",curHeightRedundantPixels)
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	div.appendChild(mtable)
	div.appendChild(canvas)
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	//cell.appendChild(mtable)
	cell.appendChild(div)

}
function createBackAreaPrizeTrend()
{
	var div = document.createElement("div")
	div.style.position='relative'
	
	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.opacity=0.5
	canvas.style.left = '0'
	canvas.style.top = '0'
	
	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';	
	
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<backAreaPrizeNumMax;i++)
		ballsCount[i]=0
	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(backAreaPrizeNumMax,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,backAreaPrizeNumMax,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'

	curHeightRedundantPixels = heightRedundantPixels

	var titleArray=["后区一区","后区二区"]
	_createMultiHeader(mtable,titleArray,8,trendCellWidth,tableCellHeight,1,backAreaPrizeNumMax)	

	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)

	div.style.width=mtable.style.width
	div.style.height=mtable.style.height	

	var yOffset=2*(tableCellHeight+1)+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var val ;
		if(o< showPrizeItemCount)
			val= parseInt(curLotteryTypeDataList[o].numbers[prizeNumLength-1])
		for(var i=0;i<backAreaPrizeNumMax;i++)
		{
			var td = row.insertCell(i)
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}

			if(o< showPrizeItemCount)
			{
				if(val != i+1)
				{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				}
				else{
					ballsCount[val-1]++
					if (curOrientation==="port") {
						td.style.backgroundColor = "blue"
						td.style.color = "white"
						if (val>9) {
							td.innerHTML =getCellHTML("containerShape10",trendCellWidth,tableCellHeight,val,false,false,false,"HZsmall")
						}else{
							td.innerHTML =getCellHTML("containerShape",trendCellWidth,tableCellHeight,val)
						}
						
					}else{
						td.innerHTML =getCellHTML("blueball",trendCellWidth,tableCellHeight,val)
					}
					
				}
			}
			else
			{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if(o< showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();
				
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = (val-1)*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2;
				}
				else
				{
					tmpXPos = (val-1)*(trendCellWidth+1)+(trendCellWidth+1)/2
				}
				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos = (tableCellHeight+1)/2
				}
				tmpYPos += yOffset
				ctx.moveTo(tmpXPos,tmpYPos)
			}
			else
			{				
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = (val-1)*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = (val-1)*(trendCellWidth+1)+(trendCellWidth+1)/2 + trendWidthRedundantPixels
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos = o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
				}
				tmpYPos += yOffset
				ctx.lineTo(tmpXPos,tmpYPos)
			}
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index])
			}
		}

		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
	    }

	}

	//console.log("createBackAreaPrizeTrend curHeightRedundantPixels:",curHeightRedundantPixels)	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	ctx.stroke()

	div.appendChild(mtable)
	div.appendChild(canvas)

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= div.style.width
	cell.style.height=div.style.height
	cell.appendChild(div)

}
function createBackAreaPrizeNumDistribution(typeDLT2)//20161009大乐透后区
{
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<backAreaPrizeNumMax;i++)
		ballsCount[i]=0
	
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(backAreaPrizeNumMax,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	curHeightRedundantPixels = heightRedundantPixels

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,backAreaPrizeNumMax,heightRedundantPixels)
	if(prevAreaPrizeNumMax==35){
		_createHeader(mtable,"后区",tableCellWidth,tableCellHeight,1,backAreaPrizeNumMax)
	}	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		for(var i=0;i<backAreaPrizeNumMax;i++)
		{
			var td = row.insertCell(i)
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			if (typeDLT2) {//20161009 大乐透前区黑色线
				if (i==3||i==6||i==9) {
					td.style.borderLeft = "2px solid gray"
				}
				if (o< showPrizeItemCount+reservedLines-1) {
					if (i>=3&&i<6||i>8&&i<12) {
						td.style.background ="#FFDAB9"
					}				
				}
			}
			if(o< showPrizeItemCount)
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if(o< showPrizeItemCount)
		{
			for(var j =prevAreaPrizeNumLength;j<prizeNumLength;j++)
			{
				//var ballNumber = parseInt(curLotteryTypeDataList[o].numbers[j])
				if (typeDLT2) {
					var ballNumber =curLotteryTypeDataList[o].numbers[j] //parseInt(curLotteryTypeDataList[o].numbers[j])
				}else{
					var ballNumber =parseInt(curLotteryTypeDataList[o].numbers[j])
				}
				if(ballNumber <= backAreaPrizeNumMax)
				{
					ballsCount[ballNumber-1]++
					if (typeDLT2) {//20161009 后区
						//横竖版数字都压缩
						// if (curOrientation==="land") {
						// 	row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
						// }else{
							row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)
						// }								
						row.cells[ballNumber-1].style.color = "blue"
					}else{
						if (curOrientation==="land") {
							//球内数字压缩
							row.cells[ballNumber-1].innerHTML = getCellHTML("blueball",tableCellWidth,tableCellHeight,ballNumber,false,false,false,"kuaicai")	
						}else{
							if (ballNumber>9) {
								row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballNumber)	
							}else{
								row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber)	
							}								
							row.cells[ballNumber-1].style.color = "white"
							row.cells[ballNumber-1].style.backgroundColor = "blue"							
						}				          
				             }
				}				
			}
		}		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				if (ballsCount[index]>9) {
					row.cells[index].innerHTML=getCellHTML("containerShape10",tableCellWidth,tableCellHeight,ballsCount[index],false,false,false,"HZsmall")
				}else{
					row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index])
				}
				
			}
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
	}
	//console.log("createBackAreaPrizeNumDistribution curHeightRedundantPixels:",curHeightRedundantPixels)
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(mtable)
	
}
function createPrizeNumSumTrend(length,typek3,typek3ZC,typej7l,typek3Sumend)
{
	if (typej7l) {
		var minSum = 3
		var maxSum =21
	}else if(typek3Sumend){
		var minSum = 0
		var maxSum =9
	}else
	{
		var minSum = 3
		var maxSum = 18
	}
	var itemsCount = maxSum-minSum +1

	
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<itemsCount;i++)
		ballsCount[i]=0
		
	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5
	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}

	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'

	curHeightRedundantPixels = heightRedundantPixels
	var titleTxt
	if (typek3 ) {
		if(typek3Sumend){
			titleTxt = "和尾走势"
			_createHeader(mtable,titleTxt,trendCellWidth,tableCellHeight,minSum,maxSum,false,false,false,false,false,false,false,false,true)
		}else{
			titleTxt = "和值走势图"
			_createHeader(mtable,titleTxt,trendCellWidth,tableCellHeight,minSum,maxSum,false,false,false,false,false,false,false,false,true)
		}		
	}
	else
	{
		titleTxt = "和值走势图"
		_createHeader(mtable,"和值走势图",trendCellWidth,tableCellHeight,minSum,maxSum )
	}	

	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height
	
	

	var yOffset = (tableCellHeight+1)*2+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var val;
		if(o< showPrizeItemCount){
			var valSum = getSum(curLotteryTypeDataList[o].numbers,length)
			if(typek3Sumend) {
				val = valSum>9?valSum-10:valSum
			}else{
				val = valSum
			}			
		}

		for(var i = minSum,j = 0;i<=maxSum;i++,j++)
		{
			var td = row.insertCell(j)	
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}

			if(o< showPrizeItemCount)
			{
				if(val != i)
				{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				}
				else{
					//td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i)
					if (curLotteryTypeName.indexOf("快3")>=0) {//20161014 快3走势字体缩小变粗
						var len = i.toString().length
						
						if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							td.style.fontFamily = "YCArezzo";			
							if (len == 2) {
							td.innerHTML = getCellHTML("containerShape", trendCellWidth, tableCellHeight, i, false, false, false,"YCbig")
							} else {
							td.innerHTML = getCellHTML("container", trendCellWidth, tableCellHeight, i, false, false, false,"YCbig")
							}
						//  td.innerHTML = getCellHTML("container", trendCellWidth, tableCellHeight, i,false,false,true)
						}else{
							if(len==2){
								td.innerHTML = getCellHTML("containerShape",trendCellWidth,tableCellHeight,i,false,false,true)
							}else{
								td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i,false,false,true)
							}
							td.style.fontFamily = "YCArezzo"
						}						
						
					}else{
						
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i)
					}
					if (typek3) 
					{
						var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
						var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
						var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
						if(a==b&&a==c){
							if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
								td.style.color="blue"
							}else{
								td.style.color="purple"
							}							
						}
						if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
						{
							if (((curLotteryTypeStyleName.indexOf("隔行")>=0||curLotteryTypeStyleName.indexOf("吉林4")>=0)&&curLotteryTypeName.indexOf("吉林快3")>=0)||curLotteryTypeStyleName.indexOf("艺彩")>=0) {
	                                                                                         td.style.color=""
							}else{
								td.style.color="#AA7700"
							}
							//td.style.color="#AA7700"
						}
						if (a==b&&a!=c) {							
							td.style.color = "red"						          
					              }
						 if (a==c&&a!=b) {					
							td.style.color = "red"						 
						}
						if (b==c&&b!=a) 	{
							td.style.color = "red"						        
						}
				             }
				             if (typek3ZC) 
					{
						var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
						var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
						var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
						if(a==b&&a==c){	
							td.style.color="purple"
						}
						if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
						{
							td.style.color="blue"
						}
						if (a==b&&a!=c)	{							
							td.style.color = "red"						          
					              }
						 if (a==c&&a!=b) {							
							td.style.color = "red"						 
						}
						if (b==c&&b!=a){
							td.style.color = "red"						        
						}
				             }
				             if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("快3")>=0){
						if (o%2==0) 
						{
							td.style.color="red"
						}else
						{
							td.style.color="black"
						}	
						var tmpIssue = curLotteryTypeDataList[o].issue
						var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
						if (simpleIssue===1) {
							td.style.color="blue"
						}								
					}	
					val = j
					ballsCount[j]++
				}
				if(titleTxt === "和值走势图"&&maxSum === 18){
					if (i<11) {
						if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							td.style.backgroundColor = "rgb(249, 249, 249)"	
						}else{
							td.style.backgroundColor = "rgb(227, 239, 255)"	
						}
										
					}
				}
				
				
			}
			else
			{
				if(titleTxt === "和值走势图"&&maxSum === 18){
					if (i<11) {
						if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							td.style.backgroundColor = "rgb(249, 249, 249)"	
						}else{
							td.style.backgroundColor = "rgb(227, 239, 255)"	
						}
										
					}
				}
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
			
		}
		if(o< showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.moveTo(tmpXPos,tmpYPos)
				
			}
			else
			{
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}
				
				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.lineTo(tmpXPos,tmpYPos)				
			}
		}
		else
		{
			td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if (typek3) {row.cells[index].style.backgroundColor="blue"}
				else if (typek3ZC) {row.cells[index].style.backgroundColor="blue"	}
				else{
					if(ballsCount[index]==maxMin[0])
					{
						row.cells[index].style.backgroundColor="red"
					}
					else if(ballsCount[index]==maxMin[1])
					{
						row.cells[index].style.backgroundColor="green"
					}
					else
					{
						row.cells[index].style.backgroundColor="blue"
					}
				}
				if (ballsCount[index]>9) {
					row.cells[index].innerHTML=getCellHTML("containerShape10",trendCellWidth,tableCellHeight,ballsCount[index],false,false,false,"fontSmall")
				}else{
					row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index],true)
				}
				
			}
		}

		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	             }
	}
	div.appendChild(mtable)
	div.appendChild(canvas)
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (typek3||typej7l) {
		cell.style.backgroundColor="#d9e5ff"
	}
	if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
		if (titleTxt==="和值走势图") {
			cell.style.backgroundColor="#f0f0f0"
		}else{
			cell.style.backgroundColor="white"
		}
		
	}
	cell.appendChild(div)
	
}

function createPrizeNumSum012Trend(length,typeDistance,typeSumEnd)
{
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<3;i++)
		ballsCount[i]=0	
	// var div = document.createElement("div")
	// div.className = "canvasdiv"
	// div.style.position='relative'

	// var canvas = document.createElement("canvas")
	// canvas.style.position = 'absolute'
	// canvas.style.left = '0'
	// canvas.style.top = '0'	
	// var ctx=canvas.getContext('2d');
	// ctx.fillStyle='#FF0000';
	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(3,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,3,heightRedundantPixels,"zsttable")
	// mtable.style.position = 'absolute'
	// mtable.style.left = '0'
	// mtable.style.top = '0'
	curHeightRedundantPixels = heightRedundantPixels

	var tmpTitle
	if(typeDistance){
		tmpTitle = "跨度012"
	}
	else if(typeSumEnd){
		tmpTitle = "和尾012"
	}
	else{
		tmpTitle = "和值012"
	}
	
	_createHeader(mtable,tmpTitle,trendCellWidth,tableCellHeight,0,2,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true)//20161010 和值012
	
	
	// canvas.style.width = mtable.style.width
	// canvas.style.height = mtable.style.height
	// canvas.width = parseInt(mtable.style.width)
	// canvas.height = parseInt(mtable.style.height)
	// div.style.width=mtable.style.width
	// div.style.height=mtable.style.height
	
	
	
	//var yOffset = (tableCellHeight+1)*2+1	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)		
		if(o == showPrizeItemCount+reservedLines-1)
		{
			row.style.backgroundColor="blue"
		}
		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var valSum
		var val
		
		for (var i = 0; i <3 ; i++) 
		{
			var td = row.insertCell(i)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			
			if(o<showPrizeItemCount)
			{
				if(a != i)
				{			 
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")				
				}else{
					if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i,false,false,false,"YCbig")
						td.style.fontFamily = "YCArezzo"				
					}else{					
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i)
						td.style.fontFamily = ""
					}
					var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
					var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
					var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
					// if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
					// 	if (tmpTitle ==="和值012") {
					// 		td.style.color = "purple"
					// 	}else if (tmpTitle ==="和尾012") {
					// 		td.style.color = "#111162"
					// 	}						
					// }else{
						if(a==b&&a==c)	{	
							if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
								td.style.color="blue"	
							}else{
								td.style.color="purple"	
							}											
						}
						if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
						{
							if ((curLotteryTypeStyleName.indexOf("隔行")>=0||curLotteryTypeStyleName.indexOf("吉林4")>=0||curLotteryTypeStyleName.indexOf("艺彩")>=0)&&curLotteryTypeName.indexOf("吉林快3")>=0) {
	                                                                                         td.style.color=""
							}else{
								td.style.color="#AA7700"
							}							
						}
						if (a==b&&a!=c){					
							td.style.color = "red"					          
					             }
						 if (a==c&&a!=b){						
							td.style.color = "red"					 
						}
						if (b==c&&b!=a){
							td.style.color = "red"					        
						}
					//}					
					a = i
					ballsCount[i]++
				}
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
		}
		if(o< showPrizeItemCount)	
		{
			valSum = getSum(curLotteryTypeDataList[o].numbers,length)
			if(typeDistance){
				val = getDistance(curLotteryTypeDataList[o].numbers,length)
			}
			else if(typeSumEnd){
				val = (valSum>9)?(valSum-10):valSum
			}
			else{
				val = valSum
			}
									
			var a = val%3
		}		
		else
		{
			td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
		}
		if(o == showPrizeItemCount+reservedLines-1) //统计 
		{
			for(var index in ballsCount)
			{
				if (ballsCount[index]>9) {
					row.cells[index].innerHTML=getCellHTML("containerShape10",trendCellWidth,tableCellHeight,ballsCount[index],false,false,false,"fontSmall")
				}else{
					row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index],true)
				}
				
				row.cells[index].style.color = "white"
			}
		}
		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	              }		
	}
	// div.appendChild(canvas)
	// div.appendChild(mtable)

	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	//ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.style.backgroundColor ="#FFFFDF"//20161008添加快三和值012暖色背景色
	if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {cell.style.backgroundColor="white"}
	cell.appendChild(mtable)
}
function createPrizeNumFormTrend()
{
	var itemsCount = 4
	var ballsCount01=0//for 统计蓝色数字
	var ballsCount02=0//连
	var ballsCount03=0//双
	var ballsCount04=0//单
		
	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5


	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';
	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}else
	{
		tmpWdithRedundantPixels=0
	}

	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'
	curHeightRedundantPixels = heightRedundantPixels

	var tmpTitle
	tmpTitle ="号码形态"
	_createHeader(mtable,tmpTitle,trendCellWidth,tableCellHeight,0,3,true,false,false,false,false,false)

	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height
			

	var yOffset = (tableCellHeight+1)*2+1		
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(o == showPrizeItemCount+reservedLines-1)
		{
			row.style.backgroundColor="blue"
		}
	
		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		for(var j=0;j<4;j++)
		{
			var td = row.insertCell(j)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}

			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}

			function changeFontSize(width,height,value){//20161014 
				if (curLotteryTypeName.indexOf("快3")>=0) {//20161014 快3走势字体缩小变粗
					td.innerHTML = getCellHTML("containerShape",width,height, value)	
				
					td.style.fontFamily = "YCArezzo"
				}else{
					td.innerHTML = getCellHTML("container",width,height,value)
				}
			}
			if(o< showPrizeItemCount)
			{
				var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
				var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
				var c =  parseInt(curLotteryTypeDataList[o].numbers[2])                

                                                    if (j===3) 
                                                    {
                                                    	changeFontSize(trendCellWidth,tableCellHeight, 'A')                                                    	
                                                    }				
				td.style.color = "black"

				if (a==b&&a==c) 
				{		
					if(j===0)
					{
						//td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "D")	
						changeFontSize(trendCellWidth,tableCellHeight, 'D')     
						ballsCount01++
					}else
					{						
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "&nbsp")
					}
					td.style.color = "purple"
				}
				else if(a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
				{
					if (j===1) 
					{
						//td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "C")
						changeFontSize(trendCellWidth,tableCellHeight, 'C')  
						ballsCount02++
					}else
					{
						td.innerHTML =getCellHTML("container",trendCellWidth,tableCellHeight, "&nbsp")
					}					
					//td.style.color = "blue"
					td.style.color="#AA7700"

				}
				else if(a==b&&a!=c||a==c&&a!=b||b==c&&b!=a) 
				{
					if (j===2) 
					{
						// td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "B")
						changeFontSize(trendCellWidth,tableCellHeight, 'B')  	
						 ballsCount03++
					}
					else
					{
						td.innerHTML =getCellHTML("container",trendCellWidth,tableCellHeight, "&nbsp")	
					}
				            				
					td.style.color = "red"				             
			             }
			             else{
				             	if(j ===0 )
				             	ballsCount04++
			             }	
			}
			else
			{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if(o< showPrizeItemCount)
		{
			var val = 3
			if (a==b&&a==c) 
				val = 0
			if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
				val = 1
			if (a==b&&a!=c||a==c&&a!=b||b==c&&b!=a)
			             val = 2 

			if(o == 0)
			{
				ctx.beginPath();

				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2// ctx.moveTo(val*(trendCellWidth+1)+(trendCellWidth+1)/2,(tableCellHeight+1+1)/2)
				}
				else
				{
					tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels					
				}
				tmpYPos+=yOffset
				ctx.moveTo(tmpXPos,tmpYPos)	
			}
			else
			{
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}
				
				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2// ctx.moveTo(val*(trendCellWidth+1)+(trendCellWidth+1)/2,(tableCellHeight+1+1)/2)
				}
				else
				{
					tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.lineTo(tmpXPos,tmpYPos)				
			}			
		}
		else
		{
			td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
		}

		if(o == showPrizeItemCount+reservedLines-1) //统计 
		{		
			row.cells[0].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount01,true)
			row.cells[1].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount02,true)
			row.cells[2].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount03,true)
			row.cells[3].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount04,true)			
		}
		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	              }	
	}
	div.appendChild(mtable)
	div.appendChild(canvas)
	

	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	ctx.stroke()
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.style.backgroundColor = "#d9e5ff"
	cell.appendChild(div)
}
function createk3Prev3PrizeNumTrend()
{
	if(curLotteryTypeName.indexOf("481") >= 0){
		createOneOfPrizeNumTrend(0,"自由泳","#FFFFDF",true,false)
		createOneOfPrizeNumTrend(1,"仰泳","#d8e4fe",true,false)
		createOneOfPrizeNumTrend(2,"蛙泳","#FFFFDF",true,false)
		createOneOfPrizeNumTrend(3,"蝶泳","#d8e4fe",true,false)
	}else{
		createOneOfPrizeNumTrend(0,"百位走势","#FFFFDF",true,true)//20161008  添加快三暖色背景
		createOneOfPrizeNumTrend(1,"十位走势","#d8e4fe",true,true)
		createOneOfPrizeNumTrend(2,"个位走势","#FFFFDF",true,true)//20161008  添加快三暖色背景
	}
}
function createAver4PrizeNumDistribution()
{
	var div = document.createElement("div")
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'	
	var ctx=canvas.getContext('2d');

	var ballsCount=new Array()  //for 统计
	for(var i=0;i<prizeNumMax;i++)
		ballsCount[i]=0
	// console.log(ballsCount)
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(prizeNumMax,trendWidthRedundantPixels)
		//  console.log(heightRedundantPixels);
	}
	else
	{
		tmpWdithRedundantPixels=0
	} 
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prizeNumMax,heightRedundantPixels)
	
	mtable.style.left = '0'
	mtable.style.top = '0'

	curHeightRedundantPixels = heightRedundantPixels

	var titleArray=["一区","二区","三区","四区"]
	_createMultiHeader(mtable,titleArray,5,tableCellWidth,tableCellHeight,1,prizeNumMax,true)

	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)

	div.style.width=mtable.style.width
	div.style.height=mtable.style.height

	var yOffset=2*(tableCellHeight+1)+1
	function drawLine(ctx,x1,y1,x2){//20161012 优化画横线方法
		ctx.beginPath();
		ctx.strokeStyle="black";
		//ctx.lineCap="round";
		ctx.lineWidth = 2; 

		var tmpXPos=0;					
		if(curTrendWidthRedundantPixels>0)
		{				
			tmpXPos = x2*(tableCellWidth+1+1)+(tableCellWidth+1+1)/2
		}else{
			tmpXPos = x2*(tableCellWidth+1)+(tableCellWidth+1)/2+trendWidthRedundantPixels
		}
		var tmpXPos1=0;					
		if(curTrendWidthRedundantPixels>0)
		{				
			tmpXPos1 = x1*(tableCellWidth+1+1)+(tableCellWidth+1+1)/2
		}else{
			tmpXPos1 = x1*(tableCellWidth+1)+(tableCellWidth+1)/2+trendWidthRedundantPixels
		}
		
		var tmpYPos = 0;
		if (curHeightRedundantPixels>0) {
			tmpYPos = y1*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2	
		}else{
			tmpYPos = y1*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
		}						
		
		tmpYPos += yOffset
		ctx.moveTo(Math.round(tmpXPos1),Math.round(tmpYPos))
		ctx.lineTo(Math.round(tmpXPos),Math.round(tmpYPos))	
		ctx.stroke();		
	}
	for(var o =0;o< showPrizeItemCount+reservedLines;o++)
	{
		var row = mtable.insertRow(mtable.rows.length);
		if (o<showPrizeItemCount) {//用来计算不存在画横线　
			//var arr = curLotteryTypeDataList[o].numbers.sort();//排序 如果在这里排序，后期前三位号就变成就近号变为红色
			var arr = curLotteryTypeDataList[o].numbers
			//liutest begin for 天津快十 0921 解决开奖号码为一位数的情况无法判断的问题
			for(var r=0;r<arr.length;r++){
				if(arr[r].length == 1){
					arr[r] = "0" + arr[r];
				}
			}
			//liutest end for 天津快十 0921 解决开奖号码为一位数的情况无法判断的问题
		}
		var flagarr= [false,false,false,false];
		if(arr.indexOf('01')===-1 && arr.indexOf('02')===-1&& arr.indexOf('03')===-1&& arr.indexOf('04')===-1&& arr.indexOf('05')===-1){//1 2 3 4 5
			flagarr[0] = true;
		}
		if(arr.indexOf('06')===-1 && arr.indexOf('07')===-1 && arr.indexOf('08')===-1 && arr.indexOf('09')===-1&& arr.indexOf('10')===-1){
			flagarr[1] = true;
		}
		if(arr.indexOf('11')===-1 && arr.indexOf('12')===-1&& arr.indexOf('13')===-1&& arr.indexOf('14')===-1&& arr.indexOf('15')===-1){
			flagarr[2] = true;
		}
		if(arr.indexOf('16')===-1 && arr.indexOf('17')===-1&& arr.indexOf('18')===-1&& arr.indexOf('19')===-1&& arr.indexOf('20')===-1){
			flagarr[3] = true;
		}
		
		curTrendWidthRedundantPixels = trendWidthRedundantPixels              
                          
		for(var i = 0;i<prizeNumMax;i++)
		{
			var td = row.insertCell(i)
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}	
			if (i==5||i==10||i==15) {
				td.style.borderLeft = "1px solid black"
			}		
			if (flagarr[0]) {
				if (i>=0&&i<5) {	
					if(o< showPrizeItemCount)
					{
						drawLine(ctx,0.08,o,4)
					}				
				}
			}
			if (flagarr[1]) {
				if (i>=5&&i<10) {
					if(o< showPrizeItemCount)
					{
						drawLine(ctx,5,o,9)
					}
			              }
		              }
		              if (flagarr[2]) {
				if (i>=10&&i<15) {
					if(o< showPrizeItemCount)//20151012 优化画线方法 竖版正常显示 横版因为暂时没有需要画横线所以没测试,发现不正常后再改
					{
						if (curOrientation == "port") {
							drawLine(ctx,9.8,o,13.9)
						}else{
							drawLine(ctx,10.1,14)
						}
						
					}				
				}
			}
			if (flagarr[3]&&o< showPrizeItemCount) {
				if (i>=15&&i<20) {
					if(o< showPrizeItemCount)//20151012 优化画线方法 竖版正常显示 横版因为暂时没有需要画横线所以没测试,发现不正常后再改
					{
						if (curOrientation == "port") {
							
							drawLine(ctx,14.7,o,18.7)
						}else{
							drawLine(ctx,15,o,18.9)
						}
									
					}
			              }
		              }
		              if (o< showPrizeItemCount+reservedLines-1) {
				if (i>4&&i<10||i>14&&i<20) {
					td.style.background = "#d5dce9"
				}				
			}
			if(o< showPrizeItemCount)
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}				
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if (o<showPrizeItemCount) 
		{
			for (var i = 0; i < prizeNumLength; i++) 
			{
				if(ballNumber<=prizeNumMax)
				{
					if (i<3) {
						row.cells[ballNumber-1].style.color = "red"
					}else{
						row.cells[ballNumber-1].style.color = "black"
					}				
				}				
			}			
		}
		if (o<showPrizeItemCount) 
		{
			var arr = curLotteryTypeDataList[o].numbers.slice().sort();
			var flagarr =[false,false,false,false,false,false,false,false]// new Array(8).fill(false);//判断数组数字是否连续
			function arrange(source) {
				var t;
				var ta;
				var r = [];
			             source.forEach(function(v) {
				        // console.log(t, v);   // 跟踪调试用
				        v = parseInt(v)
				        if (t === v) 
				        {
				             ta.push(t);
				             t++;
				             return;
				        }
				ta = [v];
				t = v + 1;
		                          r.push(ta);
			    });

			    return r;
			}
			var shunzi =[];
			
			arrange(arr).forEach(function(e){
				if(e.length >= 4){
					shunzi =shunzi.concat(e);
				}
			})
			//console.log(shunzi)
			for (var i = 0; i < prizeNumLength; i++) 
			{
				var ballNumber =  parseInt(curLotteryTypeDataList[o].numbers[i])
				if(shunzi.indexOf(ballNumber )!== -1){
					row.cells[ballNumber-1].style.backgroundColor = "#89b5c9"
				}
				if(ballNumber<=prizeNumMax)
				{
					var a = ballsCount[ballNumber-1]++
					if(numberMatrix[o][ballNumber-1]==2)
					{
						if (ballNumber>9) {
							row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber)
						}else{
							row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
						}						
					}
					else{
						if (ballNumber>9) {
							row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber)
						}else{
							row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
						}
						//row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
					}
					if (i<3) {
						row.cells[ballNumber-1].style.color = "red"
					}else{
						row.cells[ballNumber-1].style.color = "black"
					}					
				}
			}
		}			
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{			
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index],true)
			}
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
	}
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	div.appendChild(mtable)
	div.appendChild(canvas)
	

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)	
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(div)
}
function createAver2PrizeNumDistribution()
{
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<prizeNumMax;i++)
		ballsCount[i]=0

	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(prizeNumMax,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
              curHeightRedundantPixels = heightRedundantPixels

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prizeNumMax,heightRedundantPixels)

	var titleArray=["小区","大区"]
	_createMultiHeader(mtable,titleArray,10,tableCellWidth,tableCellHeight,1,prizeNumMax,false,true)
             

	for(var o =0;o< showPrizeItemCount+reservedLines;o++)
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels
		for(var i = 0;i<prizeNumMax;i++)
		{
			var td = row.insertCell(i)
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			if (i==9) {
				td.style.borderRight = "2px solid grey"
				
			}
			
			if(o< showPrizeItemCount)
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				//快乐十分背景遗漏test
				// td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"1",false,false,false,"k10yilou");
				// // td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"1",false,false,false,"k10yilou");
				// td.style.color="#ccc"//"#B5B5B5"
				// td.style.fontWeight="lighter"
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
		}
		if (o<showPrizeItemCount) 
		{
			var arr = curLotteryTypeDataList[o].numbers.slice().sort();
			var flagarr =[false,false,false,false,false,false,false,false]// new Array(8).fill(false);
			function arrange(source) {
			    var t;
			    var ta;
			    var r = [];

			    source.forEach(function(v) {
			        // console.log(t, v);   // 跟踪调试用
			        v = parseInt(v)
			        if (t === v) {
			            ta.push(t);
			            t++;
			            return;
			        }

			        ta = [v];
			        t = v + 1;
			        r.push(ta);
			    });

			    return r;
			}
			var shunzi =[];
			
			arrange(arr).forEach(function(e){
				if(e.length >= 4){
					shunzi =shunzi.concat(e);
				}
			})
			//console.log(shunzi)
			for (var i = 0; i < prizeNumLength; i++) 
			{
				var ballNumber =  parseInt(curLotteryTypeDataList[o].numbers[i])
				if(shunzi.indexOf(ballNumber )!== -1){
					row.cells[ballNumber-1].style.backgroundColor = "#89b5c9"
				}

				if(ballNumber<=prizeNumMax)
				{
					ballsCount[ballNumber-1]++
					if (curLotteryTypeStyleName.indexOf("经典版")>=0) {
						if (i<3) {
							row.cells[ballNumber-1].innerHTML = getCellHTML("redball",tableCellWidth,tableCellHeight,ballNumber)
						}
						else{
							row.cells[ballNumber-1].innerHTML = getCellHTML("blueball",tableCellWidth,tableCellHeight,ballNumber)
						}
					}else{
						if(numberMatrix[o][ballNumber-1]==2)
						{
							// row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
							if (ballNumber>9) {//10以上两位数压缩变小
								row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber,false,false,false,"fontSmall")
							}else{
								row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
							}
						}
						else{
							if (ballNumber>9) {//10以上两位数压缩变小
								row.cells[ballNumber-1].innerHTML = getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballNumber,false,false,false,"fontSmall")
							}else{
								row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
							}
							// row.cells[ballNumber-1].innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
						}					
						if (i<3) {
							row.cells[ballNumber-1].style.color = "red"
						}
						else{
							row.cells[ballNumber-1].style.color = "black"
						}
						row.cells[ballNumber-1].style.fontFamily = "ariblk"
					}
				}
			}
		}
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}	
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{			
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index],true)
			}
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}

	}
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)

	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(mtable)

}

function createPrizeNumOdd(length,typek10Green,typek10Aver2,typej7l1)
{	
	var tmpWdithRedundantPixels
	if(trendCellCount == 0 && trendWidthRedundantPixels > 0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,1,heightRedundantPixels)
	
	curHeightRedundantPixels = heightRedundantPixels
	if (typek10Aver2) {
		_createHeaderk10(mtable,"奇数",tableCellWidth,tableCellHeight,true)
	}else if (typek10Green) {		
		_createHeaderk10(mtable,"奇数",tableCellWidth,tableCellHeight,false,false,true)
	}else{
		_createHeader(mtable,"奇数",tableCellWidth,tableCellHeight)
	}
	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(o == showPrizeItemCount+reservedLines-1)
		{
			if (typek10Green) {
				row.style.backgroundColor = "#b8ffc4"
			}
			else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 奇数底部冷热号区域颜色
				row.style.backgroundColor = "white"
			}
			else
			{
				row.style.backgroundColor="blue"
			}			
		}
		
	　　　  var td = row.insertCell(0)
		if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
			if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
				td.style.borderBottom="" 
			}else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩 10期线颜色
				td.style.borderBottom="1px solid red" 
			}
			else{
				td.style.borderBottom="1px solid gray" 
			}
			
		}
		if(curHeightRedundantPixels>0)
		{
			td.height = tableCellHeight+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height = tableCellHeight
		}

		if(o< showPrizeItemCount)
		{
			// if (o==0) {
				td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,getPrizeNumOdd(curLotteryTypeDataList[o].numbers,length))

			// }else{
			// 	td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,getPrizeNumOdd(curLotteryTypeDataList[o-1].numbers,length))
				
			// }	
			if (typek10Green) {
				td.style.color="#7c0868"//"purple"
			}
		}
		else
		{
			td.innerHTML =  getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
	}

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	if (typek10Green) {cell.style.backgroundColor = "#f1f3d7"}
	if (typej7l1) {cell.style.backgroundColor = "#d8e4fe"}
	cell.appendChild(mtable)
}

function createk10GreenPrizeNumDistribution(length)
{	
	
	var ballsCount=new Array()  //for 统计
	var lastDataCount = new Array()
	var curDataCount = new Array()
	for(var i=0;i<prizeNumAvailableNumCount;i++)
	{
		ballsCount[i]=0
		lastDataCount[i]=0
		curDataCount[i]=0
	}

	  var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}      

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prizeNumAvailableNumCount,heightRedundantPixels)
	
	curHeightRedundantPixels = heightRedundantPixels
	
	_createHeader(mtable,"开奖号码分布",tableCellWidth,tableCellHeight,1,prizeNumAvailableNumCount,false,false,false,true)
	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		for(var i=0;i<prizeNumAvailableNumCount;i++)
		{
			var td = row.insertCell(i)
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			if (i==10) {
				td.style.borderLeft = "2px solid grey"
			}			
			if(o< showPrizeItemCount)
			{
				curDataCount[i]++
				if(backgroundNumberEnabled)
					td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,curDataCount[i])
				else
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				
			}
			else
			{
				td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="#91695d"

			}			
		}
		if(o< showPrizeItemCount)
		{
			var arr = curLotteryTypeDataList[o].numbers.slice().sort();
			var flagarr =[false,false,false,false,false,false,false,false]// new Array(8).fill(false);
			function arrange(source) {
				var t;
				var ta;
				var r = [];

				source.forEach(function(v) 
				{
				        // console.log(t, v);   // 跟踪调试用
				        v = parseInt(v)
				        if (t === v) 
				        {
				              ta.push(t);
				              t++;
				              return;
				         }

				        ta = [v];
				        t = v + 1;
				        r.push(ta);
				});

				return r;
			}

			var shunzi =[];
			
			arrange(arr).forEach(function(e)
			{
				if(e.length >= 4){
					shunzi =shunzi.concat(e);
				}
			})
			//console.log(shunzi)
			
			if (o%2==0) 
			{
				row.style.backgroundColor= "#daf7e0" 
			}else
			{
				row.style.backgroundColor= "#d4efd7"
			}

			for(var j =0;j<length;j++)
			{
				var ballNumber = parseInt(curLotteryTypeDataList[o].numbers[j])	
				if(shunzi.indexOf(ballNumber )!== -1){
					row.cells[ballNumber-1].style.backgroundColor = "#93f9e6"//"#d4efd7"
				}			

				if(ballNumber <= prizeNumMax)
				{

					ballsCount[ballNumber-1]++
					curDataCount[ballNumber-1]=0
					if (j<3) 
					{
						row.cells[ballNumber-1].style.color="#7c0868"
					}else
					{
						row.cells[ballNumber-1].style.color="#191d58"
					}
					
					row.cells[ballNumber-1].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,ballNumber)
					row.cells[ballNumber-1].style.fontFamily = "RussoOne"
					row.cells[ballNumber-1].style.fontWeight = "lighter"	
				}				
			}
		}
		else{
			row.style.backgroundColor="#daf7e0"  //"#D1EEEE" 
		}		
		if(o == showPrizeItemCount+reservedLines-1)
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="#ed731b"
					row.cells[index].style.color = "white"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="#71c487"
					row.cells[index].style.color = "white"
				}
				else
				{
					row.cells[index].style.backgroundColor="#d4efd7"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index],true)
			}	

		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
        	　　　   }		
	}

	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)

	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.style.backgroundColor = "#d4efd7"
	//cell.appendChild(div)
	cell.appendChild(mtable)

}
function createj7PrizeNum(length,typej7l2)
{	
	var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,length,heightRedundantPixels)
	curHeightRedundantPixels = heightRedundantPixels
	var tmpTitle
	tmpTitle ="开奖号码"
	if (typej7l2) {
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,4,false,false,false,false,false,false,false,false,false,false,false,true)
	}else
	{
		_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,4,false,true)
	}

	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)		
		for(var i=0;i<3;i++)
		{
			var td = row.insertCell(i)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {				
				td.style.borderBottom="1px solid gray" 					
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}	
			if(o<showPrizeItemCount)
			{				
				td.style.color="black"		
				
				var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
				var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
				var c =  parseInt(curLotteryTypeDataList[o].numbers[2])

				if(a==b&&a==c)
				{	
					td.style.color="purple"
				}
				if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
				{
					td.style.color="blue"
				}
				if (a==b&&a!=c) 
				{	
					if(i ===0||i ===1)
					td.style.color = "red"
				                 if (i===2) 
					td.style.color = "black"
			                }
				 if (a==c&&a!=b) 
				{
					if (i===0||i===2) 
					td.style.color = "red"
				                if (i===1) 
					td.style.color = "black"
				}if (b==c&&b!=a) 
				{
					if (i===1||i===2) 
					td.style.color = "red"
				                if (i===0) 
					td.style.color = "black"
				}				
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,parseInt(curLotteryTypeDataList[o].numbers[i]))
				if (typej7l2) {
					td.style.backgroundColor = "white"
				}else
				{
					td.style.backgroundColor = "#d8e4fe"
				}				
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
			
			if(o == showPrizeItemCount+reservedLines-1)
			{
				row.style.backgroundColor="blue"
			}			
		}
		 var td = row.insertCell(3)
		 if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {				
				td.style.borderBottom="1px solid gray" 					
			}			
		if(o<showPrizeItemCount)
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,parseInt(curLotteryTypeDataList[o].numbers[3]))
			td.style.color = "black"
			td.style.fontSize =18+"px"
			td.style.backgroundColor = "#fcfcd9"
		}		
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}		
	}

	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)

	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(mtable)
}
function createbackAreaPrizeNum012Val()
{
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<3;i++)
		ballsCount[i]=0

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(3,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	curHeightRedundantPixels = heightRedundantPixels

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,3,heightRedundantPixels)

	_createHeader(mtable,"后区012",tableCellWidth,tableCellHeight,0,2,false,false,false,false,false,false,false,false,false,true)

	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		curTrendWidthRedundantPixels = trendWidthRedundantPixels
		var val
		if (o<showPrizeItemCount) {
			val = parseInt(curLotteryTypeDataList[o].numbers[3])%3
			ballsCount[val]++
		}
		for(var i=0;i<3;i++)
		{
			var td = row.insertCell(i)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {				
				td.style.borderBottom="1px solid gray" 					
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
                                       
			if(o< showPrizeItemCount)
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,(curLotteryTypeDataList[o].numbers[3]))
				
				var rem = parseInt((curLotteryTypeDataList[o].numbers[3])%3)
				
				if (rem ==0) 
				{
					if (i===0) 
					{
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,(curLotteryTypeDataList[o].numbers[3]))
					}
					else
					{
						
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "&nbsp")
					}					
				}
				if (rem ==1) 
				{
					if (i===1) 
					{
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,(curLotteryTypeDataList[o].numbers[3]))
					}
					else
					{
						
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "&nbsp")
					}					
				}

				if (rem ==2) 
				{
					if (i===2) 
					{
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,(curLotteryTypeDataList[o].numbers[3]))
					}
					else
					{
						
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight, "&nbsp")
					}					
				}				
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			row.style.backgroundColor="blue"
			for(index in ballsCount)
			{
				row.cells[index].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,ballsCount[index])
				row.cells[index].style.color = "white"
			}
			//row.innerHTML =  getCellHTML("container",trendCellWidth,tableCellHeight,ballsCount)			
		}
		else
		{
			row.style.backgroundColor ="#fcfcd9"
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
		
	}
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(mtable)	
}
function createPrizeNumSumbigAndOddTrend(length,typeBig,typeOdd,oddeven)
{
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<2;i++)
		ballsCount[i]=0	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(2,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,2,heightRedundantPixels)
	curHeightRedundantPixels = heightRedundantPixels
	var tmpTitle
	if(typeBig){
		if (curLotteryTypeStyleName.indexOf("艺彩大")>=0 || curLotteryTypeStyleName.indexOf("吉林4")>=0) {
		//if (curLotteryTypeStyleName.indexOf("艺彩")>=0&&curLotteryTypeStyleName.indexOf("大")<0) {
			tmpTitle = "大小"
		} else {
			tmpTitle = "多少"
		}
	} else if (typeOdd) {
		if  (curLotteryTypeStyleName.indexOf("艺彩大")>=0 || curLotteryTypeStyleName.indexOf("吉林4")>=0) {
		//if (curLotteryTypeStyleName.indexOf("吉林4")>=0||curLotteryTypeStyleName.indexOf("艺彩大")>=0) {
			tmpTitle = "单双"
		}else{
			tmpTitle = "奇偶"
		}        
	}else if (oddeven) {
		tmpTitle = "和值奇偶"
	}else{
		tmpTitle = "其他"
	}
	
	_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,0,1,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true)

	
	
	//var yOffset = (tableCellHeight+1)*2+1	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)		
		if(o == showPrizeItemCount+reservedLines-1)
		{
			row.style.backgroundColor="blue"
		}
		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var valSum
		var val
		if(o< showPrizeItemCount)	
		{
			valSum = getSum(curLotteryTypeDataList[o].numbers,length)
			if(typeBig){
				if (curLotteryTypeStyleName.indexOf("艺彩大")>=0 || curLotteryTypeStyleName.indexOf("吉林4")>=0) {
					val = valSum>10?"大":"小"
				}else{
					val = valSum>10?"多":"少"
				}	
				
			}
			// else if(typeOdd){
			// 	val = (valSum%2 == 0)?"双":"单"
			// }
			else if (oddeven || typeOdd) {
				if  (curLotteryTypeStyleName.indexOf("艺彩大")>=0 || curLotteryTypeStyleName.indexOf("吉林4")>=0) {
					val = (valSum % 2 == 0) ? "双" : "单"
				}else{
					val = (valSum % 2 == 0) ? "偶" : "奇"
				}
			}else{
				val = ""
			}
		}
		for (var i = 0; i <2 ; i++) 
		{
			var td = row.insertCell(i)
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			
			if(o<showPrizeItemCount)
			{
				
					if ((i == 0 && (val == "小" || val == "双" || val == "偶" || val == "少")) || (i == 1 && (val == "大" || val == "单" || val == "奇" || val == "多"))) {
						td.innerHTML = getCellHTML("container", tableCellWidth, tableCellHeight, "&nbsp")

					}
					else
					{
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,val)

						var a =  parseInt(curLotteryTypeDataList[o].numbers[0])
						var b =  parseInt(curLotteryTypeDataList[o].numbers[1])
						var c =  parseInt(curLotteryTypeDataList[o].numbers[2])
						if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
							if (curLotteryTypeStyleName.indexOf("艺彩大")>=0) {
								if (tmpTitle === "大小") {
									td.style.color="purple"	
								}else if (tmpTitle === "单双") {
									td.style.color = "#111162"
								}
							}else{
								if (tmpTitle === "多少") {
									td.style.color="purple"	
								}else if (tmpTitle === "奇偶") {
									td.style.color = "#111162"
								}
							}							
						}
						else{
							if(a==b&&a==c)	{							
								td.style.color="purple"														
							}
							if (a+1==b&&b+1==c||a+1==c&&c+1==b||b+1==a&&a+1==c||c+1==a&&a+1==b||b+1==c&&c+1==a||c+1==b&&b+1==a) 
							{
								if ((curLotteryTypeStyleName.indexOf("隔行")>=0||curLotteryTypeStyleName.indexOf("吉林4")>=0)&&curLotteryTypeName.indexOf("吉林快3")>=0) {
		                                                                                         td.style.color=""
								}else if (oddeven) {
									td.style.color=""
								}else{
									td.style.color="#AA7700"
								}							
							}
							if (a==b&&a!=c){					
								td.style.color = "red"					          
						             }
							 if (a==c&&a!=b){						
								td.style.color = "red"					 
							}
							if (b==c&&b!=a){
								td.style.color = "red"					        
							}	
						}				
						a = i
						ballsCount[i]++
					}
				//}
				
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
		}
		if(o<showPrizeItemCount)
		{
			
		}		
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
		if(o == showPrizeItemCount+reservedLines-1) //统计 
		{
			for(var index in ballsCount)
			{
				row.cells[index].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount[index],true)
				row.cells[index].style.color = "white"
			}
		}
		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	              }		
	}
	// div.appendChild(canvas)
	// div.appendChild(mtable)

	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	//ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	//cell.appendChild(div)
	cell.style.backgroundColor ="#FFFFDF"//20161008添加快三大小单双暖色背景色
	if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {cell.style.backgroundColor="white"}
	cell.appendChild(mtable)
	
}
function createPrizeNumBigAndOddVal(length,typeBig,typeOdd)
{
	var ballsCount=new Array()  //for 统计
	for(var i=0;i<2;i++)
		ballsCount[i]=0	
	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(2,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	curHeightRedundantPixels = heightRedundantPixels

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,5,heightRedundantPixels)
	var tmpTitle

	if(typeBig){
		tmpTitle = "大小"
	}
	else if(typeOdd){
		tmpTitle = "单双"
	}
	_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,1,5)//,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true)
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		curTrendWidthRedundantPixels = trendWidthRedundantPixels
		
		for(var i=0;i<length;i++)
		{
			var td = row.insertCell(i)
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
                                       
			if(o< showPrizeItemCount)
			{
				var valV = parseInt((curLotteryTypeDataList[o].numbers[i]))
				if(typeBig){
					val = valV>4?"大":"小"
				}
				else if(typeOdd){
					val = (valV%2 == 0)?"双":"单"
				}
				
				if (curLotteryTypeName.indexOf("排列3")>=0&&curOrientation==="port") {					
						td.innerHTML =  getCellHTML("containerShape10",tableCellWidth,tableCellHeight,val,false,false,false,"HZsmall")
				}else{
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,val)
				}
				if (val == "双"||val == "小") {
					td.style.color = "red"
				}
				else{
					td.style.color = ""
				}
							
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			row.style.backgroundColor="blue"
						
		}
		else
		{
			row.style.backgroundColor ="#fcfcd9"
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
		
	}
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(mtable)	
}
function createPrizeNumTrend(typePaiLie5Trend){//20161008 排五和七星彩中奖号码走势图
	if (typePaiLie5Trend) {
		createOneOfPrizeNumTrend(0,"第一位")
		createOneOfPrizeNumTrend(1,"第二位","#d8e4fe")
		createOneOfPrizeNumTrend(2,"第三位")
		createOneOfPrizeNumTrend(3,"第四位","#d8e4fe")
		createOneOfPrizeNumTrend(4,"第五位")
	}else {
		createOneOfPrizeNumTrend(0,"第一位")
		createOneOfPrizeNumTrend(1,"第二位","#d8e4fe")
		createOneOfPrizeNumTrend(2,"第三位")
		createOneOfPrizeNumTrend(3,"第四位","#d8e4fe")
		createOneOfPrizeNumTrend(4,"第五位")
		createOneOfPrizeNumTrend(5,"第六位","#d8e4fe")
		createOneOfPrizeNumTrend(6,"第七位")
	}
}
function createPai3PrizeNum012Val(){//20161011 012路数函数

	var ballsCount=new Array()  //for 统计
	for(var i=0;i<3;i++)
		ballsCount[i]=0

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(3,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	curHeightRedundantPixels = heightRedundantPixels

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,3,heightRedundantPixels)

	_createHeader(mtable,"012路数",tableCellWidth,tableCellHeight,0,2,false,false,false,false,false,false,false,false,false,true)
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		curTrendWidthRedundantPixels = trendWidthRedundantPixels
		
		for(var i=0;i<3;i++)
		{
			var td = row.insertCell(i)
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
                                       
			if(o< showPrizeItemCount)
			{
				var val = parseInt((curLotteryTypeDataList[o].numbers[i])%3)

				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,val)
							
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
			}
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //for 统计
		{
			row.style.backgroundColor="blue"
						
		}
		else
		{
			row.style.backgroundColor ="#fcfcd9"
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
		
	}
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(mtable)	
              
}
function createPrizeNumRepeatTimesTrend(length){
	var minRepeat = 0
	var maxRepeat =5
	var itemsCount = maxRepeat-minRepeat+1

	var ballsCount=new Array()  //for 统计
	for(var i=0;i<itemsCount;i++)
		ballsCount[i]=0

	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5
	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}

	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'
	curHeightRedundantPixels = heightRedundantPixels

	_createHeader(mtable,"重号走势",trendCellWidth,tableCellHeight,minRepeat,maxRepeat)

	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height

	var yOffset = (tableCellHeight+1)*2+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels
		var val;
		if(o< showPrizeItemCount){
			if (o==0) {
				var firstLotteryNum= gLotteryDataList85.slice(85-destPrizeItemCount-1,85-destPrizeItemCount);
				if (firstLotteryNum.length===0) {
					val=getPrizeNumRepeatTimes(curLotteryTypeDataList[o].numbers,curLotteryTypeDataList[o].numbers,length)
				}else{					
					val=getPrizeNumRepeatTimes(firstLotteryNum[o].numbers,curLotteryTypeDataList[o].numbers,length)
				}	
			}else{

				val= getPrizeNumRepeatTimes(curLotteryTypeDataList[o-1].numbers,curLotteryTypeDataList[o].numbers,length)
			}		
		}
		for(var i = minRepeat,j = 0;i<=maxRepeat;i++,j++)
		{
			var td = row.insertCell(j)	
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}

			if(o< showPrizeItemCount)
			{
				if(val != i)
				{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				}else{
					if (curLotteryTypeStyleName.indexOf("艺彩")>=0){
						td.style.fontFamily = "YCArezzo"
						td.innerHTML = getCellHTML("container", trendCellWidth, tableCellHeight, i, false, false, false,"YCbig")					

					}else{
						td.style.fontFamily = "YCArezzo"					
						td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i,false,true)
					}
					val = j
					ballsCount[j]++
				}				
			}
			else{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
	}
	if(o< showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();

				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.moveTo(tmpXPos,tmpYPos)
				
			}
			else
			{
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}
				
				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.lineTo(tmpXPos,tmpYPos)				
			}
		}
		else
		{
			td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
		}
		
		if(o == showPrizeItemCount+reservedLines-1) //统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index],true)
			}
		}

		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	             }
	}
	div.appendChild(mtable)//
	div.appendChild(canvas)
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(div)
	

}
function createPrizeNumSumBig30SmallTrend(length){
	var itemsCount = 3
	var ballsCount01=0//for 统计蓝色数字 大
	var ballsCount02=0// 30
	var ballsCount03=0//小

	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5

	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels)
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'
	curHeightRedundantPixels = heightRedundantPixels

	var tmpTitle
	tmpTitle ="和值大30小"
	_createHeader(mtable,tmpTitle,tableCellWidth,tableCellHeight,0,2,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true)
	
	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height
	
	

	var yOffset = (tableCellHeight+1)*2+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels
		for(var i = 0,j = 0;i<=2;i++,j++)
		{
			var td = row.insertCell(j)	
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			var val;
			if(o< showPrizeItemCount)
			{
				var valSum = getSum(curLotteryTypeDataList[o].numbers,length)
				var val = valSum
				//val = valSum>30?"大":"小"
				
				if (val>30) {
					if (i==0) {
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"大")
						ballsCount01++
					}
					
				}else if (val<30) {
					if (i==2) {
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"小")
						ballsCount03++
					}					
				}
				else if (val==30) {
					if (i==1) {
						td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"30")
						ballsCount02++
					}
				}else{
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				}
			}else{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}
	}
		if(o == showPrizeItemCount+reservedLines-1) //统计
		{
			row.cells[0].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount03,true)
			row.cells[1].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount02,true)
			row.cells[2].innerHTML=getCellHTML("containerShape",tableCellWidth,tableCellHeight,ballsCount01,true)
			row.style.backgroundColor = "blue"
		 }

		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	             }
	}
	div.appendChild(mtable)//
	div.appendChild(canvas)
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.appendChild(div)
	


	
}
function  createPrizeNumMantissa(length){
	var minSum = 0
	var maxSum =9
	var itemsCount = maxSum-minSum +1
	var ballsCount=new Array()  //for 统计

	for(var i=0;i<itemsCount;i++)
		ballsCount[i]=0

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels)
	
	_createHeader(mtable,"尾值分布",tableCellWidth,tableCellHeight,minSum,maxSum )
	
	curHeightRedundantPixels = heightRedundantPixels

	var yOffset = (tableCellHeight+1)*2+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var val;
		var ballNumber;

		for(var i = minSum,j = 0;i<=maxSum;i++,j++)
		{
			var td = row.insertCell(i)	
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}else{
				td.height = tableCellHeight
			}

			if(o< showPrizeItemCount)
			{		
				var arr = curLotteryTypeDataList[o].numbers.slice(0,8)//黑龙江麻将版尾值问题
				if(checkWZFB(arr,i)===1||checkWZFB(arr,i)===2){
					 td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,i)
					 i = j;
					 ballsCount[j]++;
				}
				if (checkWZFB(arr,i)===2) {
					td.style.color = "red"
				}											
			}
			else
			{
				td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}			
		}		
		if(o == showPrizeItemCount+reservedLines-1) //统计
		{			
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{				
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}
				
				row.cells[index].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,ballsCount[index])
			}
		}

		if(curHeightRedundantPixels>0)
	        	{
			curHeightRedundantPixels--
	             }
	}
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	
	cell.appendChild(mtable)

}
function createMahjongDistribution(){
	var ballsCount=new Array()  //for 统计
	var lastDataCount = new Array()
	var curDataCount = new Array()
	for(var i=0;i<prizeNumAvailableNumCount;i++)
	{
		ballsCount[i]=0
		lastDataCount[i]=0
		curDataCount[i]=0
	}

	  var tmpWdithRedundantPixels
	if(trendCellCount==0 && trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}      

	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,prizeNumAvailableNumCount,heightRedundantPixels)
	
	curHeightRedundantPixels = heightRedundantPixels
	
	_createHeader(mtable,"麻将分布",tableCellWidth,tableCellHeight,1,prizeNumAvailableNumCount)
	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		for(var i=0;i<prizeNumAvailableNumCount;i++)
		{
			var td = row.insertCell(i)
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}
			if (i==11) {
				td.style.borderLeft = "2px solid grey"
			}			
			if(o< showPrizeItemCount)
			{
				curDataCount[i]++
				if(backgroundNumberEnabled)
					td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,curDataCount[i])
				else
					td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				
			}
			else
			{
				td.innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
				td.style.color="#91695d"

			}			
		}
		if(o< showPrizeItemCount)
		{
			var MJarr = curLotteryTypeDataList[o].numbers[9]
			// var MJarr = "2122232435313940"
			var arr = []
			for(var i=0,len=MJarr.length;i<len;i+=2){
				arr.push(MJarr.slice(i,i+2));
			}
			var flagarr =[false,false,false,false,false,false,false,false]// new Array(8).fill(false);
			function arrange(source) {
				var t;
				var ta;
				var r = [];

				source.forEach(function(v) 
				{
				        // console.log(t, v);   // 跟踪调试用
				        v = parseInt(v)
				        if (t === v) 
				        {
				              ta.push(t);
				              t++;
				              return;
				         }

				        ta = [v];
				        t = v + 1;
				        r.push(ta);
				});

				return r;
			}

			var shunzi =[];
			
			arrange(arr).forEach(function(e)
			{
				if(e.length >= 4){
					shunzi =shunzi.concat(e);
				}
			})			
			if (o%2==0) 
			{
				row.style.backgroundColor= "#daf7e0" 
			}else
			{
				row.style.backgroundColor= "#d4efd7"
			}

			for(var j =0;j<arr.length;j++)
			{
				var ballNumber = parseInt(arr[j])-20	
				if(shunzi.indexOf(ballNumber+20)!== -1){
					row.cells[ballNumber-1].style.backgroundColor = "yellow"//"#d4efd7"
				}			

				if(ballNumber <= prizeNumMax)
				{

					ballsCount[ballNumber-1]++
					curDataCount[ballNumber-1]=0
					/*if (j<3) 
					{
						row.cells[ballNumber-1].style.color="red"
					}*/
					var MJname
					switch(ballNumber){
						case 1:MJname = "一"
						break;
						case 2:MJname = "二"
						break;
						case 3:MJname = "三"
						break;
						case 4:MJname = "四"
						break;
						case 5:MJname = "五"
						break;
						case 6:MJname = "六"
						break;
						case 7:MJname = "七"
						break;
						case 8:MJname = "八"
						break;
						case 9:MJname = "九"
						break;
						case 10:MJname = "中"
						break;
						case 11:MJname = "發"
						break;
						case 12:MJname = "白"
						break;
						case 13:MJname = "東"
						break;
						case 14:MJname = "南"
						break;
						case 15:MJname = "西"
						break;
						case 16:MJname = "北"
						break;
						case 17:MJname = "春"
						break;
						case 18:MJname = "夏"
						break;
						case 19:MJname = "秋"
						break;
						case 20:MJname = "冬"
						break;
						default:MJname = "";
					}	
					row.cells[ballNumber-1].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,MJname)
					row.cells[ballNumber-1].style.fontFamily = "RussoOne"
					row.cells[ballNumber-1].style.fontWeight = "lighter"	
				}				
			}
		}
		else{
			row.style.backgroundColor="#daf7e0"  //"#D1EEEE" 
		}		
		if(o == showPrizeItemCount+reservedLines-1)
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="#ed731b"
					row.cells[index].style.color = "white"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="#71c487"
					row.cells[index].style.color = "white"
				}
				else
				{
					row.cells[index].style.backgroundColor="#d4efd7"
				}
				row.cells[index].innerHTML=getCellHTML("container",tableCellWidth,tableCellHeight,ballsCount[index])
			}	

		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
        	　　　   }		
	}

	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)

	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.style.backgroundColor = "#d4efd7"
	//cell.appendChild(div)
	cell.appendChild(mtable)
}
function createPrizeNumOddTrend(length){
	var minOdd = 0
	var maxodd = 5
	var itemsCount = maxodd-minOdd+1

	var ballsCount=new Array()  //for 统计
	for(var i=0;i<itemsCount;i++)
		ballsCount[i]=0
		
	var div = document.createElement("div")
	div.className = "canvasdiv"
	div.style.position='relative'

	var canvas = document.createElement("canvas")
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.opacity=0.5
	var ctx=canvas.getContext('2d');
	ctx.fillStyle='#FF0000';

	var tmpWdithRedundantPixels
	if(trendWidthRedundantPixels>0)
	{
		tmpWdithRedundantPixels = Math.min(itemsCount,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}

	var mtable = createInnerTable(trendCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,itemsCount,heightRedundantPixels,"zsttable")
	mtable.style.position = 'absolute'
	mtable.style.left = '0'
	mtable.style.top = '0'

	curHeightRedundantPixels = heightRedundantPixels

	_createHeader(mtable,"奇数走势",trendCellWidth,tableCellHeight,minOdd,maxodd)

	canvas.style.width = mtable.style.width
	canvas.style.height = mtable.style.height
	canvas.width = parseInt(mtable.style.width)
	canvas.height = parseInt(mtable.style.height)
	div.style.width=mtable.style.width
	div.style.height=mtable.style.height

	var yOffset = (tableCellHeight+1)*2+1
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)

		curTrendWidthRedundantPixels = trendWidthRedundantPixels

		var val;
		if(o< showPrizeItemCount){
			var valOdd = getPrizeNumOdd(curLotteryTypeDataList[o].numbers,length)

			val = valOdd
		}

		for(var i = minOdd,j = 0;i<=maxodd;i++,j++)
		{
			var td = row.insertCell(j)	
			if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
				//td.style.border="3px solid red"
				td.style.borderBottom="1px solid gray" 
			}
			if(curTrendWidthRedundantPixels>0)
			{
				curTrendWidthRedundantPixels--
			}
			if(curHeightRedundantPixels>0)
			{
				td.height = tableCellHeight+1
			}
			else
			{
				td.height = tableCellHeight
			}

			if(o< showPrizeItemCount)
			{
				if(val != i)
				{
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				}else{
					td.style.fontFamily = "YCArezzo"	
					td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,i,false,true)
					td.style.color="blue"
					val = j
					ballsCount[j]++
				}
			}else{
				td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
				td.style.color="white"
			}

		}
		if(o< showPrizeItemCount)
		{
			if(o == 0)
			{
				ctx.beginPath();

				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}

				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = (tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.moveTo(tmpXPos,tmpYPos)
				
			}
			else
			{
				var tmpXPos=0;
				if(curTrendWidthRedundantPixels>0)
				{
					tmpXPos = val*(trendCellWidth+1+1)+(trendCellWidth+1+1)/2
				}
				else
				{
					tmpXPos = val*(trendCellWidth+1)+(trendCellWidth+1)/2+trendWidthRedundantPixels
				}
				
				var tmpYPos = 0;
				if(curHeightRedundantPixels>0)
				{
					tmpYPos = o*(tableCellHeight+1+1)+(tableCellHeight+1+1)/2
				}
				else
				{
					tmpYPos=o*(tableCellHeight+1)+(tableCellHeight+1)/2+heightRedundantPixels
					
				}
				tmpYPos+=yOffset
				ctx.lineTo(tmpXPos,tmpYPos)				
			}
		}
		else
		{
			td.innerHTML = getCellHTML("container",trendCellWidth,tableCellHeight,"&nbsp")
		}
		if(o == showPrizeItemCount+reservedLines-1) //统计
		{
			var maxMin =getMaxMinVal(ballsCount)
			for(index in ballsCount)
			{
				if(ballsCount[index]==maxMin[0])
				{
					row.cells[index].style.backgroundColor="red"
				}
				else if(ballsCount[index]==maxMin[1])
				{
					row.cells[index].style.backgroundColor="green"
				}
				else
				{
					row.cells[index].style.backgroundColor="blue"
				}

				row.cells[index].innerHTML=getCellHTML("containerShape",trendCellWidth,tableCellHeight,ballsCount[index],true)
			}
		}
		if(curHeightRedundantPixels>0)
		{
			curHeightRedundantPixels--
		}
	}

	div.appendChild(mtable)
	div.appendChild(canvas)
	
	trendWidthRedundantPixels -= tmpWdithRedundantPixels
	
	ctx.stroke()
	
	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
	cell.style.backgroundColor = "#d9e5ff"
	cell.appendChild(div)

}
function createPrizeNumBigNum(length){//0509快彩大号显示函数
	var tmpWdithRedundantPixels
	if(trendCellCount == 0 && trendWidthRedundantPixels > 0)
	{
		tmpWdithRedundantPixels = Math.min(1,trendWidthRedundantPixels)
	}
	else
	{
		tmpWdithRedundantPixels=0
	}
	var mtable = createInnerTable(tableCellWidth,tableCellHeight,showPrizeItemCount + reservedLines+2,tmpWdithRedundantPixels,1,heightRedundantPixels)

	curHeightRedundantPixels = heightRedundantPixels
	_createHeader(mtable,"大号",tableCellWidth,tableCellHeight)	
	
	for(var o =0;o< showPrizeItemCount+reservedLines;o++ )
	{
		var row = mtable.insertRow(mtable.rows.length)
		if(o == showPrizeItemCount+reservedLines-1)
		{			
			row.style.backgroundColor="blue"
			if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0509 快彩  大号冷热号区域颜色
				row.style.backgroundColor = "white"
			}
		}
		var td = row.insertCell(0)
		if (o===9||o===19||o===29||o===39||o===49||o===59||o===69||o===79) {
			if (curLotteryTypeName=="3D"||curLotteryTypeName=="排列3"||curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("七星彩")>=0) {
				td.style.borderBottom="" 
			}
			else if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//大号函数  每十期底线红色
				td.style.borderBottom="1px solid red" 
			}
			else{
				td.style.borderBottom="1px solid gray" 
			}
			
		}
		if(curHeightRedundantPixels>0)
		{
			td.height = tableCellHeight+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height = tableCellHeight
		}

		if(o< showPrizeItemCount)
		{
			
			td.innerHTML = getCellHTML("containerCH",tableCellWidth,tableCellHeight,getPrizeNumBigTimes(curLotteryTypeDataList[o].numbers),false,false,false,"YCbig")
			
			if ((curLotteryTypeStyleName.indexOf("隔行")>=0)&&curLotteryTypeName.indexOf("11选5")>=0){
				if (o%2==0) 
				{
					td.style.color="red"
				}else
				{
					td.style.color="black"
				}
				var tmpIssue = curLotteryTypeDataList[o].issue
				var simpleIssue = parseInt( tmpIssue.substring(tmpIssue.length-2))						
				if (simpleIssue===1) {
					td.style.color="blue"
				}		
														
							
			}	
			
		}
		else
		{
			td.innerHTML = getCellHTML("container",tableCellWidth,tableCellHeight,"&nbsp")
		}
	}

	trendWidthRedundantPixels -= tmpWdithRedundantPixels

	var cell = bodyContentTr.insertCell(bodyContentTr.cells.length)
	cell.style.width= mtable.style.width
	cell.style.height=mtable.style.height
              cell.appendChild(mtable)

}
//////case  -------结束
function showTipsInfo()
{
	if(tipsInfoDiv==undefined)
	{
		tipsInfoDiv = document.getElementById("tipsInfoDiv")
	}
	tipsInfoDiv.style.width=tableWidth-2+"px" //not contain border
	tipsInfoDiv.style.height=tableCellHeight+"px"
	tipsInfoDiv.style.lineHeight = tableCellHeight+"px"
	tipsInfoDiv.style.fontSize=tableCellHeight*0.7+"px"
	tipsInfoDiv.style.top=(tableCellHeight+1) * (showPrizeItemCount + 2 + 2 + 1)+Math.min(heightRedundantPixels,(showPrizeItemCount  + 2  + 2 +2))+"px"
	//liutest begin
	if (curLotteryTypeStyleName.indexOf("艺彩")>=0) {
		tipsInfoDiv.innerHTML = gVersion;
	}else{
		tipsInfoDiv.innerHTML="<span style=font-size:10px>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本开奖数据仅供参考，实际信息以官方开奖视频为准  "+gVersion+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"</span>"+"<span style=font-size:16px>"+agentphoneNumber+"</span>"
	}//liutest end

	if (curLotteryTypeStyleName.indexOf("快彩")>=0) {//0518 快彩免责声明单独设置
		tipsInfoDiv.innerHTML="<span style=font-size:10px;margin-left:150px>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本开奖数据仅供参考，实际信息以官方开奖视频为准  "+gVersion+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"</span>"
	}
	
}
function getMarqueeString(dataArray)
{
	var mq=document.createElement("marquee")
	mq.align = "absmiddle"
	mq.behavior = "scroll"
	mq.direction = "left"
	mq.loop = loops
	mq.scrollamount = scrollamount
	mq.scrolldelay = scrolldelay
	mq.bgColor = bgColor
	mq.style.width="100%"
	mq.style.fontSize=tableCellHeight*notifyRowsNum*0.85+"px"
	mq.style.letterSpacing=0+"px"
	//mq.style.height = "100%"
            mq.innerHTML=dataArray.join("&nbsp &nbsp &nbsp &nbsp &nbsp")
            //console.log(dataArray.join("&nbsp &nbsp &nbsp &nbsp &nbsp"))
            return mq
}
function addNotifyArea(tableObj)
{
	if(justUpdatePrizeNumAreaFlag == true)
		return
	var row = tableObj.insertRow(tableObj.rows.length)
	var td = row.insertCell(0)
	td.colSpan=tableColumCount+trendCellCount //tableObj.rows[0].cells.length
	td.width = tableWidth-2 //not contain border
	if(curOrientation=="port")
	{
		if(curHeightRedundantPixels>0)
		{
			td.height=tableCellHeight*notifyRowsNum+1+1
			curHeightRedundantPixels--
		}
		else
		{
			td.height=tableCellHeight*notifyRowsNum+1
		}
	}
	else
	{
		td.height=tableCellHeight*notifyRowsNum+1+curHeightRedundantPixels
		curHeightRedundantPixels=0
	}
		
	td.appendChild(getMarqueeString(notifyList))
}
function drawYCK3StaticTable() {
	//liutest begin
	if (!fakek3YCYLDate.one.dqmax) return;
	if (yltable.className == "ylTable" && yltable.rows.length > 0 && gNewYlFlag) {//liutest 1124
		for (var r = yltable.rows.length - 1; r >= 0; r--) {
			yltable.deleteRow(r);			
		}
		gNewYlFlag =false;//liutest 1124
	}

	yltable.setAttribute('id', "YCyltable");
	curLotteryTypeYiLouDatalist = fakek3YCYLDate
	for (var o = 0; o < 5; o++) {
		var row = yltable.insertRow(o)
		row.style.backgroundColor = "#fde9db"
		if (o === 0) {
			for (var i = 0; i < 5; i++) {
				var td = row.insertCell(i)
				td.style.borderWidth = "2px"
				td.className = "yilouTd"
				td.style.color = "#2c2c2d"
				td.style.textAlign = "center"
				td.style.height = (tableCellHeight - 2) + "px"
				//td.style.fontSize = (tableCellHeight-6)+'px'
				// console.log(tableCellHeight)

				 if (parseInt(destPrizeItemCount)<60) {
				 	if (parseInt(destPrizeItemCount)<55){
				 		if (o===0) {
							td.style.fontSize =(tableCellHeight - 9) + "px"
						}else{
							td.style.fontSize =(tableCellHeight - 8) + "px"
						}
				 	}else{
						if (o===0) {
							td.style.fontSize =(tableCellHeight - 7) + "px"
						}else{
							td.style.fontSize =(tableCellHeight - 6) + "px"
						}
					}
				}else{
				//if (parseInt(destPrizeItemCount)===55||parseInt(destPrizeItemCount)===50) {
					if (o===0) {
						td.style.fontSize =(tableCellHeight - 6) + "px"
					}else{
						td.style.fontSize =(tableCellHeight - 5) + "px"
					}
				}	
				if (i > 0) {
					td.colSpan = 2
				}
				if (o==0) {
					
					if (i==0){td.innerHTML = "遗漏表"}
					if (i==1) {td.innerHTML = "三同号";}
					if (i==2) {td.innerHTML = "三不同号";}
					if (i==3) {td.innerHTML = "二同号/二不同号"}
					if (i==4) {td.innerHTML = "和值"}	
				 }

			}
		} else {
			for (var j = 0; j < 9; j++) {
				var td = row.insertCell(j)
				td.style.borderWidth = "2px"
				td.className = "yilouTd"
				td.style.color = "#2c2c2d"
				td.style.textAlign = "center"
				td.style.height = (tableCellHeight - 2) + "px"
				 if (parseInt(destPrizeItemCount)<60) {
				 	if (parseInt(destPrizeItemCount)<55){
				 		if (o===0||o===1) {
							td.style.fontSize =(tableCellHeight - 9) + "px"
						}else{
							td.style.fontSize =(tableCellHeight - 8) + "px"
						}
				 	}else{
						if (o===0||o===1) {
							td.style.fontSize =(tableCellHeight - 7) + "px"
						}else{
							td.style.fontSize =(tableCellHeight - 6) + "px"
						}
					}					
				}else{
				//if (parseInt(destPrizeItemCount)===55||parseInt(destPrizeItemCount)===50) {
					if (o===0) {
						td.style.fontSize =(tableCellHeight - 6) + "px"
					}else{
						td.style.fontSize =(tableCellHeight - 5) + "px"
					}
				}	
				
				if (j===0) {
					td.style.width = "80px"	
									
					if (o==1){td.innerHTML = "号码组合"}
					if (o==2){td.innerHTML = "当前遗漏"}
					if (o==3){td.innerHTML = "上次遗漏"}
					if (o==4){td.innerHTML = "最大遗漏"}				
				}
				if(j===1){
					if (o==1){td.innerHTML = "冷号 "+curLotteryTypeYiLouDatalist.one.dqmax.content}
					if (o==2){
						td.innerHTML = curLotteryTypeYiLouDatalist.one.dqmax.dqyl;
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==3){td.innerHTML = curLotteryTypeYiLouDatalist.one.dqmax.scyl}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.one.dqmax.zdyl}	
				}
				if(j===2){
					if (o==1){td.innerHTML = "回补 "+curLotteryTypeYiLouDatalist.one.scmax.content}
					if (o==2){td.innerHTML = curLotteryTypeYiLouDatalist.one.scmax.dqyl}
					if (o==3){td.innerHTML = curLotteryTypeYiLouDatalist.one.scmax.scyl
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.one.scmax.zdyl}	
				}
				if(j===3){
					if (o==1){td.innerHTML ="冷号 "+ curLotteryTypeYiLouDatalist.three.dqmax.content}
					if (o==2){
						td.innerHTML = curLotteryTypeYiLouDatalist.three.dqmax.dqyl
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==3){td.innerHTML = curLotteryTypeYiLouDatalist.three.dqmax.scyl}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.three.dqmax.zdyl}	
				}
				if(j===4){
					if (o==1){td.innerHTML = "回补 "+curLotteryTypeYiLouDatalist.three.scmax.content}
					if (o==2){td.innerHTML = curLotteryTypeYiLouDatalist.three.scmax.dqyl}
					if (o==3){
						td.innerHTML = curLotteryTypeYiLouDatalist.three.scmax.scyl;
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.three.scmax.zdyl}	
				}
				if(j===5){
					if (o==1){td.innerHTML = "冷号 "+curLotteryTypeYiLouDatalist.two.dqmax.content}
					if (o==2){
						td.innerHTML = curLotteryTypeYiLouDatalist.two.dqmax.dqyl
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==3){td.innerHTML = curLotteryTypeYiLouDatalist.two.dqmax.scyl}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.two.dqmax.zdyl}	
				}
				if(j===6){
					if (o==1){td.innerHTML = "回补 "+curLotteryTypeYiLouDatalist.two.scmax.content}
					if (o==2){td.innerHTML = curLotteryTypeYiLouDatalist.two.scmax.dqyl}
					if (o==3){
						td.innerHTML = curLotteryTypeYiLouDatalist.two.scmax.scyl
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.two.scmax.zdyl}	
				}
				if(j===7){
					if (o==1){td.innerHTML = "冷号 "+curLotteryTypeYiLouDatalist.sum.dqmax.content}
					if (o==2){
						td.innerHTML = curLotteryTypeYiLouDatalist.sum.dqmax.dqyl
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==3){td.innerHTML = curLotteryTypeYiLouDatalist.sum.dqmax.scyl}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.sum.dqmax.zdyl}	
				}
				if(j===8){
					if (o==1){td.innerHTML = "回补 "+curLotteryTypeYiLouDatalist.sum.scmax.content}
					if (o==2){td.innerHTML = curLotteryTypeYiLouDatalist.sum.scmax.dqyl}
					if (o==3){
						td.innerHTML = curLotteryTypeYiLouDatalist.sum.scmax.scyl
						td.style.fontSize = (tableCellHeight - 5) + "px"
					}
					if (o==4){td.innerHTML = curLotteryTypeYiLouDatalist.sum.scmax.zdyl}	
				}


			}


		}

	}
}
function drawK3StaticTable(){	
	//liutest begin
	if(fakek3YLDate.day1.length == undefined) return;
	if(yltable.className == "ylTable" && yltable.rows.length > 0 && gNewYlFlag){//liutest 1124
	    for(var r=yltable.rows.length-1;r>=0;r--) {
	        yltable.deleteRow(r);	        
	    }
	    gNewYlFlag =false;//liutest 1124
	}
	//liutest end
            curLotteryTypeYiLouDatalist = fakek3YLDate
          //  curLotteryTypeYiLouDatalist = data;
	if (curOrientation =="port") {
		for (var o= 0; o<3; o++) {
			var row = yltable.insertRow (o)
			for (var i= 0; i<2; i++) {
				var td = row.insertCell(i)			
			
				if (o==0&&i==0) {
					td.innerHTML = "昨日未出"
					td.style.height = tableCellHeight*2+"px"			
				}			
				if (i==0) {
					td.style.width = 100+"px"
				}
				if (i==0&&o==1) {
					td.innerHTML = "两日未出";
					td.style.height = tableCellHeight*1.5+"px"	
				}
				if (i==0&&o==2) {
					td.innerHTML = "三日以上未出";
					td.style.height = tableCellHeight*1.5+"px"	
				}
				if (i==1) {
					if (o==0) {
						for (var j = 0; j < curLotteryTypeYiLouDatalist.day1.length; j++) {
							var tpspan = document.createElement('span');
							if ((j+1) % 16 ==0 ){
								tpspan.innerHTML= curLotteryTypeYiLouDatalist.day1[j].value + "<br/>";
							}else{
								tpspan.innerHTML = curLotteryTypeYiLouDatalist.day1[j].value;
							}							
							tpspan.style.color = curLotteryTypeYiLouDatalist.day1[j].isShow?'red':'black';							
							tpspan.style.padding = '4px';
							tpspan.style.letterSpacing = '1px'
							td.className = "ylTd"
							td.appendChild(tpspan)
						}
				              }
				              if (o==1) {
				              	for (var j = 0; j < curLotteryTypeYiLouDatalist.day2.length; j++) {
				              		var tpspan = document.createElement('span');
				              		tpspan.innerHTML = curLotteryTypeYiLouDatalist.day2[j].value;
				              		tpspan.style.color = curLotteryTypeYiLouDatalist.day2[j].isShow?'red':'black';//liutest
							tpspan.style.padding = '4px';
							tpspan.style.letterSpacing = '1px'
							td.style.textAlign = "left"
							td.style.paddingLeft = "5px"
				              		td.appendChild(tpspan)
				              	}
				              }
				              if (o==2) {
				              	for (var j = 0; j < curLotteryTypeYiLouDatalist.day3.length; j++) {
				              		var tpspan = document.createElement('span');
				              		tpspan.innerHTML = curLotteryTypeYiLouDatalist.day3[j].value;
				              		tpspan.style.color = curLotteryTypeYiLouDatalist.day3[j].isShow?'red':'black';//liutest

							var tpspan1 = document.createElement('span');
							tpspan1.innerHTML ="("+curLotteryTypeYiLouDatalist.day3[j].YLnum+")";
							tpspan1.style.color = "#367062"
							tpspan1.style.letterSpacing = '0px'
							//tpspan1.style.fontSize =(tableCellHeight-10) +"px"

							tpspan.style.padding = '6px';
							tpspan.style.letterSpacing = '1px'
							td.style.textAlign = "left"
							td.style.paddingLeft = "5px"
				              		td.appendChild(tpspan)
				              		td.appendChild(tpspan1)
				              	}
				              }					
				}
				td.style.borderWidth = "3px"
				td.style.color = "#2c2c2d"
			}	
		}
	}else
	{
		for (var o= 0; o<2; o++) {
			var row = yltable.insertRow (o)
			for (var i= 0; i<3; i++) {
				var td = row.insertCell(i)	
				if (o==0&&i==0) {
					td.innerHTML = "昨日未出"
					td.style.height = 30+"px"
					td.style.width = 	100+"px"							
				}					
				if (o==0&&i==1) {
					td.innerHTML = "两日未出"
				}
				if (o==0&&i==2) {
					td.innerHTML = "三日以上未出"
					//td.style.width = 80+"px"		
				}
				if (o==1) {
					if (i==0) {
						for (var j = 0; j < curLotteryTypeYiLouDatalist.day1.length; j++) {
							var tpspan = document.createElement('span');
							if ((j+2) % 2 ==0 ){
								tpspan.innerHTML= curLotteryTypeYiLouDatalist.day1[j].value ;
							}else{
								tpspan.innerHTML = curLotteryTypeYiLouDatalist.day1[j].value+ "<br/>"+"<br/>";
							}							
							tpspan.style.color = curLotteryTypeYiLouDatalist.day1[j].isShow?'red':'black';
							tpspan.style.padding = '8px';
							//tpspan.style.textAlign = "center"
							tpspan.style.letterSpacing = '1px'							
							td.className = "ylTd"
							td.appendChild(tpspan)
						}
					}
					if (i==1) {
						for (var j = 0; j < curLotteryTypeYiLouDatalist.day2.length; j++) {
				              		var tpspan = document.createElement('span');
				              		tpspan.innerHTML = curLotteryTypeYiLouDatalist.day2[j].value+"<br/>"+"<br/>";
				              		tpspan.style.color = curLotteryTypeYiLouDatalist.day2[j].isShow?'red':'black';//liutest
							tpspan.style.padding = '6px';
							tpspan.style.letterSpacing = '1px'							
							
							td.className = "ylTd"
				              		td.appendChild(tpspan)
				              	}
					}
					if (i==2) {
						for (var j = 0; j < curLotteryTypeYiLouDatalist.day3.length; j++) {
				              		var tpspan = document.createElement('span');
				              		tpspan.innerHTML = curLotteryTypeYiLouDatalist.day3[j].value+"<br/>";
				              		tpspan.style.color = curLotteryTypeYiLouDatalist.day3[j].isShow?'red':'black';//liutest
							tpspan.style.padding = '6px';
							tpspan.style.letterSpacing = '1px'							

							var tpspan1 = document.createElement('span');
							tpspan1.innerHTML ="("+curLotteryTypeYiLouDatalist.day3[j].YLnum+")"+"<br/>"+"<br/>";
							tpspan1.style.color = "#367062"
							tpspan1.style.padding = '9px';
							tpspan1.style.letterSpacing = '0px'
							tpspan1.style.fontSize = 13+"px"
							
							td.className = "ylTd"
				              		td.appendChild(tpspan)
				              		td.appendChild(tpspan1)
				              	}						
					}
				}
			}
		}	
	}
}
function drawStaticTable(){	
	//liutest begin1
	if(fakek10YLDate.r3.dqmax == undefined || !yltable) return;//如果遗漏表不存在则return  否则报错
	if(yltable.className == "ylTable" && yltable.rows.length > 0 && gNewYlFlag){//liutest 1124
	    for(var r=yltable.rows.length-1;r>=0;r--) {
	        yltable.deleteRow(r);	        
	    }
	    gNewYlFlag = false;//liutest 1124
	}
	//liutest end
	curLotteryTypeYiLouDatalist = fakek10YLDate
	if (curOrientation=="port") {
		for (var o= 0; o<5; o++) {
			var row = yltable.insertRow (o)
			row.style.backgroundColor = "#fde9db"
			for (var i = 0; i <9 ; i++){
				var td = row.insertCell(i)
				//td.style.backgroundColor = "#fde9db"
				td.style.borderWidth = "2px"
				td.className = "yilouTd"
				td.style.color = "#2c2c2d"
				td.style.textAlign="center"
				td.style.height = (tableCellHeight-2)+"px"
				td.style.fontSize = (tableCellHeight-8)+'px'	
					

				//liutest begin
				if ((i==1||i==2)|| (i==3||i==4||i==7||i==8)|| (i==5||i==6)){
					if (i==1||i==2) {
						td.style.width = 65+"px";
					}else if (i==3||i==4||i==7||i==8) {
						td.style.width = "";
					}else if (i==5||i==6) {
						td.style.width = 95+"px";
					}					
					if (o==1) {
						if (parseInt(destPrizeItemCount)<50) {
							td.style.letterSpacing = "-1px";
							td.style.fontSize =13+"px"
						}else{
							td.style.fontSize = (tableCellHeight-5)+"px";
						}						
					}
					else if(o==0){						
						if (parseInt(destPrizeItemCount)<50) {
							td.style.letterSpacing = "-1px";
							td.style.fontSize =13+"px"
						}else{
							td.style.fontSize = (tableCellHeight-5)+"px";
						}
						
					}else{
						td.style.fontSize = (tableCellHeight-5)+"px";						
					}
				}				
				//liutest end
				if (i==0) {
					if (o==0){td.innerHTML = "遗漏表"}
					if (o==1){td.innerHTML = "号码组合"}
					if (o==2){td.innerHTML = "当前遗漏"}
					if (o==3){td.innerHTML = "上次遗漏"}
					if (o==4){td.innerHTML = "最大遗漏"}				
				}
			              else if (o==0) {
				              	if (i==1) {td.innerHTML = "任三冷号"}
				              	if (i==2) {td.innerHTML = "任三回补"}
				              	if (i==3) {td.innerHTML = "任四冷号"}
				              	if (i==4) {td.innerHTML = "任四回补"}
				              	if (i==5) {td.innerHTML = "任五冷号"}
				              	if (i==6) {td.innerHTML = "任五回补"}//liutest
				              	if (i==7) {td.innerHTML = "前三组冷号"}				              			              		
				              	if (i==8) {
				              		if (curLotteryTypeName.indexOf("快乐十")>=0) {td.innerHTML = "前三组回补"}
				              		else{td.innerHTML = "前三直冷号"}				              	
				              	}

			              }else if (i==1) {//任3 冷号
			              	              if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }			              	           
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.content}
				              	if (o==2) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.dqyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'	
				              	}	
				              	if (o==3) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.scyl}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.zdyl}		              		
			                           
			              }else if (i==2) {	//任3 回补	
			                              if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }         	
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.content}
				              	if (o==2) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.dqyl}	
				              	if (o==3) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.scyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'	
				              	}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.zdyl}		
			              }else if (i==3) {//任4	
			                              if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }             	
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.content}
				              	if (o==2) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.dqyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'
				              	}	
				              	if (o==3) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.scyl}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.zdyl}		
			              }else if (i==4) {
			              	                if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.content}
				              	if (o==2) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.dqyl}	
				              	if (o==3) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.scyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'
				              	}	 	
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.zdyl}		
			              }else if (i==5) {//任5	
			                               if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }	              
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.content}
				              	if (o==2) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.dqyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'
				              	}	
				              	if (o==3) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.scyl}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.zdyl}		         	              			
			              }else if (i==6) {
				              	  if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.content}
				              	if (o==2) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.dqyl}	
				              	if (o==3) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.scyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'
				              	}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.zdyl}		
			              }else if (i==7) {//前三组
				               if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }
				              	if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.content}
				              	if (o==2) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.dqyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'
				              	}	
				              	if (o==3) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.scyl}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.zdyl}		
			              }else if (i==8) {
				                if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }
				              	if (curLotteryTypeName.indexOf("快乐十")>=0) {
			              			if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.content}
					              	if (o==2) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.dqyl}	
					              	if (o==3) {
					              		td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.scyl
					              		//td.style.fontSize = 18+"px"
					              		td.style.fontSize = (tableCellHeight-5)+'px'
					              	}
					              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.zdyl}
			              		}
		              		else{
		              			  if (parseInt(destPrizeItemCount)<=45) {
				              	              	td.style.fontSize =""
			              	              }else{
			              	              	              td.style.fontSize = (tableCellHeight-6)+'px'
			              	              }
		              			if (o==1) {td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.content}
				              	if (o==2) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.dqyl
				              		//td.style.fontSize = 18+"px"
				              		td.style.fontSize = (tableCellHeight-5)+'px'
				              	}
				              	if (o==3) {
				              		td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.scyl			              		
				              	}
				              	if (o==4) {td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.zdyl}			              						              	
			                      }

			             }			
			}		
		}
	}else{
		for (var o= 0; o<9; o++) {//liutest 最好先创建列，再创建行，因为很多操作是在列的操作，后续再优化
			var row = yltable.insertRow (o)			
			for (var i = 0; i <5 ; i++){
				var td = row.insertCell(i)
				td.style.backgroundColor = "#fde9db"
				td.style.borderWidth = "2px"
				td.style.color = "#2c2c2d"
				td.style.textAlign="center"
				//liutest begin
				if(i==0){
					td.style.width = 52 + "px";
				}
				if (o==0) {
					td.style.letterSpacing = "3px"
					td.style.height = 50+"px"
			    }			    
			    if (o==1||o==2||o==3||o==4||o==5||o==6) {
			        if (i==0) {td.style.letterSpacing = "3px"}				              			              	
			    }
			    if (i==1&&o!=0) {
			        td.style.letterSpacing = "1px"
			        // td.style.padding = "10px"
			        td.style.fontSize = 12 +"px";
			    }
			    if (i!=0&&i!=1&&o!=0) {
			    	td.style.letterSpacing = "0px"
			    }
			    if (o==0) {			              	
					if (i==0){td.innerHTML = "遗漏表"}
					if (i==1){td.innerHTML = "号码组合"}
					if (i==2){td.innerHTML = "当前遗漏"}
					if (i==3){td.innerHTML = "上次遗漏"}
					if (i==4){td.innerHTML = "最大遗漏"}
				}
			    if (i==0) {			              	
			        if (o==1) {td.innerHTML = "任三冷号"}
			        if (o==2) {td.innerHTML = "任三回补"}
			        if (o==3) {td.innerHTML = "任四冷号"}
			        if (o==4) {td.innerHTML = "任四回补"}
			        if (o==5) {td.innerHTML = "任五冷号"}
			        if (o==6) {td.innerHTML = "任五回补"}
			        if (o==7) {td.innerHTML = "前三组冷号"}
			        if (o==8) {
	              		if (curLotteryTypeName.indexOf("快乐十")>=0) {td.innerHTML = "前三组回补"}
	              		else{td.innerHTML = "前三直冷号"}				              	
			              }
			    }else if (o==1) {//任3
			        if (i==1) {
			        	var tmpR3Lh = curLotteryTypeYiLouDatalist.r3.dqmax.content.split(",");
			        	for(var d=0;d<tmpR3Lh.length;d++){
			        		td.innerHTML = td.innerHTML + tmpR3Lh[d]+"<br/>";
			        	}
			        }
			        if (i==2) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.dqyl
			            td.style.fontSize = 18+"px"
			        }	
			        if (i==3) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.scyl}
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.dqmax.zdyl}		              		
			    }else if (o==2) {
			        if (i==1) {
			        	var tmpR3Hb = curLotteryTypeYiLouDatalist.r3.scmax.content.split(",");
			        	for(var d=0;d<tmpR3Hb.length;d++){
			        		td.innerHTML = td.innerHTML + tmpR3Hb[d]+"<br/>";
			        	}
					}
			        if (i==2) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.dqyl}	
			        if (i==3) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.scyl
			            td.style.fontSize = 18+"px"
			        }
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r3.scmax.zdyl}		
			    }else if (o==3) {//任4
			        if (i==1) {
			        	var tmpR4Lh = curLotteryTypeYiLouDatalist.r4.dqmax.content.split(",");
			        	for(var d=0;d<tmpR4Lh.length;d++){
			        		td.innerHTML = td.innerHTML + tmpR4Lh[d]+"<br/>";
			        	}
			        }
			        if (i==2) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.dqyl
			            td.style.fontSize = 18+"px"
			        }	
			        if (i==3) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.scyl}
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.dqmax.zdyl}		
			    }else if (o==4) {
			        if (i==1) {
			        	var tmpR4Hb = curLotteryTypeYiLouDatalist.r4.scmax.content.split(",");
			        	for(var d=0;d<tmpR4Hb.length;d++){
			        		td.innerHTML = td.innerHTML + tmpR4Hb[d]+"<br/>";
			        	}
			        }
			        if (i==2) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.dqyl}	
			        if (i==3) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.scyl
			            td.style.fontSize = 18+"px"
			        }	 	
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r4.scmax.zdyl}		
			    }else if (o==5) {//任5		              
			        if (i==1) {
			        	var tmpR5Lh = curLotteryTypeYiLouDatalist.r5.dqmax.content.split(",");
			        	for(var d=0;d<tmpR5Lh.length;d++){
			        		td.innerHTML = td.innerHTML + tmpR5Lh[d]+"<br/>";
			        	}
			        }
			        if (i==2) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.dqyl
			            td.style.fontSize = 18+"px"
			        }	
			        if (i==3) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.scyl}
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.dqmax.zdyl}		         	              			
			    }else if (o==6) {
			        if (i==1) {
			        	var tmpR5Hb = curLotteryTypeYiLouDatalist.r5.scmax.content.split(",");
			        	for(var d=0;d<tmpR5Hb.length;d++){
			        		td.innerHTML = td.innerHTML + tmpR5Hb[d]+"<br/>";
			        	}
			        }
			        if (i==2) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.dqyl}	
			        if (i==3) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.scyl
			            td.style.fontSize = 18+"px"
			        }
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.r5.scmax.zdyl}		
			    }else if (o==7) {//前三组
			        if (i==1) {
			        	var tmpZuq3Lh = curLotteryTypeYiLouDatalist.zuq3.dqmax.content.split(",");
			        	for(var d=0;d<tmpZuq3Lh.length;d++){
			        		td.innerHTML = td.innerHTML + tmpZuq3Lh[d]+"<br/>";
			        	}
			        }
			        if (i==2) {
			            td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.dqyl
			            td.style.fontSize = 18+"px"
			        }	
			        if (i==3) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.scyl}
			        if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.dqmax.zdyl}		
			    }else if (o==8) {			              	
			             if (curLotteryTypeName.indexOf("快乐十")>=0) {
			    		if (i==1) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.content}
			              	if (i==2) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.dqyl}	
			              	if (i==3) {
			              		td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.scyl
			              		td.style.fontSize = 19+"px"
			              	}
			              	if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.zuq3.scmax.zdyl}	
			              }else{
			              	if (i==1) {
				        	              var tmpZxq3Lh = curLotteryTypeYiLouDatalist.zxq3.dqmax.content.split(",");
					        	for(var d=0;d<tmpZxq3Lh.length;d++){
				        		td.innerHTML = td.innerHTML + tmpZxq3Lh[d]+"<br/>";
					        	}
					}
					if (i==2) {
					        	td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.dqyl
					        	td.style.fontSize = 18+"px"
				              }
					if (i==3) {td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.scyl}
					if (i==4) {td.innerHTML = curLotteryTypeYiLouDatalist.zxq3.dqmax.zdyl}
			              }		              			              	
			    }
			}
		}
	}
	//fillDateforYilou()
}
function createYiLouArea(){
	var tmpName = curLotteryTypeName	
	if(curOrientation=="port")
	{
		divObjyl.style.width="100%"
		divObjyl.style.height = "100%"
		adHDivContainer==undefined
	}
	else
	{
		divObjyl.style.width=adLandSpace-2+'px'
		divObjyl.style.height = tableHeight+'px'
		divObjyl.style.float="right"
		adHDivContainer = divObjyl
	}	
	yltable = document.createElement('table');
	yltable.style.width = divObjyl.style.width
	yltable.style.height =  divObjyl.style.height
	yltable.border = 1	
	yltable.className = "ylTable"

	if(divObjyl.childNodes.length>0){
		divObjyl.removeChild(divObjyl.childNodes[0])
	}
	divObjyl.appendChild(yltable)
	
	if (tmpName.indexOf("快3") >= 0) {
		
		for (var i = 0; i < adList.length; i++) {
			if (lotteryConfig.config.ads[i].name === "遗漏2") {
				drawYCK3StaticTable(); //快3遗漏2
				break;
			} else {
				drawK3StaticTable(); // 快3 遗漏
				break;	
			}
		}
	} else if (tmpName.indexOf("快乐十") >= 0 || tmpName.indexOf("11选5") >= 0 || tmpName.indexOf("快乐彩") >= 0) {
		drawStaticTable(); //11选5   快10 遗漏	
	}

	advertisingArea = false
	return divObjyl
}

function createAdvertisingArea()
{
	// var divObj = document.createElement("div")
	if(curOrientation=="port")
	{
		divObjad.style.width= "100%"
		divObjad.style.height = "100%"
		adHDivContainer==undefined
	}
	else
	{
		divObjad.style.width=adLandSpace-2+'px'
		divObjad.style.height = tableHeight+'px'
		divObjad.style.float="right"
		adHDivContainer = divObjad
	}

	adImgObj = document.createElement("img")
	adImgObj.style.width=divObjad.style.width
	adImgObj.style.height = divObjad.style.height

	if(divObjad.childNodes.length>0){
		divObjad.removeChild(divObjad.childNodes[0])
	}
	divObjad.appendChild(adImgObj)
	advertisingArea = true
	return divObjad
	
}
function updateAdvertising()//广告
{
	//liutest begin
	// if(yilouAreaEnable) return;
	//liutest end

	if(curOrientation=="port")
	{
		adImgObj.src = adList[curAdIndex>=adList.length?0:curAdIndex].v_src//改广告遗漏轮播添加的容错处理
		curAdIndex = (curAdIndex+1)%adList.length
	}
	else
	{
		adImgObj.src = adList[curAdIndex>=adList.length?0:curAdIndex].h_src
		curAdIndex = (curAdIndex+1)%adList.length
	}
	//console.log(adSwitchInterval)
	//setTimeout(updateAdvertising,adSwitchInterval*1000)
}
function addAdvertisingArea(tableObj)
{
	var tmpName = curLotteryTypeName

	if(justUpdatePrizeNumAreaFlag == true&&!updateADAndYL)
	{
		if(curOrientation=="land" && adHDivContainer)
		{
			adHDivContainer.style.width=adLandSpace-2+'px'
			adHDivContainer.style.height = tableHeight+'px'
		}
		return
	}
	clearTimeout()
	//liutest begin
	if(adList.length <= 0) return;

	// var supportYilouCaizhongFlag = (tmpName.indexOf("快乐十")>=0||tmpName.indexOf("快3")>=0||tmpName.indexOf("11选5")>=0||tmpName.indexOf("快乐彩")>=0);

	if(curOrientation == "port"){
		if (tableObj.rows.length>1) {
			if (notificationAreaEnable && (tableObj.rows.length>2)) {
				tableObj.deleteRow (2)
			}else if (!notificationAreaEnable) {
				tableObj.deleteRow (1)
			}			
		}
		var row = tableObj.insertRow (tableObj.rows.length)

		var td = row.insertCell(0)

		td.colSpan=tableColumCount+trendCellCount//tableObj.rows[0].cells.length			
		for(var i = 0;i < adList.length;i++){
			if ((lotteryConfig.config.ads[i].name == "天津")||(lotteryConfig.config.ads[i].name == "天津体彩")){
				td.height=(tableCellHeight+1)*2+1+curHeightRedundantPixels
			}else{
				td.height=(tableCellHeight+1)*5+curHeightRedundantPixels				
			}
		}		
		curHeightRedundantPixels =0

		function adverAndyilouLunBo(){
			for(var i = 0;i < adList.length;i++){
				if ((adList[i].name.indexOf("遗漏")>=0&&adList.length===1)||(adList[i].name.indexOf("遗漏")<0&&adList.length===1)){
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
				}
			}
			// alert("1111")
			if (advertisingArea) {
				divObjad.parentElement.removeChild(divObjad)
				td.appendChild(createYiLouArea());				
			}else{
				divObjyl.parentElement.removeChild(divObjyl)		
				td.appendChild(createAdvertisingArea());
				updateAdvertising();				
			}
		}

		if((yilouAreaEnable == false || supportYilouCaizhongFlag == false)&&!updateADAndYL){
			if(intervalExistFlag){
				clearInterval(setIntervalId)	
			} 
			td.appendChild(createAdvertisingArea());
			updateAdvertising();
		}else{
			for(var i = 0;i < adList.length;i++){
				if (adList[i].name.indexOf("遗漏")>=0&&adList.length>1){//有一个遗漏
					if (supportYilouCaizhongFlag) {
						//if (yilou2) {
						//	if(intervalExistFlag){
						//		clearInterval(setIntervalId)	
						//	}
						//	td.appendChild(createYiLouArea());
						//}else
						//{
							td.appendChild(createYiLouArea());
							clearInterval(setIntervalId)
							setIntervalId = setInterval(function(){
								adverAndyilouLunBo()
							},adSwitchInterval*1000);
							intervalExistFlag = true	
						//}
									
					}else{
						if(intervalExistFlag){
							clearInterval(setIntervalId)	
						}
						td.appendChild(createAdvertisingArea());
						updateAdvertising();				
					}
				}else if (adList[i].name.indexOf("遗漏")>=0&&adList.length===1) {	
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
					if (supportYilouCaizhongFlag) {					
						td.appendChild(createYiLouArea());				
					}else{
						td.appendChild(createAdvertisingArea());
						updateAdvertising();				
					}
				}else if (adList[i].name.indexOf("遗漏")<0&&adList.length===1) {
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
					td.appendChild(createAdvertisingArea());
					updateAdvertising();
				}else if (GuangGao&&adList.length>1) {
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
					td.appendChild(createAdvertisingArea());
					updateAdvertising();
				}
			}						
		}		
	}
	else{
		try{
			document.body.removeChild(divObjyl)
		}catch(e){console.log(e)}
		try{
			document.body.removeChild(divObjad)
		}catch(e){console.log(e)}
		function adverAndyilouLunBoLand(){
			for(var i = 0;i < adList.length;i++){
				if ((adList[i].name.indexOf("遗漏")>=0&&adList.length===1)||(adList[i].name.indexOf("遗漏")<0&&adList.length===1)){
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
				}
			}
			if (advertisingArea) {
				divObjad.parentElement.removeChild(divObjad)
				document.body.appendChild(createYiLouArea());				
			}else{
				divObjyl.parentElement.removeChild(divObjyl)		
				document.body.appendChild(createAdvertisingArea());
				updateAdvertising();				
			}
		}
		if(yilouAreaEnable == false || supportYilouCaizhongFlag == false&&!updateADAndYL){

			if(intervalExistFlag){
				clearInterval(setIntervalId)	
			} 
			document.body.appendChild(createAdvertisingArea());
			updateAdvertising();
		}else{
			// document.body.appendChild(createYiLouArea());

			for(var i = 0;i < adList.length;i++){
				if (adList[i].name.indexOf("遗漏")>=0&&adList.length>1){//有一个遗漏
					if (supportYilouCaizhongFlag) {
						document.body.appendChild(createYiLouArea());
						clearInterval(setIntervalId)
						setIntervalId = setInterval(function(){
							adverAndyilouLunBoLand()
						},adSwitchInterval*1000);
						intervalExistFlag = true	
									
					}
					else{
						if(intervalExistFlag){
							clearInterval(setIntervalId)	
						}	
						document.body.appendChild(createAdvertisingArea());
						updateAdvertising();			
					}
				}else if (adList[i].name.indexOf("遗漏")>=0&&adList.length===1) {	
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
					if (supportYilouCaizhongFlag) {					
						document.body.appendChild(createYiLouArea());				
					}else{
						document.body.appendChild(createAdvertisingArea());
						updateAdvertising();					
					}
				}else if (adList[i].name.indexOf("遗漏")<0&&adList.length===1) {
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
					document.body.appendChild(createAdvertisingArea());
					updateAdvertising();	
				}else if (GuangGao&&adList.length>1) {
					if(intervalExistFlag){
						clearInterval(setIntervalId)	
					}
					document.body.appendChild(createAdvertisingArea());
					updateAdvertising();	
				}
			}				
		}
	}
}
function coverArea(){
	curLotteryTypePeriod = lotteryConfig.config.lotteries[curLotteryTypeIndex].periods
	overdueDiv = document.getElementById("overdueDiv")
	coverImgDiv = document.getElementById("CoverImgDiv")
	coverSrc = "http://doyeecai.oss-cn-beijing.aliyuncs.com/AgentInfo/registor-60.png";
	// console.log(destPrizeItemCount)
	if (curLotteryTypePeriod>100) {
		curLotteryTypePeriod = curLotteryTypePeriod*1000
		DueTime = new Date().getTime()
		if (curLotteryTypePeriod<DueTime) {//true
			overdueDiv.style.display = "block";			
			if (curOrientation==="port") {
				overdueDiv.style.width = "717px";
				overdueDiv.style.height = "350px";

				coverImgDiv.innerHTML = "<img src =\""+coverSrc+"\" height = 100%>";
			}
			
		}
	}else{
		overdueDiv.style.display = "none";	
	}
}


function initTableContent()
{
	
	rootTable = document.getElementById("k3table");
	tableContainer = document.getElementById("tableContainer");
	tableContainer.onclick = handlekeyright	
	tableCaption = document.getElementById("tablecaption")
	bodyContentTr = document.getElementById("bodyContentTr")
	resetTable()
	if(curOrientation == "land")
	{
		if(advertisingAreaEnable)
			tableWidth = 1280-240-2 // 240 是横屏固定预留空间
		else
			tableWidth=1280-2
		tableHeight = 720-2
	}
	else
	{
		tableWidth = 720-2
		tableHeight = 1280-2
	}
	tableColumCount=0
	tableRowCount=0
	trendCellCount=0

	configLotteryInfo()
	if(needInitNumberMatrix){
		updateNumberMatrix(0)//分析连号矩阵数据
		needInitNumberMatrix=false
	}
	for(var i in componentList)
	{
		switch(''+componentList[i])
		{
			case "1":
			// case 1:
			case "prizeIssue":
				createPrizeIssue()
				break;
			// case 2:
			case "2":
			case "prizeNum":
			    createPrizeNum(prizeNumLength,3,false,false,false,false,false,false,false,false,true)//为做全奇全偶
				break;
			case 3:
			case "3":
			case "prev3PrizeNum":
				createPrizeNum(3,3)
				break;
			case 4:
			case "4":
			case "prev3PrizeNumTrend":
				createPrev3PrizeNumTrend()//createOneOfPrizeNumTrend
				break;
			case 5:
			case "5":
			case "prizeNumDistribution":
			    createPrizeNumDistribution(prizeNumLength,false)
				break;
			case 6:	
			case "6":
			case "prizeNumDistributionAsBall":
			    createPrizeNumDistribution(prizeNumLength, true)
				break;
			case 7:
			case "7":
			case "prev3PrizeNumDistribution":
			    createPrizeNumDistribution(3)
				break;
			case 8:
			case "8":
			case "prizeNumRepeatTimes":
				createPrizeNumRepeatTimes(prizeNumLength)
				break;	
			case 9:
			case "9":
			case "prev3PrizeNumRepeatTimes":
				createPrizeNumRepeatTimes(3)
				break;	
			
			case 10:
			case "10":
			case "prev3PrizeNumSum":
				createPrizeNumSum(3)
				break;	
			case 11:
			case "11":
			case "prev3PrizeNumDistance":
				createPrizeNumDistance(3)
				break;
			case 12:
			case "12":
			case "prizeNumDistance":
				createPrizeNumDistance(prizeNumLength)
				break;
			case 13:
			case "13":
			case "prev3PrizeNumDistanceTrend":
				createPrizeNumDistanceTrend(3)
				break;
			case 14:
			case "14":
			case "prizeNumDistanceTrend":
				createPrizeNumDistanceTrend(prizeNumLength,false,false,true)
				break;
			
			case 15:
			case "15":
			case "prev3PrizeNumWith012Trend":
				createPrev3PrizeNumWith012Trend()
				break;
			case 16:
			case "16":
			case "testNum":
				createPrizeNum(3,prizeNumLength,true)
				break;
			case 17:
			case "17":
			case "prevAreaPrizeNumDistribution":
				createPrevAreaPrizeNumDistribution()
				break;
			case 18:
			case "18":
			case "backAreaPrizeTrend":
				createBackAreaPrizeTrend()
				break;
			case 19:
			case "19":
			case "backAreaPrizeNumDistribution":
				createBackAreaPrizeNumDistribution()
				break;
			case 20:
			case "20":
			case "k3prizeNumSumTrend"://快3 基本 高级
			            createPrizeNumSumTrend(3,true)//快3和值走势
				break;
			case 21:	
			case "21":
			case "k3GJprizeNumSum012Trend"://快3  高级版
			                createPrizeNumSum012Trend(3)//快3和值012路
				break;		

			case 22:
			case "22":
			case "prizeNumFormTrend"://快3高级 金七乐2
				createPrizeNumFormTrend()//号码形态走势
				break;

			case 23:
			case "23":
			case "k3prizeNum"://快3 珍藏版 高级版 基本版
				if(curLotteryTypeName.indexOf("481")>=0){
					createPrizeNum(prizeNumLength,4)
				}
				else{
					createPrizeNum(prizeNumLength,3,false,true)//快3开奖号
				}			                
				break;

			case "24":
			case 24:
			case "k3prizeNumDistribution"://快3  珍藏版 高级版 基本版
				createPrizeNumDistribution(prizeNumLength,false,true)//快3号码分布
				break;

			case "25":
			case 25:
			case "k3PrizeNumTrend"://快3 基本
			          createk3Prev3PrizeNumTrend()//快3百十个走势
			          break;

			case 26:
			case "26":
			case "k3GaojiprizeNumDistanceTrend"://快3 高级
				createPrizeNumDistanceTrend(prizeNumLength,true)//快3跨度走势
				break;

			case 27:
			case "27":
			case "k3ZCprizeNumSumTrend"://快3 珍藏
			            createPrizeNumSumTrend(3,false,true)//快3珍藏和值走势
				break;

			case "28":
			case 28:
			case "k3ZChistoryPrizeIssue"://快3 珍藏
				createPrizeIssue(false,false,true,false,false,true)//快3历史期号
				break;

			case "29":
			case 29:
			case "k3ZChistoryPrizeNum"://快3 珍藏历史
				createPrizeNum(prizeNumLength,3,false,false,false,false,false,true)//快3历史开奖号
				break;	


			case 30:
			case "30":
			case "k10aver4PrizeNumDistribution": //快10四分区
			             createAver4PrizeNumDistribution()//
			             break;
			case "31":
			case 31:
			case "k10Aver4Prev3PrizeNum"://快10 四分区 前三中奖号
			           createPrizeNum(3,3,false,false,true)//快10四分区前三直
			          break;
					
			case "32":
			case 32:
			case "k10Aver4PrizeNumRepeatTimes": //快10 四分区
			              createPrizeNumRepeatTimes(prizeNumLength,true)//快10 四分区重号
				break;
			

			case 33:
			case "33":
			case "k10aver2PrizeNumDistribution": //快10 二分区
			             createAver2PrizeNumDistribution()//
			             break;	

			
			case "34":
			case 34:
			case "k10Aver2PrizeNumRepeatTimes": //快10 二分区
			       createPrizeNumRepeatTimes(prizeNumLength,false,false,true) //快10 二分区重号
				break;	

		               case "35":
			 case 35:
			 case "k10Aver2PrizeNumOdd"://快10 二分区 奇数
			            createPrizeNumOdd(prizeNumLength,false,true)//快10二分区奇数
			            break;	


			case "36":
			case 36:
			case "k10Aver2Prev3PrizeNum"://快10 二分区
			           createPrizeNum(3,3,false,false,false,false,true)//快10 二分区前三直
			          break;	
			case 37:
			case "37":
			case "k10PrizeIssue"://快10  二分区  四分区
			             createPrizeIssue(false,true)//快10 期号1
			             break;
				
		            case "38":
			case 38:
			case "k10GreenPrizeNumDistance"://快10 绿色
			          createPrizeNumDistance(prizeNumLength,true)//快10 绿色版跨度
			          break;
			case 39:
			case "39":
			case "k10GreenPrizeNumOdd"://奇数 快10绿色版
			             createPrizeNumOdd(prizeNumLength,true)//快10 绿色版奇数
			             break;
			
			case "40":
			case 40:
			case "k10prev3GreenPrizeNum"://快10 绿色版
			          createPrizeNum(3,3,false,false,false,true)//	快10绿色版前三直	          
			          break;    

			case "41":
			case 41:
			case "k10GreenPrizeIssue"://快10 绿色版
			          createPrizeIssue(true)//快10 绿色版期号		          
			          break;       

			 case "42":
			case 42:
			case "k10GreenPrizeNumDistribution"://快10 绿色版
			          createk10GreenPrizeNumDistribution(prizeNumLength)//快10 绿色版号码分布	          
			          break;           

			case 43:
			case "43":
			case "k10GreenPrizeNumRepeatTimes"://快10 绿色版
			               createPrizeNumRepeatTimes(prizeNumLength,false,true) //快10 绿色版重号
			               break; 			

		             case "44":
			case 44:
			case "prev3j7l1PrizeNumTrend"://金七乐１前区走势			
			          	createPrev3PrizeNumTrend(false,true)//金七乐前区走势			          
			          	break;

			case "45":
			case 45:
			case "j7l1prizeNumDistribution"://金七乐１ 前区开奖			
				createPrizeNumDistribution(3,false,false,false,true)//金七乐1 前区分布				
				break;

			case "46":
			case 46:
			case "j7l1prizeNumSum"://金七乐１
			           createPrizeNumSum(prizeNumLength,true)//金七乐1和值	          
			          break;

			 case "47":
			 case 47:
			 case "j7l1prizeNumOdd"://奇数 金七乐１
			            createPrizeNumOdd(3,false,false,true)//金七乐１奇数
			            break;
			 
			case "48":
			case 48:
			case "j7l1PrizeNum"://金七乐1
			            createj7PrizeNum(4,true)  // 金七乐1开奖号  
			          break;

		　　　 case "49":
			case 49:
			case "j7l2prizeNumDistribution"://金七乐２
				createPrizeNumDistribution(3,false,false,false,false,true)//金七乐２前区分布
				break;

			case "50":
			case 50:
			case "j7l2prizeNum"://金七乐2
			          createj7PrizeNum(4,true)//金七乐2开奖号		          
			          break;    

			case "51":
			case 51:
			case "j7backAreaPrizeNum012Val"://金七乐1   2
			          createbackAreaPrizeNum012Val()//金七乐后区012值		          
			          break;   

		           

		             case 52:
			case "52":
			case "j7l2prizeNumDistanceTrend"://金七乐2 跨度走势
				createPrizeNumDistanceTrend(prizeNumLength,false,true)//金七乐跨度走势
				break;	

			case 53: 	
			case "53":
			case "j7lPrizeNumSumTrend"://金七乐和值走势
			         createPrizeNumSumTrend(3,false,false,true)//金七乐和值走势
			         break;
			

			case 54:
			case "54":
			case "k12Qianprev3PrizeNumDistance"://快乐 12  前置版 前三跨度
				createPrizeNumDistance(3,false,true)//快乐12前三跨度
				break;

			case "55":
			case 55:
			case "k12QianPrev3prizeNumSum"://快乐12 前置版 前三中奖号和值
			           createPrizeNumSum(3,true)//快乐12前三和值		          
			          break;

			case 56:	
			case "56":
			case "k12prizeNumDistributionAsBall"://快12  球形  前置版 后置
			    createPrizeNumDistribution(prizeNumLength, true,false,true)//快乐12球形分布
				break;

			case 57:
			case "57":
			case "k12prev3PrizeNumTrend"://快乐12  前置版 后置版
				createPrev3PrizeNumTrend(true)//快乐12前三走势
				break;

			
			case "58":
			case 58:
			case "k12HouprizeNumSum"://快乐12 后置版 全部中奖号和值
			           createPrizeNumSum(prizeNumLength,true)//快乐12总和值		          
			          break;

			case "59":
			case 59:
			case "k12HouprizeNumDistance"://快乐12 后置版 全部中奖号跨度
				createPrizeNumDistance(prizeNumLength,false,true)//快乐12总跨度
				break;
			case "60":
			case 60:
			case "k12prizeNumRepeatTimes"://快乐12 前置版后置版
			          createPrizeNumRepeatTimes(prizeNumLength,false,false,false,true)//快乐12 重号
			          break;

			case "61":
			case 61:
			case "k12JDhistoryPrizeIssue"://快12 经典历史
				createPrizeIssue(false,false,true,false,true)//快乐12历史期号
				break;

			 case "62":
			case 62:
			case "k12JDprizeNum"://快乐12 经典版开奖顺序
				createPrizeNum(prizeNumLength,3,false,false,false,false,false,false,true,false,true)//快乐12开奖号码 //为做全奇全偶
				break;	

			case "63":
			case 63:
			case "k12JDhistoryPrizeNum"://快乐12 经典版 历史数据
				createPrizeNum(prizeNumLength,3,false,false,false,false,false,false,false,true,false,false,true)//快乐12历史开奖号 //为做全奇全偶
				break;	

			case "64":
			case 64:
			case "k12JDPrizeNumSum": //快乐12 经典 全部中奖号 和值
				createPrizeNumSum(prizeNumLength,false,true)//快乐12经典版总和值		 
				break;

			case "65":
			case 65:
			case "k12JDPrizeNumDistance": //快乐12 经典 全部中奖号跨度
				createPrizeNumDistance(prizeNumLength,false,false,true)//快乐12经典版总跨度
				break;				
			

			case 66:	
			case "66":
			case "k12JDprizeNumDistributionAsBall"://快12经典  球形
			    createPrizeNumDistribution(prizeNumLength, true,false,true,false,false,false,true)//快乐12 经典版球形分布
				break;
			case "67":
			case 67:
			case "k12JDPrizeNumRepeatTimes": //快乐12 经典
	                             createPrizeNumRepeatTimes(prizeNumLength,false,false,true,false,true)// 快乐12 经典版重号
				break;
			case "68":
			case 68:
			case "K3Distance012"://快3跨度012路
				createPrizeNumSum012Trend(3,true);
				break;
			case "69":
			case 69:
			case "K3PrizeSumendTrend"://快3和尾走势
				createPrizeNumSumTrend(3,true,false,false,true);
				break;
			case "70":
			case 70:
			case "K3PrizeSumend012"://快3和尾012路
				createPrizeNumSum012Trend(3,false,true);
				break;
			case "71":
			case 71:
			case "K3PrizeSumBig"://快3和值大小走势
				createPrizeNumSumbigAndOddTrend(3,true,false);
				break;
			case "72":
			case 72:
			case "K3PrizeSumendOdd"://快3和尾单双走势
				createPrizeNumSumbigAndOddTrend(3,false,true);
				break;

			case "73"://11选5绿色期号
			case 73:
			case "11x5GreenPrizeIssue"://11选5绿色版期号
			            createPrizeIssue(false,false,false,false,false,false,true);
			            break;
			case "74"://11选5绿色走势
			case 74:            
			case "11x5GreenPrizeNumDistribution"://11选5绿色版开奖走势
			           createPrizeNumDistribution(prizeNumLength,false,false,false,false,false,false,false,true);
			            break;
			 case "75"://11选5绿色中奖号重号
			case 75:                     
			case "11x5GreenPrizeNumRepeatTmes"://11选5绿色版中奖号重号
			            createPrizeNumRepeatTimes(prizeNumLength,false,false,false,false,false,true)
			            break;
			case "76"://11选5绿色中奖号跨度
			case 76:                      
			case "11x5GreenPrizeNumDistance"://11选5绿色版中奖号跨度
			            createPrizeNumDistance(prizeNumLength,false,false,false,true)
			            break;
			case "77"://11选5绿色中奖号前三走势
			case 77:                       
			case "11x5GreenPrev3PrizeNumTrend"://11选5绿色版中奖号前三走势
			            createPrev3PrizeNumTrend(false,false,true)
			            break;
			case "78"://11选5绿色中奖号前三和值
			case 78:                
			case "11x5GreenPrizeNumSum"://11选5绿色版中奖号前三和值
			           createPrizeNumSum(3,false,false,true)
			            break;


			case "79"://大乐透-版式2 前区
			case 79:   
			case "daLeTouPrevAreaPrizeNumDistribution"://大乐透-版式2 前区
                                                   createPrevAreaPrizeNumDistribution(true)
			         break;

			case "80"://大乐透-版式2 后区
			case 80:   
			case "daLeTouBackAreaPrizeNumDistribution"://大乐透-版式2 后区
			         createBackAreaPrizeNumDistribution(true)
			         break;

			case "81":
			case 81:
			case "pai5PrizeNumSum"://排五中奖号码和值
				createPrizeNumSum(5)
				break;

			case "82":
			case 82:
			case "pai5PrizeNumBig"://排五中奖号码大小
				createPrizeNumBigAndOddVal(5,true,false)
				
				break;
			case "83":
			case 83:
			case "pai5BigOdd"://排五中奖号码单双
				createPrizeNumBigAndOddVal(5,false,true)
				
				break;

			case "84":
			case 84:
			case "pai5PrizeNumTrend"://排列五中奖号码走势图
			         createPrizeNumTrend(true)
			         break;

			case "85":
			case 85:
			case "pai3PrizeNum"://排列三中奖号码
			         createPrizeNum(3,0,false,false,false,false,false,false,false,false,false,true)
			         break;

			case "86":
			case 86:
			case "pai3PrizeNum012Value"://排列三中奖号012路数
				createPai3PrizeNum012Val()
			         break;

			case "87":
			case 87:
			case "7XingCaiPrizeNum"://七星彩中奖号码
			         createPrizeNum(7)
			         break;

		             case "88":
			case 88:
			case "7XingCaiPrizeNumTrend"://七星彩中奖号码走势图
		                       createPrizeNumTrend()
			         break; 

			case "89":
			case 89:
			case "k3prizeNumShuDistribution"://快3  
				createPrizeNumDistribution(prizeNumLength,false,false,false,false,false,false,false,false,true)//快3数字号码分布
				break;
			case "90":
			case 90:
			case "prizeNumRepeatTimesTrend":
			         createPrizeNumRepeatTimesTrend(prizeNumLength)
			         break;

			case "91":
			case 91:
			case "prizeNumSumBig30SmallTrend":
			         createPrizeNumSumBig30SmallTrend(prizeNumLength)
			         break;

			case "92":
			case 92:
			case "prizeNumSumOdd":
			         createPrizeNumSumbigAndOddTrend(prizeNumLength,false,false,true);
			         break;

			case "93":
			case 93:
			case "prizeNumMantissa" :
				createPrizeNumMantissa(prizeNumLength);
			break;


			case "94":
			case 94:
			case "mahjongDistribution":
				createMahjongDistribution(prizeNumLength);
			break;

			case "95":
			case 95:
			case "PrizeNumOddTrend":
				 createPrizeNumOddTrend(prizeNumLength)
			break;

			case "96":
			case 96:
			case "PrizeNumBigNum":
				createPrizeNumBigNum(prizeNumLength)
			break;


		}
	}
	supportYilouCaizhongFlag = (curLotteryTypeName.indexOf("快乐十")>=0||curLotteryTypeName.indexOf("快3")>=0||curLotteryTypeName.indexOf("11选5")>=0||curLotteryTypeName.indexOf("快乐彩")>=0);	
	showTipsInfo()
	
	if(notificationAreaEnable)  //in tfootArea
		addNotifyArea(rootTable)
	if(advertisingAreaEnable)  {//in tfootArea
		addAdvertisingArea(rootTable)
	}
	coverArea()
	justUpdatePrizeNumAreaFlag=false
}