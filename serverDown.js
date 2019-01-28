


$(function () {

$('#close').click(function () {
  socket = io.connect("https://bookmane.in"),

    chrome.runtime.sendMessage({ todo: "closeDisplay" });
    socket.emit('closeiframe', {
 close:1,
 refresh:0
  });
})
})