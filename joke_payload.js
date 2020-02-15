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

function addCss(data) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");

    style.innerHTML = data;
    head.appendChild(style);
}

addCss(".spec_hideChat .tab-trigger-chat,.spec_hideChat .tab-trigger-chat .chat{display: block!important;}");

var listNode = document.getElementById('catalog');
for(var i=0;i<listNode.childNodes.length;i++){
    var nowNode = listNode.childNodes[i];
    if(!nowNode.getAttribute) continue;
    if(!nowNode.getAttribute('data-planid')) continue;
    var gg = listNode.childNodes[i].childNodes[1].childNodes[0];
    gg.innerHTML = "电竞";
}

function deleteNode(dom){
    dom.parentNode.removeChild(dom);
}

deleteNode(document.getElementById('onlyShowTeacherBtn'));
deleteNode(document.getElementById('emojiTrigger'));
deleteNode(document.getElementById('chatSend'));
document.getElementById('chatEdit').innerHTML = "你已被永久禁止发言！";
document.getElementById('chatEdit').classList = "";
document.getElementById('chatEdit').setAttribute('contenteditable','false');