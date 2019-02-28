console.log("iframne",document.getElementById("normalIframe"))
 
if( document.getElementById("normalIframe")){
    console.log("already therer")
 }
 else{
    console.log("created iframe") 
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
// iframe.src = "https://explain.bookmane.in"
top.document.body.appendChild(iframe);
 }
