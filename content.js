
  

chrome.runtime.sendMessage({todo:"showPageAction"});





    chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.action == "oneInstalled") {
         idOfTab = msg.tab_id
         chrome.runtime.sendMessage({todo:"showPageAction"});
            // chrome.tabs.executeScript(idOfTab, {
            //     file: "eventPage.js"
            // });
        }
    })