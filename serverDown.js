


$(function () {

$('#close').click(function () {
  var msg = {
    type: 'close',
    data: 'close'
};
parent.postMessage(msg, "*");
})
})