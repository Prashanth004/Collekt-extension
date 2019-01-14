
var getProfileDetails = function () {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.domain+"/user/test",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }

    $.ajax(settings).done(function (response) {

        if (response.profilePicture == undefined) {
            $('#profileImg').attr("src", "login.jpg")
        }
        else {
            $('#profileImg').attr("src", String(response.profilePicture))
        }
        $('#pName').html(response.username)

    });
}

var display_searched = function (search_text, cardsold) {
    var htmlText = '';
    $('.wrapper').empty()
    cards= cardsold.reverse();

    for (var key in cards) {
        htmlText = '';
        if ((cards[key].name.toUpperCase()).includes(search_text.toUpperCase()) || (cards[key].why.toUpperCase()).includes(search_text.toUpperCase())) {
            flag = 0
            htmlText += '<div id="feedback" class="float float1">';
            htmlText += '<a href=' + config.feedbackLink + ' target="_blank">'
            htmlText += '<i class="glyphicon glyphicon-comment"></i>';
            htmlText += '</a>'
            htmlText += '<p class="feedback">FeedBack</p>'
            htmlText += '</div>';
            htmlText += '<div class="card" style="width: 18rem;">';
            htmlText += '<div  class="body1" id="div_' + cards[key]._id + '" >';
            htmlText += '<div  class="pic">';
            htmlText += '<a href="' + cards[key].profile_url + '"target="_blank">'
            htmlText += '<img align=centre;width=100%; height=100%; src="' + cards[key].domain + '.jpg" />';
            htmlText += '</a>'
            htmlText += '</div>';
            htmlText += '<div class="dropdown1">';
            htmlText += '<div id="addtolist_' + cards[key]._id + '" ><i class="glyphicon glyphicon-list-alt"></i></div>';
            htmlText += '<div class="dropdown-content1" padding="12px" id="dropdown_list2' + cards[key]._id + '" aria-labelledby="dropdownMenuButton">';
            for (var k in list) {
                htmlText += '<div class="no_button" id="selectlist_' + cards[key]._id + '_' + list[k]._id + '">' + list[k].List_name + '</div>';
            }
            htmlText += '<button class="no_button_last"  id="addnew_' + cards[key]._id + '">Create new list</button>';
            htmlText += '</div>';
            htmlText += '</div>';
            htmlText += '<div id="public_' + cards[key]._id + '"class="no_button4">'
            htmlText += '<label class="switch">';
            if (cards[key].public != 1) {
                htmlText += ' <input id="check_' + cards[key]._id + '"type="checkbox">';
            } else {
                htmlText += ' <input type="checkbox" checked>';
            }
            htmlText += '<span class="slider round"></span>';
            htmlText += '</label>';
            htmlText += '</div>'
            htmlText += '<div class="no_button1" id="editcard_' + cards[key]._id + '"><i class="glyphicon glyphicon-pencil"></i></div>';
            htmlText += '<div class="no_button2" id="delete_' + cards[key]._id + '"><i class="glyphicon glyphicon-trash"></i></div>';
            htmlText += '<div class="no_button3" id="expando_' + cards[key]._id + '"><i class="glyphicon glyphicon-star"></i></div>';
            htmlText += '<div class="why" >';
            htmlText += '<p id="why_' + cards[key]._id + '" >Reason :    ' + cards[key].why + '</p>';
            htmlText += '</div>';
            htmlText += '<div class="line"> </div>';
            htmlText += '<div  class="name">';
            htmlText += '<a href="' + cards[key].profile_url + '"target="_blank">'
            htmlText += '<p> ' + cards[key].name + '</p>';
            htmlText += '</a>'
            htmlText += '</div>';
            htmlText += '<div class="stick" id="stick_' + cards[key]._id + '"><p> </p>';
            htmlText += '</div>';
            htmlText += '</div>';
            htmlText += '<div class="collapse" id="colapse_' + cards[key]._id + '">';
            htmlText += '<div  id="sticker_' + cards[key]._id + '"class="stickers">';
            htmlText += '<button id="sticker_active_' + cards[key]._id + '" class="button_sticker"><div class="sticker" >A</div></button>';
            htmlText += '<button id="sticker_communicative_' + cards[key]._id + '"  class="button_sticker"><div class="sticker" >C</div></button>';
            htmlText += '<button id="sticker_helpful_' + cards[key]._id + '" class="button_sticker"><div class="sticker" >H</div></button>';
            htmlText += '</div>';
            htmlText += '</div>';
        }
        $('.wrapper').append(htmlText);
    }
}

var put_sticker = function (_id, sticker) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.domain+"product/" + _id,
        "method": "PUT",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        "data": {
            "sticker": sticker
        }
    }

    $.ajax(settings).done(function (response) {
    });

}

var display_content = function (domain, cardsold) {
    flag = 1
    list = []
    var list_setting = {
        "async": false,
        "crossDomain": true,
        "url": config.domain+"/list/",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }
    $.ajax(list_setting).done(function (response) {
        for (var i in response) {
            list.push(response[i])
        }
    });
    counter = 0
    var htmlText = '';
    cards= cardsold.reverse();

    $('.wrapper').empty()
    for (var key in cards) {
        htmlText = '';
        counter++
        if (domain == cards[key].domain) {            flag = 0
            htmlText += '<div id="feedback" class="float float1">';
            htmlText += '<a href=' + config.feedbackLink + ' target="_blank">'
            htmlText += '<i class="glyphicon glyphicon-comment"></i>';
            htmlText += '</a>'
            htmlText += '<p class="feedback">FeedBack</p>'
            htmlText += '</div>';
            htmlText += '<div class="card" style="width: 18rem;">';
            htmlText += '<div  class="body1" id="div_' + cards[key]._id + '" >';
            htmlText += '<div  class="pic">';
            htmlText += '<a href="' + cards[key].profile_url + '"target="_blank">'
            htmlText += '<img align=centre;width=100%; height=100%; src="' + cards[key].domain + '.jpg" />';
            htmlText += '</a>'
            htmlText += '</div>';
            htmlText += '<div class="dropdown1">';
            htmlText += '<div id="addtolist_' + cards[key]._id + '" ><i class="glyphicon glyphicon-list-alt"></i></div>';
            htmlText += '<div class="dropdown-content1" padding="12px" id="dropdown_list2' + cards[key]._id + '" aria-labelledby="dropdownMenuButton">';
            for (var k in list) {
                htmlText += '<div class="no_button" id="selectlist_' + cards[key]._id + '_' + list[k]._id + '">' + list[k].List_name + '</div>';
            }
            htmlText += '<button class="no_button_last"  id="addnew_' + cards[key]._id + '">Create new list</button>';
            htmlText += '</div>';
            htmlText += '</div>';
            htmlText += '<div id="public_' + cards[key]._id + '"class="no_button4">'
            htmlText += '<label class="switch">';
            if (cards[key].public != 1) {
                htmlText += ' <input id="check_' + cards[key]._id + '"type="checkbox">';
            } else {
                htmlText += ' <input type="checkbox" checked>';
            }
            htmlText += '<span class="slider round"></span>';
            htmlText += '</label>';
            htmlText += '</div>'
            htmlText += '<div class="no_button1" id="editcard_' + cards[key]._id + '"><i class="glyphicon glyphicon-pencil"></i></div>';
            htmlText += '<div class="no_button2" id="delete_' + cards[key]._id + '"><i class="glyphicon glyphicon-trash"></i></div>';
            htmlText += '<div class="no_button3" id="expando_' + cards[key]._id + '"><i class="glyphicon glyphicon-star"></i></div>';
            htmlText += '<div class="why" >';
            htmlText += '<p id="why_' + cards[key]._id + '" >Reason :    ' + cards[key].why + '</p>';
            htmlText += '</div>';
            htmlText += '<div class="line"> </div>';
            htmlText += '<div  class="name">';
            htmlText += '<a href="' + cards[key].profile_url + '"target="_blank">'
            htmlText += '<p> ' + cards[key].name + '</p>';
            htmlText += '</a>'
            htmlText += '</div>';
            htmlText += '<div class="stick" id="stick_' + cards[key]._id + '"><p> </p>';
            htmlText += '</div>';
            htmlText += '</div>';
            htmlText += '<div class="collapse" id="colapse_' + cards[key]._id + '">';
            htmlText += '<div  id="sticker_' + cards[key]._id + '"class="stickers">';
            htmlText += '<button id="sticker_active_' + cards[key]._id + '" class="button_sticker"><div class="sticker" >A</div></button>';
            htmlText += '<button id="sticker_communicative_' + cards[key]._id + '"  class="button_sticker"><div class="sticker" >C</div></button>';
            htmlText += '<button id="sticker_helpful_' + cards[key]._id + '" class="button_sticker"><div class="sticker" >H</div></button>';
            htmlText += '</div>';
            htmlText += '</div>';
        }
        else if (domain == "all") {
            flag = 0
            htmlText += '<div id="feedback" class="float float1">';
            htmlText += '<a href=' + config.feedbackLink + ' target="_blank">'
            htmlText += '<i class="glyphicon glyphicon-comment"></i>';
            htmlText += '</a>'
            htmlText += '<p class="feedback">FeedBack</p>'
            htmlText += '</div>';
            htmlText += '<div class="card" style="width: 18rem;">';
            htmlText += '<div  class="body1" id="div_' + cards[key]._id + '" >';
            htmlText += '<div  class="pic">';
            htmlText += '<a href="' + cards[key].profile_url + '"target="_blank">'
            htmlText += '<img align=centre;width=100%; height=100%; src="' + cards[key].domain + '.jpg" />';
            htmlText += '</a>'
            htmlText += '</div>';
            htmlText += '<div class="dropdown1">';
            htmlText += '<div id="addtolist_' + cards[key]._id + '" ><i class="glyphicon glyphicon-list-alt"></i></div>';
            htmlText += '<div class="dropdown-content1" padding="12px" id="dropdown_list2' + cards[key]._id + '" aria-labelledby="dropdownMenuButton">';
            for (var k in list) {
                htmlText += '<div class="no_button" id="selectlist_' + cards[key]._id + '_' + list[k]._id + '">' + list[k].List_name + '</div>';
            }
            htmlText += '<button class="no_button_last"  id="addnew_' + cards[key]._id + '">Create new list</button>';
            htmlText += '</div>';
            htmlText += '</div>';
            htmlText += '<div id="public_' + cards[key]._id + '"class="no_button4">'
            htmlText += '<label class="switch">';
            if (cards[key].public != 1) {
                htmlText += ' <input id="check_' + cards[key]._id + '"type="checkbox">';
            } else {
                htmlText += ' <input type="checkbox" checked>';
            }
            htmlText += '<span class="slider round"></span>';
            htmlText += '</label>';
            htmlText += '</div>'
            htmlText += '<div class="no_button1" id="editcard_' + cards[key]._id + '"><i class="glyphicon glyphicon-pencil"></i></div>';
            htmlText += '<div class="no_button2" id="delete_' + cards[key]._id + '"><i class="glyphicon glyphicon-trash"></i></div>';
            htmlText += '<div class="no_button3" id="expando_' + cards[key]._id + '"><i class="glyphicon glyphicon-star"></i></div>';
            htmlText += '<div class="why" >';
            htmlText += '<p id="why_' + cards[key]._id + '" >Reason :    ' + cards[key].why + '</p>';
            htmlText += '</div>';
            htmlText += '<div class="line"> </div>';
            htmlText += '<div  class="name">';
            htmlText += '<a href="' + cards[key].profile_url + '"target="_blank">'
            htmlText += '<p> ' + cards[key].name + '</p>';
            htmlText += '</a>'
            htmlText += '</div>';
            htmlText += '<div class="stick" id="stick_' + cards[key]._id + '"><p> </p>';
            htmlText += '</div>';
            htmlText += '</div>';
            htmlText += '<div class="collapse" id="colapse_' + cards[key]._id + '">';
            htmlText += '<div  id="sticker_' + cards[key]._id + '"class="stickers">';
            htmlText += '<button id="sticker_active_' + cards[key]._id + '" class="button_sticker"><div class="sticker" >A</div></button>';
            htmlText += '<button id="sticker_communicative_' + cards[key]._id + '"  class="button_sticker"><div class="sticker" >C</div></button>';
            htmlText += '<button id="sticker_helpful_' + cards[key]._id + '" class="button_sticker"><div class="sticker" >H</div></button>';
            htmlText += '</div>';
            htmlText += '</div>';
        }
        $('.wrapper').append(htmlText);
        var a = cards[key].sticker
        if (a.length > 0) {
            for (var i in a) {
                stick_ic = '';
                if (a[i] == "communicative") {
                    $('#sticker_communicative_' + cards[key]._id).css({ "background-color": "rgb(240, 224, 224)" })
                }
                else if (a[i] == "active") {
                    $('#sticker_active_' + cards[key]._id).css({ "background-color": "rgb(240, 224, 224)" })
                }
                else if (a[i] == "helpful") {
                    $('#sticker_helpful_' + cards[key]._id).css({ "background-color": "rgb(240, 224, 224)" })
                }
            }
        }
    }
    if (flag == 1) {
        htmlText = '';
        htmlText += '<div class="container">'
        htmlText += '<h1>Lets get started with finding people who can provide value. Start browsing through profiles to get started</h1>'
        htmlText += '</div>'
        $('.wrapper').append(htmlText)
    }
}


