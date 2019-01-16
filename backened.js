msgnew = null;
name = " ";
list=[];
// URLdomain = "https://bookmane.in/collekt"
URLdomain = "http://localhost:1234"
URlsocket = "http://localhost:1234"

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "showContent") {

        showname = 0
        showYesNo = 0
        showYesNo = msg.diffDomain
        showname = msg.sameDomain
        serverCall.displayList()
        $('#name').text(msg.User_name_new)
        msgnew = msg
        
        $('#close').click(function () {
            chrome.runtime.sendMessage({ todo: "closeDisplay" });
        })
    
        
        if (msg.isCollected == 1) {
            $('.welcome').css({ 'display': 'none' });
            $('.msgSmall').css({ 'display': 'block' });
            $('.reason').css({ 'display': 'none' });
            $('.list').css({ 'display': 'none' });
            $('#submit').css({ 'display': 'none' });   0
            chrome.runtime.sendMessage({ todo: "closeDisplay" });   
        }
        else {
            if (showname == 1) {
                $('.warning2').css({ 'display': 'none' });
                $('.msgSmall').css({ 'display': 'none' });
                $('.yesno').css({ 'display': 'none' });
                $('.welcome').css({ 'display': 'none' });
                $('#pevname').text(msg.User_name_new);
                $('.warning1').css({ 'display': 'block' });
                $('.name').css({ 'display': 'block' });
                $('.reason').css({ 'display': 'block' });
                $('.list').css({ 'display': 'block' });
               
                $('#submit').css({ 'display': 'block' });
            }
            else if (showYesNo == 1) {
                $('.welcome').css({ 'display': 'none' });
                $('.msgSmall').css({ 'display': 'none' });
                $('.warning1').css({ 'display': 'none' });
                $('#submit').css({ 'display': 'none' });
                $('.reason').css({ 'display': 'none' });
                $('.list').css({ 'display': 'none' });
               
                $('#prevDomain').text(msg.befDomain);
                $('#link').attr({'href':msg.befUrl});
                $('.warning2').css({ 'display': 'block' });
                $('#pevname2').text(msg.User_name_new);
                $('.yesno').css({ 'display': 'block' });


            }
            else {
                $('.warning2').css({ 'display': 'none' });
                $('.msgSmall').css({ 'display': 'none' });
                $('.yesno').css({ 'display': 'none' });
                $('#pevname').text(" ");
                $('.welcome').css({ 'display': 'none' });
                $('.warning1').css({ 'display': 'none' });
                $('.name').css({ 'display': 'none' });
                $('.reason').css({ 'display': 'block' });
                $('#submit').css({ 'display': 'block' });
            }
        }
    }

})
var socket = io.connect(URlsocket);


$(function () {
    config.server_down = 1

    
         $('#close').click(function () {
            chrome.runtime.sendMessage({ todo: "closeDisplay" });
        socket.emit('closeiframe', {
         close:1,
         refresh:0
          });
        })
   
        

    // alert(config.server_down)
    // if(config.server_down !=0 ){
       
    //     // $('#.serverDown').css({'display':'block'})
    //     $('#showCards').css({ 'display': 'none' })
    //     $('.msgSmall').css({ 'display': 'none' });
    //     $('.list').css({ 'display': 'none' });
    //     $('.welcome').text('Simple way to collect your social media contacts')
    //     $('.auto').css({ 'display': 'none' })
    //     $('.toggle').css({ 'display': 'none' })
    //     $('.logo').css({ 'display': 'none' })
    //     $('.personName').css({ 'display': 'none' })
    //     $('.welcome').css({ 'display': 'none' });
    //     $('.serverDown').css({'display':'block'})

    // }

    // else if (config.isloggedin != 1) {   
    //     $('#showCards').css({ 'display': 'none' })
    //     $('.msgSmall').css({ 'display': 'none' });
    //     $('.list').css({ 'display': 'none' });
    //     $('.welcome').text('Simple way to collect your social media contacts')
    //     $('.auto').css({ 'display': 'none' })
    //     $('.toggle').css({ 'display': 'none' })
    //     $('.logo').css({ 'display': 'block' })
    //     $('.personName').css({ 'display': 'none' })
    //     $('.welcome').css({ 'display': 'none' });
    //     // $('.warning2').css({ 'display': 'none' });
    //     $('.wlcmMsg').css({'display':'block'})
    //     $('#google').css({ 'display': 'block' })

    // }

    automatic = localStorage.getItem("autoCollect")
    // automatic =  msg.autoCollection;


    if (Number(automatic == 1)) {
        $("#cb1").attr("checked", true)
    }


 
    $('.switch').click(function () {
        var a = $('#cb1').is(":checked")
        setTimeout(function () {
            if (a) {
               
                localStorage.setItem("autoCollect", String(1))
            }
            else {
                localStorage.setItem("autoCollect", String(0))
              
            }

        }, 1000)

    })

    $('#formLink').attr({ 'href': config.feedbackLink })
    $('#help').click(function () {
        chrome.tabs.create({ url: "help.html" });
    })
    $('#close').click(function () {
        chrome.runtime.sendMessage({ todo: "closeDisplay" });
        chrome.runtime.sendMessage({ action: "closeDisplay" });
    })
    if (!navigator.onLine) {
        $('#showCards').css({ 'display': 'none' });
        $('#name').text("Offline");
        $('.welcome').text("No internet connectivity. :(")

    }
    $('#showCards').click(function () {
        chrome.tabs.create({ url: "cards.html" });
    })
    $('#submit').click(function () {
        listField = " "

        selctListValue = $('#search_categories').val();
        if(config.listEmpty==1 || selctListValue =="0" ){
            var listField = " "
         }
         else{
       var listField =selctListValue
    }
        chrome.runtime.sendMessage({ todo: "closeDisplay" });
        if (msgnew.sameDomain == 1) {
            var name = $('#nameEnter').val()
        }
        else {
            name = msgnew.User_name_new
        }
        var why_text = $('#reason').val()
        var sticker = " ";
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var polished_date = String(serverCall.getDate(date))
        if (!name || name == "" || name == undefined) {
            name = "Edit this";
        }
        if (!why_text || why_text == "" || why_text == undefined) {
            why_text = "Edit this";
        }

        var settings = {
            "async": false,
            "crossDomain": true,
            "url": config.domain+"/product/create",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
                "name": name,
                "why": why_text,
                "date": polished_date,
                "time": time,
                "domain": msgnew.domain,
                "unq_name": msgnew.unq_name,
                "lists":listField,
                "public": 1,
                "profile_url": msgnew.Url,
                "sticker": sticker
            }
        }
        $.ajax(settings).done(function (response) {
            socket.emit('cardAdded', {
                refresh:1
                 });
            if(config.listEmpty==0 && selctListValue !="0" ){
                
                serverCall.add_card_to_list_popup(response.data._id,listField)
                
             }
            
           
        }).catch(err =>
            console.log("err : ", err))

        chrome.runtime.sendMessage({ todo: "closeDisplay" });
    })
    $('#yes').click(function () {
        chrome.runtime.sendMessage({ todo: "closeDisplay" });
    })
    $('#no').click(function () {
        $('.welcome').css({ 'display': 'none' });
        $('#pevname').text(" ");
        $('#prevDomain').text(" ");
        $('#link').text(" ");
        $('.warning2').css({ 'display': 'none' });
        $('.yesno').css({ 'display': 'none' });
        $('.reason').css({ 'display': 'block' });
        $('#submit').css({ 'display': 'block' });


    })
})







var getDate = function (date) {

    var months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"

    ]
    var date_elements = date.split("-");
    month_num = date_elements[1];
    month_word = months[Number(month_num)];
    dat_num = date_elements[2];
    year_num = date_elements[0];
    final_date = dat_num + " " + month_word + ". " + year_num
    return final_date;
}



