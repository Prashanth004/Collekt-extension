msgnew = null;
name = " ";
list = [];
URLdomain = "https://bookmane.in/collekt"
// URLdomain = "http://localhost:1234"


chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
   
    if (msg.action == "showContent") {

        showname = 0
        showYesNo = 0
        showYesNo = msg.diffDomain
        showname = msg.sameDomain
        displayList()
        $('#name').text(msg.User_name_new)
        msgnew = msg


        if (msg.isCollected == 1) {
         
            $('.welcome').css({ 'display': 'none' });
            $('.msgSmall').css({ 'display': 'block' });
            $('.reason').css({ 'display': 'none' });
            $('.list').css({ 'display': 'none' });
            $('#submit').css({ 'display': 'none' }); 
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
                $('#link').attr({ 'href': msg.befUrl });
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


displayList = function () {
    list = []
    list=JSON.parse(localStorage.getItem("lists"))
   
       try{
        if(list.length!=0){
        config.listEmpty = 0
        $('.list').css({ 'display': 'block' });
        $('.listInside').empty()
        htmlEmelent5 = ""
        htmlEmelent5 += '<div style="width:50%; float:right; padding-right:15px; " class="select">'
        htmlEmelent5 += '<select name="search_categories" id="search_categories">'
        htmlEmelent5 += '<option value="0" >Select one</optioon>'
        for (var items in list) {
            htmlEmelent5 += '<option value="' + list[items]._id + '">' + list[items].List_name + '</option>'
        }
        htmlEmelent5 += '</select>'
        htmlEmelent5 += '</div>'
        $('.listInside').append(htmlEmelent5)
    }
}
catch(e){
console.log("error")
}
},



$(function () {
    var listField = null
    config.server_down = 1


    $('#close').click(function () {
        config.socket.emit('closeiframe', {
            close: 1,
            refresh: 0
        });
        chrome.runtime.sendMessage({ todo: "closeDisplay" });
    })


    automatic = localStorage.getItem("autoCollect")
   
    if (Number(automatic == 1)) {
        $("#cb1").attr("checked", true)
    }
    else{
        $('#autoText').text("Manual")

    }



    $('.switch').click(function () {
        var a = $('#cb1').is(":checked")
        setTimeout(function () {
            if (a) {
                $('#autoText').text("Automatic")
                localStorage.setItem("autoCollect", String(1))
            }
            else {
                $('#autoText').text("Manual")
                localStorage.setItem("autoCollect", String(0))

            }

        }, 1000)

    })

    $('#formLink').attr({ 'href': config.feedbackLink })
    $('#help').click(function () {
        chrome.tabs.create({ url: "help.html" });
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

        listField = null;
        selctListValue = $('#search_categories').val();
  
        if (config.listEmpty == 1 || selctListValue == "0") {
            listField = null;
        }
        else {
            listField = selctListValue
        }
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
            "url": config.domain + "/product/create",
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
                "lists": " ",
                "public": 1,
                "profile_url": msgnew.Url,
                "sticker": sticker
            }
        }
        $.ajax(settings).done(function (response) {
            $('.welcome').css({ 'display': 'none' });
            $('#succesSave').css({ 'display': 'block' });
            $('.reason').css({ 'display': 'none' });
            $('.list').css({ 'display': 'none' });
            $('#submit').css({ 'display': 'none' }); 
            $('#autoToggole').css({'display' : 'none'})
         config.socket.emit('cardAdded', {
                refresh: 1
            });
            if (config.listEmpty == 0 && selctListValue != "0") {
                serverCall.add_card_to_list_popup(response.data._id, listField)
            }

            setTimeout(function(){
                config.socket.emit('closeiframe', {
                    close: 1,
                    refresh: 0
                });
                chrome.runtime.sendMessage({ todo: "closeDisplay" });
            },2000);



        }).catch(err =>{
            setTimeout(function(){
                chrome.runtime.sendMessage({ todo: "closeDisplay" });
            },2000);
     
        })
       
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



