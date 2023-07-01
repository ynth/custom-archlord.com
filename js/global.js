var swiper = new Swiper('.swiper-news', {
    speed: 1000,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
$(function () {
    function ScrolClass() {
        if ($(this).scrollTop() >= 50) {
            $('.topPanel').addClass('topPanel-fixed');
        } else {
            $('.topPanel').removeClass('topPanel-fixed');
        }
    }
    $(window).scroll(function () {
        ScrolClass();
    });
    $(document).ready(function () {
        ScrolClass();
    });
});
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('.toTop').fadeIn();
        } else {
            $('.toTop').fadeOut();
        }
    });
    $('.toTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});
$(".btn-drop").click(function () {
    $(this).toggleClass("active");
    $("." + $(this).attr("data-class")).toggleClass("active");
});
(function ($) {
    //$(function () {
    //    $("ul.tabs-caption").on("click", "li:not(.active)", function () {
    //        $(this).addClass("active").siblings().removeClass("active").closest("div.tabs").find("div.tabs-content").removeClass("active").eq($(this).index()).addClass("active");
    //    });
    //});
})(jQuery);
if (window.matchMedia("(min-width: 992px)").matches) {
    $('.sub-menu ul').hide();
} else {
    $('.sub-menu ul').hide();
}
$(".sub-menu").hover(function () {
    if (window.matchMedia("(min-width: 992px)").matches) {
        $(this).children("ul").slideToggle("200");
    }
});
$(".sub-menu").click(function () {
    if (!window.matchMedia("(min-width: 992px)").matches) {
        $(this).toggleClass("active");
        $(this).children("ul").slideToggle();
    }
});
$('.tabTable-button').click(function () {
    $('.tabTable-button').removeClass('active');
    $(this).addClass('active');
    $('.tabTable-block').removeClass('active');
    $('#' + $(this).attr('data-tab')).addClass('active');
})
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    centerMode: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    focusOnSelect: true,
    responsive: [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 5,
        }
    }, {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
        }
    }, {
        breakpoint: 550,
        settings: {
            slidesToShow: 1,
        }
    }]
});
$('.slider-gallery').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
        }
    }, {
        breakpoint: 750,
        settings: {
            slidesToShow: 2,
        }
    }, {
        breakpoint: 520,
        settings: {
            slidesToShow: 1,
        }
    }]
});
$(document).ready(function () {
    var overlay = $('#overlay');
    var open_modal = $('.open_modal');
    var close = $('.modal_close, #overlay');
    var modal = $('.modal_div');
    open_modal.click(function (event) {
        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(400, function () {
            $(div).css('display', 'block').animate({
                opacity: 1,
                top: '10%'
            }, 200);
        });
    });
    close.click(function () {
        modal.animate({
            opacity: 0,
            top: '15%'
        }, 200, function () {
            $(this).css('display', 'none');
            overlay.fadeOut(400);
        });
    });
});
$(function () {
    var hg1 = $('.regBlock').height();
    var hg2 = $('.s-server').height();
    hg = hg1 - hg2 + 9 + 'px';
    $('.s-acc').height(hg);
});