var PCAI=window.PCAI || {};
try{
(function(){
	
	window._debug = false;
	window.isDebugEnabled = function(){
		return window._debug;
	}
	
	window.debug = function(msg){
		if(window.console){
			console.debug(msg);
		}
		var $debugConsole = $("#debug-console");
		if($debugConsole.length == 0){
			$debugConsole = $("<div id='debug-console'></div>").appendTo("#echart");
		}
		var $children = $debugConsole.children();
		if($children.length > 200){
			$children.last().remove();
		}
		$debugConsole.prepend("<div class='item'>"+msg+"</div>");
	}
	
	window.onerror = function(msg, url, line) {
		if(isDebugEnabled()){
			debug("<span class='linenum'>" +line + "</span><span class='msg'>" +msg +"</span>");
		    return false; 
		}else{
			return false;
		}
		
	}
	
	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
	Date.prototype.format = function(fmt)   
	{ //author: meizz   
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	}
	
	
	
	if(window._getClientType){
		var clientType = _getClientType();
		if(clientType != "app-java"){
			return;
		}
		var nativeApi = {};
		window.nativeApi = nativeApi;
		var funs = [
"debug","putStringUserConf","updateWebLastPeriodCode",
"getStringUserConf","writeStringToFile","getBooleanUserConf",
"getMemoryInfoToJson","isSoftInputActive","replaceToMainFragment",
"doAfterRefreshData","getDeviceInfoToJson","putBooleanUserConf",
"appendStringToFile","putIntUserConf","showWebPage","showMsg","getAllIp",
"getStringVar","getIntVar","getLongUserConf","updatePeriod","updateHtml",
"loadConf","showSoftInput","showMenu","hideMenu","getHcode","startActivity",
"getIntUserConf","setStringVar","getDeviceInfo","getHardwareId","getAndroidId",
"getAllMac","putLongUserConf","clearUserConf","setVarByJson","getAllUserConf",
"getVarToJson","getBooleanVar","getIp","getFloatUserConf","putFloatUserConf",
"getMemoryInfo","openOptionsMenu","removeUserConf","containsUserConf","removeWebPage",
"showMainFragment","hideSoftInput","setBooleanVar","setIntVar","readFileToString",
"exeJsonCmdToJson","deleteFile","deleteDirectory","doLoginSuccess","exeJsonCmd",
"fetchUrl",
"logout"
	            ];
	var _createNapiFun = function(name){
		var fun = function(){
			var args = [].slice.apply(arguments);
			var args = [name].concat(args);
			var rs = _callJava.apply(null,args);
			return rs;
		}
		return fun;
	}
	
	for(var i=0;i<funs.length;i++){
		var fname = funs[i];
		nativeApi[fname] = _createNapiFun(fname);
	}
		
		$(function(){
			var $echart = $("#echart");
			var ew = $echart.width();
			if(ew < 850){
				$(document.body).css("transform","scale(1.5) translate(180px,320px)");
			}
		});
	}
	
	
	if(window.nativeApi){
		try{
			var layzTime = nativeApi.getIntUserConf("layzTime",0);
			layzTime = parseInt(layzTime);
			window.user_layz_time = layzTime;
		}catch(e){
			window.user_layz_time = 0;
		}
		
	}
	
})()
}catch(e){
	alert(e);
}


function getRequestParams(){

	var queryString = location.search;
	var params = {};
	if(queryString){
		queryString = queryString.substring(1);
		var parr = queryString.split("&");
		
		for(var i=0;i<parr.length;i++){
			var p = parr[i];
			var arr = p.split("=");
			var key = arr[0];
			var value = arr[1];
			params[key] = value;
		}
	}
	return params;


}


var MyUtils = {
		COUNT:0,
		webList:[],
		createSVG:function(width,height,className){
			var svgns = "http://www.w3.org/2000/svg"; 
			var $svg = $(document.createElementNS(svgns, "svg"));
			if(width){
				$svg.attr("width",width);
			}
			if(height){
				$svg.attr("height",height);
			}
			if(className){
				$svg.attr("class",className);
			}
			return $svg; 
		},
		createId:function(p){
			var qty = MyUtils.COUNT++;
			p = p ? p : "";
			return p+qty;
		}
};
try{
(function(){
	MyUtils.showWeb = function(conf){
		var id = conf.id || MyUtils.createId("webFrame-");
		var $frame = $('#'+id);
		var width = conf.width || "100%";
		var height = conf.height || "50%";
		var left = conf.left || 0;
		var top = conf.top || 0;
		
		if($frame.length == 0){
			$frame = $("<iframe class='show-web-frame' frameborder='0' scrolling='no' id='"+id+"'></iframe>").appendTo("#echart");
		}
		$frame.css({
			width:width,
			height:height,
			top:top,
			left:left
		});
		$frame.attr("src",conf.url);
		
		var index = $.inArray(id,MyUtils.webList);
		if(index == -1){
			MyUtils.webList.push(id);
		}
		
		if(conf.timeout && conf.timeout > 0){
			setTimeout(function(){
				MyUtils.closeWeb(id);
			},conf.timeout);
		}
		
		return id;
	}
	
	MyUtils.closeWeb = function(id){
		if(!id){
			var len = MyUtils.webList.length;
			if(len > 0){
				id = MyUtils.webList[len-1];
			}else{
				return;
			}
		}
		var $frame = $('#'+id);
		$frame.remove();
		var index = $.inArray(id,MyUtils.webList);
		if(index != -1){
			MyUtils.webList.splice(index,1);
		}
	}
	
	MyUtils.showHotInfo = function(conf){
		var content = conf.content;
		var startTime = conf.startTime;
		var endTime = conf.endTime;
		var $hotInfoBox = $("#hotInfoBox");
		
		$hotInfoBox.data("startTime",startTime);
		$hotInfoBox.data("endTime",endTime);
		
		var $marquee = $hotInfoBox.find('.marquee-content');
		if($marquee.length ==0){
			var $mc = $('<div id="hotInfoMarquee" class="marquee-container"><div class="marquee-sibling">热点信息</div><div class="marquee-content"></div></div>');
			$mc.appendTo($hotInfoBox);
			$marquee = $hotInfoBox.find('.marquee-content'); 
		}else{
			$marquee.stop(true);
		}
		$marquee.html(content);
		
		var mfun = function(){
			var $hot = $("#hotInfoBox");
			var endTime = $hot.data("endTime") || 0;
			var nowTime = (new Date()).getTime();
			if(endTime < nowTime){
				MyUtils.closeHotInfo();
				return;
			}
			
			var startTime = $hot.data("startTime") || nowTime;
			if(startTime < nowTime){
				setTimeout(mfun,1000);
				return;
			}
			$hot.show();
			var $containerWidth = $hot.find('.marquee-container').width();
			var $siblingWidth = $hot.find('.marquee-sibling').width();
			var $marquee = $hot.find('.marquee-content');
			var $marqueeWidth = $marquee.width();
			
			var initLeft = $containerWidth;
			$marquee.css({
				left:initLeft
			});
			var lastLeft = $siblingWidth - $marqueeWidth ;
			$marquee.animate({
				left:lastLeft
			},35000,"linear",mfun);
		}
		mfun();
	}
	
	MyUtils.closeHotInfo = function(){
		var $hotInfoBox = $("#hotInfoBox");
		var $marquee = $hotInfoBox.find('.marquee-content');
		$marquee.stop(true);
		$hotInfoBox.html("");
		$hotInfoBox.hide();
	}
	
})()
}catch(e){
	alert(e)
}

function renderUserNoticeSlider(noticeScheme){
	if(!noticeScheme ||
			!noticeScheme.items ||
			noticeScheme.items < 1){
		return;
	}
	
	template.config("escape", false);
	var html = template('userNoticeSliderItemTmpl',noticeScheme);
	var $userNoticeSliderBox = $('#userNoticeSliderBox');
	$userNoticeSliderBox.html(html);
	var $viewslider = $userNoticeSliderBox.find(".viewslider");
	var defHeight = $viewslider.data("height");
	defHeight = parseInt(defHeight) || 0;
	if(defHeight > 0){
		var bl = parseFloat(app.screenSize) / parseFloat(1080) ;
		var rheight = (noticeScheme.height || 180) * bl;
		$viewslider.height(defHeight);
	}
	
	var setViewsliderHeight = function(el){
		var $el = $(el);
		var $p = $el.closest(".viewslider");
		var ph = $p.height();
		var h = $el.height();
		if(h > ph){
			$p.height(h);
		}
	}
	var fun = function(){
		var $viewslider = $("#notice-viewslider");
		var $items = $viewslider.children();
		if($items.length < 2){
			$items.addClass("act");
			return;
		}
		var $actItem = $items.filter(".act");
		var index;
		if($actItem.length == 0){
			index = -1;
		}else{
			$actItem.removeClass("act");
			index = $items.index($actItem);
		}
		index++;
		if(index >= $items.length){
			index = 0;
		}

		var $nextItem = $items.eq(index);
		$nextItem.addClass("act");
		
		var $p = $nextItem.closest(".viewslider");
		var ph = $p.height();
		var pw = $p.width();
		
		
		var type=$nextItem.data("type");
		
		if(type=="img"){
			var state = $nextItem.attr("state") || "0";
			state = parseInt(state) || 0;
			if(state == 0){
				
				var itemDefHeight = $nextItem.data("height") || 0;
				itemDefHeight = parseInt(itemDefHeight) || 0;
				var bl = parseFloat(app.screenSize) / parseFloat(1080) ;
				var itemRealHeight = itemDefHeight * bl;
				
				
				var $img = $nextItem.find("img");
				$img.width(pw);
				$img.height(itemRealHeight);
				$nextItem.attr("state","1");
			}
		}else if(type == "frame"){
			var state = $nextItem.attr("state") || "0";
			state = parseInt(state) || 0;
			if(state == 0){
				
				var itemDefHeight = $nextItem.data("height") || 0;
				itemDefHeight = parseInt(itemDefHeight) || 0;
				var bl = parseFloat(app.screenSize) / parseFloat(1080) ;
				var itemRealHeight = itemDefHeight * bl;
				
				
				
				var $iframe = $nextItem.find("iframe");
				$iframe.width(pw);
				$iframe.height(itemRealHeight);
				$nextItem.attr("state","1");
			}
		}else if(type == "yl" ||
				type =="tj"){
			var $dynaView = $nextItem.find(".dyna-view");
			var url = $dynaView.attr("url");
			var lotteryId = $dynaView.data("lotteryId");
			
			if(!lotteryId){
				if(window.nativeApi){
					lotteryId = nativeApi.getStringUserConf("lotteryId","");
				}else{
					lotteryId = app.lotteryId;
				}
			}
			if(!lotteryId){
				lotteryId = "";
			}
			
			url = url.replace(/\{lotteryId\}/g,lotteryId);
			
			url = app.dataBaseUrl + url;
			
			var upDV = function(url,dom){
				$.ajax({
					url:url,
					jsonpCallback: 'dynaViewCallback',
					dataType: 'jsonp',
					error:function(){
						setTimeout(function(){
							upDV(url,dom);
						},5 * 1000);
					},
					success:function(rs){
						if(rs.success){
							var $dynaView = $(dom);
							$dynaView.html(rs.data);
							setViewsliderHeight($dynaView);
						}
					}
				});
			}
			upDV(url,$dynaView.get(0));
		}

		setViewsliderHeight($nextItem);
		var time = $nextItem.attr("time") || 0;
		time = parseInt(time);
		if(time == 0){
			var defTime = $viewslider.attr("time") || 15;
			time = parseInt(defTime);
		}
		
		app.userNoticeSliderTimer = setTimeout(fun,time * 1000);
		
	}
	fun();
	$(document).trigger("resizeByDyna");
	
	
}

function initUserNoticeSlider(){
	if(!app.noticeSchemeId){
		return;
	}
	if(!app.noticeScheme ||
			(app.noticeScheme.uid + '|' + app.noticeScheme.updateTime) != app.noticeSchemeId){
		var noticeSchemeId = app.noticeSchemeId;
		noticeSchemeId = noticeSchemeId.split('|')[0];
		var url = app.baseUrl + '/capi/getEuserNoticeScheme.jsonp?uid='+noticeSchemeId;
		$.ajax({
			url:url,
			dataType: 'jsonp',
			success:function(rs){
				if(rs.success){
					if(rs.data){
						var noticeScheme = rs.data;
						if(window.nativeApi){
							noticeSchemeId = noticeScheme.uid + '|' + noticeScheme.updateTime;
							var json = $.toJSON(noticeScheme);
							nativeApi.putStringUserConf("noticeSchemeId",noticeSchemeId);
							nativeApi.putStringUserConf("noticeScheme",json);
						}
						
						renderUserNoticeSlider(noticeScheme);
					}
					
				}
			}
		});
	}else{
		renderUserNoticeSlider(app.noticeScheme);
	}
	
}

$(function(){
	
	$(document).dblclick(function(){
		_debug = !_debug;
		var $debugConsole = $("#debug-console");
		if(_debug){
			$debugConsole.show();
		}else{
			$debugConsole.hide();
		}
	});
	
	//10秒执行一次，更新数据
	window.nativeCallTimer = setInterval(updateWebLastPeriodCode,10000);
	window.openTimer = setInterval(updateOpenTimeInfo,1000);
	
	msgCarousel();
	sysMsgCarousel();
	
	refreshData();
	
	if(app && 
			app.lightness && 
			app.lightness < 100){
		var opacity = (100 - app.lightness) / 100;
		var $mask = $("#lightness_mask");
		if($mask.length == 0){
			$mask = $('<div id="lightness_mask"></div>').appendTo("#echart");
		}
		$mask.css("opacity",opacity).show();
	}
	initUserNoticeSlider();
	
});

function msgSliderHandler(slider){
	var $slider = $(slider);
	var $list = $slider.children();
	if($list.length < 2){
		$list.addClass("show");
	}else{
		var count = $list.length;
		var $show = $list.filter(".show");
		var $nextItem;
		if($show.hasClass("show")){
			var index = $list.index($show);
			var nextIndex = index + 1 ;
			nextIndex = nextIndex >= count ? 0 : nextIndex;
			$show.removeClass("show");
			$nextItem = $list.eq(nextIndex);
		}else{
			$nextItem = $show;
		}
		$nextItem.addClass("show");
	}
}
function sysMsgCarousel(){
	msgSliderHandler("#sysMsgSlider");
	setTimeout(sysMsgCarousel,10000);
}

function msgCarousel(){
	msgSliderHandler("#clientMsgSlider");
	setTimeout(msgCarousel,10000);
}



window.nextOpenTime = undefined;
window.lastPeriodCode = undefined;
window.refreshDataTimer = 0;

function periodMonitor(){
	$.ajax({
		url:'periodInfo.json',
		dataType:'json',
		success:function(rs){
			if(rs){
				if(rs.currPeriod != window.lastPeriodCode){
					refreshData();
				}
			}
		},
		error:function(){
			var i=0;
		}
		
	});
}
function updateOpenTimeInfo(){
	if(!window.nextOpenTime){
		return;
	}
	var nowDate = new Date();
	var nowTime = nowDate.getTime();
	var datetimeStr = nowDate.format("yyyy年MM月dd日 hh:mm:ss");
	$(".text-datetime").html(datetimeStr);
	var stop_early_time = window.lot_stop_early_time || 0;
	var user_layz_time = window.user_layz_time || 0;
	var sytime = nextOpenTime-nowTime;
	sytime = sytime - stop_early_time + user_layz_time;
	if(sytime <= 0 ){
		$('#timerName').text('开奖中……');
		$('#timer').text('');
		
		window.refreshDataTimer++;
		if(window.refreshDataTimer > 5){
			window.refreshDataTimer = 0;
			periodMonitor();
		}
		
	}else{
		var h = sytime / (1000 * 60 * 60);
		h = parseInt(h);
		sytime = sytime - h * (1000 * 60 * 60);
		var m = sytime/(1000 * 60);
		m = parseInt(m);
		sytime = sytime - m * (1000 * 60);
		var s = sytime/(1000);
		s = parseInt(s);
		
		s = s < 10 ? "0"+s : s;
		m = m < 10 ? "0"+m : m;
		$('#timerName').text('距离开奖:');
		var timeStr = m+":"+s;
		if(h > 0){
			timeStr = h+":"+timeStr;
		}
		$('#timer').text(timeStr);
	}
	
}

function updateWebLastPeriodCode(){
	if(window.nativeApi){
		nativeApi.updateWebLastPeriodCode(window.lastPeriodCode);
	}
}

function lazyDrawLineAll(){
	var $body = $(document.body);
	var $canvas = $body.find('.lineCanvas');
	$canvas.remove();	
	setTimeout(drawLineAll,5000);
}
function drawLineAll(){
	var $body = $(document.body);
	var $canvas = $body.children('.lineCanvas');
	$canvas.remove();	
	
	var $drawlines = $('.column.drawline .grid-body');
	if($drawlines.length == 0){
		return;
	}
	
	$drawlines.each(function(){
			//drawLine(this);
			drawSvgLine(this);
	});
}


function drawSvgLine(ctr){
	var $ctr = $(ctr);
	
	var $canvas = $ctr.children('.lineCanvas');
	$canvas.remove();
	
	var $hots = $ctr.find('.hot:visible');
	if($hots.length == 0){
		return;
	}
	
	var w = $ctr.width();
	var h = $ctr.height();
	var path = [];
	var poffset = $ctr.offset();
	
	$hots.each(function(i,item){
		var $item = $(item);
		var tv;
		var itemOffset = $item.offset();
		
		var rx = itemOffset.left - poffset.left;
		var ry = itemOffset.top - poffset.top;
		
		
		var iw= $item.width()/2;
		var ih = $item.height()/2;
		
		var x = rx ;
		var y = ry ;
		
		if(window.screenRotate == 1 ||
				window.screenRotate == 3){
			x += ih;
			y += iw;
		}else{
			x += iw;
			y += ih;
		}
		
		
		switch (window.screenRotate) {
		case 1:
			tv=y;
			y=h-x;
			x=tv;
			break;
		case 2:
			y=h-y;
			x=w-x;
			break;
		case 3:
			tv=x;
			x=w-y;
			y=tv;
			break;

		default:
			break;
		}
		
		if(i==0){
			path.push('M'+x+' '+y);	
		}else{
			path.push('L'+x+' '+y);	
		}
		
	});
	var lineStyleData = $ctr.data("lineStyle");
	var lineStyleObj;
	var lineStyle;
	if(lineStyleData){
		if($.type(lineStyleData) == 'string'){
			
			if(lineStyleData.indexOf(':') != -1){
				var arr = lineStyleData.split(/[,;]/);
				lineStyle = {};
				$.each(arr,function(i,item){
					if(item){
						var arr1 =item.split(":");
						lineStyle[arr1[0]] = arr1[1];
					}
				})
				
			}else{
				lineStyle={
					stroke:	lineStyleData
				}
			}
		}else{
			lineStyle = lineStyleData;
		}
	}else{
		lineStyle = {};
	}
	lineStyle = $.extend(defaultLineStyle = {
			fill: "none",
		    opacity:0.4,
		    stroke: "#000",
		    "stroke-width": 1
	},lineStyle);
	
	var svgHtml = '<svg class="lineCanvas" height="'+h+'" version="1.1" width="'+w+'" xmlns="http://www.w3.org/2000/svg"><path d="'+path.join(' ')+'" style="';
	$.each(lineStyle,function(key,val){
		svgHtml += key+":"+val+";";
	});
	svgHtml+='" ></path></svg>';
	$ctr.append(svgHtml);
}

function drawLine(ctr){
	var $ctr = $(ctr);
	
	var $canvas = $ctr.children('canvas');
	$canvas.remove();
	
	var w = $ctr.width();
	var h = $ctr.height();
	
	$canvas = $('<canvas class="lineCanvas" width="'+w+'" height="'+h+'"></canvas>')
	.appendTo($ctr);
	
	var $hots = $ctr.find('.hot:visible');
	if($hots.length == 0){
		return;
	}
	var strokeStyle = $hots.first().css("color");
	$canvas.css("opacity",0.4);
	var cxt=$canvas.get(0).getContext("2d");
	cxt.strokeStyle = strokeStyle;
	var poffset = $canvas.offset();
	
	$hots.each(function(i,item){
		var $item = $(item);
		var tv;
		var itemOffset = $item.offset();
		
		var rx = itemOffset.left - poffset.left;
		var ry = itemOffset.top - poffset.top;
		
		
		var iw= $item.width()/2;
		var ih = $item.height()/2;
		
		var x = rx ;
		var y = ry ;
		
		/*
		x += iw;
		y += ih;
		*/
		
		if(window.screenRotate == 1 ||
				window.screenRotate == 3){
			x += ih;
			y += iw;
		}else{
			x += iw;
			y += ih;
		}
		
		
		switch (window.screenRotate) {
		case 1:
			tv=y;
			y=h-x;
			x=tv;
			break;
		case 2:
			y=h-y;
			x=w-x;
			break;
		case 3:
			tv=x;
			x=w-y;
			y=tv;
			break;

		default:
			break;
		}
		
		if(i==0){
			cxt.moveTo(x,y);	
		}else{
			cxt.lineTo(x,y);
		}
	});
	
	cxt.stroke();
	
}


function jisuanLenRe(){
	
}

function showRecommend($echartContent){
	
	if($('#recoTmpl').length == 0){
		return;
	}
	
	var $echartContent = $echartContent || $('#echartContent');
	var nativeApi = window.nativeApi;
	var showReco = false;
	if(nativeApi){
		var app = window.app || {};
		showReco = app.showReco || nativeApi.getBooleanUserConf("showReco",false);
	}else{
		var url = location.href + "";
		if(url.indexOf("debug") != -1){
			showReco=true;
		}else{
			var app = window.app || {};
			showReco = app.showReco || false;
		}
	}
	if(!showReco){
		return;
	}
	
	
	var lotteryId = $echartContent.attr("lotteryid");
	var app = window.app || {};
	//app.dataBaseUrl = 'http://localhost:8080';
	var url = app.dataBaseUrl+'/client/dynaView.jsonp?uid=tjh-text';
	var params = {
			pcode:window.lastPeriodCode,
			lotteryId:lotteryId,
			paramText:lotteryId
		};
	$.ajax({
		type : "get",
		dataType : "jsonp",
		url:url,
		jsonpCallback:"recoCallback",
		data:params,
		success:function(rs){
			if(rs && rs.outData &&
					!rs.outData.hasRecoConf){
				app.showReco = false;
				return;
			}
			
			if(!rs || 
					!rs.success ||
					!rs.data ||
					!rs.outData ||
					!rs.outData.pcode ||
					rs.outData.pcode == window.lastPeriodCode){
				setTimeout(showRecommend,3000);
				return;
			}
			
			
			var pcode = rs.outData.pcode;
			var snum;
			if(pcode){
				snum = parseInt( pcode.split('-')[1]);
			}
			var recoList = [];
			var recoTmplData = {
					html:rs.data
			};
			template.config("escape", false);
			var html = template('recoTmpl',recoTmplData);
			var $recoBox = $('#recommendBox');
			$recoBox.html(html);
			$(document).trigger("resizeByDyna");
			
			var $containerWidth = $recoBox.find('.marquee-container').width();
			var $siblingWidth = $recoBox.find('.marquee-sibling').width();
			var $marquee = $recoBox.find('.marquee-content');
			var $marqueeWidth = $marquee.width();
			
			$marquee.stop(true);
			
			var mfun = function(){
				var initLeft = $containerWidth;
				$marquee.css({
					left:initLeft
				});
				var lastLeft = $siblingWidth - $marqueeWidth ;
				$marquee.animate({
					left:lastLeft
				},35000,"linear",mfun);
			}
			
			mfun();
			
		},
		error:function(){
			setTimeout(showRecommend,3000);
		}
		
	});
}
function showMiss(){
	var $echartContent = $('#echartContent');
	var showBodyMiss=false,showTopMiss=false;
	var nativeApi = window.nativeApi;
	if(nativeApi){
		var app = window.app || {};
		showBodyMiss = app.showBodyMiss || nativeApi.getBooleanUserConf("showBodyMiss",false);
		showTopMiss = app.showTopMiss || nativeApi.getBooleanUserConf("showTopMiss",false);
		
		
	}else{
		var url = location.href + "";
		if(url.indexOf("debug") != -1){
			showBodyMiss=true,showTopMiss=true;
			var queryString = location.search;
			queryString = queryString.substring(1);
			var parr = queryString.split("&");
			var params = {};
			for(var i=0;i<parr.length;i++){
				var p = parr[i];
				var arr = p.split("=");
				var key = arr[0];
				var value = arr[1];
				params[key] = value;
			}
			var app = window.app || {};
			if(params._debug_dataBaseUrl){
				app.dataBaseUrl = params._debug_dataBaseUrl;
			}
			if(params._debug_baseUrl){
				app.baseUrl = params._debug_baseUrl;
			}
		}else{
			var app = window.app || {};
			showBodyMiss = app.showBodyMiss || false;
			showTopMiss = app.showTopMiss || false;
			
		}
	}
	if(!showBodyMiss &&
			!showTopMiss){
		return;
	}
	var $columns = $echartContent.find(".column[miss-type]");
	var types = [];
	var typeMap = {};
	$columns.each(function(){
		var missType = $(this).attr("miss-type");
		if(!typeMap[missType]){
			types.push(missType);
			typeMap[missType] = true;
		}
	});
	if(types.length == 0){
		return;
	}
	
	var startPeriod = $echartContent.attr("startperiod");
	var endPeriod = $echartContent.attr("endperiod");
	var lotteryId = $echartContent.attr("lotteryid");
	var missType = types.join(",");
	var app = window.app || {};
	//app.dataBaseUrl = 'http://localhost:8080';
	var url = app.dataBaseUrl+'/capi/findLotMissAllIn.jsonp';
	var params = {
			types:missType,
			startPeriod:startPeriod,
			endPeriod:endPeriod,
			lotteryId:lotteryId,
			missQueryItems:app.missQueryItems,
			topTypes:app.topTypes || 'rx-3,rx-4,rx-5,q3zux'
		};
	
	
	$.ajax({
		type : "POST",
		dataType : "jsonp",
		url:url,
		jsonpCallback:"missCallback",
		data:params,
		error:function(){
			if(isDebugEnabled()){
				debug("获取遗漏数据失败，3秒后重试");
			}
			setTimeout(showMiss,3000);
			return;
		},
		success:function(rs){
			if(!rs || 
					!rs.success ||
					!rs.data ||
					rs.data.pcode != window.lastPeriodCode){
				if(isDebugEnabled()){
					var remotePcode = "";
					if(rs && rs.data && rs.data.pcode){
						remotePcode = rs.data.pcode;
					}
					debug("当前期数:"+window.lastPeriodCode+",服务器期数:"+remotePcode);
				}
				setTimeout(showMiss,3000);
				return;
			}
			var data = rs.data;
			var missQtyMap = data.missQty;
			var matchQtyMap = data.matchQty;
			
			if(showBodyMiss){
				var $miss = $columns.find(".miss");
				$miss.each(function(){
					var $this = $(this);
					var pcode = $this.attr("pcode");
					var pdata = missQtyMap[pcode]
					if(pdata){
						var mtype = $this.attr("type");
						var tdata = pdata[mtype];
						if(tdata){
							var mvalue = $this.attr("value");
							var item = tdata[mvalue] || tdata["0"+mvalue];
							if(item){
								$this.html(item);
							}
						}
					}
					
				});
			}
			
			var topMissQtyMap = data.topMissQty;
			var topMissData = data.missData;
			
			if(showTopMiss){
				var lotMissTmplId = window.lotMissTmplId || app.lotMissTmplId || "";
				
				if(lotMissTmplId != ""){
					var lotMissTmplUrl; 
					if(app.lotMissTmplType && app.lotMissTmplType=="dyna"){
						lotMissTmplUrl = '/client/dynaView.jsonp?outType=jsonp&uid={tmplId}&paramText={lotteryId}';
					}else{
						lotMissTmplUrl = '/client/lotMiss_jsonp.jsonp?uid={tmplId}&lotteryId={lotteryId}';
					}
					lotMissTmplUrl = lotMissTmplUrl.replace("{tmplId}",lotMissTmplId);
					lotMissTmplUrl = lotMissTmplUrl.replace("{lotteryId}",app.lotteryId);
					var url = app.dataBaseUrl + lotMissTmplUrl;
					$.ajax({
						url:url,
						jsonpCallback:"missFragCallback",
						dataType:'jsonp',
						success:function(rs){
							var html;
							if(rs.success){
								html = $.trim(rs.data);
								$('#topMissBox').html(html);
								$(document).trigger("resizeByDyna");
							}
						}
					});
				}else if(topMissQtyMap &&
						$('#topMissTmpl').length > 0){
					var html = template('topMissTmpl',{list:topMissQtyMap,data:topMissData});
					$('#topMissBox').html(html);
					$(document).trigger("resizeByDyna");
				}
			}
		}
		
	});
	
	
}

function loadContentSuccess(){
	var $echartBody = $('#echartBody');
	var $echartContent = $echartBody.children('#echartContent');
	var periodCode = $echartContent.data('periodCode');
	var openTime = $echartContent.data('openTime');
	openTime = parseInt(openTime);
	window.nextOpenTime = openTime;
	window.lastPeriodCode = periodCode;
	updateWebLastPeriodCode();
	
	showRecommend($echartContent);
	showMiss($echartContent);
	drawLineAll();
	
	var nowTime = new Date().getTime();
	
	if(openTime - nowTime > 60000){
		playerAudio();
		if(window.nativeApi){
			nativeApi.doAfterRefreshData();
		}
	}
	if(window.doAfterRefreshData){
		window.doAfterRefreshData($echartContent);
	}
	$(document.body).triggerHandler('afterRefreshData',$echartContent);
}



function refreshData(){
	/*
	if(!PCAI.isLoadedContent && 
			$('#echartContent').length > 0){
		setTimeout(loadContentSuccess,500);
		PCAI.isLoadedContent = true;
		return;
	}
	*/
	var $echartBody = $('#echartBody');
	if(window.napi_readFileToString){
		var html = napi_readFileToString("content.html");
		$echartBody.html(html);
		loadContentSuccess();
	}else{
		$echartBody.load('content.html',loadContentSuccess);
	}
	PCAI.isLoadedContent = true;
}

function playerAudio(){
	/*
	var $playerAudio = $('#playerAudio');
	if($playerAudio.length == 0){
		$playerAudio = $('<audio id="playerAudio"><source src="audio/kj.mp3" type="audio/mpeg"></audio>').appendTo('body');//载入声音文件 
	}
	
	$playerAudio[0].play();
	*/
}

function refreshLayout(){
	if(window.refreshLayoutTimer){
		clearTimeout(window.refreshLayoutTimer);
	}
	window.refreshLayoutTimer = setTimeout(doRefreshLayout,1000);
}

function doRefreshLayout(){
	var $header =$('#header');
	var $footer =$('#footer');
	var echartHeight = $('#echart').height();
	var headerHeight = $header.is(":visible") ? $header.height() : 0;
	var footerHeight = $footer.is(":visible") ? $footer.height() : 0;
	var cheight = echartHeight - headerHeight - footerHeight;
	$('#content').height(cheight);
	var $echartBody = $('#echartBody');
	
	$echartBody.find('.column .grid-body tr.hide').removeClass('hide');
	var ch = $echartBody.height();
	if(ch > cheight){
		var rowEl = $echartBody.find('.column-dqh .grid-body tr:first-child');
		var rowHeight = rowEl.outerHeight();
		var rowQty = (ch-cheight)/rowHeight;
		rowQty = parseInt(rowQty) + 1;
		var hideRows = [];

		$echartBody.find('.column').each(function(){
			var $this = $(this);
			var $rows = $this.find('.grid-body tr');
			hideRows = $.merge(hideRows, $rows.slice(0, rowQty));
		});
		$(hideRows).addClass('hide');

	}
}

function rotateScreen(val){
	switch (val){
    case 1:
    	rotateScreenRight();
    	
        break;
    case 2:
    	rotateScreenReverse();
        break;
    case 3:
    	rotateScreenLeft();
        break;
    default:
    	unrotateScreen();
	}
	
}
function rotateScreenLeft(){
	$echart = $('#echart');
	var ew = $echart.width();
	var eh = $echart.height();
	var tx = (eh - ew)/2;
	var ty = tx;
	
	var cssVal = "rotate(-90deg) translate("+tx+"px, "+ty+"px)";
	$echart.css({
		"-moz-transform":cssVal,
		"-webkit-transform":cssVal,
		"transform":cssVal
	});
	$echart.removeClass('rotate-right');
	$echart.removeClass('rotate-reverse');
	/*
	$echart.addClass('rotate-left');
	*/
	window.screenRotate = 3;
	lazyDrawLineAll();
	/*
	var realR = nativeApi.getIntUserConf("rotation",-1);
	$('.console').text('【3】['+realR+']');
	*/
}
function rotateScreenRight(){
	$echart = $('#echart');
	var ew = $echart.width();
	var eh = $echart.height();
	var tx = (ew - eh)/2;
	var ty = tx;
	
	var cssVal = "rotate(90deg) translate("+tx+"px, "+ty+"px)";
	$echart.css({
		"-moz-transform":cssVal,
		"-webkit-transform":cssVal,
		"transform":cssVal
	});
	$echart.removeClass('rotate-left');
	$echart.removeClass('rotate-reverse');
	//$echart.addClass('rotate-right');
	window.screenRotate = 1
	lazyDrawLineAll();
	/*
	var realR = nativeApi.getIntUserConf("rotation",-1);
	$('.console').text('【1】['+realR+']');
	*/
}
function rotateScreenReverse(){
	$echart = $('#echart');
	
	var ew = $echart.width();
	var eh = $echart.height();
	var tx = (ew - eh)/2;
	var ty = tx;
	
	var cssVal = "rotate(180deg)";
	$echart.css({
		"-moz-transform":cssVal,
		"-webkit-transform":cssVal,
		"transform":cssVal
	});
	$echart.removeClass('rotate-right');
	$echart.removeClass('rotate-left');
	//$echart.addClass('rotate-reverse');
	window.screenRotate = 2;
	lazyDrawLineAll();
	/*
	var realR = nativeApi.getIntUserConf("rotation",-1);
	$('.console').text('【2】['+realR+']');
	*/
}
function unrotateScreen(){
	$echart = $('#echart');
	
	var ew = $echart.width();
	var eh = $echart.height();
	var tx = (ew - eh)/2;
	var ty = tx;
	
	var cssVal = "rotate(0deg)";
	$echart.css({
		"-moz-transform":cssVal,
		"-webkit-transform":cssVal,
		"transform":cssVal
	});
	$echart.removeClass('rotate-right');
	$echart.removeClass('rotate-left');
	$echart.removeClass('rotate-reverse');
	window.screenRotate = 0;
	lazyDrawLineAll();
	/*
	var realR = nativeApi.getIntUserConf("rotation",-1);
	$('.console').text('【0】['+realR+']');
	*/
}

onEchartStateChange = function(conf){
	doDefaultEchartStateChange(conf);
	$(document).trigger("echartStateChange",conf);
}

doDefaultEchartStateChange = function(conf){
	
	var type = conf.type;
	var data = conf.data;
	var msg;
	var msgType="notification";
	if(type == 1){
		if(data.connected){
			msg = "网络已恢复";
			var $msg =$("#msg_error_networkState");
			$msg.remove();
		}else{
			msg = "网络掉线";
			msgType = "error";
			var $msg =$("#msg_error_networkState");
			if($msg.length == 0){
				$msg = $('<div id="msg_error_networkState" class="sys-msg-error">网络掉线，请检查您的网络！！！</div>').appendTo("#notificationBox");
			}else{
				$msg.html("网络掉线，请检查您的网络！！！");
			}
			
		}
	}else if(type==2){
		if(data == "sessionDestroyed"){
			msg = "与服务器断开连接";
			msgType = "error";
			
			var $msg =$("#msg_error_tcpState");
			if($msg.length == 0){
				$msg = $('<div id="msg_error_tcpState" class="sys-msg-error">无法连接服务器！！！</div>').appendTo("#notificationBox");
			}else{
				$msg.html("无法连接服务器！！！");
			}
			
		}else if(data == "sessionCreated"){
			msg = "与服务器恢复连接";
			var $msg =$("#msg_error_tcpState");
			$msg.remove();
		}
	}
	if(msg){
		noty({text: msg,type:msgType,layout: 'bottomRight',timeout: 5000});
	}
}
