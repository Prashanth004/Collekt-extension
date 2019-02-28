
$(function () {
$('#google').click(function () {
    localStorage.setItem("autoCollect", String(1)) 
    var w = window.open(config.domain+"/auth/google", "extension_popup", "width=500,height=700,status=no,scrollbars=yes,resizable=no");
    setTimeout(function () {
       

    }, 1000);

})

$('#close').click(function () {
    var msg = {
        type: 'close',
        data: 'close'
    };
    parent.postMessage(msg, "*");
})
})