$(document).ready(function () {
  if ($(".burger").length > 0) {
    let menu = $(".header-mobile");
    let burger = $(".burger");
    let burgerСlose = $(".btn-close");

    burger.on("click", function () {
      if (menu.hasClass("opened")) {
        closeMenu();
      } else {
        burger.addClass("opened");
        menu.addClass("opened");

        $(document).mouseup(function (e) {
          if (
            !menu.is(e.target) &&
            menu.has(e.target).length === 0 &&
            !burger.is(e.target)
          ) {
            closeMenu();
          }
        });
      }
    });

    burgerСlose.on("click", function () {
      closeMenu();
    });

    $(".menu a").on("click", function () {
      if ($(".header-mobile").hasClass("opened")) {
        $(".header-mobile").removeClass("opened");
      }
    });

    function closeMenu() {
      burger.removeClass("opened");
      menu.removeClass("opened");
      $(document).off("mouseup");
    }
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".phone-item").length > 0) {
    $(".phone-item input").map(function () {
      $(this).inputmask({
        mask: "999 99 99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,

      onShow: () => {
        $("body").addClass("modal-open");
      },

      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        $("body").addClass("modal-open");
      });
    });

    $("[data-micromodal-close]").map(function () {
      $(this).click((e) => {
        if ($(this).attr("data-modal")) {
          setTimeout(() => {
            $("body").addClass("modal-open");
          }, 0.1);
        }
      });
    });
  }

  if ($(".reviews-slider").length > 0) {
    const swiper = new Swiper(".reviews-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.25,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  if ($(".code-list").length > 0) {
    $(".phone-item__phone").on("click", function () {
      let self = $(this);
      let codeBlock = self.parents(".phone-item").find(".code-list");

      if (!self.hasClass("opened")) {
        self.addClass("opened");
        codeBlock.addClass("opened");

        $(document).mouseup(function (e) {
          if (!codeBlock.is(e.target) && codeBlock.has(e.target).length === 0) {
            self.removeClass("opened");
            codeBlock.removeClass("opened");
          }
        });
      } else {
        $(document).off("mouseup");
        self.removeClass("opened");
        codeBlock.removeClass("opened");
      }
    });
  }

  if ($(".lang-change").length > 0) {
    let links = $(".lang-change");
    let body = $("body");

    links.on("click", function (e) {
      e.preventDefault();
      let lang = $(this).attr("data-lang");

      i18next.changeLanguage(lang);
      body.localize();

      let langStorage = getTextLang();
      setTextLang(langStorage);

      if (langStorage === "ar") {
        $("html").attr("dir", "rtl").addClass("arabic");
      } else {
        $("html").attr("dir", "").removeClass("arabic");
      }

      links.removeClass("active");

      links.map(function () {
        if ($(this).attr("data-lang") === lang) {
          $(this).addClass("active");
        }
      });
    });
  }

  handleLanguage();
});

const handleLanguage = (lang) => {
  let langStorage = getTextLang();

  $(".lang-change").removeClass("active");

  $(".lang-change").map(function () {
    if ($(this).attr("data-lang") === langStorage) {
      $(this).addClass("active");
    }
  });

  if (langStorage === "en" || langStorage === "ar") {
    setTextLang(langStorage);
  } else {
    setTextLang("en");
  }
};

const getTextLang = () => {
  return localStorage.getItem("i18nextLng");
};

const setTextLang = (lang) => {
  $(".lang-block .lang").text(lang);
};
