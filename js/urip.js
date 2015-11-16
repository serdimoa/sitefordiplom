var $input = $('#hero-date').pickadate();
var picker = $input.pickadate('picker');
$(document).ready(function () {

    /* =========================
     ScrollReveal
     (on scroll fade animations)
     ============================*/
    var revealConfig = {vFactor: 0.20}
    window.sr = new scrollReveal(revealConfig);

    $("input[type=file]").nicefileinput(
        {label: 'Прикрепить файл'}
    );

    /* =========================
     Detect Mobile Device
     ============================*/
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    /* ===========================
     jQuery One Page Navigation
     ==============================*/
    $('#main-nav').onePageNav({
        filter: ':not(.external)'
    });


    /* ===============
     Dropdown Menu
     ==================*/
    $('ul.main-nav > li:has(ul)').addClass("dropdown");

    function dequeue() {
        $(this).dequeue();
    };

    $('ul.main-nav > li > a').click(function () {

        var checkElement = $(this).next();

        $('ul.main-nav li').removeClass('active');
        $(this).closest('li').addClass('active');

        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp(200, dequeue);
        }

        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('ul.main-nav ul:visible').slideUp('normal');
            checkElement.slideDown(200, dequeue);
        }

        if (checkElement.is('ul')) {
            return false;
        } else {
            return true;
        }
    });


    /* ===========================
     Custom Smooth Scroll For an Anchor
     ==============================*/
    $(function () {
        $('a.scroll-to[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 50
                    }, 1000);
                    return false;
                }
            }
        });
    });

    /* ===========================
     Scroll to Top Button
     ==============================*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.to-top').stop().animate({
                bottom: '30px'
            }, 750);
        }
        else {
            $('.to-top').stop().animate({
                bottom: '-100px'
            }, 750);
        }
    });

    $('.to-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 750, function () {
            $('.to-top').stop().animate({
                bottom: '-100px'
            }, 750);
        });
    });


    /* ===========================
     Headhesive JS
     (sticky header on scroll)
     ==============================*/

    // Set headhesive options
    var options = {
        classes: {
            clone: 'header-clone',
            stick: 'header-stick',
            unstick: 'header-unstick'
        }
    };
    var headhesive = new Headhesive('.the-header', options);

    // Remove class of the clone header
    // so we can distinguish between the original and the clone header.
    $('.header-clone').removeClass('the-origin-header');


    /* ==========================
     Progress Bar Animation
     =============================*/
    var skillbar = $('#skillbar').waypoint({
        handler: function () {
            $('.progress-bar').each(function () {
                $(this).animate({
                    width: $(this).attr('data-percent')
                }, 500)
            })
        },
        offset: '150%'
    });


    /* =================================
     Swipebox JS
     (Lightbox for Video & Portfolio)
     ====================================*/

    // Swipebox Video
    $('.swipebox-video').swipebox();

    // Swipebox Gallery
    $('.swipebox').swipebox();


    /* =================================
     CounterUp JS
     ====================================*/
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /* =================================
     AjaxChimp JS
     (Integrate subscribe form w/ Mailchimp)
     ====================================*/


    // callback function when the form submitted, show the notification box



    /* =================================
     Add Custom Class to Open Toggle Panel
     ====================================*/
    $('.panel-heading a').click(function () {

        var clickElement = $(this);

        if (clickElement.parents('.panel-heading').is('.panel-active')) {
            $('.panel-heading').removeClass('panel-active');
        } else {
            $('.panel-heading').removeClass('panel-active');
            clickElement.parents('.panel-heading').addClass('panel-active');
        }
    });


    /* ==================================
     Quicksand JS
     (Filter team photo and portfolio)
     =====================================*/

    // Filter team photo
    var $teamClone = $("#team_grid").clone();

    $(".filter a").click(function (e) {
        $(".filter li").removeClass("current");

        var $filterClass = $(this).parent().attr("class");

        if ($filterClass == "all") {
            var $filteredTeam = $teamClone.find("li");
        } else {
            var $filteredTeam = $teamClone.find("li[data-type~=" + $filterClass + "]");
        }

        $("#team_grid").quicksand($filteredTeam, {
            easing: "easeOutSine",
            adjustHeight: "dynamic",
            duration: 500,
            useScaling: true
        });

        $(this).parent().addClass("current");

        e.preventDefault();
    })

    // Filter Portfolio Gallery
    var $portfolioClone = $("#portfolio_grid").clone();

    $(".portfolio-filter a").click(function (e) {
        $(".portfolio-filter li").removeClass("current");

        var $filterClass = $(this).parent().attr("class");

        if ($filterClass == "all") {
            var $filteredPortfolio = $portfolioClone.find("li");
        } else {
            var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
        }

        $("#portfolio_grid").quicksand($filteredPortfolio, {
            easing: "easeOutSine",
            adjustHeight: "dynamic",
            duration: 500,
            useScaling: true
        });

        $(this).parent().addClass("current");

        e.preventDefault();
    })

    // Mobile Select Filter
    $("#mobile-team-filter").click(function () {
        $(this).toggleClass("select-active");
        $("ul.filter").toggleClass("filter-active");
    });

    $("#mobile-portfolio-filter").click(function () {
        $(this).toggleClass("select-active");
        $("ul.portfolio-filter").toggleClass("filter-active");
    });


    /* ==================================
     Contact Overlay
     (works with multiple buttons)
     =====================================*/
    var triggerBttn = document.querySelectorAll('.contact-trigger');

    var overlay = document.querySelector('div.contact-overlay'),
        closeBttn = overlay.querySelector('a.overlay-close');
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {transitions: Modernizr.csstransitions};

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.add(overlay, 'close');
            $('body').removeClass('overlay-on');
            var onEndTransitionFn = function (ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            }
            else {
                onEndTransitionFn();
            }
        }
        else if (!classie.has(overlay, 'close')) {
            $("body").addClass('overlay-on');
            classie.add(overlay, 'open');
        }
        classie.remove(overlay, 'close');
    }

    var i;
    for (i = 0; i < triggerBttn.length; i++) {
        triggerBttn[i].addEventListener('click', toggleOverlay);
    }
    closeBttn.addEventListener('click', toggleOverlay);


    /* ==================================
     Contact Form Validation
     =====================================*/



    // Function to close the Notification
    $('a.notification-close').click(function () {
        $(this).parent('div').fadeOut(200);
    });


    /* ==========================
     Custom Popover
     (for Language Selection)
     =============================*/
    $("[data-toggle=popover]").popover();


    /* ==============================
     Change Footer Background
     (when Social Icons hovered)
     =================================*/
    if (!isMobile.any()) {
        $(".footer-social .icon-facebook-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-facebook-hovered")
        });
        $(".footer-social .icon-twitter-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-twitter-hovered")
        });
        $(".footer-social .icon-linkedin-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-linkedin-hovered")
        });
        $(".footer-social .icon-instagram-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-instagram-hovered")
        });
        $(".footer-social .icon-google-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-google-hovered")
        });
        $(".footer-social .icon-dribbble-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-dribbble-hovered")
        });
        $(".footer-social .icon-pinterest-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-pinterest-hovered")
        });
        $(".footer-social .icon-vimeo-with-circle").hover(function () {
            $("#main-footer").toggleClass("footer-vimeo-hovered")
        });
    }

    // h2 to  fittext
});
$("#texttofitt").fitText(0.52);

var $herolname = $('#hero-lname').selectize({
    dropdownParent: 'body'
});

var $heroType = $('#heroType').selectize({
    dropdownParent: 'body'
});


function prepareMessage() {
    // Prevent the form from submitting as it normally would (only if onSubmit)
    event.preventDefault();
// Get variables from local data (if obtaining from form etc…)
    var fName = $("#hero-fname").val();
    var lName = $("#hero-email").val();
    var name = "Тема:" + fName + "<br>Почта:" + lName + "<br>Вид работы:" + $herolname.text() + "<br>Предмет:" + $heroType.text() + "<br>Срок сдачи:"+picker.get()+
        "<br>Телефон:" + $("#hero-phone").val();
    var email = $("#hero-email").val();
    var msg = $("#Form_Message").val();
// Store contents of HTML email (for injecting variables from above, not necessary)
    var htmlClient = "<html>" + name + "<\/html";
    // File Input Validation (as seen above)
    if ($("#hero-file").val() != "") {
        var file = $("#hero-file")[0].files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var fileResult = btoa(event.target.result);
            sendTheMessage(name, email, fileType, fileName, fileResult, htmlClient);
        };
        reader.readAsBinaryString(file);
        var fileType = file.type;
        var fileName = file.name;
    }
}
// Create a separate function for the AJAX request (nessecary for the FileReader to complete task before trying to send)
function sendTheMessage(name, email, fileType, fileName, fileResult, htmlClient) {
    event.preventDefault();
    $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                "key": "CN6eykY5JNkIwZ6_lg5Eaw",
                "message": {
                    "from_email": "russky.diplom@yandex.ru",
                    "from_name": "russky.diplom@yandex.ru",
                    "headers": {
                        "Reply-To": "russky.diplom@yandex.ru"
                    },
                    "subject": "Заявка с сайта",
                    "html": htmlClient,
// Automatically generates a plain text version of the email
                    "auto_text": true,
                    "to": [
                        {
                            "email": "russky.diplom@yandex.ru",
                            "name": "Получатель",
                            "type": "to"
                        }]
                }
            }
        })
// If message sends successfully these commands will be executed
        .done(function (response) {
            alert("Ваша заявка отправлена !");
        })
// If message fails to send these commands will be executed
        .fail(function (response) {
            alert("Что-то пошло не так :(");
        });
}

function sendMessage() {
    event.preventDefault();
    $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                "key": "CN6eykY5JNkIwZ6_lg5Eaw",
                "message": {
                    "from_email": "russky.diplom@yandex.ru",
                    "from_name": "russky.diplom@yandex.ru",
                    "headers": {
                        "Reply-To": "russky.diplom@yandex.ru"
                    },
                    "subject": "Заявка с сайта",
                    "html": "Отзыв с сайта:<br>Email:"+$("#email").val()+"<br>Имя:"+$("#first").val()+"<br>Отзыв:<br>"+$("#message").val(),
// Automatically generates a plain text version of the email
                    "auto_text": true,
                    "to": [
                        {
                            "email": "russky.diplom@yandex.ru",
                            "name": "Получатель",
                            "type": "to"
                        }]
// Variables as defined in fileReader actions

                }
            }
        })
// If message sends successfully these commands will be executed
        .done(function (response) {
            alert("Ваш отзыв отправлен !");
        })
// If message fails to send these commands will be executed
        .fail(function (response) {
            alert("Что-то пошло не так :(");
        });
}
function CallME() {
    event.preventDefault();
    $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                "key": "CN6eykY5JNkIwZ6_lg5Eaw",
                "message": {
                    "from_email": "russky.diplom@yandex.ru",
                    "from_name": "russky.diplom@yandex.ru",
                    "headers": {
                        "Reply-To": "russky.diplom@yandex.ru"
                    },
                    "subject": "Обратный звонок",
                    "html": "Телефон:"+$("#phones").val(),
// Automatically generates a plain text version of the email
                    "auto_text": true,
                    "to": [
                        {
                            "email": "russky.diplom@yandex.ru",
                            "name": "Получатель",
                            "type": "to"
                        }]
                }
            }
        })
// If message sends successfully these commands will be executed
        .done(function (response) {
            alert("Мы вам скоро перезвоним !");
        })
// If message fails to send these commands will be executed
        .fail(function (response) {
            alert("Что-то пошло не так :(");
        });
}

