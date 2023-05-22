$(document).ready(function () {
  $("#join_now_form").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const gender = $("input[name='radio']:checked").val();
    const classes = $("#classes").val();
    const checkbox = $("#checkbox").prop("checked");

    // Validate the form
    var valid = true;

    if (!name) {
      $("#name").addClass("invalid");
      valid = false;
    } else {
      $("#name").removeClass("invalid");
    }

    if (!email) {
      $("#email").addClass("invalid");
      valid = false;
    } else {
      $("#email").removeClass("invalid");
    }

    if (!password) {
      $("#password").addClass("invalid");
      valid = false;
    } else {
      $("#password").removeClass("invalid");
    }

    if (!gender) {
      $(".gender_field").addClass("invalid");
      valid = false;
    } else {
      $(".gender_field").removeClass("invalid");
    }

    if (!classes) {
      $(".classes_field").addClass("invalid");
      valid = false;
    } else {
      $(".classes_field").removeClass("invalid");
    }

    if (!checkbox) {
      $(".checkbox_container").addClass("invalid");
      valid = false;
    } else {
      $(".checkbox_container").removeClass("invalid");
    }

    if (valid) {
      const existingData = JSON.parse(localStorage.getItem("userData")) || [];
      const newUserData = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        classes: classes,
      };

      existingData.push(newUserData);

      localStorage.setItem("userData", JSON.stringify(existingData));
      window.location.href = "../thank_you.html";
    } else {
      //   alert("Please fill the all field!!");
      const fail_con = $(".fail_container");
      fail_con.addClass("show_fail");

      setTimeout(function () {
        fail_con.removeClass("show_fail");
      }, 3000);
    }
  });

  // Show and Hide Password Eye
  $("#password_toggle").click(function () {
    const passwordToggle = $("#password_toggle");

    const passwordInput = $("#password");
    const passwordFieldType = passwordInput.attr("type");

    if (passwordFieldType === "password") {
      passwordInput.attr("type", "text");
      $(passwordToggle).removeClass("fa-eye-slash").addClass("fa-eye");
    } else {
      passwordInput.attr("type", "password");
      $(passwordToggle).removeClass("fa-eye").addClass("fa-eye-slash");
    }
  });
});
