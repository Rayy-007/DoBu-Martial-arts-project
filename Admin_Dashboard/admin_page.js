$(document).ready(function () {
  // call this method to get the user data form local storage and showing in the table
  addUserData();

  // close Button (Add user Form)
  $("#closeButton").on("click", function () {
    $("#add_form_container").hide();
  });

  // clsoe button (Edit User form)
  $("#closeButtonEdit").on("click", function () {
    $("#edit_form_container").hide();
  });

  // show step by step info for admin page
  $(".info_container").click(function () {
    $(".show_info").show();
  });
  $(".close_info").click(function () {
    $(".show_info").hide();
  });
});

//  Add the user data to the table
function addUserData() {
  var users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    $("#tbody").empty();
    users.forEach(function (item, index) {
      var tableRow = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.gender}</td>
          <td>${item.classes}</td>
          <td><i class="fa-solid fa-user-pen edit"onclick='editUserData(${index})' ></i></td>
          <td><i class="fa-solid fa-trash delete"onclick='confirmDelete(${index})' ></i></td>
        </tr>
        `;
      $("#tbody").append(tableRow);
    });

    $("#tbody").append(
      `<tr> <td id='addUser' onclick='addButtonToAddUserData()'>Add New User <i class="fa-solid fa-user-plus"></i> </td> </tr>`
    );
  }
}

// Confirmation before deleting the item
function confirmDelete(index) {
  const isConfirmation = confirm(
    "Are you sure to delete the user id " + (index + 1) + "?"
  );

  if (isConfirmation) {
    deleteUserData(index);
    const delete_con = $(".delete_container");
    delete_con.addClass("show_delete");

    setTimeout(function () {
      delete_con.removeClass("show_delete");
    }, 3000);
  }
}

//  Delete the User Data
function deleteUserData(index) {
  const users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    users.splice(index, 1);

    localStorage.setItem("userData", JSON.stringify(users));
  }

  addUserData();
}

//  Edit the user data
function editUserData(index) {
  const users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    const userData = users[index];

    // Display the edit form
    const editFormContainer = $("#edit_form_container");
    editFormContainer.css("display", "block");

    const editForm = $("#editForm");

    // Populate form fields with existing user data
    $("#newName").val(userData.name);
    $("#newEmail").val(userData.email);
    $(`input[name="radio"][value="${userData.gender}"]`).prop("checked", true);
    $("#newClasses").val(userData.classes);

    // Handle form submission
    const formSubmitHandler = function (event) {
      event.preventDefault();

      // Get the updated values from the form fields
      const newName = $("#newName").val();
      const newEmail = $("#newEmail").val();
      const newGender = $("input[name='radio']:checked").val();
      const newClasses = $("#newClasses").val();

      // Update the user data if all fields are filled
      if (newName && newEmail && newGender && newClasses) {
        userData.name = newName;
        userData.email = newEmail;
        userData.gender = newGender;
        userData.classes = newClasses;

        // Update the localStorage and refresh the displayed user data
        localStorage.setItem("userData", JSON.stringify(users));
        addUserData();
        const changed_con = $(".changed_container");
        changed_con.addClass("show_changed");

        setTimeout(function () {
          changed_con.removeClass("show_changed");
        }, 3000);

        // Hide the edit form
        editFormContainer.css("display", "none");

        editForm.off("submit", formSubmitHandler);
      } else {
        const fail_con = $(".fail_container");

        fail_con.addClass("show_fail");
        setTimeout(function () {
          fail_con.removeClass("show_fail");
        }, 3000);
      }
    };

    editForm.on("submit", formSubmitHandler);
  }
}

// Add new user data
function addButtonToAddUserData() {
  $("#name").removeClass("invalid");
  $("#email").removeClass("invalid");
  $(".gender_field").removeClass("invalid");
  $(".classes_field").removeClass("invalid");

  const addFormContainer = $("#add_form_container");
  addFormContainer.css("display", "block");

  const addForm = $("#add_user_form");

  const formAddUserHandler = function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const gender = $("input[name='radioNew']:checked").val();
    const classes = $("#classes").val();

    // Validate the form
    let valid = true;

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

    console.log(valid);

    if (valid) {
      console.log("if", valid);
      const existingData = JSON.parse(localStorage.getItem("userData")) || [];
      const newUserData = {
        name: name,
        email: email,
        gender: gender,
        classes: classes,
      };

      existingData.push(newUserData);

      localStorage.setItem("userData", JSON.stringify(existingData));

      // Update the form fields
      $("#name").val("");
      $("#email").val("");
      $("input[name='radioNew']:checked").prop("checked", false);
      $("#classes").val("");

      // Refresh the displayed user data
      addUserData();

      addFormContainer.css("display", "none");

      addForm.off("submit", formAddUserHandler);

      const success_con = $(".success_container");
      success_con.addClass("show_success");
      setTimeout(function () {
        success_con.removeClass("show_success");
      }, 3000);
    } else {
      const fail_con = $(".fail_container");
      fail_con.addClass("show_fail");

      setTimeout(function () {
        fail_con.removeClass("show_fail");
      }, 3000);
    }
  };

  addForm.on("submit", formAddUserHandler);
}
