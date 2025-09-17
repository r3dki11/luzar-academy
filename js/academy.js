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

  const scrollToBtns = Array.from(
    document.querySelectorAll('[href^="#scroll-"]')
  );
  scrollToBtns.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const target = btn.getAttribute('href').substring(1);

      const targetElement = document.getElementById(target);
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    })
  );

  const formCheckboxes = Array.from(
      document.querySelectorAll('.library__filters-form input[type="checkbox"]')
  );
  formCheckboxes.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        const form = btn.closest('form');
        let is_active = false;

        if(form.querySelectorAll('input[type="checkbox"]:checked').length)
          is_active = true;

        if(is_active) {
          form.classList.add('active');
        } else {
          form.classList.remove('active');
        }
      })
  );

  const formResetBtns = Array.from(
      document.querySelectorAll('.library__filters-form .library__filters-form-reset')
  );
  formResetBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        const form = btn.closest('form');
        form.classList.remove('active');
      })
  );
});
