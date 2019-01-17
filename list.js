var htmlElement = " ";
var found = 0;
var display_list = function (data) {
    htmlElement = " ";
    $('#main').empty()
    $('.wrapper').empty()
    var htmlCr = '';
    htmlCr += '<div id="crt_lst_btn" >';
    htmlCr += '<buton class = "solidButton"id="crtLst" style="position: absolute; top:60px;left:550px;">Create List</button>';
    htmlCr += '</div>';
  
    $('#main').append(htmlCr)

    var response = data;
   
    var flag =1
    htmlElement = " ";
    for (var i in response) {
      flag = 0;
      ElementFeed(response[i])
    }

    $('.wrapper').append(htmlElement);
    if (flag == 1) {
      htmlText = '';
      htmlText += '<div class="container">'
      htmlText += '<h1>Created your own customized list. Add Card to the list. Access and share the list anytime!!</h1>'
      htmlText += '</div>'
      $('.wrapper').append(htmlText)
  }


}

var display_search_list = function( search_text,data ){
    htmlElement = " ";
    htmlElement = " ";
    $('#main').empty()
    $('.wrapper').empty()
    var htmlCr = '';
    htmlCr += '<div id="crt_lst_btn" >';
    htmlCr += '<buton class = "solidButton"id="crtLst" style="position: absolute; top:60px;left:550px;">Create List</button>';
    htmlCr += '</div>';
  
    $('#main').append(htmlCr)

    var response = data;
   
    var flag =1
    for (var key in response) {
        flag = 0;
        testIfPresent(response[key].Cards_id,search_text)
        if((response[key].List_name.toUpperCase()).includes(search_text.toUpperCase()) || found == 1)
        {
            found = 0;
            ElementFeed(response[key])
        }
     
     
    }

    $('.wrapper').append(htmlElement);
    if (flag == 1) {
      htmlText = '';
      htmlText += '<div class="container">'
      htmlText += '<h1>Created your own customized list. Add Card to the list. Access and share the list anytime!!</h1>'
      htmlText += '</div>'
      $('.wrapper').append(htmlText)
  }


}



var ElementFeed = function(response){
    
    htmlElement += '<div class="card" style="width: 18rem;">';
    htmlElement += '<div class="List_div id="List_' + response._id + '">';
    htmlElement += '<div class="div_name">';
    htmlElement += '<p style="color:black;">' + response.List_name + '</p>';
    htmlElement += '<p>'+response.Cards_id.length+' cards</p>'
    htmlElement += '</div>';
    htmlElement += '<div class="div_button">';
    // <i class="glyphicon glyphicon-open"></i>
    htmlElement += '<div class="drop_list"id="button_' + response._id + '"><i class="glyphicon glyphicon-open"></i></div>';
    htmlElement += '<div class="option" id="options_' + response._id + '"><i class="glyphicon glyphicon-option-vertical"></i></div>';
    htmlElement += '<div class="dropdown-content3" padding="12px" id="dropdown_options' + response._id + '" aria-labelledby="dropdownMenuButton">';
    htmlElement += '<div class="no_button" id="share_' + response._id + '">Share<i class="glyphicon glyphicon-share"></i></div>';
    htmlElement += '<div class="no_button" id="deletlst_' + response._id + '">Delete<i class="glyphicon glyphicon-trash"></i></div>';
    htmlElement += '<div class="no_button" id="editlst_' + response._id + '">Edit<i class="glyphicon glyphicon-pencil"></i></div>';
    htmlElement += '</div>';
    htmlElement += '</div>';
    htmlElement += '</div>';
   
    htmlElement += '<div class="collapse" id="colapseli_' + response._id + '">';
    htmlElement += '<div class="div_colapse_back">';
    if ((response.Cards_id).length == 0) {
      htmlElement += '<p>No cards present. Add cards to to lists in the cards section.</p>'
    } else {
      for (var j in response.Cards_id) {
        htmlElement += '<div class="div_colapse">';
        htmlElement += '<div class="div_name">';
        htmlElement += '<p id="nmp_' + response._id + '_' + response.Cards_id[j] + '"></p>';
        htmlElement += '</div>';
        htmlElement += '<a id="a_' + response._id + '_' + response.Cards_id[j] + '" href="" target="_blank">';
        htmlElement += '<img id="img_' + response._id + '_' + response.Cards_id[j] + '";align=centre;height=25px; width=25px;  src="" />';
        htmlElement += '</a>';
        htmlElement += '</div>';
      }
    }
    htmlElement += '</div>';
    htmlElement += '</div>';
    htmlElement += '</div>';
    htmlElement += '</div>';
}


var testIfPresent= function(cardIds, text){

    for (var item in cardIds) {
        get_card_id(cardIds[item])
        if(profile_name.toUpperCase().includes(text.toUpperCase()) )
        {
            console.log("found !!!")
            found = 1;
            return
        }
    }

}
