
export function setupSmoothScrolling() {
  const btnGallery = document.querySelector(".hero__button");
  const logos = document.querySelectorAll(".logo");
  const navItems = document.querySelectorAll(".navigation__link");
  const navbar = document.querySelector(".navigation");
  const gallerySection = document.getElementById("galerija");
  const heroSection = document.getElementById("naslovna");
  let navLinkClicked = false;

  btnGallery.addEventListener("click", (e) => {
    e.preventDefault();
    gallerySection.scrollIntoView({ behavior: "smooth" });
  });

  logos.forEach((logo) => {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      heroSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href");
      const targetSection = document.querySelector(targetID);
      if (!targetSection) return;
      targetSection.scrollIntoView({ behavior: "smooth" });
      navbar.classList.remove("navigation--hide");
      navLinkClicked = true;

      setTimeout(() => {
        navLinkClicked = false;
      }, 500);
    });
  });
}