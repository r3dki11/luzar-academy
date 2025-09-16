document.addEventListener("DOMContentLoaded", () => {
  let mm = gsap.matchMedia();

  const libSliders = Array.from(
    document.querySelectorAll(".library-detail__sidebar-slider")
  );
  libSliders.forEach((slider) => {
    const container = slider.querySelector(".swiper");
    if (!container) return;
    mm.add("(max-width: 599.98px)", () => {
      const instance = new Swiper(container, {
        speed: 600,
        slidesPerView: "auto",
      });
      return () => {
        instance.destroy(true);
      };
    });
  });

  const filtersMobileToggle = document.querySelector(
    ".library__filters-form-mobile-toggle"
  );
  const filtersDropdown = document.querySelector(
    ".library__filters-form-modal"
  );
  const filtersCloseBtn = document.querySelector(
    ".library__filters-form-modal-close"
  );

  if (filtersMobileToggle && filtersDropdown && filtersCloseBtn) {
    filtersMobileToggle.addEventListener("click", (event) => {
      event.preventDefault();
      filtersDropdown.classList.toggle("active");
    });
    filtersDropdown.addEventListener("click", (event) => {
      if (event.target === filtersDropdown)
        filtersDropdown.classList.remove("active");
    });
    filtersCloseBtn.addEventListener("click", (event) => {
      event.preventDefault();
      filtersDropdown.classList.remove("active");
    });
  }
});
