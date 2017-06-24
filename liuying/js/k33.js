var gVersion= "3.426"
var holdSnChar="******"
var updateTableContentFlag=false
var updateTableContentInterval=0

var updateWebsocketStateFlag = true

var systemUpdateFlag=false
			
var backgroundNumberEnabled=false

//new test data
var lotteryConfig
var lotteryTypeList
var curLotteryTypeIndex = 0
var curLotteryTypeName
var curLotteryTypeDataList

var curLotteryTypeStyleIndex=0 
var curLotteryTypeStyleName //todo addcurLotteryStyleName
var curLotteryTypeStyleList

var trendWidthRedundantPixels=0 //宽度冗余像素
var heightRedundantPixels = 0 //高度冗余像素
var curTrendWidthRedundantPixels=0 //宽度冗余像素
var curHeightRedundantPixels = 0 //高度冗余像素
var widthSquarCount = 28 //宽度分割的方格数



var componentList
var reservedLines = 3
//global
var rootTable
var tableContainer
var prizeNumLength
var prizeNumMax
var prizeNumMin
var prizeNumAvailableNumCount

//var prizeNumIssueWidth = 60
var captionHeight //=tableCellHeight*2+多余空间
var headRowsNum = 2
var footRowsNum = 1


var destPrizeItemCount = 40
var landDestPrizeItemCount = 24

var showPrizeItemCount

var tableColumCount=0
var tableRowCount=0
var trendCellCount=0

var tableCellWidth = 18
var tableCellHeight = 20
var trendCellWidth =12

var prevAreaPrizeNumMax = 33  //ssq; 35for dlt
var backAreaPrizeNumMax = 16 //ssq; 12for dlt
var prevAreaPrizeNumLength = 5 //ssq 6;5 for dlt

var tableCaption   //2rows height
var titleDiv //显示标题



var bodyContentTr

var tableWidth
var tableHeight
var tbodyHeight

var notificationAreaEnable //1rows height
var notifyRowsNum = 1
var advertisingAreaEnable  //5rows height
var advertisingRowsNum = 5

var curOrientation="port"
var adLandSpace=240 

var justUpdatePrizeNumAreaFlag=false

//liutest beign
var yilouAreaEnable = false
var yltable
var historyNumbers= [];
var gLotteryDataList85 = [];

var gNewYlFlag = false;//liutest 1124
//liutest end

//for debug
var debugDiv
var loginContainerDiv;
var loginDiv;
var loginContentTable;
var loginProgressTipsDiv;
var uidInpupt;
var commitButton;
var loginState="logout" //loginfail,loginsuccess,logout
var accountExpiringtipsVisible=false
var accountExpiringtipsInterval=10
var expirydate
var xmlhttpLogin;
var gFirstLoadFlag = false;

var orderChannelFlag=false
var notifyList=["this is the first notify","this is the second notify"]
var loops = -1 //<=0 forever
var scrolldelay = 1000//time  ms
var scrollamount = "50" //speed  pxiels/per ms
var bgColor = "white"


window.onload = function(){

// setTimeout(function(){
	// 1008修改登录方式 if((localStorage.uidInitialized==undefined || localStorage.uidInitialized=="") && (localStorage.sn !=""))
	// 1008修改登录方式 	localStorage.autoLoginFlag=true  // if first time run and server not response when user quit,it should login auto next time
	gFirstLoadFlag = true;
    // 1008修改登录方式  start
	checkXmlHttp = new XMLHttpRequest()
	checkXmlHttp.onreadystatechange = handleDoCheckRequest
	// 1008修改登录方式 end

	if("undefined" != (typeof envInfo) )
	{
	//console.log("window.onload and envInfo",envInfo)
	curOrientation= envInfo.getOrientation()
	//console.log("window.onload and curOrientation",curOrientation)
	}
	updateLoginState()
	//setAgent("10")//代理渠道号  二维码信息函数
// },5000)
}


function handleDoCheckRequest()
{


	if (checkXmlHttp.readyState==4)
	{
		if(checkXmlHttp.status==200)
		{

			doCheckConnectionCount=0
			if(networkErrorTipsVisible)//networkErrorTipsVisible位true则显示错误信息
			{
				networkErrorTipsVisible=false
				floatDiv.style.display="none"
				// updateLoginState()
				requestLogin(false)
			}
			if(styleTitleDiv){
				styleTitleDiv.style.backgroundColor = "blue";
			}
		}
		else if(checkXmlHttp.status==0)
		{
			showNetworkErrorTips()
		}
	}
}
function updateLoginState(justAdjustPosition)
{
	//console.log("updateLoginState:",localStorage.autoLoginFlag+" loginState:"+loginState)
	if(loginContainerDiv==undefined)//登陆容器Div
	{
		loginContainerDiv = document.getElementById("loginContainerDiv")
	}
	if(loginDiv ==undefined)//登陆的Div
	{
		loginDiv = document.getElementById("loginDiv")
	}
	if(loginContentTable==undefined)//登陆内容 表table
	{
		loginContentTable = document.getElementById("loginContentTable")
	}
	if(loginProgressTipsDiv ==undefined)//登录进度提示DIV 
	{
		loginProgressTipsDiv = document.getElementById("loginProgressTipsDiv")
	}
	if(uidInpupt ==undefined)//用户uid
	{
		uidInpupt = document.getElementById("uidInpupt")
	}
	if(commitButton ==undefined)//提交按钮 
	{
		commitButton = document.getElementById("commitButton")
		commitButton.onclick=handleCommitButtonClicked
	}
	// 1008修改登录方式 console.log("updateLoginState:",localStorage.autoLoginFlag+" localStorage.sn:"+localStorage.sn+(localStorage.sn !="")+(localStorage.autoLoginFlag=="true"))
	
	if(curOrientation=="port")
	{
		loginContainerDiv.style.top=0+'px'
		loginContainerDiv.style.left=0+'px'
		loginContainerDiv.style.width="100%"
		loginContainerDiv.style.height="100%"
		loginDiv.style.top=260+"px"
		loginDiv.style.left=10+"px"
	}
	else
	{
		loginContainerDiv.style.top=0+'px'
		loginContainerDiv.style.left=0+'px'
		loginContainerDiv.style.width="100%"
		loginContainerDiv.style.height="100%"
		loginDiv.style.top=10+"px"
		loginDiv.style.left=260+"px"
	}
	
	if(justAdjustPosition == true){
		return
	}
	// 1008修改登录方式 if((localStorage.autoLoginFlag=="true") && (localStorage.sn !=""))  //undefined or false,need confirm
	if((localStorage.uidInitialized=="true") && (localStorage.sn !="")) // 1008修改登录方式 
	{
		//console.log("updateLoginState:111111111111111111")
	
		loginContentTable.style.display="none"
		loginProgressTipsDiv.style.display="block"
		loginContainerDiv.style.display="block"
		requestLogin(false)
	}
	else
	{
		//console.log("updateLoginState:2222222222222")
		loginContentTable.style.display="block"
		loginProgressTipsDiv.style.display="none"
		loginContainerDiv.style.display="block"
		//uidInpupt.value=(localStorage.sn==undefined|| (localStorage.sn !=undefined && localStorage.sn==""))?"":localStorage.sn
		uidInpupt.value=(localStorage.osn==undefined|| localStorage.osn=="")?"": localStorage.osn//holdSnChar+localStorage.osn.substring(localStorage.osn.length-4) // 1008修改登录方式 
		//uidInpupt.focus()
	}
}
function handleCommitButtonClicked()//处理 允许点击按钮
{
	loginContentTable.style.display="none"
	loginProgressTipsDiv.style.display="block"
	loginContainerDiv.style.display="block"
	requestLogin(true)
}

function requestLogin(user)//请求登录
{
	//console.log("requestLogin:111111111111111111",user)
	xmlhttpLogin = new XMLHttpRequest()
	xmlhttpLogin.onreadystatechange = handleLoginRequestResponse
	xmlhttpLogin.ontimeout = function (){
		requestLogin(user);
	}
	if(user)
	{
		if(localStorage.osn == undefined)
		{
			localStorage.osn = uidInpupt.value
			sendVerifyRequest(uidInpupt.value,user)
		}
		else
		{
			/* 1018 delete    
			if(uidInpupt.value.indexOf(holdSnChar) == 0 && uidInpupt.value.substring(uidInpupt.value.length-4)==localStorage.osn.substring(localStorage.osn.length-4))
			{
				sendVerifyRequest(localStorage.osn,user)
			}
			else*/
			{
				localStorage.osn = uidInpupt.value
				sendVerifyRequest(uidInpupt.value,user)
			}
		}
		

	}
	else
	{
		sendVerifyRequest(localStorage.sn)
	}
}

function sendVerifyRequest(uid,needSha1)//发送验证请求
{
	if(needSha1){
		//console.log("login.js sendVerifyRequest:uid:"+uid)
		var shaObj = new jsSHA("SHA-1", "TEXT");
		shaObj.update(uid);
		uid = shaObj.getHash("HEX");
	}
	
	localStorage.sn=uid
	xmlhttpLogin.open("post","http://123.57.212.33/wserver/login",true);
	xmlhttpLogin.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttpLogin.send("uid="+uid);
	
}

function handleLoginRequestResponse()//处理登录请求响应 
{
	//console.log("login handleLoginRequestResponse:"+xmlhttpLogin.readyState+":"+xmlhttpLogin.status)
	if (xmlhttpLogin.readyState==4)  /*readyState
					    0：请求未初始化（还没有调用 open()）。
					    1：请求已经建立，但是还没有发送（还没有调用 send()）。
					    2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
					    3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
					    4：响应已完成；您可以获取并使用服务器的响应了。
					*/
	{
		if(xmlhttpLogin.status==200)//200 代表请求成功
		{
			var result= JSON.parse(xmlhttpLogin.responseText)//JSON.parse() 方法可以将一个 JSON 字符串解析成为一个 JavaScript 值
			//console.log("login.hs handleLoginRequestResponse"+xmlhttpLogin.responseText)
			if(result.code=="0") //success
			{
             //1008修改登录方式 start
				if(localStorage.uidInitialized == undefined)
				{
					localStorage.uidInitialized = true
				}
             //1008修改登录方式 end
				loginState="loginsuccess"
				// 1008修改登录方式 localStorage.autoLoginFlag = true
				loginContainerDiv.style.display="none"
				//document.body.focus()
				initWorkspaceEnv()
			}
          // 1008修改登录方式 start
			else if(result.code=="201") //uid not exist
			{
				//show warning info
				loginContainerDiv.style.display="none"
				if(localStorage.agentphoneNumber != undefined)
				{
					showSysEventFloat(1,"您的帐号 <span style='color:red;'>"+localStorage.osn+"</span> 不存在，请联系 <br /><span style='color:red;font-size:32px;font-style:italic;'>"+localStorage.agentphoneNumber+"</span><br />确认您的帐号，并重新启动应用登录！<br/>") 
				}
				else
				{
					showSysEventFloat(1,"您的帐号 <span style='color:red;'>"+localStorage.osn+"</span> 不存在，请联系 <br /><span style='color:red;font-size:32px;font-style:italic;'>"+010-82560668+"</span><br />确认您的帐号，并重新启动应用登录！<br/>") 
				}
			}
          // 1008修改登录方式 end
			/*  1008修改登录方式 
			else
			{
				loginState="loginfail"
				localStorage.autoLoginFlag=false
				updateLoginState()
			}
			*/
		}
		else
		{
          // 1008修改登录方式 start
			loginState="loginfail"
			showNetworkErrorTips()

          // 1008修改登录方式 end
			/* 1008修改登录方式 
          console.log("login.hs handleLoginRequestResponse serverse not ok"+JSON.parse(xmlhttp.responseText))
			loginState="loginfail"
			localStorage.autoLoginFlag=false
			updateLoginState()*/
		}
		
	}
}
























//登录成功后的操作

function initWorkspaceEnv(){//初始化工作环境
	
	//document.body.focus()
	requestLotteryConfig()
	initWebSocket()
	//alert("start interval 1000 ms")
	// 使用java线程替代
	//alert("setInterval success with html (typeof envInfo)"+(typeof envInfo))
	if("undefined" == (typeof envInfo))//环境信息中的一个
	{
		//alert("setInterval success with html")
		lastIntervalTimerID = setInterval(checkAndUpdateStateRegularly,1000)/*setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。 调用函数checkAndUpdateStateRegularly每1000毫秒
                       // 最后间隔定时器                                                                                                    setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。*/
	}
	
	//showDebugInfo()
}




//uid not exist

function showSysEventFloat(type,info)
{
	//return //todo: need open
	var floatDiv;
	if(floatDiv==undefined)
	{
		floatDiv=document.getElementById("floatDiv")
	}
	var floatDivContent;
	if(floatDivContent==undefined)
	{
		floatDivContent=document.getElementById("floatDivContent")
	}
	var systemEventDetail = document.getElementById("systemEventDetail")
	systemEventDetail.innerHTML = info
	switch(type)
	{
		case 1:
			//systemEventTitle.innerHTML="您的帐号已到期，请联系 <br /><span style='color:red;font-size:32px;font-style:italic;'>"+agentphoneNumber+"</span><br />续费，以免影响您的使用！"  
			//1008修改登录方式 localStorage.autoLoginFlag = true
			break;
		case 2: 
			//systemEventTitle.innerHTML="异地登陆"  
			//1008修改登录方式 localStorage.autoLoginFlag = true
			break;
		case 3:
			//systemEventTitle.innerHTML="您被踢下线" 
			//1008修改登录方式 localStorage.autoLoginFlag = true
			break;
		case 4:
			//systemEventTitle.innerHTML="您的帐号即将到期，请联系 <br /><span style='color:red;font-size:32px;font-style:italic;'>"+agentphoneNumber+"</span><br />续费，以免影响您的使用！"  
			accountExpiringtipsVisible=true
			break;
			//1008修改登录方式 add
		case 5:
			networkErrorTipsVisible = true
			break;

	}	

	if(curOrientation=="port")
	{
		floatDivContent.style.top=260+"px"
		floatDivContent.style.left=10+"px"
	}
	else
	{
		floatDivContent.style.top=10+"px"
		floatDivContent.style.left=260+"px"
	}
	floatDiv.style.display="block"
}


//网络异常
function showNetworkErrorTips()
{
	if(styleTitleDiv){
		styleTitleDiv.style.backgroundColor = "red";
		styleTitleDiv.innerHTML = "网络异常"
	}
	networkErrorTipsVisible = true
	// showSysEventFloat(5,"网络异常，请确认网络是否正常！") 

}


function requestLotteryConfig()//彩票配置信息 config
{
	xmlhttpconfig = new XMLHttpRequest()// XMLHttpRequest 对象用于在后台与服务器交换数据
	
	xmlhttpconfig.onreadystatechange = handleRequestLotteryConfigResponse//触发handleRequestLotteryConfigResponse函数
	xmlhttpconfig.open("GET","http://123.57.212.33/wserver/init/config?uid="+localStorage.sn,true);
	xmlhttpconfig.send();/*xmlhttp.open  xmlhttp.send将请求发送到服务器*/
}

function handleRequestLotteryConfigResponse()//处理彩票配置请求响应
{
	if (xmlhttpconfig.readyState==4)
	{
		if(xmlhttpconfig.status==200)
		{
			var result= xmlhttpconfig.responseText
			initLotteryConfig()
		}
		else
		{
			//console.log(xmlhttpconfig.status)
		}
	}
}



//websocket
function initWebSocket()
{
	if(ws !== null && ws.readyState!==3)
	{
		ws.close()
	}
	
	ws = new WebSocket("ws://123.57.212.33:8888/push?uid="+localStorage.sn)//创建Socket实例
	console.log("initWebSocket ws.readyState:",ws.readyState)
	ws.onopen = function(event)//打开Socket 
	{
		websocketClosed = false
		if(orderChannelFlag)
		{
			orderChannel(curLotteryTypeName)
		}
		//orderChannel(curLotteryTypeName) //use curLotteryTypeName instead
		updateWebsocketStateFlag=true
	}

	ws.onmessage=function (event)//监听消息
	{
		//alert("ws.onmessage:"+event.data)
		var receivedObj = JSON.parse(event.data)
		handlePushMessage(receivedObj)
	}
	ws.onclose = function()//监听Socket的关闭
	{
		websocketClosed = true
		updateWebsocketStateFlag = false
	}
	ws.onerror = function (event)
	{
		//0930 alert("ws sockek onerror"+event.data)
		ws.close()
	}
}



function orderChannel(channel)//订阅途径
{
	if(ws.readyState==1){//1 请求已提出（调用 send() 之前）
		ws.send('{"cmd": "subscribe","channel":"'+channel+'" }') //JOSN.stringify // 发送一个初始化消息
	}
	else if(ws.readyState==2 || ws.readyState==3)
	{
		orderChannelFlag = true
		ws.close()
	}
	
}

function handlePushMessage(messageObj)//处理推送消息
{
	
	switch(messageObj.cmd)
	{
		case "reply":
			_handleReply(messageObj)//回复
			break;
		case "ad":
			_handleAd(messageObj)//广告
			break;
		case "notify":
			_handleNotify(messageObj)//通知
			break;
		case "configchanged":
			_handleConfigChanged(messageObj)//配置改变
			break;
		case "sysevent":
			_handleSysEvent(messageObj)
			break;
		case "publish":
			_handlePublish(messageObj)//公布更新
			break;
		case "pushmsg":
			_handlePushmsg(messageObj);//遗漏
		          break;
	}

}
function _handleReply(messageObj)
{
	// console.log("_handleReply messageObj.cmd:",messageObj.cmd)
	// console.log("_handleReply messageObj.code:",messageObj.code)
	// console.log("_handleReply messageObj.msg:",messageObj.msg)
	if(messageObj.code == 0)
	{
		orderChannelFlag=false
	}
	else if(messageObj.code == 107) //您的账号已到期，请续费
	{
		_handleSysEvent(messageObj)
	}
	else if(messageObj.code == 101)//心跳包定义，不是异常命令
	{
		console.log("_handleReply invalid cmd:")
	}
	else
	{
		if(orderChannelFlag)
		{
			orderChannel(curLotteryTypeName)
		}
		
	}
}

function _handleAd(messageObj)
{
	// console.log("_handleAd messageObj.ad_name:",messageObj.ad_name)
	// console.log("_handleAd messageObj.ad_interval:",messageObj.ad_interval)
	// console.log("_handleAd messageObj.ad_hsrc:",messageObj.ad_hsrc)
	// console.log("_handleAd messageObj.ad_vsrc:",messageObj.ad_vsrc)

		for(var i=0;i<adList.length;i++)
		{
			if(adList[i].name == messageObj.ad_name) //update
			{
				adList[i].h_src = messageObj.ad_hsrc
				adList[i].v_src = messageObj.ad_vsrc
				adList[i].interval = messageObj.ad_interval
			}
			else
			{
				var obj = new Object()
				obj.name == messageObj.ad_name
				obj.h_src = messageObj.ad_hsrc
				obj.v_src = messageObj.ad_vsrc
				obj.interval = messageObj.ad_interval
				adList.push(obj)//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
			}
		}
	//}
}
function _handleNotify(messageObj)
{
	notifyList.push(messageObj.text)//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
}
