URLdomain= "https://bookmane.in/collekt"
var socket = " "
// URLdomain = "http://localhost:1234"



// chrome.runtime.onInstalled.addListener(function (object) {
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var is_angel = ' '
    if (request.todo == "showPageAction") {
       
       
        var new_tab_url = 1
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs1) {
              
                if (tabs1[0] == "undefined" || typeof (tabs1[0]) == undefined || tabs1[0] == undefined || typeof (tabs1[0]) == "undefined") {
                }
                else {
                    is_angel = (tabs1[0].url.split("/")[2].split(".")[0])
                    _url = tabs1[0].url

                    if (is_angel == "angel") {
                        test()
                        if (config.isloggedin == 1 && config.active_status == 1) {
                            chrome.tabs.executeScript(
                                tabs1.id,
                                { code: "document.querySelector('h1[class=\"u-fontSize25 u-fontSize24SmOnly u-fontWeight500\"]').innerHTML" },
                                function (results) {
                                    let e = chrome.runtime.lastError;
                                    if (e !== undefined) {
                                    }
                                    if (results[0] != null) {
                                        var User_name_new = (results[0]);
                                        User_name_new = User_name_new.split("<")[0]
                                        url_string = _url.split("/")
                                        unq_name=url_string[3]
                                        // alert(unq_name)
                                    }
                                    chrome.storage.sync.get(['User_name'], function (User_name_old) {

                                        if (User_name_old.User_name != User_name_new && User_name_new != null) {
                                            flag = 1
                                        }
                                        else {
                                            flag = 0
                                        }

                                        if (flag == 1) {
                                            chrome.storage.sync.set({ 'User_name': User_name_new }, function () {
                                                // api_call(User_name_new, _url, is_angel)  
                                                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                                    getStatus(User_name_new, _url, is_angel, unq_name, tabs1[0].id)
                                                    // chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box", User_name_new: User_name_new, _url: _url, domain: domain }, function (response) { });
                                                });
                                                flag = 0;
                                             
                                                // chrome.tabs.sendMessage(tabs1[0].id, { action: "open_dialog_box", User_name_new: User_name_new, _url: _url, domain: is_angel }, function (response) { });
                                            })
                                        }
                                    })

                                }
                            )

                        }

                    }
                }
            })

        }
        catch{
        }
        chrome.tabs.getSelected(null, function (tab1) {


            

            chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
               
                    if (((details.url.split(".")[1]) == "facebook" || ((details.url.split("/")[2].split(".")[1]) == "linkedin")) || (((details.url.split("/")[2].split(".")[0]) == "twitter"))) {
                        test()
                        if (config.isloggedin == 1 && config.active_status == 1) {
                            if (details.frameId === 0) {
                                chrome.tabs.get(details.tabId, function (tab) {
                                    if (tab == "undefined" || typeof (tab) == undefined || tab == undefined || typeof (tab) == "undefined") {

                                    }
                                    else {
                                        // if (tab.url === details.url) {
                                            chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs2) {
                                               
                                                    if (tab == "undefined" || typeof (tab) == undefined || tab == undefined || typeof (tab) == "undefined") {

                                                    }
                                                    else {
                                                        var _url = tabs2[0].url;
                                                        var str1 = _url.split(".");
                                                        var domain = str1[1];
                                                        if (domain == "facebook") {
                                                            flag = 0;
                                                          
                                                            // alert(unq_name)
                                                            var User_name_new= null
                                                            setTimeout(function(){
                                                            chrome.tabs.executeScript(
                                                                tab.id,
                                                                { code: "document.querySelector('a[class=\"_2nlw _2nlv\"]').innerHTML" },
                                                                function (results, err) {
                                                                    // alert(result)
                                                                    let e = chrome.runtime.lastError;
                                                                    if (e !== undefined) {
                                                                    }
                                                                    User_name_new= null
                                                               
                                                                    if (results && results[0] != null) {
                                                                      
                                                                       
                                                                        User_name_new= null
                                                                        
                                                                        User_name_new = (results[0]);
                                                                        url_string = _url.split("/")
                                                                        unq_name=url_string[3]
                                                                        if(unq_name.includes('?'))
                                                                        {
                                                                            url_string = unq_name.split("?")
                                                                            unq_name = url_string[0]
                                                                        }
                                                                        // alert(User_name_new +" : "+unq_name)
                                                                        chrome.storage.sync.get(['User_name','unqname'], function (UserDatataOld) {
                                                                            if (UserDatataOld.User_name != User_name_new && User_name_new != null) {
                                                                                    flag = 1
                                                                            }
                                                                           else if(UserDatataOld.User_name == User_name_new && User_name_new != null&& User_name_new != " " && User_name_new != undefined && UserDatataOld.unqname != unq_name && (!unq_name.includes("photo.php")) ){
                                                                                flag = 1
                                                                            }
                                                                            else {
                                                                                flag = 0
                                                                            }
    
                                                                            if (flag == 1) {
                                                                                
                                                                                chrome.storage.sync.set({ 'User_name': User_name_new, "unqname":unq_name }, function () {
                                                                                    expr = /</;
                                                                                    if (User_name_new.match(expr)) {
                                                                                        User_name_new = User_name_new.split("<")[0]
                                                                                    }
                                                                                
                                                                                    getStatus(User_name_new,_url,domain,unq_name,tabs2[0].id)
                                                                                    flag = 0;
                                                                                })
                                                                            }
                                                                        })

                                                                    }
                                                                    else{
                                                                      
                                                                       
                                                                        User_name_new = null; 
                                                                    }
                                                                   

                                                              

                                                                }
                                                            )
                                                        },1000);
                                                        }
                                                        else if (_url.split("/")[2].split(".")[0] == "twitter") {
                                                            flag = 0
                                                            domain = _url.split("/")[2].split(".")[0]
                                                            // url_string =
                                                            unq_name= _url.split("/")[3]
                                                            // alert(unq_name)
                                                            chrome.tabs.executeScript(
                                                                tabs2.id,
                                                                { code: "document.querySelector('a[class=\"ProfileHeaderCard-nameLink u-textInheritColor js-nav\"]').innerHTML" },
                                                                function (results) {
                                                                    let e = chrome.runtime.lastError;
                                                                    if (e !== undefined) {
                                                                        console.log(e);
                                                                    }
                                                                    flag = 0
                                                                    if (results && results[0] != null) {
                                                                        var User_name_new = (results[0]);
                                                                    }
                                                                    chrome.storage.sync.get(['User_name'], function (User_name_old) {
                                                                        if (User_name_old.User_name != User_name_new && User_name_new != null) {
                                                                            expr = /</;
                                                                                if (User_name_new.match(expr)) {
                                                                                    User_name_new = User_name_new.split("<")[0]
                                                                                }
                                                                            flag = 1
                                                                        }
                                                                        else {
                                                                            flag = 0
                                                                        }

                                                                        if (flag == 1) {
                                                                            chrome.storage.sync.set({ 'User_name': User_name_new }, function () {
                                                                                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                                                                    getStatus(User_name_new,_url,domain,unq_name,tabs[0].id)
                                                                                    // chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box", User_name_new: User_name_new, _url: _url, domain: domain }, function (response) { });
                                                                                });
                                                                                flag = 0;
                                                                            })
                                                                        }
                                                                    })

                                                                }
                                                            )

                                                        }


                                                        else if (_url.split("/")[2].split(".")[1] == "linkedin") {
                                                            flag = 0
                                                           
                                                            chrome.tabs.executeScript(
                                                                tabs2.id,
                                                                { code: "document.querySelector('h1[class=\"pv-top-card-section__name inline t-24 t-black t-normal\"]').innerHTML" },
                                                                function (results) {
                                                                    let e = chrome.runtime.lastError;
                                                                    if (e !== undefined) {
                                                                        console.log(e);
                                                                    }
                                                                    flag = 0
                                                                    if (results && results[0] != null) {
                                                                        var User_name_new = (results[0]);
                                                                        url_string = _url.split("/")
                                                                        unq_name=url_string[4]
                                                                        // alert(unq_name)
                                                                    }

                                                                    chrome.storage.sync.get(['User_name'], function (User_name_old) {
                                                                        if (User_name_old.User_name != User_name_new && User_name_new != null) {
                                                                            flag = 1
                                                                        }
                                                                        else {
                                                                            flag = 0
                                                                        }

                                                                        if (flag == 1) {
                                                                            chrome.storage.sync.set({ 'User_name': User_name_new }, function () {
                                                                                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                                                                    getStatus(User_name_new,_url,domain,unq_name,tabs[0].id)
                                                                                    // chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box", User_name_new: User_name_new, _url: _url, domain: domain }, function (response) { });
                                                                                });
                                                                                flag = 0;
                                                                            })
                                                                        }
                                                                    })

                                                                }
                                                            )

                                                        }

                                                    }

                                              
                                            });
                                        // }
                                    }
                                });
                            }
                        }
                    }
               
            })
        });

    }
});

