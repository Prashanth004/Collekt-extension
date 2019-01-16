
URlsocket = "http://localhost:1234"
var socket = io.connect(URlsocket);

$(function () {

$('#close').click(function () {
    chrome.runtime.sendMessage({ todo: "closeDisplay" });
socket.emit('closeiframe', {
 close:1,
 refresh:0
  });
})
})