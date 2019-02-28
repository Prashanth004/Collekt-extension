

var test = function () {
  did_login = 0

  var settings = {
    "async": false,
    "crossDomain": true,
    "url": config.domain+"/product/test",
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
     

     
    },

  }

  $.ajax(settings)
    .done(function (response) {
      config.server_down = 0;
      config.isloggedin = response.login_status;
      config.active_status = response.active_status;
      atomatic = response.data.autocollect
      
    })
    .fail(function (err) {
      if (err.status == 401) {
        config.isloggedin = 0;
        config.server_down = 0;
      }
      else {
        config.server_down = 1
      }

    })
    

}



