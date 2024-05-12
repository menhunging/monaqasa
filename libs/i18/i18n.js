i18next.use(i18nextBrowserLanguageDetector).init(
  {
    debug: false,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          ...en,
        },
      },
      ar: {
        translation: {
          ...ar,
        },
      },
    },
  },
  (err, t) => {
    if (err) return console.error(err);
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });

    if (localStorage.getItem("i18nextLng") === "ar") {
      $("html").attr("dir", "rtl").addClass("arabic");
    } else {
      $("html").attr("dir", "").removeClass("arabic");
    }

    $("body").localize();
  }
);
