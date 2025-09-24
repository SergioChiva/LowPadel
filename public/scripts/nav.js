let lastScroll = 0;
const NAV = document.querySelector("nav");
const ALTURA_NAV = NAV.offsetTop;

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > ALTURA_NAV) {
    NAV.style.position = "fixed";
    NAV.style.top = 0;
    NAV.style.margin = "0 auto";
    NAV.style.width = "100%";
  } else {
    // Hacia arriba -> mostrar
    NAV.style.position = "relative";
  }

  lastScroll = currentScroll;
});


