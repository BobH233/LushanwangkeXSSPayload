function addCss(data) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");

    style.innerHTML = data;
    head.appendChild(style);
}

addCss(".spec_hideChat .tab-trigger-chat,.spec_hideChat .tab-trigger-chat .chat{display: block!important;}");