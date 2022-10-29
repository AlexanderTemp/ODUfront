(function () {
  function h(a) {
    a = a.getBoundingClientRect();
    return {
      top: a.top + document.body.scrollTop,
      left: a.left + document.body.scrollLeft,
    };
  }
  function d(a) {
    return parseFloat(getComputedStyle(a, null).height.replace("px", ""));
  }

  function l(a) {
    "loading" != document.readyState
      ? a()
      : document.addEventListener("DOMContentLoaded", a);
  }

  function n(a) {
    (function e() {
      0 > (a.style.opacity -= 0.1)
        ? (a.style.display = "none")
        : requestAnimationFrame(e);
    })();
  }
  function r(a) {
    a.style.display = "block";
    (function e() {
      var b = parseFloat(a.style.opacity);
      1 < (b += 0.1) || ((a.style.opacity = b), requestAnimationFrame(e));
    })();
  }
  function v(a) {
    var c = [],
      b = {
        blackberry: "BlackBerry",
        android: "Android",
        windows: "IEMobile",
        opera: "Opera Mini",
        ios: "iPhone|iPad|iPod",
      };
    a = "undefined" == typeof a ? "*" : a.toLowerCase();
    "*" === a ? (c = Object.values(b)) : a in b && c.push(b[a]);
    return (a = !(
      !c.find(function (a) {
        return "iPhone|iPad|iPod" === a;
      }) ||
      !(
        navigator.userAgent.match(/(iPad)/) ||
        ("MacIntel" === navigator.platform &&
          "undefined" !== typeof navigator.standalone)
      )
    ))
      ? a
      : !(
          !c.length || !navigator.userAgent.match(new RegExp(c.join("|"), "i"))
        );
  }

  var g,
    p,
    t = "function" == typeof jQuery;
  t && (g = jQuery);
  g
    ? (p = g("html").hasClass("is-builder"))
    : (p = document.querySelector("html").classList.contains("is-builder"));
  Element.prototype.parents = function (a) {
    for (
      var b = [], e = this, d = void 0 !== a;
      null !== (e = e.parentElement);

    )
      e.nodeType === Node.ELEMENT_NODE && ((d && !e.matches(a)) || b.push(e));
    return b;
  };

  // Heres the problem 
  if (!p) {
    
   
    Array.from(document.body.children)
      .filter(function (a) {
        return !a.matches("style, script");
      })
      .forEach(function (a) {
        a.classList.contains("mbr-reveal") &&
          a.addEventListener("add.cards", function () {
            a.footerReveal();
          });
      });
    l(function () {
      if (v()) {
        var a = this.querySelectorAll("section[data-bg-video]");
        [].forEach.call(a, function (a) {
          (a = a.querySelector(".mbr-fallback-image")) &&
            a.classList.remove("disabled");
        });
      } else if (document.querySelectorAll("input[name=animation]").length) {
        a = function () {
          var a = document.documentElement.scrollTop || document.body.scrollTop,
            c = a + window.innerHeight - 100;
          d.forEach(function (f) {
            var d = f.offsetHeight,
              k = e(f);
            ((k + d >= a && k - 50 <= c) || b(f)) &&
              f.classList.contains("hidden") &&
              (f.classList.remove("hidden"),
              f.classList.add("animate__fadeInUp"),
              f.classList.add("animate__delay-1s"),
              f.addEventListener(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                  f.classList.remove(
                    "animate__animated animate__delay-1s animate__fadeInUp"
                  );
                },
                { once: !0 }
              ));
          });
        };
        var b = function (a) {
            if (
              a.parents(".carousel-item").some(function (a) {
                return "none" !== getComputedStyle(a, null).display;
              })
            )
              return !1;
            var b = a.parents(".carousel-item").parentNode;
            if (
              !b ||
              b.querySelectorAll(
                ".carousel-item.active .hidden.animate__animated"
              ).length
            )
              return !1;
            if (1 < b.getAttribute("data-visible")) {
              var c = b.getAttribute("data-visible");
              if (
                a.parents().some(function (a) {
                  return a.matches(".cloneditem-" + (c - 1));
                }) &&
                a.parents(".cloneditem-" + (c - 1)).some(function (a) {
                  return a.getAttribute("data-cloned-index") >= c;
                })
              )
                return !0;
              a.classList.remove("animate__animated animate__delay-1s hidden");
              return !1;
            }
            return !0;
          },
          e = function (a) {
            var b = 0;
            do (b += a.offsetTop || 0), (a = a.offsetParent);
            while (a);
            return b;
          };
        document
          .querySelectorAll("input[name=animation]")
          .forEach(function (a) {
            a.remove();
          });
        var d = Array.from(
          document.querySelectorAll(
            "p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, select, textarea, .input-group, .form-control, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info"
          )
        );
        d = d.filter(function (a) {
          if (
            !a.parents().filter(function (a) {
              if (
                a.matches(
                  "a, p, .navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop"
                )
              )
                return !0;
            }).length
          )
            return !0;
        });
        d = d.filter(function (a) {
          if (
            !a.parents().filter(function (b) {
              return b.matches("form") && !a.matches("li");
            }).length
          )
            return !0;
        });
        d.forEach(function (a) {
          a.classList.add("hidden");
          a.classList.add("animate__animated");
          a.classList.add("animate__delay-1s");
        });
        window.addEventListener("scroll", a);
        window.addEventListener("resize", a);
        window.dispatchEvent(new CustomEvent("scroll"));
      }
    });
  }

  l(function () {
    if (document.querySelectorAll(".mbr-arrow-up").length) {
      var a = document.querySelector("#scrollToTop");
      a.style.display = "none";
      window.addEventListener("scroll", function () {
        window.scrollY > window.innerHeight ? r(a) : n(a);
      });
      a.addEventListener("click", function () {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return !1;
      });
    }
  });
  if (!p) {
    var u = document.querySelector(".mbr-arrow");
    u &&
      u.addEventListener("click", function (a) {
        a = a.target.closest("section").nextElementSibling;
        a.classList.contains("engine") &&
          (a = a.closest("section").nextElementSibling);
        window.scrollTo(0, h(a).top);
      });
  }

  document.querySelectorAll("nav.navbar").length &&
    ((u = d(document.querySelector("nav.navbar"))),
    document.querySelector(".mbr-after-navbar.mbr-fullscreen") &&
      (document.querySelector(
        ".mbr-after-navbar.mbr-fullscreen"
      ).style.paddingTop = u + "px"));
  if (
    !p &&
    (0 < window.navigator.userAgent.indexOf("MSIE ") ||
      navigator.userAgent.match(/Trident.*rv:11\./))
  )
    g(document).on("add.cards", function (a) {
      var b = a.target;
      b.classList.contains("mbr-fullscreen") &&
        ((a = function () {
          b.style.height = "auto";
          b.offsetHeight <= window.innerHeight && (b.style.height = "1px");
        }),
        window.addEventListener("load", a),
        window.addEventListener("resize", a));
      if (
        b.classList.contains("mbr-slider") ||
        b.classList.contains("mbr-gallery")
      )
        b.querySelectorAll(".carousel-indicators").forEach(function (a) {
          a.classList.add("ie-fix");
          a.querySelectorAll("li").forEach(function (a) {
            a.style.display = "inline-block";
            a.style.width = "30px";
          });
        }),
          b.classList.contains("mbr-slider") &&
            b
              .querySelectorAll(".full-screen .slider-fullscreen-image")
              .forEach(function (a) {
                a.style.height = "1px";
              });
    });

  if (!p) {
    u = document.querySelectorAll(".dropdown-toggle.show");
    var z = document.querySelectorAll(".dropdown-menu.show, .dropdown.open"),
      I = document.querySelectorAll(".dropdown.open");
    u.forEach(function (a) {
      a.classList.remove("show");
      a.ariaExpanded = "false";
    });
    z.forEach(function (a) {
      return a.classList.remove("show");
    });
    I.forEach(function (a) {
      return a.classList.remove("open");
    });
    !v() &&
      (u = document.querySelector("section.menu")) &&
      ((z = window.innerWidth),
      !u.querySelector(".navbar").classList.contains("collapsed") &&
        991 < z &&
        (u.querySelectorAll("ul.navbar-nav li.dropdown").forEach(function (a) {
          a.addEventListener("mouseenter", function () {
            a.classList.contains("open") ||
              a
                .querySelector("a")
                .dispatchEvent(new Event("click", { cancelable: !0 }));
          });
          a.addEventListener("mouseleave", function () {
            a.classList.contains("open") &&
              a
                .querySelector("a")
                .dispatchEvent(new Event("click", { cancelable: !0 }));
          });
        }),
        u
          .querySelectorAll(
            "ul.navbar-nav li.dropdown .dropdown-menu .dropdown"
          )
          .forEach(function (a) {
            a.addEventListener("mouseover", function () {
              a.classList.contains("open") ||
                (a
                  .querySelector("a")
                  .dispatchEvent(new Event("click", { cancelable: !0 })),
                a.classList.add("open"));
            });
            a.addEventListener("mouseout", function () {
              a.classList.contains("open") &&
                (a
                  .querySelector("a")
                  .dispatchEvent(new Event("click", { cancelable: !0 })),
                a.classList.remove("open"));
            });
          })));
  }
})();
