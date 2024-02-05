import LazyLoad from 'vanilla-lazyload';
import Glide from '@glidejs/glide';

let lastKnownScrollPosition = 0;
let ticking = false;
const topArrow = document.getElementById('topArrow');

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const getAll = (selector) => {
  return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
};

const closeModals = () => {
  const modals = getAll('.modal');
  modals.forEach((el) => {
    el.classList.remove('is-active');
  });
};

const domReady = (callback) => {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

const displayTopArrow = (el, scrollPos) => {
  const arrow = el;
  if (scrollPos > 100) {
    arrow.style.opacity = 1;
    arrow.style.bottom = '80px';
  } else {
    arrow.style.opacity = 0;
    arrow.style.bottom = '60px';
  }
};

// Carousel navigation
const setActiveDot = (num) => {
  getAll('.glide-dot').forEach((el) => {
    el.classList.remove('is-active');
  });
  document.getElementById(`dot-${num}`).classList.add('is-active');
};

window.addEventListener('scroll', () => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Go to top arrow
      if (topArrow) {
        displayTopArrow(topArrow, lastKnownScrollPosition);
      }
      ticking = false;
    });
    ticking = true;
  }
});

const modalCloses = getAll('.modal-background, .delete');
const colorChanger = getAll('.is-color-changer');
const langSwitcher = getAll('.is-lang-switcher');
const modeSwitcher = getAll('.is-mode-switcher');

// DOM is ready and waiting
domReady(() => {
  // Displaying page
  document.body.style.visibility = 'visible';

  // Home carousel
  const glideHomeContainer = getAll('.home-projects-slide');
  let glideHome = null;

  if (glideHomeContainer.length > 0) {
    glideHome = new Glide('.home-projects-slide', {
      type: 'carousel',
      rewind: true,
      gap: 0,
      focusAt: 0,
      autoplay: 2000,
      perView: 8,
      animationDuration: 600,
      bound: true,
      breakpoints: {
        2000: {
          perView: 6
        },
        1600: {
          perView: 5
        },
        1300: {
          perView: 4
        },
        1000: {
          perView: 3,
          focusAt: 'center',
          autoplay: 3000
        },
        800: {
          perView: 2,
          focusAt: 'center',
          bound: false,
          autoplay: 3000
        },
        550: {
          perView: 1,
          focusAt: 'center',
          bound: false,
          autoplay: 3000
        }
      }
    });
  }

  // Project carousels
  const glide = getAll('.glide');

  if (glide.length > 0) {
    const glideDesktopContainer = getAll('.is-laptop-content');
    const glideMobileContainer = getAll('.is-mobile-content');
    let glideDesktop = null;
    let glideMobile = null;

    if (glideDesktopContainer.length > 0) {
      glideDesktop = new Glide('.is-laptop-content', {
        type: 'slider',
        rewind: false,
        gap: 0,
        focusAt: 'center',
        autoplay: 3000
      });
    }

    if (glideMobileContainer.length > 0) {
      glideMobile = new Glide('.is-mobile-content', {
        type: 'slider',
        rewind: false,
        gap: 0,
        focusAt: 'center'
      });
    }

    // Syncing desktop carousel with mobile one
    if (glideMobile) {
      glideMobile.on('run', () => {
        if (glideDesktopContainer.length > 0) {
          const i = glideMobile.index;
          glideDesktop.go(`=${i}`);
          setActiveDot(i);
        }
      });
    }

    // Syncing mobile carousel with desktop one
    if (glideDesktop) {
      glideDesktop.on('run', () => {
        const i = glideDesktop.index;
        setActiveDot(i);

        if (glideMobileContainer.length > 0) {
          glideMobile.go(`=${i}`);
        }
      });
    }

    // Change slides when clicking dots
    getAll('.glide-dot').forEach((el) => {
      el.addEventListener('click', (event) => {
        const targetSlide = event.target.dataset.slideId;
        setActiveDot(targetSlide);

        // Moving slide on laptop if it exists
        if (glideDesktopContainer.length > 0) {
          glideDesktop.go(`=${targetSlide}`);
        }

        // Moving slide on iphone if it exists
        if (glideMobileContainer.length > 0) {
          glideMobile.go(`=${targetSlide}`);
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
      if (glideHome) {
        glideHome.mount();
      }
    };
  }

  // Lazyload images
  [].forEach.call(document.querySelectorAll('img[data-src]'), (img) => {
    const el = img;
    el.setAttribute('src', el.getAttribute('data-src'));
    el.onload = () => {
      el.removeAttribute('data-src');
    };
  });

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(($el) => {
      $el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const { target } = $el.dataset;
        const $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target?.classList.toggle('is-active');
      });
    });
  }

  // Close button on modal
  if (modalCloses && modalCloses.length > 0) {
    modalCloses.forEach((el) => {
      el.addEventListener('click', () => {
        closeModals();
      });
    });
  }

  // Checking if a color is set for blog articles
  const blogColor = localStorage.getItem('blogColor');
  const blogPostContainer = document.getElementById('blogPostContainer');
  if (blogColor && blogPostContainer) {
    blogPostContainer.classList.add(blogColor);
  }

  // Blog article color changer
  if (colorChanger && colorChanger.length > 0) {
    colorChanger.forEach((el) => {
      el.addEventListener('click', (event) => {
        event.preventDefault();
        const changer = event.target;
        const { color } = changer.dataset;
        blogPostContainer.classList.remove('is-dark');
        blogPostContainer.classList.remove('is-sand');
        localStorage.setItem('blogColor', '');

        if (color && color !== 'undefined') {
          localStorage.setItem('blogColor', color);
          blogPostContainer.classList.add(color);
        }
      });
    });
  }

  if (langSwitcher && langSwitcher.length > 0) {
    langSwitcher.forEach((el) => {
      el.addEventListener('click', (event) => {
        const langSwitch = event.target;
        switchLang(langSwitch.dataset.lang);
      });
    });
  }

  // Lazyload covers
  const myLazyLoad = new LazyLoad({
    elements_selector: '.lazy'
  });
  myLazyLoad.update();

  // Making blog post notification appear after some time
  const heyListen = document.getElementById('heyListen');
  if (heyListen) {
    window.setTimeout(() => {
      heyListen.classList.add('is-active');
      window.setTimeout(() => {
        heyListen.classList.remove('is-active');
      }, 30000);
    }, 10000);

    // Making notification disappear on click
    const closeListen = document.getElementById('closeListen');
    closeListen.addEventListener('click', () => {
      heyListen.classList.remove('is-active');
    });
  }

  // Dark/light mode switcher
  if (modeSwitcher && modeSwitcher.length > 0) {
    modeSwitcher.forEach((el) => {
      el.addEventListener('click', (event) => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('mode', 'dark');
        } else {
          localStorage.setItem('mode', 'light');
        }
      });
    });
  }

  // Language switcher
  const url = window.location.pathname;
  if (url === '/en/') {
    localStorage.setItem('lang', 'en');
  } else if (url === '/fr/') {
    localStorage.setItem('lang', 'fr');
  }
});
