document.addEventListener("DOMContentLoaded", function () {
  var headerSearch = document.querySelector(".materials-header-search");
  var searchInput = document.querySelector(".materials-search__input");

  if (headerSearch && searchInput) {
    headerSearch.addEventListener("click", function () {
      searchInput.focus({ preventScroll: true });
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  var materials = document.querySelector(".materials");
  var layout = document.querySelector(".materials-layout");
  var toggle = document.querySelector(".js-materials-menu-toggle");
  var menuLinks = document.querySelectorAll(".materials-menu__link");

  if (materials && layout && toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = layout.classList.toggle("is-menu-open");
      materials.classList.toggle("is-menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (!link.classList.contains("active")) {
          return;
        }

        event.preventDefault();
        layout.classList.remove("is-menu-open");
        materials.classList.remove("is-menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document
    .querySelectorAll(".materials a[href='#']:not(.materials-menu__link)")
    .forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });
});
