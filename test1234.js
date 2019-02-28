

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "showContent") {
        console.log("sender : ",msg.testing)
        $('#heading').text("Hello")
    }
})

$(function () {
    $('#close').click(function(){
        console.log("close clicked")
        var msg = {
            type: 'close',
            data: 'close'
        };
        parent.postMessage(msg, "*");
    })
})