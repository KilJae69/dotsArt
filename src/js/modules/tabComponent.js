function changeTab(clickedTab, tabs, tabsContent) {
  tabs.forEach((tab) => {
    tab.classList.remove("features-mobile__tab--active");
    tab.setAttribute("aria-selected", "false");
  });
  clickedTab.classList.add("features-mobile__tab--active");
  clickedTab.setAttribute("aria-selected", "true");

  tabsContent.forEach((content) =>
    content.classList.remove("features-mobile__content--active")
  );
  document
    .querySelector(`.features-mobile__content--${clickedTab.dataset.tab}`)
    .classList.add("features-mobile__content--active");

  clickedTab.focus();
}

export function setupTabComponent() {
  const tabsContainer = document.querySelector(".features-mobile-container");
  const tabs = document.querySelectorAll(".features-mobile__tab");
  const tabsContent = document.querySelectorAll(".features-mobile__content");

  tabsContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest(".features-mobile__tab");
    if (!clicked) return;
    changeTab(clicked, tabs, tabsContent);
  });

  tabsContainer.addEventListener("keydown", (e) => {
    const activeTab = document.querySelector(".features-mobile__tab--active");
    let newIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const currentIndex = parseInt(activeTab.dataset.tab, 10);

      if (e.key === "ArrowRight")
        newIndex = currentIndex === tabs.length ? 1 : currentIndex + 1;
      if (e.key === "ArrowLeft")
        newIndex = currentIndex === 1 ? tabs.length : currentIndex - 1;

      const newTab = tabsContainer.querySelector(
        `.features-mobile__tab--${newIndex}`
      );
      changeTab(newTab, tabs, tabsContent);
    }
  });
}