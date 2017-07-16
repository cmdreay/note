var agentNum = "010-82560668";
var agentUrl  = "http://oss.com/url/10.png";

var AgentList = {
	// "10":{
	// 	agentNum:"010-82560668",
	// 	url:"http://doyeecai.oss-cn-beijing.aliyuncs.com/registor.png"
	// },
	// "15":{
	// 	agentNum:"010-82560668",
	// 	url:"http://oss.com/url/10.png"
	// }

	"10":{
		agentNum:"010-82560668",
		url:"images/erweima.jpg"
	},
}

function setAgent(agentID){
	agentNum = AgentList[agentID].agentNum;
	agentUrl = AgentList[agentID].url;


	var agentURLdiv =  document.getElementById("agentURLdiv");//二维码地址
	agentURLdiv.style.marginRight = "73px";
	agentURLdiv.innerHTML = "<div>"+"<img src =\""+agentUrl+"\" height = 150px>"+"</div>";

	// var agentInfodiv = document.getElementById("agentInfodiv");//扫描二维码信息
	// agentInfodiv.style.marginRight = "-530px";
	// agentInfodiv.style.marginTop = "-150px";
	// agentInfodiv.style.fontSize = "35px";
	// agentInfodiv.innerHTML ="扫描二维码"+"<span style=font-size:38px;color:red>"+ "免费"+"</span>"+"获得帐号"


	// var agentPhoneDiv = document.getElementById("agentPhoneDiv");//咨询电话
	// agentPhoneDiv.style.marginRight = "-530px";
	// agentPhoneDiv.style.marginTop = "30px";
	// agentPhoneDiv.style.fontSize = "30px";
	// agentPhoneDiv.innerHTML = "咨询电话:"+"&nbsp&nbsp&nbsp"+agentNum


	var agentInfodiv = document.getElementById("agentInfodiv");//扫描二维码信息
	agentInfodiv.style.marginRight = "-530px";
	agentInfodiv.style.marginTop = "-150px";
	agentInfodiv.style.fontSize = "25px";
	agentInfodiv.innerHTML = "如没有自动登录，采取如下步骤："+"<br>"

	var agentPhoneDiv = document.getElementById("agentPhoneDiv");//咨询电话
	agentPhoneDiv.style.marginRight = "-395px";
	agentPhoneDiv.style.fontSize = "20px";
	var nbsp = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
	agentPhoneDiv.innerHTML = "1、断电重启走势图机顶盒  "+"<br>&nbsp&nbsp&nbsp&nbsp&nbsp"+nbsp+nbsp+"2、扫描二维码加微信咨询：13240999061"+"<br>"+nbsp+"3、拨打咨询电话：010-82560668"
}