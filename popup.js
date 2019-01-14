$(function () {
    if (navigator.onLine) {
        test()

        if (server_down == 1) {
            htmlText = '';
            $('div').innerHTML = " ";
            $('div').empty();
            htmlText += '<div >';
            htmlText += '<p>The server seems to be down. Please bare with the inconvinienece. We will get you back</p>';
            htmlText += '</div>';
            $('#main').append(htmlText);
        }
        else {
            if (logined_in == 1 && active_status == 1) {
                htmlText = '';
                $('div').innerHTML = " ";
                $('div').empty();
                htmlText += '<div >';
                htmlText += '<p>Click to visit your cards. </p>';
                htmlText += '<button type="submit" id="cards"class="btn btn-primary">Collected Cards</button>';
                htmlText += '</div>';
                $('#main').append(htmlText);
                $('#cards').click(function () {
                    chrome.tabs.create({ url: "cards.html" });
                })


            }
            else if (logined_in == 1 && active_status == 0) {
                htmlText = '';
                $('div').innerHTML = " ";
                $('div').empty();
                htmlText += '<div >';
                htmlText += '<p>You need to varify your accouont</p>';
                htmlText += '<button type="submit" id="logoutBtn" class="btn btn-primary">Logout</button>';
                htmlText += '</div>';
                $('#main').append(htmlText);
                $('#logoutBtn').click(function () {

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
                        htmlText = '';
                        $('div').innerHTML = " ";
                        $('div').empty();
                        htmlText += '<div >';
                        htmlText += '<p>Logout Successfull</p>';
                        htmlText += '</div>';
                        $('#main').append(htmlText);
                        setTimeout(function () {
                            window.close();
                        }, 2500);
                    }).fail(function (xhr, textStatus, errorThrown) {
                        alert("failed")
                    })
                })

            }



            else {
                htmlText = '';
                $('#login').click(function () {
                    var email = $('#email').val();
                    var password = $('#password').val();
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": config.domain+"/auth/login",
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "ETag": "W/\"33-jJ6oGyfG3WUduw04mEH4Yt4ZJuY\"",
                        },
                        "data": {
                            "email": email,
                            "password": password
                        }
                    }

                    $.ajax(settings).done(function (err, res) {

                        test()
                        if (active_status == 1) {

                            htmlText = '';
                            $('div').innerHTML = " ";
                            $('div').empty();
                            htmlText += '<div >';
                            htmlText += '<p>Click to visit your cards. </p>';
                            htmlText += '<button type="submit" id="cards">Cards</button>';
                            htmlText += '</div>';
                            $('#main').append(htmlText);
                            $('#cards').click(function () {
                                chrome.tabs.create({ url: "cards.html" });
                            })
                        }
                        else {
                            htmlText = '';
                            $('div').innerHTML = " ";
                            $('div').empty();
                            htmlText += '<div >';
                            htmlText += '<p>You need to varify your accouont by clicking on the activation link sent to your email </p>';
                            htmlText += '<button type="submit" id="logoutBtn" class="btn btn-primary">Logout</button>';
                            htmlText += '</div>';
                            $('#main').append(htmlText);
                            setTimeout(function () {
                                window.close();
                            }, 2500);

                        }

                    }).fail(function (xhr, textStatus, errorThrown) {
                        htmlText = '';

                        htmlText += '<div id="login_error" >';
                        htmlText += '<p>wrong email or password</p>';
                        htmlText += '</div>';
                        $('#main').append(htmlText);
                        setTimeout(function () {
                            $('#login_error').innerHTML = " ";
                            $('#login_error').empty();
                        }, 3000);
                    });
                })
                $('#google').click(function () {
                    var w = window.open(config.domain+"/auth/google", "extension_popup", "width=500,height=700,status=no,scrollbars=yes,resizable=no");
                    setTimeout(function () {
                        window.close();
                    }, 800);

                })
                $('#signup').click(function () {
                    window.open("signup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");

                })

            }
        }
    }
    else {
        htmlText = '';
        $('div').innerHTML = " ";
        $('div').empty();
        htmlText += '<div >';
        htmlText += '<p>No internet</p>';
        htmlText += '</div>';
        $('#main').append(htmlText);
    }
})
