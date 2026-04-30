/*
Generated time: November 30, 2025 10:01
This file was created by the app developer. Feel free to contact the original developer with any questions. It was minified (compressed) by AVADA. AVADA do NOT own this script.
*/
let debounceTimer;

function debounce(e, t) {
    clearTimeout(debounceTimer),
        debounceTimer = setTimeout(e, t)
}

function updateAllSliderHeights() {
    document.querySelectorAll(".main-slider.slider--adapt-to-image").forEach(t => {
        let i = t.querySelector(".swiper-slide:first-child img"); var e; i && (e = () => {
            var e = i.naturalHeight / i.naturalWidth * t.offsetWidth; t.style.height = e + "px"
        }

            , i.complete ? e() : i.addEventListener("load", e, {
                once: !0
            }), window.addEventListener("resize", e))
    })
}

function initializeMainSlider() {
    debounce(() => {
        document.querySelectorAll(".main-slider").forEach(function (e) {
            let a = "true" === e.dataset.adaptToImage, s = (e.swiper && e.swiper.destroy(!0, !0), "true" === e.dataset.enableAutoplay); var t = parseFloat(e.dataset.autoplaySpeed) || 3, i = e.dataset.sliderDirection, i = {
                loop: "true" === e.dataset.sliderLoop, speed: 1e3, parallax: !0, direction: i, grabCursor: !0, watchSlidesProgress: !0, autoplay: s && {
                    delay: 1e3 * t, disableOnInteraction: !0
                }

                , navigation: {
                    nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev"
                }

                , pagination: {
                    el: ".swiper-pagination", type: "progressbar"
                }

                , focusableElements: "input, select, option, textarea, button, video, label", on: {
                    init: function () {
                        var e = this, t = e.slides[e.activeIndex], i = t.querySelector(".title"), i = (i && i.classList.add("show"), t.querySelector(".caption-box")), i = (i && i.classList.add("show"), t.querySelector(".caption")), i = (i && i.classList.add("show"), t.querySelector(".banner-buttons")); i && i.classList.add("show"), e.autoplay && s && e.autoplay.start(), a && updateAllSliderHeights()
                    }

                    , slideChangeTransitionEnd: function () {
                        var e = this, e = (e.el.querySelectorAll(".caption, .banner-buttons, .title, .caption-box").forEach(e => e.classList.remove("show")), e.slides[e.activeIndex]), t = e.querySelector(".title"), t = (t && t.classList.add("show"), e.querySelector(".caption-box")), t = (t && t.classList.add("show"), e.querySelector(".caption")), t = (t && t.classList.add("show"), e.querySelector(".banner-buttons")); t && t.classList.add("show")
                    }

                    , touchStart: function () {
                        this.slides.forEach(e => {
                            e.style.transition = ""
                        })
                    }
                }
            }

                ; new Swiper(e, i)
        })
    }

        , 300)
}

window.addEventListener("resize", () => {
    initializeMainSlider()
}),
    initializeMainSlider();