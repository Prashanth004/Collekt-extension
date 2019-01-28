var isTrue = true
var list = []
serverCall = {


    get_all_lists : function () {
        list = []
        var list_setting = {
          "async": false,
          "crossDomain": true,
          "url": config.domain + "/list/",
          "method": "GET",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
        $.ajax(list_setting).done(function (response) {
          for (var i in response) {
            list.push(response[i])
          }
          localStorage.setItem("lists",JSON.stringify(list))
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