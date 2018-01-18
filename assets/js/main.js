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
    articleCover.style.backgroundPositionY = -(scrollPos * 1.1) + "px";
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Cover paralax
            if (articleCover) {
                changeCoverPos(last_known_scroll_position);
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
    hljs.initHighlightingOnLoad();
});
