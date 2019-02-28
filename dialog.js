
socket = io.connect("https://bookmane.in")
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.action == "open_dialog_box") {
      
                open_dialog();
    }
    if(msg.action == "open_login"){
    
        open_login();

    }
    if(msg.action == "openServerProbem"){
        openServerProbem()
    }
})

socket.on('closeiframe', function (data) {
    
    
    if(data.close==1){
        closeIFrame()
    } 
    // if(data.refresh==1){
    //     refresh()
    // }
    if(data.signindone == 1){
        inFormSigninDone()
    }
    
})
socket.on('setPopWithHome', function(data){
  
    setPopToHome()
    closeIFrame()
   
})
socket.on('logout', function (data) {

    closeIFrame();
    open_login();
  });
  


window.addEventListener('message', function(event) {
if (event.data.type && (event.data.type === 'close'))
    {
        closeIFrame()
    }
});





function open_dialog() {  
console.log("command executed")
var iframe = document.getElementById("normalIframe")
if(iframe!=null)
iframe.style.width = "240px"
}


function refresh() {
    var iframe = document.querySelector('#normalIframe')
    iframe.src=iframe.src
    iframe.style.width = "240px"
}

function open_login() {
   var iframe = document.querySelector('#normalIframe')
   if(iframe!= null){
       console.log("changing the conetent")
    iframe.src=chrome.extension.getURL("Login.html")
    iframe.style.width = "240px"
   }else{
       console.log("not found")
   }
}


function inFormSigninDone(){
    console.log("sendong message for signAction")
    setTimeout(function(){
        chrome.runtime.sendMessage({todo:"signinDone"});
    },1500)
}

function setPopToHome(){
    document.querySelector('#normalIframe').src=chrome.extension.getURL("popup.html")
}



function closeIFrame() {
    var iframe = document.querySelector('#normalIframe')
    if(iframe!= null){
        iframe.style.width = "0px"
    }
    
}

function openServerProbem() {
    var iframe = document.getElementById("normalIframe")
    iframe.src=chrome.extension.getURL("serverDown.html")
    if(iframe!=null){
        iframe.style.width = "240px"
    }
  
 }
 





