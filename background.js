chrome.runtime.onInstalled.addListener(function (object) {
    localStorage.setItem("autoCollect", String(1))
    chrome.tabs.create({ url: URLdomain }, function (tab) {
    });
    socket = io.connect("https://bookmane.in")
    serverCall.get_all_lists()

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        for(i in tabs){
            var _urlll = tabs[i].url;
           
            fb=/facebook.com/;
            twi=/twitter.com/;
            linked=/linkedin.com/;
            angl = /angel.co/;
            if(_urlll.match(fb)||_urlll.match(twi) || _urlll.match(linked) || _urlll.match(angl)){
               

               
               
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "socketio.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "jquery.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "utils2.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "dialog.js"
                })
               
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "api.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "eventPage.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "api_call.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "test.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "content.js"
                })
               
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "login.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "serverDown.js"
                })
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "backened.js"
                })
             
               
                chrome.tabs.sendMessage(tabs[i].id, { action: "oneInstalled" , tab_id: tabs[i].id}, function (response) { });
               
                chrome.tabs.executeScript(tabs[i].id, {
                  
                    file: "eventPage.js"
                })
                config.server_down =1
            
 

            }

            
        }
    });

});

chrome.browserAction.onClicked.addListener(function(tab) { 
   
    config.server_down =1
    test()
   
  
  
    if(config.server_down !=0 ){
       
    chrome.tabs.sendMessage(tab.id, { action: "openServerProbem" }, function (response) { });
    }
    else if(config.isloggedin == 0 || config.active_status == 0){
       
        chrome.tabs.sendMessage(tab.id, { action: "open_login" }, function (response) { });


    }
     else{
        chrome.tabs.sendMessage(tab.id, { action: "open_dialog_box" }, function (response) { });

       
      
    }



});