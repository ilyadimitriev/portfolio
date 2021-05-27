$(document).ready(function(){
    // Слайдер
    $('.slider').slick({
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    prevArrow: '<button class="features-arrow_prev features-arrow"></button>',
                    nextArrow: '<button class="features-arrow_next features-arrow"></button>'
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<button class="features-arrow_prev features-arrow"></button>',
                    nextArrow: '<button class="features-arrow_next features-arrow"></button>'
                }
            }
        ]
    });
    $('.feedback-slider').slick({
        slidesToShow: 1,
        prevArrow: '<button class="feedback-arrow_prev feedback-arrow"><img src="../img/feedback/left-arrow.svg"></button>',
        nextArrow: '<button class="feedback-arrow_next feedback-arrow"><img src="../img/feedback/right-arrow.svg"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                }
            }]
    });
     //   Модальные окна
     $('.popup-btn').on('click', function(enent) {
        event.preventDefault();
        $('.popup').fadeIn();
    });
    $('.popup-close').on('click', function(enent) {
        event.preventDefault();
        $('.popup').fadeOut();
    });
    $('.popup').on('click',function(event){
        if(event.target == this){
            $('.popup').fadeOut();
        }
        else {
            return false;
        }		
    });
  });