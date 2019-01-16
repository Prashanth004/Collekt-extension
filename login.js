URlsocket = "http://localhost:1234"
var socket = io.connect(URlsocket);
$(function () {
$('#google').click(function () {
    localStorage.setItem("autoCollect", String(1)) 
    var w = window.open(config.domain+"/auth/google", "extension_popup", "width=500,height=700,status=no,scrollbars=yes,resizable=no");
    setTimeout(function () {
        socket.emit('closeiframe', {
            close:1,
            refresh:1
             });

    }, 1000);

})

$('#close').click(function () {
    chrome.runtime.sendMessage({ todo: "closeDisplay" });
socket.emit('closeiframe', {
 close:1,
 refresh:0
  });
})
})