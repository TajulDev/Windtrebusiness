// Set the expiration date
var expirationDate = new Date("2023-06-01");

// Update the countdown every second
var countdown = setInterval(function () {
  // Get the current date and time
  var now = new Date().getTime();

  // Calculate the time remaining until expiration
  var timeRemaining = expirationDate.getTime() - now;

  // Calculate the days, hours, minutes, and seconds
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var dayss = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  var hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var hourss = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var minutess = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  var secondss = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  document.getElementById("dayss").textContent = dayss;
  document.getElementById("hourss").textContent = hourss;
  document.getElementById("minutess").textContent = minutess;
  document.getElementById("secondss").textContent = secondss;

  // If the countdown is finished, display a message
  if (timeRemaining < 0) {
    clearInterval(countdown);
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";

    document.getElementById("dayss").textContent = "0";
    document.getElementById("hourss").textContent = "0";
    document.getElementById("minutess").textContent = "0";
    document.getElementById("secondss").textContent = "0";
  }
}, 1000);

function decreaseLabelScale(labelId) {
  var label = document.getElementById(labelId);
  label.classList.add("label-small");
}

$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Validate the form
    if (validateForm()) {
      // If the form is valid, submit it
      this.submit();
      $("#exampleModal2").modal("show");
    } else {
      // Show the modal if validation fails
      $("#exampleModal").modal("show");
    }
  });

  function validateForm() {
    let isValid = true;

    // Clear any previous error messages
    $(".error-message").remove();

    // Validate Name and Surname field
    const nameInput = $("#nameInput");
    const nameLabel = $("#nameLabel");
    if (nameInput.val().trim() === "") {
      isValid = false;
      nameLabel.html("Name is required");
    }

    // Validate Telephone field
    const telephoneInput = $("#telephoneInput");
    const telephoneLabel = $("#telephoneLabel");
    const telephonePattern = /^\d{10}$/; // Regular expression for a 10-digit phone number
    if (telephoneInput.val().trim() === "") {
      isValid = false;
      telephoneLabel.html("Telephone is required");
    } else if (!telephonePattern.test(telephoneInput.val().trim())) {
      isValid = false;
      telephoneLabel.html("Invalid phone number");
    }

    // Validate VAT number field
    const vatInput = $("#vatInput");
    const vatLabel = $("#vatLabel");
    const vatPattern = /^[A-Za-z]{2}\d{11}$/; // Regular expression for a VAT number with 2 letters followed by 11 digits
    if (vatInput.val().trim() !== "") {
      if (!vatPattern.test(vatInput.val().trim())) {
        isValid = false;
        vatLabel.html("Invalid VAT number");
      } else {
        // Make API request to validate VAT number
        const apiUrl = " https://www.vatcomply.com/vat-validation-api/"; // Replace with your API endpoint
        const requestData = {
          vatNumber: vatInput.val().trim(),
        };

        $.ajax({
          url: apiUrl,
          method: "POST",
          data: requestData,
          dataType: "json",
          async: false, // Make the request synchronous for simplicity
          success: function (response) {
            if (!response.isValid) {
              isValid = false;
              vatLabel.html("Invalid VAT number");
            }
          },
          error: function (xhr, status, error) {
            console.log(error);
          },
        });
      }
    }

    // Validate Required field
    const requiredInput = $("#requiredInput");
    if (requiredInput.val().trim() === "") {
      isValid = false;
      requiredInput.html("This field is required");
    }

    // Validate the checkbox
    const checkbox = $("#flexCheckDefault");
    if (!checkbox.prop("checked")) {
      isValid = false;
      // checkbox.after(
      //   '<span class="error-message">You must accept the processing of personal data</span>'
      // );
    }

    return isValid;
  }
});
