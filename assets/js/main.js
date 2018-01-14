let last_known_scroll_position = 0;
let ticking = false;
let topArrow = document.getElementById('topArrow');

let domReady = (callback) => {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

let displayTopArrow = (topArrow, scroll_pos) => {
    if (scroll_pos > 100) {
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
});
