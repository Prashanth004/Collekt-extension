
var tabIdHere = " "

getStatus = function (name, url, domain, unq_name, tabId,clickicon) {
    console.log(" got into getStateus function : ",name, url, domain, unq_name, tabId )
    var urlHere = (url);
    var domainHere = (domain);
    var unqnameHere = (unq_name);
    console.log("unique name : ", unq_name)
    tabIdHere = tabId;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.domain + "/product/valid/info",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        "data": {
            "name": name,
            "profile_url": urlHere,
            "domain": domainHere,
            "unq_name": unqnameHere
        }
    }

    $.ajax(settings).done(function (response) {
        console.log("response : ",response)
        if (response.domain == "" || response.domain == undefined || response.url == "" || response.url == undefined) {
            var Domain = " "
            var old_url = " "
        }
        else {
            var Domain = response.domain
            var old_url = response.url
        }
        autoCollection = localStorage.getItem("autoCollect")
            console.log("sending the message")

          
    setTimeout(function(){
       chrome.tabs.sendMessage(tabId, { action: "showContent", User_name_new: name, Url: urlHere, domain: domain, unq_name: unq_name, isCollected: response.collected, sameDomain: response.sameDomain, diffDomain: response.diffDomain, befDomain: Domain, befUrl: old_url, autoCollection: autoCollection }, function (response1) {
           if(response1){
               console.log(response1.gotmessage)
               if(clickicon){
                chrome.tabs.sendMessage(tabId, { action: "open_dialog_box" }, function (response) {
                });
               }
               else{
                if (Number(autoCollection) != 0 &&  response.collected==0) {
                    chrome.tabs.sendMessage(tabId, { action: "open_dialog_box" }, function (response) {
                    });
                }
               }
           }
    });
    },400)
        })

  
}





















