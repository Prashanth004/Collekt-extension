// URLdomain = "https://bookmane.in/"
URLdomain = "http://localhost:1234"



chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "open_dialog_box") {
        open_dialog();
    }
    if (msg.action == "refresh_dialog_box") {
        refresh();
    }
    if(msg.action == "open_login"){
        open_login();

    }
    if (msg.action == "closeDisplay") {
        closeIFrame()
    }
    if(msg.action == "openServerProbem"){
        openServerProbem()
    }
})




config.socket.on('closeiframe', function (data) {
    if(data.refresh==1){
        refresh()
    }
    
    if(data.close==1){
        closeIFrame()
    }
    
})




var iframe = document.createElement('iframe');
iframe.id = "normal"
iframe.style.background = "white";
iframe.style.width = "0px";
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
function open_dialog() {
    

    if (iframe.style.width == "0px") {
        iframe.style.width = "240px";
    }
    else {
        iframe.style.width = "240px";
    }
}

var iframe2 = document.createElement('iframe');
iframe2.id = "login"
iframe2.style.background = "white";
iframe2.style.width = "0px";
iframe2.style.height = "50%";
iframe2.style.marginToptop = "10px";
iframe2.style.borderRadius = "8px";
iframe2.frameBorderRadius = "8px";
iframe2.style.position = "fixed";
iframe2.style.top = "0px";
iframe2.style.right = "0px";
iframe2.style.zIndex = "9000000000000000000";
iframe2.frameBorder = "none";
iframe2.src = chrome.extension.getURL("Login.html")
document.body.appendChild(iframe2);





function open_login() {
   document.getElementById("normal").src=chrome.extension.getURL("Login.html")


    if (iframe.style.width == "0px") {
        iframe.style.width = "240px";
    }
    else {
        iframe.style.width = "240px";
    }
}
function openServerProbem() {
   document.getElementById("normal").src=chrome.extension.getURL("serverDown.html")
   

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


