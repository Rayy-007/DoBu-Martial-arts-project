window.addEventListener("scroll", function () {
  const navContianer = document.querySelector(".nav_container");

  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navContianer.style.backgroundColor = "#1a1a1a";
    // navContianer.style.borderBottom = "1px solid rgba(0, 122, 204, 0.514)";
    navContianer.style.boxShadow = "0px 0px 4px 2px  rgba(0, 122, 204, 0.514)";
    navContianer.style.opacity = "0.9";
  } else {
    navContianer.style.backgroundColor = "";
    navContianer.style.borderBottom = "";
    navContianer.style.boxShadow = "";
    navContianer.style.opacity = "";
  }
});

$(document).ready(function () {
  // Smooth scrolling for class links
  $(".nav_link a[href='#classes_detail']").click(function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $("#classes_detail").offset().top,
      },
      800
    );
  });

  // Smooth scrolling for schedule links
  $(".nav_link a[href='#schedule']").click(function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $("#schedule").offset().top,
      },
      800
    );
  });
});
