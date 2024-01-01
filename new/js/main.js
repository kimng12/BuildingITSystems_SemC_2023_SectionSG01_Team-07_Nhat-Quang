
document.addEventListener('DOMContentLoaded', function () {
  var mySwiper = new Swiper('.testimonial', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      loopFillGroupWithBlank: true,

      // If we need pagination
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
});

const head = document.querySelector(".head"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");
searchIcon.addEventListener("click", () => {
  head.classList.toggle("openSearch");
  head.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});
navOpenBtn.addEventListener("click", () => {
  head.classList.add("openNav");
  head.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  head.classList.remove("openNav");
});
window.onscroll = function() {
  stickyNavbar();
};

window.addEventListener("scroll", () => {
  var header = document.querySelector("header")
  header.classList.toggle("sticky",window.scrollY >0);
})


