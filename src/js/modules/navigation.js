import { header, heroSection } from "./sharedElements.js";

let sideNavOpen = false;  ///SideNav flag
const navBtn = document.querySelector(".navigation__button");
const navList = document.querySelector(".navigation__list");


///Function to toggle navigation state////
function toggleNav() {
  const visibility = navList.getAttribute("data-visible");
  sideNavOpen = !sideNavOpen;
  if (visibility === "false") {
    navList.setAttribute("data-visible", "true");
    navBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflowY = "hidden";
  } else {
    navList.setAttribute("data-visible", "false");
    navBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflowY = "visible";
  }
}

function closeNavOnOutsideClick(event) {
  if (
    sideNavOpen &&
    !navList.contains(event.target) &&
    !navBtn.contains(event.target)
  ) {
    toggleNav();
  }
}
/////Navigation setup for export with event listeners///////
export function setupNavigation() {
  navBtn.addEventListener("click", toggleNav);
  navList.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("navigation__link") &&
      window.innerWidth <= 960
    ) {
      toggleNav();
    }
  });
  window.addEventListener("click", closeNavOnOutsideClick);
  window.addEventListener("keyup", (event) => {
    if (event.key === "Escape" && sideNavOpen) {
      toggleNav();
    }
  });
}

/////Sticky Navigation///////////
let lastScrollY = window.scrollY;

function updateStickyNav() {
  const currentScrollY = window.scrollY;
  const scrollingUp = lastScrollY > currentScrollY;
  lastScrollY = currentScrollY;

  if (scrollingUp) {
    header.classList.remove("header--hide");
    header.classList.remove('header--animated')
  } else {
    header.classList.add("header--hide");
  }
}

const heroObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const heroIsInView = entry.isIntersecting;

    heroIsInView
      ? header.classList.add("header--header-in-view")
      : header.classList.remove("header--header-in-view");
  },
  {
    root: null,
    threshold: 0,
  }
);

export function setupStickyNav() {
  window.addEventListener("scroll", updateStickyNav);
  heroObserver.observe(heroSection);
}