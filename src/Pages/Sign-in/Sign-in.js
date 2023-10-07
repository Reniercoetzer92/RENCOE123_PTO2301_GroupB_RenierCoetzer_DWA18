document.addEventListener("DOMContentLoaded", function () {
  const emailForm = document.getElementById("login-form");
  const passwordForm = document.getElementById("password-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailContinueButton = document.getElementById("email-continue");
  const passwordContinueButton = document.getElementById("password-continue");
  const thankYouMessage = document.querySelector(".thank-you-message");
  const signupLink = document.getElementById("signup-link");
  const signupForm = document.querySelector(".signup-form");
  const signupText = document.querySelector(".signup-text");

  // Function to display a custom thank you message
  function displayThankYouMessage(message) {
      thankYouMessage.innerHTML = `<p>${message}</p>`;
      thankYouMessage.style.display = "block";
  }

  // Simulate user data storage using localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Toggle the sign-up form visibility
  signupLink.addEventListener("click", function (e) {
      e.preventDefault();
      emailForm.style.display = "none";
      passwordForm.style.display = "none";
      signupLink.style.display = "none";
      signupText.style.display = "none";
      signupForm.style.display = "block";
      document.getElementById("signup-name").focus();
  });

  // When the email is submitted
  emailContinueButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Check if the email is correct (you can replace this with your own email validation logic)
      const correctEmail = "reniercoetzer92@gmail.com"; // Replace with the actual correct email
      if (emailInput.value === correctEmail) {
          emailForm.style.display = "none";
          passwordInput.focus();
          document.querySelector(".password-input").style.display = "block";
          // Hide the "Sign up" link and text
          signupLink.style.display = "none";
          signupText.style.display = "none";
      } else {
          // Display "Incorrect email" message
          alert("Incorrect email. Please try again.");
          emailInput.value = ""; // Clear the email input
          emailInput.focus();
      }
  });

  // When the password is submitted
  passwordContinueButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Check if the password is correct (you can replace this with your own logic)
      const correctPassword = "Renier"; // Replace with the actual correct password
      if (passwordInput.value === correctPassword) {
          passwordForm.style.display = "none";
          // Display a custom thank you message for signing in
          displayThankYouMessage("Thank you for signing in!");
          // Redirect to the Thank you page after a delay (e.g., 3 seconds)
          setTimeout(function () {
              window.location.href = "http://localhost:5173/"; // Replace with the actual URL of your "Thank you" page
          }, 3000); // 3000 milliseconds (3 seconds) delay
      } else {
          // Incorrect password handling (you can customize this)
          alert("Incorrect password. Please try again.");
          passwordInput.value = ""; // Clear the password input
          passwordInput.focus();
      }
  });

  // When the sign-up button is clicked
  const signupButton = document.getElementById("signup-button");
  signupButton.addEventListener("click", function () {
      // Collect user data from the sign-up form
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      // Validate and store the user data locally
      if (name && email && password) {
          const newUser = {
              name,
              email,
              password, // In a real application, you should hash the password
          };
          users.push(newUser);

          // Display a thank you message and redirect to the "Thank you" page
          displayThankYouMessage("Thank you for signing up!");
          signupForm.style.display = "none";

          // Store user data in localStorage
          localStorage.setItem("users", JSON.stringify(users));

          setTimeout(function () {
              window.location.href = "http://localhost:5173/"; // Replace with the URL of your home page
          }, 3000); // 3000 milliseconds (3 seconds) delay
      } else {
          // Handle form validation errors
          alert("Please fill out all fields.");
      }
  });
});