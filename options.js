var socket = " "
var cards = []
function copyToClipboard(elementId) {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}

test()
if ( config.server_down == 1) {
  $("#sevre-modal").css({ 'display': 'block' });
  $(".close").click(function () {
    $("#sevre-modal").css({ 'display': 'none' });
  })
}


var crtList = function () {
  $('#main').empty()
  $('.wrapper').empty()
  var htmlCr = '';
  htmlCr += '<div id="crt_lst_btn" >';
  htmlCr += '<buton id="crtLst">Create List</button>';
  htmlCr += '</div>';

  $('#main').append(htmlCr)

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
    var htmlElement = " "
    var flag =1
    for (var i in response) {
      flag = 0
      htmlElement += '<div class="card" style="width: 18rem;">';
      htmlElement += '<div class="List_div id="List_' + response[i]._id + '">';
      htmlElement += '<div class="div_name">';
      htmlElement += '<p>' + response[i].List_name + '</p>';
      htmlElement += '</div>';
      htmlElement += '<div class="div_button">';
      htmlElement += '<div class="drop_list"id="button_' + response[i]._id + '"><span class="caret"></span></div>';
      htmlElement += '<div class="option" id="options_' + response[i]._id + '"><i class="glyphicon glyphicon-option-vertical"></i></div>';
      htmlElement += '<div class="dropdown-content3" padding="12px" id="dropdown_options' + response[i]._id + '" aria-labelledby="dropdownMenuButton">';
      htmlElement += '<div class="no_button" id="share_' + response[i]._id + '">Share<i class="glyphicon glyphicon-share"></i></div>';
      htmlElement += '<div class="no_button" id="deletlst_' + response[i]._id + '">Delete<i class="glyphicon glyphicon-trash"></i></div>';
      htmlElement += '</div>';
      htmlElement += '</div>';
      htmlElement += '</div>';
      htmlElement += '<div class="collapse" id="colapseli_' + response[i]._id + '">';
      htmlElement += '<div class="div_colapse_back">';
      if ((response[i].Cards_id).length == 0) {
        htmlElement += '<p>No cards present. Add cards to to lists in the cards section.</p>'
      } else {
        for (var j in response[i].Cards_id) {
          htmlElement += '<div class="div_colapse">';
          htmlElement += '<div class="div_name">';
          htmlElement += '<p id="nmp_' + response[i]._id + '_' + response[i].Cards_id[j] + '"></p>';
          htmlElement += '</div>';
          htmlElement += '<a id="a_' + response[i]._id + '_' + response[i].Cards_id[j] + '" href="" target="_blank">';
          htmlElement += '<img id="img_' + response[i]._id + '_' + response[i].Cards_id[j] + '";align=centre;height=25px; width=25px;  src="" />';
          htmlElement += '</a>';
          htmlElement += '</div>';
        }
      }
      htmlElement += '</div>';
      htmlElement += '</div>';
      htmlElement += '</div>';
    }

    $('.wrapper').append(htmlElement);
    if (flag == 1) {
      htmlText = '';
      htmlText += '<div class="container">'
      htmlText += '<h1>Created your own customized list. Add Card to the list. Access and share the list anytime!!</h1>'
      htmlText += '</div>'
      $('.wrapper').append(htmlText)
  }
  })
}
k = "918027681781"
var jsEncode = {
  encode: function (s, k) {
    var enc = "";
    var str = "";
    // make sure that input is string
    str = s.toString();
    for (var i = 0; i < s.length; i++) {
      // create block
      var a = s.charCodeAt(i);
      // bitwise XOR
      var b = a ^ k;
      enc = enc + String.fromCharCode(b);
    }
    return enc;
  }
};



var list = []
var add_card_to_list = function (card_id, list_id) {
  var settings = {
    "async": false,
    "crossDomain": true,
    "url": config.domain+"/list/ad/" + list_id,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    "data": {

      "Cards_id": card_id
    }
  }

  $.ajax(settings).done(function (response) {

    if (response.success == 1) {

      var settings = {
        "async": false,
        "crossDomain": true,
        "url": config.domain+"/product/list/" + card_id,
        "method": "PUT",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",

        },
        "data": {
          "listId": list_id
        }
      }

      $.ajax(settings).done(function (response) {
        if (response.success == 1) {
          alert("card added to the list")
          crtList()
        }
      });

    }

    if (response.success == 0 && response.card_exists == 1 && response.limit == 1) {
      alert("The card is already added to that list and cant add the card to maore than three lists !")
    }
    if (response.success == 0 && response.card_exists == 1 && response.limit == 0) {
      alert("The card is already added to that list !")
    }
    if (response.success == 0 && response.limit == 1 && response.card_exists == 0) {
      alert("Cant add the card to more than three lists.")
    }


  });
}
var profile_url = " "
var profile_domain = " "
var profile_name = " "
var lists = []

var get_card_id = function (id) {
  var settings = {
    "async": false,
    "crossDomain": true,
    "url": config.domain+"/product/" + id,
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",

    },

  }
  $.ajax(settings).done(function (res) {
    profile_name = res.name;
    profile_domain = res.domain;
    profile_url = res.profile_url;
    lists = res.lists

  })

}

var list_name = " "
var card_ids = []
var get_lis_details = function (id) {
  var settings = {
    "async": false,
    "crossDomain": true,
    "url": config.domain+"/list/" + id,
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "Postman-Token": "806dde3b-35d3-40f1-bc92-1306e8964ea2"
    },
    "data": {
      "listId": id
    }
  }

  $.ajax(settings).done(function (response) {
    list_name = response[0].List_name;
    for (var card in response[0].Cards_id) {

      card_ids.push(response[0].Cards_id)
    }

  });

}

var get_all_lists = function () {
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
}
$(function () {

$('#export').click(function(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.domain+"/product/exporttocsv",
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    
  }
  
  $.ajax(settings).done(function (response) {
  });
})
  var socket = io.connect("https://bookmane.in/");

  socket.on('logout', function (data) {
   
    window.close();
  });
 

  socket.on('cardAdded', function (data) {
    location.reload()
  });
  
  socket.on('delete', function (data) {
    $('#div_' + data).remove()
    setTimeout(function () {
      location.reload()
    }, 1000)

  })
  socket.on('deleteLst', function (data) {
    $('#myModal').css("display", "none")
    $('#List_' + data).remove()
    crtList()
    setTimeout(function () {

      location.reload()
    }, 1000)

  })

  socket.on('list_created', function (data) {

    crtList()

  });



  getProfileDetails()



  var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.domain+"/product/",
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",

    },

  }


  cards = []
  $.ajax(settings).done(function (res) {
    for (var i in res) {
      cards.push(res[i])
    }
  }).then(function () {

    $(document).ready(function () {
      // 

      display_content("all", cards);




    })


    $('#card-search').on('input', function () {
      display_searched($('#card-search').val(), cards)
    });



    $('#facebook').click(function () {
      display_content("facebook", cards)
    })

    $('#nav_card').click(function () {
      location.reload();
    })
    $('#List').click(function () {

      crtList()
    })
    $('#twitter').click(function () {
      display_content("twitter", cards)
    })
    $('#linkedin').click(function () {

      display_content("linkedin", cards)
    })

    $('#crt_list').click(function () {
      list_name = $('#list_name').val()

      var settings222 = {
        "async": false,
        "crossDomain": true,
        "url": config.domain+"/list/create",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "data": {
          "list_name": list_name,
        }
      }

      $.ajax(settings222).done(function (response) {
        $("#crt_Modal").css({ 'display': 'none' });
        $('#crt_Modal_confirm').css("display","block")
        $(".close").click(function () {
          $("#crt_Modal").css({ 'display': 'none' });
        })

       
        setTimeout(function () {
          $('#crt_Modal_confirm').css("display", "none")

          socket.emit('list_created', {


            data: response
          });

        }, 1500);

      });
      // location.reload()



    })



    $('#angel').click(function () {
      display_content("angel", cards)
    })
    $(document).delegate('button', 'hover', function (event) {

    })


    $(document).delegate('div', 'click', function (button) {
      var id_name = button.currentTarget.id




      var kind_of_id = id_name.split("_")[0]
      if (kind_of_id == "public") {
        _id = id_name.split("_")[1];
        setTimeout(function () {
          var a = $('#check_' + _id).is(":checked")
          if (a) {
            public = 1

          }
          else {
            public = 0
          }
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.domain+"/product/public/" + _id,
            "method": "PUT",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",

            },
            "data": {

              "public": public
            }
          }

          $.ajax(settings).done(function (response) {

          });
        }, 1000);



      }
      if (kind_of_id == "share") {
        _id = id_name.split("_")[1]
        var chars = { 'a': 'd', 'd': 'y', 'y': 'a' };

        enc = _id.replace(/[ady]/g, m => chars[m]);
        sharableLink = config.domain+"/share/show/list/" + enc
        card_ids = []
        get_lis_details(_id)
        $('#mdalCont').empty()
        if (card_ids.length == 0) {
          var htmlEl = " "
          htmlEl += '<span id="linkSpan" class="close">&times;</span>';
          htmlEl += '<p>Sharable link is :</p>';
          htmlEl += '<br/>';
          htmlEl += '<p id="link">no cards are present in the list to share</p>';
          $('#mdalCont').append(htmlEl)


        }
        else {
          var htmlEl = " "
          htmlEl += '<span id="linkSpan" class="close">&times;</span>';
          htmlEl += '<p>Sharable link is :</p>';
          htmlEl += '<br/>';
          htmlEl += '<p id="link">' + sharableLink + '</p>';
          htmlEl += '<button id="coppy" class ="btn btn-dark">Coppy to clipbaort</button>';

          $('#mdalCont').append(htmlEl)

        }
        $('#linkModal').css("display", "block");
        $('#coppy').click(function () {
          copyToClipboard('link')
          htm = " ";
          htm += '<p id="cpyconf">Copied !!</p>';
          $('#mdalCont').append(htm)
          setTimeout(function () {
            $('#cpyconf').remove()

          }, 1500);

        })
        $(".close").click(function () {
          $("#linkModal").css({ 'display': 'none' });
        })





      }
      if (kind_of_id == "res") {

      }
      if (kind_of_id == "deletlst") {
        _id = id_name.split("_")[1]
        $("#myModal").css({ 'display': 'block' });
        $("#cancel").click(function () {
          $("#myModal").css({ 'display': 'none' });
        })
        $(".close").click(function () {
          $("#myModal").css({ 'display': 'none' });
        })

        $('#confirm_yes').click(function () {

          $('#divlst_' + _id).remove()
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.domain+"/list/" + _id,
            "method": "DELETE",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },

          }

          $.ajax(settings).done(function (response) {




            var settings = {
              "async": true,
              "crossDomain": true,
              "url": config.domain+"/product/delete/list/",
              "method": "PUT",
              "headers": {

              },
              "data": {
                "listId": _id
              }
            }

            $.ajax(settings).done(function (response) {
              $(".modal-content").empty();
              $(".modal-content").innerHTML = " "
              htmlEl = "";
              htmlEl += '<span class="close">&times;</span>';

              htmlEl += '<p>Delete successfull</p>'
              $('.modal-content').append(htmlEl)
              socket.emit('deleteLst', {
                ID: _id
              })
            });
          });

        })

      }
      if (kind_of_id == "options") {

        _id = id_name.split("_")[1]
        $('#dropdown_options' + _id).toggle('fast', function () {
        })
        $('#dropdown_options' + _id).mouseleave(function () {
          $('#dropdown_options' + _id).fadeOut('slow');
        });
      }
      if (kind_of_id == "button") {


        _id = id_name.split("_")[1]
        $('#colapseli_' + _id).toggle('fast', function () {
        })

        var list_setting111 = {
          "async": true,
          "crossDomain": true,
          "url": config.domain+"/list/" + _id,
          "method": "GET",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
        $.ajax(list_setting111).done(function (response) {
          for (var j in response[0].Cards_id) {
            get_card_id(response[0].Cards_id[j])
            $('#nmp_' + _id + '_' + response[0].Cards_id[j]).text(profile_name)
            $('#a_' + _id + '_' + response[0].Cards_id[j]).attr("href", profile_url)
            $('#img_' + _id + '_' + response[0].Cards_id[j]).attr("src", profile_domain + ".jpg")
          }
        })



      }


      if (kind_of_id == "editcard") {

        _id = id_name.split("_")[1]
        // alert(_id)
        $("#myModal_edit").css({ 'display': 'block' });
        $(".close").click(function () {
          $("#myModal_edit").css({ 'display': 'none' });
        })

        $('#confirm').click(function () {

          why = $('#why').val();


          var settings = {
            "async": false,
            "crossDomain": true,
            "url": config.domain+"/product/why/" + _id,
            "method": "PUT",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
              "why": why
            }
          }

          $.ajax(settings).done(function (response) {
            if (response.success == 1) {
              $("#myModal_edit").css({ 'display': 'none' });
              $("#myModal_edit_success").css({ 'display': 'block' });
              $(".close").click(function () {
                $("#myModal_edit").css({ 'display': 'none' });
              })
              setTimeout(function(){
                $("#myModal_edit_success").css({ 'display': 'none' });
              },2000);
             
              $('#why_'+_id).text('Reason :  '+why)

            }


          }).fail(function () {
            alert("failed")
          })

         
        })

      }
      if (id_name == "crt_lst_btn") {
        $("#crt_Modal").css({ 'display': 'block' });
        $(".close").click(function () {
          $("#crt_Modal").css({ 'display': 'none' });
        })
      }
      if (kind_of_id == "addtolist") {
        _id = id_name.split("_")[1]
        $('#dropdown_list2' + _id).toggle('fast', function () {
        })
        $('#dropdown_list2' + _id).mouseleave(function () {
          $('#dropdown_list2' + _id).fadeOut('slow');
        });

      }
      if (kind_of_id == "expando") {
        var _id = id_name.split("_")[1]
        $('#colapse_' + _id).toggle('fast', function () {
        })

        $('#colapse_' + _id).mouseleave(function () {
          $('#colapse_' + _id).fadeOut('slow');
        });
      }
      if (kind_of_id == "selectlist") {
        card_id = id_name.split("_")[1];
        List_id = id_name.split("_")[2];

        add_card_to_list(card_id, List_id)

      }


      if (kind_of_id == "delete") {
        $('#alert').empty()

        _id = id_name.split("_")[1]
        get_card_id(_id)
        $('#alert').empty()
        htmlele = " "
        htmlele += '<span class="close">&times;</span>'
        if (lists.length > 0 ) {
          htmlele += '<p>The card is in following lists:</p>'

          for (var ids in lists) {


            get_lis_details(lists[ids])
            htmlele += '<p><b>' + list_name + '</b></p>';

          }
          // htmlele += '<p><br></br></p>';
        }
        htmlele += '<p>You can not retrieve data once deleted.Are you sure you wanna delete this card?</p>';

        $('#alert').append(htmlele)
        $("#myModal").css({ 'display': 'block' });
        $("#cancel").click(function () {
          $("#myModal").css({ 'display': 'none' });
          location.reload()
        })
        $(".close").click(function () {
          $("#myModal").css({ 'display': 'none' });
          location.reload()
        })

        $('#confirm_yes').click(function () {
          $('#div_' + _id).remove()
          var settings1 = {
            "async": true,
            "crossDomain": true,
            "url": config.domain+"/product/" + _id,
            "method": "DELETE",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",

            }

          }

          $.ajax(settings1).done(function (response) {

            var settings = {
              "async": false,
              "crossDomain": true,
              "url": config.domain+"/list/rm",
              "method": "PUT",
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded",

              },
              "data": {

                "Cards_id": _id
              }
            }

            $.ajax(settings).done(function (response) {

            }).fail(function () {

            })

          });
          $('.modal-content').empty()
          htmlEl = " ";
          htmlEl += '<span class="close">&times;</span>';
          htmlEl += '<p>Deleted Successfully</p>';
          $('.modal-content').append(htmlEl)
          setTimeout(function () {
            $("#myModal").css({ 'display': 'none' });
            socket.emit('delete', {
              ID: _id
            })
            // $('#div_'+_id).remove()
          }, 1500);



        })
        $('#cancel').click(function () {
          $('#alert').empty()
          htmlEl = " "
          htmlEl += '<span class="close">&times;</span>';
          htmlEl += '<p>You can not retrieve data once deleted.Are you sure you wanna delete this card?</p>';
          $('#alert').append(htmlEl)
        })


      }
    })



    $(document).delegate('button', 'click', function (button) {

      var id_name = button.currentTarget.id









      var kind_of_id = id_name.split("_")[0]
      if (kind_of_id == "addnew") {
        $("#crt_Modal").css({ 'display': 'block' });
        $(".close").click(function () {
          $("#crt_Modal").css({ 'display': 'none' });
        })

      }









      if (kind_of_id == "sticker") {
        _id = id_name.split("_")[2]
        var sticker = id_name.split("_")[1]
        put_sticker(_id, sticker)

        $('#colapse_' + _id).fadeOut('slow');
        htmlText = ''
        if (sticker == "communicative") {
          $('#sticker_communicative_' + _id).css({ "background-color": "rgb(240, 224, 224)" })
        }
        else if (sticker == "active") {
          $('#sticker_active_' + _id).css({ "background-color": "rgb(240, 224, 224)" })
        }
        else if (sticker == "helpful") {
          $('#sticker_helpful_' + _id).css({ "background-color": "rgb(240, 224, 224)" })
        }
        $('#stick_' + _id).append(htmlText);
        // $('#status_' + _id).append(htmlText)
        // setTimeout(function () {
        //   location.reload();
        // }, 2000);
      }








    })






    $('#logout').click(function () {

      socket.emit('logout', {
        logout: 1
      });
      socket.emit('closeiframe', {
        close:1,
        refresh:1
         });


      var settings1 = {
        "async": true,
        "crossDomain": true,
        "url": config.domain+"/user/logout",
        "method": "GET",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",

        },

      }
      $.ajax(settings1).done(function (response) {


      }).then(function () {
        var htmlText = '';
        $('div').innerHTML = " ";
        $('div').empty();
        htmlText += '<div >';
        htmlText += '<p>Click to visit your cards. </p>';
        htmlText += '<button type="submit" id="cards"class="btn btn-primary">Cards</button>';
        htmlText += '</div>';
        $('#wrapper').append(htmlText);
        setTimeout(function () {
          window.close();
        }, 2000);
      })
    })

  })

})






