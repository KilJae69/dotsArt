"use strict";
import AOS from "aos";
import "aos/dist/aos.css";
// Import Swiper core and required modules
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.min.css";
import fsLightbox from "fslightbox";
import "../sass/main.scss"


import {setupNavigation} from "./modules/navigation.js"
import { setupStickyNav } from "./modules/navigation.js";
import { setupResizeAnimationStopper } from "./modules/utilities.js";
import { setupTabComponent } from './modules/tabComponent.js';
import { initializeCustomSlider } from "./modules/customSlider.js";
import { setupGallery } from "./modules/gallery.js";
import { setupSmoothScrolling } from "./modules/smoothScrolling.js";

const swiper = new Swiper(".slide-content", {
  modules: [Navigation, Pagination],
  slidesPerView: 2,
  spaceBetween: 30,
  grabCursor: true,
  freeMode: true,
  loop: true,
  fade: true,
  centerSlide: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    650: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 1,
    },
    1500: {
      slidesPerView: 2,
    },
  },
});



document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupStickyNav();
  setupResizeAnimationStopper()
  setupTabComponent()
  initializeCustomSlider()
  setupGallery()
  setupSmoothScrolling()
  AOS.init({
    offset: 130, // offset (in px) from the original trigger point
    delay: 50, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });
});
