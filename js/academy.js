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
});
