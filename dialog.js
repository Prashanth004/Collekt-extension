URLdomain = "https://bookmane.in/"
// URLdomain = "http://localhost:1234"


socket = io.connect("https://bookmane.in")

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


socket.on('setPopWithHome', function(data){
  
    setPopToHome()
    closeIFrame()
})

socket.on('closeiframe', function (data) {
    
    
    if(data.close==1){
        closeIFrame()
    } 
    if(data.refresh==1){
        refresh()
    }
    
})



var iframe = document.createElement('iframe');
iframe.id = "normalIframe"
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
top.document.body.appendChild(iframe);




function open_dialog() {
  

    if (iframe.style.width == "0px") {
        iframe.style.width = "240px";
    }
    else {
        iframe.style.width = "240px";
    }
}


function open_login() {

   document.getElementById("normalIframe").src=chrome.extension.getURL("Login.html")


    if (iframe.style.width == "0px") {
        iframe.style.width = "240px";
    }
    else {
        iframe.style.width = "240px";
    }
}
function setPopToHome(){
    document.getElementById("normalIframe").src=chrome.extension.getURL("display.html")
}
function openServerProbem() {
   document.getElementById("normalIframe").src=chrome.extension.getURL("serverDown.html")
   

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


