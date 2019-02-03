// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
 * @filedescription Initializes the extension's background page.
 */
var exceuted = 0
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   
    var is_angel = ' '
    if (request.todo == "showPageAction") {
        chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
            exceuted = 0
            if (((details.url.split(".")[1]) == "facebook" || ((details.url.split("/")[2].split(".")[1]) == "linkedin")) || (((details.url.split("/")[2].split(".")[0]) == "twitter"))) {
                console.log("stage 1")
                if (details.frameId === 0) {
                    console.log("stage 2")
                    chrome.tabs.get(details.tabId, function (tab) {

                        if (tab == "undefined" || typeof (tab) == undefined || tab == undefined || typeof (tab) == "undefined") {}
                        if (tab.url === details.url) {
                            chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs2) {
                                if (tab == "undefined" || typeof (tab) == undefined || tab == undefined || typeof (tab) == "undefined") {}
                                else if(exceuted ===0){
                                    exceuted = 1;
                                console.log("stage 3")
                                alert("am good")
                                }
                            })
                           
                        }

                    })
                }
        }})

    }})