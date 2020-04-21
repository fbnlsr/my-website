import LazyLoad from 'vanilla-lazyload';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import Glide from '@glidejs/glide';

let last_known_scroll_position = 0;
let ticking = false;
let topArrow = document.getElementById('topArrow');

let setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

let getCookie = (cname) => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

let switchLang = (lang) => {
  setCookie('lang', lang, 365);
  if (window.location.pathname === '/' && lang === 'fr') {
    window.location.href = '/fr/';
  }

  if (window.location.pathname === '/fr/' && lang === 'en') {
    window.location.href = '/';
  }
};

// Automatically switch language on home
let lang = getCookie('lang');
if (lang) {
  switchLang(lang);
} else {
  // No cookie? Are we on home page? Let's detect the navigator language and redirect accordingly!
  let navLang = navigator.language.slice(0, 2);
  let currentPath = window.location.pathname;
  if (currentPath === '/' && navLang === 'fr') {
    switchLang('fr');
  } else if (currentPath === '/fr/' && navLang === 'en') {
    switchLang('en');
  }
}

let getAll = (selector) => {
  return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
};

let closeModals = () => {
  modals.forEach((el) => {
    el.classList.remove('is-active');
  });
};

let domReady = (callback) => {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? callback()
    : document.addEventListener('DOMContentLoaded', callback);
};

let displayTopArrow = (topArrow, scrollPos) => {
  if (scrollPos > 100) {
    topArrow.style.opacity = 1;
    topArrow.style.bottom = '80px';
  } else {
    topArrow.style.opacity = 0;
    topArrow.style.bottom = '60px';
  }
};

// Carousel navigation
let setActiveDot = (num) => {
  getAll('.glide-dot').forEach((el) => {
    el.classList.remove('is-active');
  });
  document.getElementById('dot-' + `${num}`).classList.add('is-active');
};

window.addEventListener('scroll', (e) => {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
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
let langSwitcher = getAll('.is-lang-switcher');

// DOM is ready and waiting
domReady(() => {
  // Displaying page
  document.body.style.visibility = 'visible';

  // Initializing HighlightJS
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('php', php);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('markdown', markdown);
  hljs.initHighlightingOnLoad();

  // Project carousels
  let glide = getAll('.glide');

  if (glide.length > 0) {
    let glideDesktopContainer = getAll('.is-laptop-content');
    let glideMobileContainer = getAll('.is-mobile-content');

    if (glideDesktopContainer.length > 0) {
      var glideDesktop = new Glide('.is-laptop-content', {
        type: 'slider',
        rewind: false,
        gap: 0,
        focusAt: 'center',
        autoplay: 3000,
      });
    }

    if (glideMobileContainer.length > 0) {
      var glideMobile = new Glide('.is-mobile-content', {
        type: 'slider',
        rewind: false,
        gap: 0,
        focusAt: 'center',
      });
    }

    // Syncing desktop carousel with mobile one
    if (glideMobile) {
      glideMobile.on('run', () => {
        if (glideDesktopContainer.length > 0) {
          let i = glideMobile.index;
          glideDesktop.go('=' + `${i}`);
          setActiveDot(i);
        }
      });
    }

    // Syncing mobile carousel with desktop one
    if (glideDesktop) {
      glideDesktop.on('run', () => {
        if (glideMobileContainer.length > 0) {
          let i = glideDesktop.index;
          glideMobile.go('=' + `${i}`);
          setActiveDot(i);
        }
      });
    }

    // Change slides when clicking dots
    getAll('.glide-dot').forEach((el) => {
      el.addEventListener('click', (event) => {
        let targetSlide = event.target.dataset.slideId;
        let glideDesktopContainer = getAll('.is-laptop-content');
        let glideMobileContainer = getAll('.is-mobile-content');
        setActiveDot(targetSlide);

        // Moving slide on laptop if it exists
        if (glideDesktopContainer.length > 0) {
          glideDesktop.go('=' + `${targetSlide}`);
        }

        // Moving slide on iphone if it exists
        if (glideMobileContainer.length > 0) {
          glideMobile.go('=' + `${targetSlide}`);
        }
      });
    });

    // Mounting sliders
    window.onload = () => {
      if (glideDesktop) {
        glideDesktop.mount();
      }
      if (glideMobile) {
        glideMobile.mount();
      }
    };
  }

  // Lazyload images
  [].forEach.call(document.querySelectorAll('img[data-src]'), (img) => {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {
      img.removeAttribute('data-src');
    };
  });

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(($el) => {
      $el.addEventListener('click', () => {
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
  modalCloses.forEach((el) => {
    el.addEventListener('click', () => {
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
  colorChanger.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
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

  langSwitcher.forEach((el) => {
    el.addEventListener('click', (event) => {
      let langSwitch = event.target;
      switchLang(langSwitch.dataset.lang);
    });
  });

  // Lazyload covers
  var myLazyLoad = new LazyLoad({
    elements_selector: '.lazy',
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

  // Copy link on code blocks
  // Thank you Danny Guo! <3
  // https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/
  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.innerText = 'Copy';

    var pre = codeBlock.parentNode;
    if (pre.parentNode.classList.contains('highlight')) {
      var highlight = pre.parentNode;
      highlight.parentNode.insertBefore(button, highlight);
    } else {
      pre.parentNode.insertBefore(button, pre);
    }

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.innerText).then(
        () => {
          /* Chrome doesn't seem to blur automatically,
                   leaving the button in a focused state. */
          button.blur();

          button.innerText = 'Copied!';

          setTimeout(() => {
            button.innerText = 'Copy';
          }, 2000);
        },
        (error) => {
          button.innerText = 'Error';
        }
      );
    });
  });
});
