// Ссылка в новом окне .js-pdf-view-tab
$(document).on("click", ".list-docs .list-docs__icon-link", function (e) {
  e.preventDefault();
  var href = $(this).parents("a").attr("href");
  var win = window.open(href + "&mode=view", "_blank");
  win.focus();
});

$(document).on("click", ".icon-link-news", function (e) {
  e.preventDefault();
  console.log("icon-link-news");
  copyToClipboardLink($(this));
  return false;
});
$(document).on("click", ".icon-copy-code", function (e) {
  // alert('mob - text - saniy')
  e.preventDefault();
  console.log("icon-copy-code");
  copyToClipboard($(this));
  return false;
});
function copyToClipboardLink(element) {
  var $temp = $("<input>");
  $("body").append($temp);

  textLink = window.location.href;
  $temp.val(textLink).select();
  document.execCommand("copy");
  $temp.remove();
}
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).attr("data-code")).select();
  document.execCommand("copy");
  $temp.remove();
}
function initGlobal() {
  $(document).on("click", ".js-active-filter-all", function (event) {
    var formCarsSelect = $(this).parents(".form-search-catalog__filter");
    console.log(formCarsSelect);
    // var new_url = '';
    var all_prop = {};
    $.each(allCodesSelect, function (index, value) {
      var selectItem = formCarsSelect.find(
        '.js-custom-select-car-all[name="' + index + '"]'
      );
      // var selectItem = $('.js-custom-select-car-all[name="' + index + '"]');
      // var choices_item_prop = selectItem.parents('.choices__inner').find('.choices__item--selectable');
      // var choices_code_prop = choices_item_prop.attr('data-value');
      var choices_code_prop = selectItem.val();
      all_prop[index] = choices_code_prop;
    });

    if (all_prop["category"] != "") {
      $.each(all_prop, function (index, value) {
        if (index == "category") {
          // if (section_id_link[all_prop['category']]) {
          //     new_url = section_id_link[all_prop['category']];
          // }
          var urlCat = formCarsSelect
            .find(
              '.js-custom-select-car-all[name="category"] option[value="' +
                all_prop["category"] +
                '"]'
            )
            .attr("data-url");
          if (typeof urlCat != "undefined") {
            new_url = urlCat;
          }
          // new_url = formCarsSelect.find('.js-custom-select-car-all[name="category"] option[value="' + all_prop['category'] + '"]').attr('data-url');
        }
        if (value != "" && value != 0) {
          if (index == "mark" || index == "model") {
            new_url += value + "/";
          }
          if (index == "engine") {
            new_url += "?engine=" + value;
          }
        }
      });
      if (new_url != "") {
        window.location.href = new_url;
        return false;
      } else {
        if ($("#title-search-input").val() != "") {
          $(".new-find-search-btn").click();
        }
      }
    } else {
      $(".all-category-select-block")
        .addClass("error")
        .append(
          '<div class="error-text">Необходимо заполнить поле «Категория»</div>'
        );

      setTimeout(function () {
        $(".all-category-select-block").removeClass("error");
        $(".all-category-select-block").find(".error-text").remove();
      }, 3000);
    }
    /*if(choices_mark != ''){

            if (choices_mark != '') {
                new_url += choices_mark + '/';
                if (choices_model != '') {
                    new_url += choices_model+ '/';
                    if(choices_modif != '') {
                        new_url += '?engine=' + choices_modif;
                    }
                }
            }
            if(new_url != ''){
                window.location.href = cur_page+new_url;
            }

        } else {
            $('.mark-select-block').addClass('error');

            setTimeout(function(){
                $('.mark-select-block').removeClass('error');
            }, 3000);
        }*/
  });

  $(document).on("click", ".js-count-page span", function () {
    var perPage = $(this).text();
    if (!$(this).hasClass("active")) {
      console.log(location.origin + window.location.pathname);
      window.location.href =
        location.origin + window.location.pathname + "?per_page=" + perPage;
    }
  });

  console.log("initGlobal");
  if (window.location.hash == "#form") {
    $(".js-contacts-toggle-form").click();
  }

  /* слайдер фоток */
  function setImgSlider(kol, imgList, elm) {
    elm.find("img").attr("src", imgList[kol]);
    elm.find("source").attr("srcset", imgList[kol]);
    startLineMouse = 0;
    IntervalLineMouse = 0;
    elm.find(".slider-points .slider-point").removeClass("active");
    elm
      .find(".slider-points .slider-point:nth-child(" + (kol + 1) + ")")
      .addClass("active");
  }
  var startLineMouse = 0;
  var IntervalLineMouse = 0;
  var currentImgMouse = 0;
  $(document).on("click", ".js-img-slider-prew .slider-point", function (e) {
    e.preventDefault();
    var currentPoint = $(this).index();
    if (currentPoint != currentImgMouse) {
      console.log("currentPoint - " + currentPoint);
      currentImgMouse = currentPoint;
      var mainBlock = $(this).parents(".js-img-slider-prew");
      var idImg = mainBlock.attr("data-id");
      var MasImg = window[`${idImg}`];
      setImgSlider(currentImgMouse, MasImg, mainBlock);
    }
  });
  $(document).on("mouseout", ".js-img-slider-prew", function (e) {
    var idImg = $(this).attr("data-id");
    var MasImg = window[`${idImg}`];

    setImgSlider(0, MasImg, $(this));
    currentImgMouse = 0;
  });
  $(document).on("mousemove", ".js-img-slider-prew", function (pos) {
    var $target = $(pos.target);

    if ($target.is(".slider-point")) {
      return true;
    }

    var idImg = $(this).attr("data-id");
    var MasImg = window[`${idImg}`];

    var allCount = MasImg.length;

    var width = $(this).width();
    var sectWidth = width / allCount;

    var newSect = Math.ceil(pos.offsetX / sectWidth) - 1;

    if (currentImgMouse != newSect) {
      currentImgMouse = newSect;
      setImgSlider(currentImgMouse, MasImg, $(this));
    }

    // if(startLineMouse == 0){
    //     startLineMouse = pos.offsetX;
    // }
    // IntervalLineMouse = pos.offsetX - startLineMouse;
    // var CheckInterVal = IntervalLineMouse;
    // // var CheckInterVal = Math.abs(IntervalLineMouse);
    // if(CheckInterVal > 40 || CheckInterVal < -40) {
    //     if(CheckInterVal > 40){
    //         currentImgMouse++;
    //     }
    //     if(CheckInterVal < -40 && currentImgMouse != 0){
    //         currentImgMouse--;
    //     }
    //     if((currentImgMouse+1) > allCount){
    //         currentImgMouse = allCount-1;
    //     }
    //     setImgSlider(currentImgMouse, MasImg, $(this))
    // }
  });
  // свайпы на мобиле
  var xDown = null;
  var yDown = null;
  var swipe_id = 1;
  $(document).on("touchstart", ".js-img-slider-prew", function (evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
    console.log(evt);
    console.log("touchstart");
  });
  $(document).on("touchmove", ".js-img-slider-prew", function (evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    var swipe_yes = 0;
    console.log("touchmove");
    // Меняем изображение
    currentImgMouse = $(this)
      .find(".slider-points .slider-point.active")
      .index();
    var maxImgMouse = $(this).find(".slider-points .slider-point").length;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        currentImgMouse = currentImgMouse + 1;
        if (maxImgMouse == currentImgMouse) {
          currentImgMouse = 0;
        }
      } else {
        currentImgMouse = currentImgMouse - 1;
        if (currentImgMouse == -1) {
          currentImgMouse = maxImgMouse - 1;
        }
      }
    }

    var idImg = $(this).attr("data-id");
    var MasImg = window[`${idImg}`];
    setImgSlider(currentImgMouse, MasImg, $(this));

    /* reset values */
    xDown = null;
    yDown = null;
  });
  /* слайдер фоток */

  $(".icon-link-news").tooltip({
    title: "Ссылка скопирован.",
    trigger: "click",
    placement: "top",
    delay: { show: 300, hide: 1000 },
  });
  $(".icon-copy-code").tooltip({
    title: "Код товара успешно скопирован.",
    trigger: "click",
    placement: "top",
    delay: { show: 300, hide: 1000 },
  });

  $(document).on("click", ".js-find-top", function (e) {
    var mainSearchBlock = $(".main-search-panel__dropdown");
    var mainSearchBlock2 = $(".page-search-panel-find");
    if (mainSearchBlock.length > 0) {
      $(this).parents(".header__center").toggleClass("active");
    } else {
      if (mainSearchBlock2.length > 0) {
        $("html, body").animate(
          {
            scrollTop: mainSearchBlock2.offset().top, // класс объекта к которому приезжаем
          },
          500
        ); // Скорость прокрутки
      } else {
        if ($(".l-index__main__center .form-search").length > 0) {
          $("html, body").animate(
            {
              scrollTop: $(".l-index__main__center .form-search").offset().top, // класс объекта к которому приезжаем
            },
            500
          ); // Скорость прокрутки
        }
      }
    }

    return false;
  });

  $(document).on("click", "a .slider-preview__tape", function (e) {
    return false;
  });

  $(document).on("click", ".event-select-sect", function (e) {
    e.preventDefault();
    var idSect = $(this).attr("data-id");
    var linkData = $(this).attr("data-href");

    if (
      $(".l-catalog__main__right").is(":hidden") &&
      typeof linkData !== "undefined"
    ) {
      console.log("Ссылка");
      window.location.href = linkData;
      return false;
    }

    $(".custom-layer-catalog").removeClass("active");
    $('.custom-layer-catalog[data-id="' + idSect + '"]').addClass("active");

    $(".event-select-sect").removeClass("active");
    $(this).addClass("active");

    $("html, body").animate(
      {
        scrollTop: $("body").offset().top, // класс объекта к которому приезжаем
      },
      1000
    ); // Скорость прокрутки

    return false;
  });

  $(document).on("shown.bs.tooltip", function (e) {
    setTimeout(function () {
      $(e.target).tooltip("hide");
    }, 10000);
  });
  $(document).on("click", ".js-show-prop-filter", function (event) {
    event.preventDefault();
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").text("Показать все");
      $(this).parent().find(".hidden").removeClass("show");
    } else {
      $(this).addClass("active").text("Скрыть");
      $(this).parent().find(".hidden").addClass("show");
    }
  });

  var loadStorDiv = $(".ajax-load-stories");
  if (loadStorDiv.length > 0) {
    var response = 200;
    var curPointPx = 0;
    var loading = false;
    // var bottomOfPage = $('body').height() <= ($(window).height() + $(window).scrollTop());
    var allBody = $("body").height();
    var allHe = $("body div.page").height();
    var offSetStor = loadStorDiv.offset().top - 50; // - $(window).scrollTop()

    getAjaxStories(offSetStor, allBody, loadStorDiv);
    $(document).scroll(function (e) {
      var scrollPos = $(document).scrollTop();

      if (scrollPos + allBody > offSetStor) {
        if (response == 200 && !loading) {
          getAjaxStories(offSetStor, allBody, loadStorDiv);
        }
      }
    });
  }

  function getAjaxStories(offSetStor, allBody, loadStorDiv) {
    var scrollPos = $(document).scrollTop();
    if (scrollPos + allBody > offSetStor) {
      loading = true;
      $.ajax({
        url: "/ajax/stories.php", // URL отправки запроса
        type: "GET",
        dataType: "html",
        data: {},
        success: function (response) {
          // Если Данные отправлены успешно
          loadStorDiv.html(response);
          initMainStories();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Если ошибка, то выкладываем печаль в консоль
          console.log("Error: " + errorThrown);
        },
      });
    }
  }
}

function initMainStories() {
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  var zIndex = 100;
  var $popup = null;
  var slider = null;
  var lastVideo = null;
  var muted = false;

  function closePopup() {
    stopLastVideo();
    $popup.removeClass("active");
  }

  function stopLastVideo() {
    if (lastVideo) lastVideo.pause();
  }

  function playVideoByIndex(index) {
    var video = $popup.find(".swiper-slide").eq(index).find("video")[0];
    video.play();
    lastVideo = video;
  }

  function handleItemClick(e) {
    e.preventDefault();
    var index = $(this).data("index");
    slider.slideTo(index, 0);
    $popup.addClass("active");
    playVideoByIndex(index);
  }

  function handleCloseBtn() {
    closePopup();
  }

  function handleInBodyEnter() {
    var offset = $(this).offset();
    var $clone = $(this).clone();
    $clone.appendTo($("body")).css(
      _objectSpread(
        _objectSpread(
          {
            position: "absolute",
            width: $(this).width(),
            height: $(this).height(),
          },
          offset
        ),
        {},
        {
          zIndex: ++zIndex,
        }
      )
    );
    var video = $clone.find("video")[0];
    video.play();
  }

  function handleInBodyLeave() {
    var _this = this;

    setTimeout(function () {
      $(_this).remove();
    }, 200);
  }

  function handleMuteClick() {
    muted = !muted;
    $(this).toggleClass("active");
    $popup.find("video").each(function () {
      $(this)[0].muted = muted;
    });
  }

  function handleEscapeKey(e) {
    if (e.key == "Escape") {
      closePopup();
    }
  }

  function handleInPlaceEnter() {
    var video = $(this).find("video")[0];
    video.play();
  }

  function handleInPlaceLeave() {
    var video = $(this).find("video")[0];
    video.pause();
  }

  $(function () {
    $popup = $("#popup-stories");
    if ($popup.length === 0) return;
    slider = new Swiper($popup.find(".swiper")[0], {
      direction: "vertical",
      mousewheelControl: true,
      navigation: {
        nextEl: $popup.find(".popup-stories__btn-next")[0],
        prevEl: $popup.find(".popup-stories__btn-prev")[0],
      },
    });
    slider.on("slideChange", function () {
      stopLastVideo();
      playVideoByIndex(slider.activeIndex);
    });
    $(document).on(
      "click",
      ".popup-stories__overlay, .popup-stories__btn-close",
      handleCloseBtn
    );
    $(document).on("click", ".slider-stories__image", handleItemClick);

    if (!Modernizr.touchevents) {
      $(document).on(
        "mouseenter",
        "div > .slider-stories__image--in-body",
        handleInBodyEnter
      );
      $(document).on(
        "mouseleave",
        "body > .slider-stories__image--in-body",
        handleInBodyLeave
      );
    }

    $(document).on(
      "mouseenter",
      ".slider-stories__image--in-place",
      handleInPlaceEnter
    );
    $(document).on(
      "mouseleave",
      ".slider-stories__image--in-place",
      handleInPlaceLeave
    );
    $(document).on("click", ".popup-stories__btn-mute", handleMuteClick);
    $(document).on("keyup", handleEscapeKey);
  });

  var popup_stories = {
    removeBodyItems: function removeBodyItems() {
      $("body > .slider-stories__image").remove();
    },
  };

  $(function () {
    $(".slider-stories").each(function () {
      var sliderEl = $(this).find(".slider-stories__slider")[0];
      new Swiper(sliderEl, {
        slidesPerView: "auto",
        navigation: {
          nextEl: $(this).find(".arrows__btn-next")[0],
          prevEl: $(this).find(".arrows__btn-prev")[0],
        },
        on: {
          transitionStart: function transitionStart() {
            popup_stories.removeBodyItems();
          },
        },
      });
    });
  });
}

/* Избранное */
$(document).ready(function () {
  initGlobal();
  setActiveFav();
});

$(document).on("click", ".favorites__close", function () {
  var favorID = $(this).parent().find("a.favor").attr("data-item");
  if ($(this).hasClass("active")) var doAction = "delete";
  else var doAction = "add";

  addFavorite(favorID, doAction);

  delFavList($(this));
});
// Функция удаления товара со страницы Избранного
function delFavList(elementDel) {
  elementDel.closest(".favorites__item").fadeOut(200, "swing", function () {
    $(this).remove();
  });
}
$(document).on("click", ".js-add-favor", function (e) {
  console.log("js-add-favor");
  e.preventDefault();
  var favorID = $(this).attr("data-id");
  if ($(this).hasClass("active")) {
    var doAction = "delete";
    $(this).removeClass("active");
  } else {
    $(this).addClass("active");
    var doAction = "add";
  }
  addFavorite(favorID, doAction, $(this));
  // if ($(this).parents('.catalog__item').find('.favorites__close')) {
  //     delFavList($(this).parents('.catalog__item').find('.favorites__close'));
  // }
  return false;
});
function addFavorite(id, action, elementCur) {
  // var count = $('.js-set-all-fav span');
  // var text = $('.favor-panel .header__link_text');
  // var nowKol = count.text();

  var nowKol = 1;
  var param = "id=" + id + "&action=" + action + "&now_kol=" + nowKol;
  $.ajax({
    url: "/ajax/favorites.php", // URL отправки запроса
    type: "GET",
    dataType: "html",
    data: param,
    success: function (response) {
      // Если Данные отправлены успешно
      var result = $.parseJSON(response);
      if (result.action == 1) {
        console.log("add-favor!!");
        console.log(elementCur);

        // if($(document).width() < 640){
        //     elementCur.tooltip({
        //         title : 'Товар добавлен в избранное',
        //         trigger: 'manual',
        //         placement: 'left',
        //         delay: { show: 300, hide: 1000 }
        //     }).tooltip('show');
        // } else {}
        elementCur
          .tooltip({
            title: "Товар добавлен в избранное",
            trigger: "manual",
            placement: "top",
            delay: { show: 300, hide: 1000 },
          })
          .tooltip("show");

        $($('.js-add-favor[data-id="' + id + '"]')).each(function (
          indx,
          element
        ) {
          $(element).addClass("active");

          // if($(document).width() < 640){
          //     $(element).tooltip({
          //         title : 'Товар добавлен в избранное',
          //         trigger: 'manual',
          //         placement: 'left',
          //         delay: { show: 300, hide: 1000 }
          //     }).tooltip('show');
          // } else {
          //     // $(element).tooltip({
          //     //     title : 'Товар добавлен в избранное',
          //     //     trigger: 'manual',
          //     //     placement: 'top',
          //     //     delay: { show: 300, hide: 1000 }
          //     // }).tooltip('show');
          // }
        });
        // var wishCount = parseInt(nowKol) + 1;
        // count.text(wishCount);
      }
      if (result.action == 2) {
        $($('.js-add-favor[data-id="' + id + '"]')).each(function (
          indx,
          element
        ) {
          $(element).removeClass("active");
        });
        // var wishCount = parseInt(nowKol) - 1;
        // count.text(wishCount);
      }
      // text.html(result.text);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Если ошибка, то выкладываем печаль в консоль
      console.log("Error: " + errorThrown);
    },
  });
}
// Выставляем статус активности
function setActiveFav() {
  console.log("setActiveFav");
  if (typeof dataFavorites !== "undefined") {
    // получаем Аякосм
    var param = "ALL=Y";
    $.ajax({
      url: "/ajax/favorites.php", // URL отправки запроса
      type: "GET",
      dataType: "html",
      data: param,
      success: function (response) {
        // Если Данные отправлены успешно
        var dataFavorites = $.parseJSON(response);
        for (var i = 0; i < dataFavorites.length; i++) {
          if ($('.js-add-favor[data-id="' + dataFavorites[i] + '"]')) {
            $('.js-add-favor[data-id="' + dataFavorites[i] + '"]').addClass(
              "active"
            );
          }
        }
      },
    });
  }
  /*    if (typeof dataFavorites !== "undefined") {
        for (var i = 0; i < dataFavorites.length; i++) {
            if ($('.js-add-favor[data-id="' + dataFavorites[i] + '"]')) {
                $('.js-add-favor[data-id="' + dataFavorites[i] + '"]').addClass('active');
            }
        }
        // $('.js-set-all-fav span').text(dataFavorites.length);
    } else {

                // $('.js-set-all-fav span').text('0');
    }
*/
}
/** Избранное */

document.addEventListener("DOMContentLoaded", function () {
  console.log("ready init_link_navigator");
  init_link_navigator();
});

function init_link_navigator() {
  console.log("init_link_navigator");

  var isMobileFlag = localStorage.getItem("isMobileFlag9");

  if (isMobileFlag === null) {
    isMobileFlag = isMobile();
    localStorage.setItem("isMobileFlag9", isMobileFlag);
  }
  $("a.js-link-navigator").each(function (index, element) {
    // var link = $(this).find('a');
    var link = $(this);
    var city = link.attr("data-city");

    switch (city) {
      case "spb":
        if (isMobileFlag === true) {
          console.log("mobil");
          link.attr(
            "href",
            "yandexnavi://build_route_on_map?lat_to=59.779173&lon_to=30.459661"
          );
        } else {
          console.log("desktop");
          link
            .attr(
              "href",
              "https://maps.yandex.ru/?rtext=~59.779173,30.459661&rtt=auto"
            )
            .attr("target", "_blank");
        }
        break;
      case "msk":
        if (isMobileFlag === true) {
          console.log("mobil");
          link.attr(
            "href",
            "yandexnavi://build_route_on_map?lat_to=55.329441&lon_to=37.813892"
          );
        } else {
          console.log("desktop");
          link
            .attr(
              "href",
              "https://maps.yandex.ru/?rtext=~55.329441,37.813892&rtt=auto"
            )
            .attr("target", "_blank");
        }
        break;
    }
  });
}

function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
}

function customCarsFindFilter(type, val) {
  console.log(type);
  console.log(val);

  // проверим есть ли свойства
  if (type == "mark") {
    var carMARKA = $(".js-new-car-MARKA");
    if (carMARKA.length == 0) {
      return true;
    }
  }

  if (type == "model") {
    var carMARKA = $(".js-new-car-MODEL");
    if (carMARKA.length == 0) {
      return true;
    }
  }
  if (val == "") {
    return true;
  }
  // кликаем на пункт в фильтре

  var selectRadioBTN = carMARKA.find(
    ".bx-filter-param-text[title=" + val + "]"
  );
  console.log(selectRadioBTN);
  if (selectRadioBTN.length > 0) {
    if (
      !selectRadioBTN
        .parents(".bx-filter-param-label")
        .find("input")
        .prop("checked")
    ) {
      selectRadioBTN.parents(".bx-filter-param-label").click();
      console.log("ВЫБИРАЕМ " + type + " -" + val);
    } else {
      console.log("УЖЕ " + type + "-" + val);
    }
  }
}
