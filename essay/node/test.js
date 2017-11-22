// var koa = require('koa'); var app =new koa(); app.use(function *(){ this.body = 'Hello World'; }); app.listen(3000);
var request = require("request");

var options = { method: 'POST',
  url: 'https://passport.baidu.com/v2/api/?login',
  headers: 
   { 'postman-token': 'e7438e3b-fec6-94c8-6b86-9b272fda237f',
     'cache-control': 'no-cache' },
    body: {
        staticpage:'https://www.baidu.com/cache/user/html/v3Jump.html',
        charset:'UTF-8',
        token:'d7c30a6760c1acb0dca5930e460436d2',
        tpl:'mn',
        subpro:'',
        apiver:'v3',
        tt:'1511343977597',
        codestring:'jxGb306c15ff967e23b02ed14334301587ea546980776047be1',
        safeflg:0,
        u:'https://www.baidu.com/',
        isPhone:'false',
        detect:'1',
        gid:'E2E134A-B2F3-486F-9030-3C24D8E33541',
        quick_user:0,
        logintype:'dialogLogin',
        logLoginType:'pc_loginDialog',
        idc:'',
        loginmerge:true,
        splogin:'rate',
        username:'水恋杉',
        password:'gUM1/I0eV/lJJcKGVv0ocEqCGPVOvXoiLWV083oqEsjJ90yPK6BvC+unEZ84aDez214XIJRzvEMYG8FZ6g6BggTHdTBHybjkJAVc7VcsMPiSOwKSgi2SqzjC0cnYpfzJNTCDhyAfHh6CAQRXE44dN6a0/cEEF/YTh86Gv6tncV0=',
        verifycode:'四楼',
        mem_pass:'on',
        rsakey:'6BwEqjLpa1wJ68NEviJNqSwxBXalExtb',
        crypttype:12,
        ppui_logintime:10614,
        countrycode:'',
        fp_uid:'',
        fp_info:'8111db4fb32adcf5a89a8106f1e84dfd002~~~VOID',
        dv:'MDExAAoA_AALAzQAIAAAAF00AA0CACCRkbb27bn4tvGj4q_wr_-s_KOSov2i1LHDqsy19pn9mAcCAASRkZGRCQIAI4aEFRXe3t7e3vnFxZHQntmLyofYh9eE1Iu6itWK-Yzug-qeDAIAIopvb29vc9yIyYfAktOewZ7Onc2So5PMk-WA8pv9hMeozKkHAgAEkZGRkQwCACKKb29vb3MpfTxyNWcmazRrO2g4Z1ZmOWYQdQduCHEyXTlcBwIABJGRkZEIAgAnj41gYPX19eFrP34wdyVkKXYpeSp6JRQkeyRSN0UsSjNwH3seVzpdDQIAIJGRgxQPWxpUE0EATRJNHU4eQXBAH0A2UyFILlcUex96BwIABJGRkZEHAgAEkZGRkQwCACOIiIiIh8-b2pTTgcCN0o3djt6BsIDfgPCR4pHmifuf75zrjw0CAAWRkZK3twcCAASRkZGRFwIAFZGRycnZ8YW475qyxu_DsYz-kbnNlgQCAAaTk5GTpZcVAgAIkZGQzywy_ioFAgAEkZGRnAECAAaRmZmQGwAWAgAisMSvn7GIv428hLeBuYq_jLWMtYK3hrOCs4C0h76Iv4u4jRACAAGREwIAGpGHh4fvm--f7Nb51qHWoY_tjOWB9Nq51ruUBgIAKJGRkYmJiYnIyMjNy8vLywwMDAlfX19cXFxcWUxMTE6mpqajtra2tFwNAgAekZGSuqP3tvi_7azhvuGx4rLt3Oyz7Jz9jv2K5ZfzCAIAIoiK5uatra2pFUEATglbGlcIVwdUBFtqWgVaKks4SzxTIUUJAgAliIrPz5ycnJyclZ-fy4rEg9GQ3YLdjd6O0eDQj9CgwbLBttmrzwcCAASRkZGRCAIAIoiK7u6Ojo6DwpbXmd6MzYDfgNCD04y9jdKN_ZzvnOuE9pIJAgAniojPz0ZGRkZGVNnZjcyCxZfWm8Sby5jIl6aWyZbghfee-IHCrcmsDQIAHpGRgxAJXRxSFUcGSxRLG0gYR3ZGGUY2VyRXIE89WQwCACKKm5ubm4IeSgtFAlARXANcDF8PUGFRDlEnQjBZP0YFag5rDAIAIopvb29vcvuv7qDntfS55rnpuuq1hLTrtMKn1bzao-CP644',
        traceid:'1780BB01',
        callback:'parent.bd__pcbs__x4iyqq'
    } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

