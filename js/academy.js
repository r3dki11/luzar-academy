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

  const scheduleSliders = Array.from(
    document.querySelectorAll(".academy-schedule__slider")
  );
  scheduleSliders.forEach((slider) => {
    console.log("Slider");
    const container = slider.querySelector(".swiper");
    new Swiper(container, {
      slidesPerView: "auto",
      // spaceBetween: 16,
      speed: 500,
      navigation: {
        prevEl: slider.querySelector(".academy-schedule__slider-arrow--prev"),
        nextEl: slider.querySelector(".academy-schedule__slider-arrow--next"),
      },
    });
  });

  const burgerAccordionBtns = Array.from(
    document.querySelectorAll("button.nav-burger__link")
  );
  burgerAccordionBtns.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      btn.parentElement.classList.toggle("active");
    })
  );
});
