// * Slider JavaScript
$(document).ready(function () {
  //  Auto Slider
  let slideInterval;
  function startSlideInterval() {
    slideInterval = setInterval(function () {
      let currentSlide = $(".active");
      let nextSlide = currentSlide.next();

      // if ((nextSlide.length = 7))
      if (nextSlide.length) {
        currentSlide.removeClass("active");
        nextSlide.addClass("active");
      }
      if (nextSlide.length == 0) {
        let slides = $(".slider");
        nextSlide = slides.first();
        currentSlide.removeClass("active");
        nextSlide.addClass("active");
      }
    }, 5000);
  }

  function stopSlideInterval() {
    clearInterval(slideInterval);
  }

  // startSlideInterval();

  // Next Slider
  $(".slider_next_arrow").on("click", function () {
    stopSlideInterval();
    let currentSlide = $(".active");
    let nextSlide = currentSlide.next();

    // if ((nextSlide.length = 7))
    if (nextSlide.length) {
      currentSlide.removeClass("active");
      nextSlide.addClass("active");
    }
    if (nextSlide.length == 0) {
      let slides = $(".slider");
      nextSlide = slides.first();
      currentSlide.removeClass("active");
      nextSlide.addClass("active");
    }
    startSlideInterval();
  });

  // Prev Slider
  $(".slider_prev_arrow").on("click", function () {
    stopSlideInterval();

    let currentSlide = $(".active");
    let prevSlide = currentSlide.prev();

    console.log(prevSlide.length);
    if (prevSlide.length) {
      currentSlide.removeClass("active");
      prevSlide.addClass("active");
    }
    if (prevSlide.length == 0) {
      let slides = $(".slider");
      prevSlide = slides.last();
      prevSlide.addClass("active");
      currentSlide.removeClass("active");
    }

    startSlideInterval();
  });

  startSlideInterval();
});

//  Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    console.log("yes");
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
});
