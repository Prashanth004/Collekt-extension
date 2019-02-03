


$(function () {

$('#close').click(function () {
    chrome.runtime.sendMessage({ todo: "closeDisplay" });
    config.socket.emit('closeiframe', {
 close:1,
 refresh:0
  });
})
})