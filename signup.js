const signupForm = document.getElementById("signup-form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const emailFeedback = document.getElementById("email-feedback");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Read all saved accounts (empty list if none yet)
function getUsers() {
  return JSON.parse(localStorage.getItem("giftnestUsers")) || [];
}

// Mark the confirm field invalid when it does not match the password
function checkPasswordsMatch() {
  if (confirmPassword.value && confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Passwords do not match");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

// Mark the email invalid if an account with it already exists
function checkEmailAvailable() {
  const taken = getUsers().some(function (u) {
    return u.email === email.value.trim().toLowerCase();
  });
  if (taken) {
    email.setCustomValidity("Email already registered");
    emailFeedback.textContent = "This email already has an account. Please log in.";
  } else {
    email.setCustomValidity("");
    emailFeedback.textContent = "Enter a valid email, like name@example.com.";
  }
}

password.addEventListener("input", checkPasswordsMatch);
confirmPassword.addEventListener("input", checkPasswordsMatch);
email.addEventListener("input", checkEmailAvailable);

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  checkPasswordsMatch();
  checkEmailAvailable();

  if (!signupForm.checkValidity()) {
    signupForm.classList.add("was-validated");
    return;
  }

  // Save the new account, then go to the login page
  const users = getUsers();
  users.push({
    name: fullName.value.trim(),
    email: email.value.trim().toLowerCase(),
    phone: phone.value.trim(),
    password: password.value
  });
  localStorage.setItem("giftnestUsers", JSON.stringify(users));

  window.location.href = "login.html?signup=success";
});