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

  function displayThankYouMessage(message) {
      thankYouMessage.innerHTML = `<p>${message}</p>`;
      thankYouMessage.style.display = "block";
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  signupLink.addEventListener("click", function (e) {
      e.preventDefault();
      emailForm.style.display = "none";
      passwordForm.style.display = "none";
      signupLink.style.display = "none";
      signupText.style.display = "none";
      signupForm.style.display = "block";
      document.getElementById("signup-name").focus();
  });

  emailContinueButton.addEventListener("click", function (e) {
      e.preventDefault();
      const correctEmail = "reniercoetzer92@gmail.com";
      if (emailInput.value === correctEmail) {
          emailForm.style.display = "none";
          passwordInput.focus();
          document.querySelector(".password-input").style.display = "block";
          signupLink.style.display = "none";
          signupText.style.display = "none";
      } else {
          alert("Incorrect email. Please try again.");
          emailInput.value = "";
          emailInput.focus();
      }
  });

  passwordContinueButton.addEventListener("click", function (e) {
      e.preventDefault();
      const correctPassword = "Renier";
      if (passwordInput.value === correctPassword) {
          passwordForm.style.display = "none";
          displayThankYouMessage("Thank you for signing in!");
          setTimeout(function () {
              window.location.href = "http://localhost:5173/"; 
          }, 3000); 
      } else {
          alert("Incorrect password. Please try again.");
          passwordInput.value = ""; 
          passwordInput.focus();
      }
  });

  const signupButton = document.getElementById("signup-button");
  signupButton.addEventListener("click", function () {
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      if (name && email && password) {
          const newUser = {
              name,
              email,
              password,
          };
          users.push(newUser);

          displayThankYouMessage("Thank you for signing up!");
          signupForm.style.display = "none";

          localStorage.setItem("users", JSON.stringify(users));

          setTimeout(function () {
              window.location.href = "http://localhost:5173/";
          }, 3000);
      } else {
          alert("Please fill out all fields.");
      }
  });
});