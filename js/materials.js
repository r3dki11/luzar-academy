import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/+esm";

document.addEventListener("DOMContentLoaded", function () {
  var headerSearch = document.querySelector(".materials-header-search");
  var searchInput = document.querySelector(".materials-search__input");
  var searchReset = document.querySelector(".materials-search__reset");

  function syncSearchReset() {
    if (!searchInput || !searchReset) {
      return;
    }

    var hasValue = searchInput.value.length > 0;
    var searchForm = searchInput.closest(".materials-search__form");

    searchReset.hidden = !hasValue;

    if (searchForm) {
      searchForm.classList.toggle("has-value", hasValue);
    }
  }

  if (headerSearch && searchInput) {
    headerSearch.addEventListener("click", function () {
      searchInput.focus({ preventScroll: true });
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if (searchInput && searchReset) {
    searchInput.addEventListener("input", syncSearchReset);

    searchReset.addEventListener("click", function () {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      searchInput.focus({ preventScroll: true });
    });

    window.addEventListener("pageshow", syncSearchReset);
    syncSearchReset();
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

  var materialCards = document.querySelectorAll(".materials-card");

  if (materialCards.length) {
    var cardDesktopQuery = window.matchMedia("(min-width: 768px)");
    var cardMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function clearCardTitleStyles(card) {
      var title = card.querySelector(".materials-card__title span");

      if (!title) {
        return;
      }

      gsap.killTweensOf(title);
      gsap.set(title, { clearProps: "height,overflow" });
    }

    function setCardExpanded(card, isExpanded) {
      var title = card.querySelector(".materials-card__title span");

      if (!title || !cardDesktopQuery.matches) {
        return;
      }

      if (card.classList.contains("is-expanded") === isExpanded) {
        return;
      }

      if (cardMotionQuery.matches) {
        clearCardTitleStyles(card);
        card.classList.toggle("is-expanded", isExpanded);
        return;
      }

      gsap.killTweensOf(title);

      var currentHeight = title.getBoundingClientRect().height;

      gsap.set(title, { clearProps: "height,overflow" });
      card.classList.toggle("is-expanded", isExpanded);

      var targetHeight = title.getBoundingClientRect().height;

      if (Math.abs(currentHeight - targetHeight) < 0.5) {
        return;
      }

      gsap.fromTo(
        title,
        {
          height: currentHeight,
          overflow: "hidden",
        },
        {
          height: targetHeight,
          duration: 0.22,
          ease: "power2.out",
          overwrite: true,
          onComplete: function () {
            gsap.set(title, { clearProps: "height,overflow" });
          },
        }
      );
    }

    function resetMaterialCards() {
      materialCards.forEach(function (card) {
        clearCardTitleStyles(card);

        if (!cardDesktopQuery.matches) {
          card.classList.remove("is-expanded");
        }
      });
    }

    materialCards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        setCardExpanded(card, true);
      });

      card.addEventListener("mouseleave", function () {
        setCardExpanded(card, card.matches(":focus-within"));
      });

      card.addEventListener("focusin", function () {
        setCardExpanded(card, true);
      });

      card.addEventListener("focusout", function (event) {
        if (!event.relatedTarget || !card.contains(event.relatedTarget)) {
          setCardExpanded(card, card.matches(":hover"));
        }
      });
    });

    if (cardDesktopQuery.addEventListener) {
      cardDesktopQuery.addEventListener("change", resetMaterialCards);
    } else {
      cardDesktopQuery.addListener(resetMaterialCards);
    }
  }

  var promoModal = document.querySelector("#promo-video-modal");
  var promoSlider = document.querySelector(".promo-video-slider");
  var promoCards = document.querySelectorAll(".promo-video-card__open");

  if (promoModal && promoSlider && promoCards.length && window.Swiper) {
    var promoSwiper = null;
    var promoLastTrigger = null;
    var promoMuted = true;
    var promoStatusTimer = null;
    var promoMobileQuery = window.matchMedia("(max-width: 767.98px)");
    var promoMuteButton = promoModal.querySelector(".promo-video-modal__mute");
    var promoCloseButton = promoModal.querySelector(".promo-video-modal__close");
    var promoShareButton = promoModal.querySelector(".promo-video-modal__share");
    var promoDownloadButton = promoModal.querySelector(".promo-video-modal__download");
    var promoStatus = promoModal.querySelector(".promo-video-modal__status");

    function getPromoVideo(swiperInstance) {
      var activeSwiper = swiperInstance || promoSwiper;

      if (!activeSwiper || !activeSwiper.slides[activeSwiper.activeIndex]) {
        return null;
      }

      return activeSwiper.slides[activeSwiper.activeIndex].querySelector("video");
    }

    function syncPromoVideo(swiperInstance) {
      var activeVideo = getPromoVideo(swiperInstance);

      if (!promoModal.classList.contains("is-open")) {
        promoSlider.querySelectorAll("video").forEach(function (video) {
          video.pause();
        });
        return;
      }

      promoSlider.querySelectorAll("video").forEach(function (video) {
        if (video !== activeVideo) {
          video.pause();
        }
      });

      if (!activeVideo) {
        return;
      }

      activeVideo.muted = promoMuted;
      activeVideo.play().catch(function () {});

      var mp4Source = activeVideo.querySelector('source[type="video/mp4"]');
      if (promoDownloadButton && mp4Source) {
        promoDownloadButton.href = mp4Source.src;
      }
    }

    function createPromoSwiper(initialIndex) {
      promoSwiper = new window.Swiper(promoSlider, {
        direction: promoMobileQuery.matches ? "vertical" : "horizontal",
        initialSlide: initialIndex || 0,
        speed: 350,
        slidesPerView: 1,
        spaceBetween: 16,
        observer: true,
        observeParents: true,
        navigation: {
          prevEl: promoModal.querySelector(".promo-video-modal__prev"),
          nextEl: promoModal.querySelector(".promo-video-modal__next"),
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        on: {
          slideChangeTransitionStart: function (swiperInstance) {
            syncPromoVideo(swiperInstance);
          },
        },
      });
      syncPromoVideo();
    }

    function rebuildPromoSwiper() {
      var activeIndex = promoSwiper ? promoSwiper.activeIndex : 0;

      if (promoSwiper) {
        promoSwiper.destroy(true, true);
      }

      createPromoSwiper(activeIndex);
    }

    function openPromoModal(index, trigger) {
      promoLastTrigger = trigger || null;
      promoModal.classList.add("is-open");
      promoModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-promo-video-modal-open");

      if (!promoSwiper) {
        createPromoSwiper(index);
      } else {
        promoSwiper.slideTo(index, 0, false);
        promoSwiper.update();
        syncPromoVideo();
      }

      window.requestAnimationFrame(function () {
        promoCloseButton.focus();
      });
    }

    function closePromoModal() {
      if (!promoModal.classList.contains("is-open")) {
        return;
      }

      promoModal.classList.remove("is-open");
      promoModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-promo-video-modal-open");
      promoSlider.querySelectorAll("video").forEach(function (video) {
        video.pause();
      });

      if (window.location.hash.indexOf("#promo-video-") === 0) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      if (promoLastTrigger) {
        promoLastTrigger.focus();
      }
    }

    function showPromoStatus(message) {
      window.clearTimeout(promoStatusTimer);
      promoStatus.textContent = message;
      promoStatus.classList.add("is-visible");
      promoStatusTimer = window.setTimeout(function () {
        promoStatus.classList.remove("is-visible");
      }, 1800);
    }

    function fallbackCopyPromoLink(value) {
      var temporaryInput = document.createElement("textarea");
      temporaryInput.value = value;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      temporaryInput.remove();
    }

    function downloadPromoVideo(event) {
      var sourceLink = event.currentTarget;
      var videoUrl = sourceLink.href;
      var card = sourceLink.closest(".promo-video-card");
      var cardButton = card && card.querySelector(".promo-video-card__open");
      var videoNumber = cardButton ? Number(cardButton.dataset.videoIndex) + 1 : (promoSwiper ? promoSwiper.activeIndex + 1 : 1);

      event.preventDefault();

      window.fetch(videoUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Video download failed");
          }

          return response.blob();
        })
        .then(function (blob) {
          var objectUrl = window.URL.createObjectURL(blob);
          var downloadLink = document.createElement("a");
          downloadLink.href = objectUrl;
          downloadLink.download = "promo-video-" + videoNumber + ".mp4";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.remove();
          window.setTimeout(function () {
            window.URL.revokeObjectURL(objectUrl);
          }, 1000);
        })
        .catch(function () {
          window.location.assign(videoUrl);
        });
    }

    document
      .querySelectorAll(".promo-video-card__download, .promo-video-modal__download, .materials--promo-video .materials-mobile-toolbar__download")
      .forEach(function (downloadLink) {
        downloadLink.addEventListener("click", downloadPromoVideo);
      });

    promoCards.forEach(function (card) {
      card.addEventListener("click", function () {
        openPromoModal(Number(card.dataset.videoIndex) || 0, card);
      });
    });

    promoModal.querySelectorAll("[data-modal-close]").forEach(function (control) {
      control.addEventListener("click", closePromoModal);
    });

    promoMuteButton.addEventListener("click", function () {
      promoMuted = !promoMuted;
      promoMuteButton.setAttribute("aria-pressed", String(promoMuted));
      promoMuteButton.setAttribute("aria-label", promoMuted ? "Включить звук" : "Отключить звук");
      syncPromoVideo();
    });

    promoShareButton.addEventListener("click", function () {
      var index = promoSwiper ? promoSwiper.activeIndex + 1 : 1;
      var pageUrl = window.location.href.split("#")[0] + "#promo-video-" + index;
      var copied = navigator.clipboard && window.isSecureContext
        ? navigator.clipboard.writeText(pageUrl)
        : Promise.resolve(fallbackCopyPromoLink(pageUrl));

      copied.then(function () {
        showPromoStatus("Ссылка скопирована");
      }).catch(function () {
        showPromoStatus("Не удалось скопировать");
      });
    });

    promoSlider.querySelectorAll("video").forEach(function (video) {
      video.addEventListener("click", function () {
        if (video.paused) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!promoModal.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closePromoModal();
        return;
      }

      if (event.key === "Tab") {
        var focusable = Array.prototype.slice.call(
          promoModal.querySelectorAll("button:not([disabled]), a[href]")
        ).filter(function (element) {
          return element.offsetParent !== null;
        });
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    if (promoMobileQuery.addEventListener) {
      promoMobileQuery.addEventListener("change", rebuildPromoSwiper);
    } else {
      promoMobileQuery.addListener(rebuildPromoSwiper);
    }

    var initialPromoMatch = window.location.hash.match(/^#promo-video-(\d+)$/);
    if (initialPromoMatch) {
      var initialPromoIndex = Math.min(
        Math.max(Number(initialPromoMatch[1]) - 1, 0),
        promoCards.length - 1
      );
      openPromoModal(initialPromoIndex, promoCards[initialPromoIndex]);
    }
  }
});
