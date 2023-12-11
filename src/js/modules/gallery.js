const categories = document.querySelector(".categories__list");
const productsEl = document.querySelector(".products");
const backToTopBtn = document.querySelector(".products-button");
const gallerySection = document.getElementById("galerija");

let categoriesInView = false;
let productsInView = false;

export function setupGallery() {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains("categories__list")) {
        categoriesInView = entry.isIntersecting;
      }

      if (entry.target.classList.contains("products")) {
        const rect = entry.target.getBoundingClientRect();
        productsInView = rect.top < window.innerHeight && rect.bottom > 0;
      }

      // Show button only if products are in view and categories are not
      if (productsInView && !categoriesInView && window.innerWidth <= 1200) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    threshold: 0,
  });

  observer.observe(categories);
  observer.observe(productsEl);

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gallerySection.scrollIntoView({ behavior: "smooth" });
  });

  categories.addEventListener("click", handleCategoryClick);
  categories.addEventListener("keydown", handleCategoryKeydown);
}

function displayProducts(category) {
  const products = document.querySelectorAll(".products__card");
  products.forEach((product) => {
    const anchor = product.querySelector("a[data-fslightbox]");

    if (window.innerWidth < 800) {
      const newHref = anchor.getAttribute("href").replaceAll("large", "medium");
      anchor.setAttribute("href", newHref);
    }
    product.classList.add("products__card--hidden");
    if (product.dataset.category === category)
      product.classList.remove("products__card--hidden");
  });
  //refreshFsLightbox();
}

function handleCategoryClick(e) {
    const clicked = e.target.closest(".categories__item");
    if (!clicked) return;
    displayProducts(clicked.dataset.category);
  ;
}

function handleCategoryKeydown(e) {
    const clicked = e.target.closest(".categories__item");
    if (!clicked) return;
    if (e.key === "Enter") displayProducts(clicked.dataset.category);
}
