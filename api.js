var isTrue = true
serverCall = {
    displayList: function () {
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
        });
    },

    getDate : function (date) {

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
    },
    add_card_to_list_popup : function (card_id, list_id) {
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
      
            var settings = {
                "async": false,
                "crossDomain": true,
                "url": config.domain+"/product/list/" + card_id,
                "method": "PUT",
                "headers": {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                "data": {
            
                  "listId": list_id,
                }
            }
            $.ajax(settings).done(function (response) {
                    console.log(response)
                })
      })
    },


  

    deleteCardsFrmList: function(list_id, cardArray){

      
    
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url":  config.domain+"/list/rm/"+list_id,
            "method": "PUT",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
              "cardsId":cardArray
            }
          }
          
          $.ajax(settings11).done(function (response) {
            isTrue = true
           
          });
         
      }

}