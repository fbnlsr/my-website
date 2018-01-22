global.jQuery = require("jquery");
require("slick-carousel");
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
        variableWidth: true,
        asNavFor: '.slick-nav, .is-laptop-content, .is-mobile-content',
        draggable: true,
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
});
