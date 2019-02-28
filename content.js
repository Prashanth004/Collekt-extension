
  
chrome.runtime.sendMessage({todo:"showPageAction"});

    chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
      
        if (msg.action == "oneInstalled") {
         idOfTab = msg.tab_id
         chrome.runtime.sendMessage({todo:"showPageAction"});
         config.server_down =1
         test()
       
         if(config.server_down !=0 ){
            chrome.runtime.sendMessage({todo:"openServerProbem"});
         }
         else if(config.isloggedin == 1 && config.active_status == 1){
            chrome.runtime.sendMessage({todo:"open_dialog_box"});

     
         }
          else{
            chrome.runtime.sendMessage({todo:"open_login"});

            
           
         }
           
        }
    })