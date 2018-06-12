require("slick-carousel");
require("./fontawesome.js");
require("./fa-brands.js");
require("./fa-solid.js");

let hljs = require("highlight.js");
let $ = require("jquery");
const galite = require('ga-lite');

galite('create', 'UA-28964878-1', 'auto')
galite('send', 'pageview')

let last_known_scroll_position = 0;
let ticking = false;
let topArrow = document.getElementById('topArrow');

let getAll = (selector) => {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0)
}

let closeModals = () => {
    modals.forEach(function (el) {
      el.classList.remove('is-active');
    });
}

let domReady = (callback) => {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

let displayTopArrow = (topArrow, scrollPos) => {
    if (scrollPos > 100) {
        topArrow.style.opacity = 1;
        topArrow.style.bottom = "80px";
    } else {
        topArrow.style.opacity = 0;
        topArrow.style.bottom = "60px";
    }
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Go to top arrow
            if (topArrow) {
                displayTopArrow(topArrow, last_known_scroll_position);
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Modal control
let modals = getAll('.modal');
var modalCloses = getAll('.modal-background, .delete');

// DOM is ready and waiting
domReady(function() {
    // Initializing HighlightJS
    hljs.initHighlightingOnLoad();

    // Slick carousel configuration
    let slickCarousel = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        cssEase: 'ease-in-out',
        asNavFor: '.slick-nav, .is-laptop-content, .is-mobile-content',
        draggable: true,
        mobileFirst: true,
        variableWidth: false,
        adaptativeHeight: false,
        lazyload: 'ondemand',
        centerMode: true,
        centerPadding: 0,
    }

    let slickNav = {
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: '.slideshow-markers',
        asNavFor: '.is-laptop-content, .is-mobile-content',
        focusOnSelect: true,
    }

    // Initializing Slick Carousel
    $('.is-laptop-content').slick(slickCarousel);
    $('.is-mobile-content').slick(slickCarousel);
    $('.slick-nav').slick(slickNav);

    // Refreshing on resize
    $(window).on('resize orientationchange', function() {
        $('.is-laptop-content').slick('resize');
        $('.is-mobile-content').slick('resize');
    });

    // Lazyload images
    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {

            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
        });
    }

    // Close button on modal
    modalCloses.forEach(function (el) {
        el.addEventListener('click', function () {
            closeModals();
        });
    });

    // Comment submission handling
    $('.is-comment-form').submit(function (e) {
        if (document.getElementById('website').value.length != 0) {
            console.log('error');
            e.preventDefault();
        } else {
            let form = this;
            $(this).find('.is-submit-btn').addClass('is-loading');

            $.ajax({
              type: $(this).attr('method'),
              url: $(this).attr('action'),
              data: $(this).serialize(),
              contentType: 'application/x-www-form-urlencoded',
              success: function (data) {
                  $('.modal').addClass('is-active');
                  $('.is-comment-form').find('input').val('');
                  $('.is-comment-form').find('textarea').val('');
                  $('.is-comment-form').find('.is-submit-btn').removeClass('is-loading');
              },
              error: function (err) {
                console.log(err);
              }
            });

            return false;
        }
    });
});
