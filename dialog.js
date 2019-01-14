URLdomain = "https://bookmane.in/"


chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "open_dialog_box") {
        toggle();
    }
    if (msg.action == "refresh_dialog_box") {
        refresh();
    }
})

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "closeDisplay") {
        closeIFrame()
    }
})

var socket = io.connect(URLdomain);
socket.on('closeiframe', function (data) {
    if(data.refresh==1){
        refresh()
    }
    
    if(data.close==1){
        closeIFrame()
    }
    
})




var iframe = document.createElement('iframe');
iframe.id = "    "
iframe.style.background = "white";
iframe.style.width = "0px";
// iframe.style.padding="10px";
iframe.style.height = "50%";
iframe.style.marginToptop = "10px";
iframe.style.borderRadius = "8px";
iframe.frameBorderRadius = "8px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none";
iframe.src = chrome.extension.getURL("display.html")
document.body.appendChild(iframe);




function toggle() {
    if (iframe.style.width == "0px") {
        iframe.style.width = "240px";
    }
    else {
        iframe.style.width = "240px";
    }
}

function refresh() {
    iframe.src = iframe.src;
}

function resizeIframe(obj) {
    obj.style.height = 0;
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}

function closeIFrame() {
    iframe.style.width = "0px";
}


