
$(function () {
$('#google').click(function () {
    localStorage.setItem("autoCollect", String(1)) 
    var w = window.open(config.domain+"/auth/google", "extension_popup", "width=500,height=700,status=no,scrollbars=yes,resizable=no");
    setTimeout(function () {
       

    }, 1000);

})

$('#close').click(function () {
    chrome.runtime.sendMessage({ todo: "closeDisplay" });
    config.socket.emit('closeiframe', {
 close:1,
 refresh:0
  });
})
})