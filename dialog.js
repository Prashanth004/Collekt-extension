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
    if(data.signindone == 1){
        inFormSigninDone()
    }
    
})
  






function open_dialog() {
  
console.log("command executed")
// setTimeout(function(){
    if (iframe.style.width == "0px") {
        iframe.style.width = "240px";
    }
    else {
        iframe.style.width = "240px";
    }

// },500)
    
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

function inFormSigninDone(){
    console.log("sendong message for signAction")
    setTimeout(function(){
        chrome.runtime.sendMessage({todo:"signinDone"});
    },1500)
}


function refresh() {
    iframe.src = iframe.src;
   setTimeout(()=>{
    test()
   },1000)
}

function resizeIframe(obj) {
    obj.style.height = 0;
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}

function closeIFrame() {
  

    iframe.style.width = "0px";
    document.getElementById("normalIframe").style.width = "0px";
   
   
}


