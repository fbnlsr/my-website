global.jQuery = require("jquery");

require("slick-carousel");
require("./fontawesome.js");
require("./fa-brands.js");
require("./fa-solid.js");

let hljs = require("highlight.js");

let last_known_scroll_position = 0;
let ticking = false;
let topArrow = document.getElementById('topArrow');
let articleCover = document.getElementById('blog-post-cover');

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

let changeCoverPos = (scrollPos) => {
    let speed = .15;
    let windowOffset = window.pageYOffset,
    scrollPosition = "0 -" + (windowOffset * speed) + "px";
    articleCover.style.backgroundPosition = scrollPosition;
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Cover paralax
            if (articleCover) {
                setInterval(changeCoverPos(last_known_scroll_position), 10);
            }

            // Go to top arrow
            if (topArrow) {
                displayTopArrow(topArrow, last_known_scroll_position);
            }
            ticking = false;
        });
        ticking = true;
    }
});


domReady(function() {
    // DOM is ready and waiting
    // Initializing HighlightJS
    hljs.initHighlightingOnLoad();

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
    jQuery('.is-laptop-content').slick(slickCarousel);
    jQuery('.is-mobile-content').slick(slickCarousel);
    jQuery('.slick-nav').slick(slickNav);

    // Refreshing on resize
    jQuery(window).on('resize orientationchange', function() {
        jQuery('.is-laptop-content').slick('resize');
        jQuery('.is-mobile-content').slick('resize');
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

});
