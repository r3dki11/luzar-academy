document.addEventListener("DOMContentLoaded", function () {
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
