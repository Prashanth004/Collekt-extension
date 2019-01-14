$(function(){
$('#fin_sign').click(function(){
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    time = date+':'+time;
    var plan="A";
    var active=0;
    var payment=0;
    email= $('#email').val();
    user_name=$("#username").val();
    password=$("#password").val();
    passwordconf=$("#passwordconf").val();

    fetch(config.domain+"/user/register", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "username": user_name,
            "password": password,
            "passwordConf": passwordconf.append,

        })
    }).then(function(data){
        var htmlText = '';
        $('div').innerHTML = " ";
        $('div').empty();
        htmlText += '<div >';
        htmlText += '<p> A verification mail has been sent to your email. Click on that to activate your account</p>';
        htmlText += '</div>';
        $('#mian_sign').append(htmlText);


    }).catch(function(error){
        var htmlText = '';
        $('div').innerHTML = " ";
        $('div').empty();
        htmlText += '<div >';
        htmlText += '<p> signup unsucessfull!! </p>';
        htmlText += '</div>';
        $('#mian_sign').append(htmlText);

    })

});
})