require("slick-carousel");
import LazyLoad from "vanilla-lazyload";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import php from "highlight.js/lib/languages/php";
import sql from "highlight.js/lib/languages/sql";
import markdown from "highlight.js/lib/languages/markdown";

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

let setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

let getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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
let colorChanger = getAll('.is-color-changer');

// DOM is ready and waiting
domReady(function() {
    // Initializing HighlightJS
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('markdown', markdown);
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

    // Checking if a color is set for blog articles
    let blogColor = getCookie('blogColor');
    let blogPostContainer = document.getElementById('blogPostContainer');
    if (blogColor && blogPostContainer) {
        blogPostContainer.classList.add(blogColor);
    }

    // Blog article color changer
    colorChanger.forEach(function (el) {
        el.addEventListener('click', function (event) {
            let changer = event.target;
            let color = changer.dataset.color;
            let blogPostContainer = document.getElementById('blogPostContainer');
            blogPostContainer.classList.remove('is-dark');
            blogPostContainer.classList.remove('is-sand');
            setCookie('blogColor', '', -1);

            if (color && color != 'undefined') {
                setCookie('blogColor', color, 365);
                blogPostContainer.classList.add(color);
            }
        });
    });

    // Lazyload covers
    var myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });

    // Making blog post notification appear after some time
    let heyListen = document.getElementById('heyListen');
    if (heyListen) {
        window.setTimeout(() => {
            heyListen.classList.add('is-active');
            window.setTimeout(() => {
                heyListen.classList.remove('is-active');
            }, 30000);
        }, 10000);

        // Making notification disapear on click
        let closeListen = document.getElementById('closeListen');
        closeListen.addEventListener('click', () => {
            heyListen.classList.remove('is-active');
        });
    }
});
