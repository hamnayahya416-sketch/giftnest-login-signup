const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordFeedback = document.getElementById("password-feedback");
const noAccount = document.getElementById("no-account");

// Read all saved accounts (empty list if none yet)
function getUsers() {
  return JSON.parse(localStorage.getItem("giftnestUsers")) || [];
}

// Clear the wrong-password error as soon as the user edits the field
passwordInput.addEventListener("input", function () {
  passwordInput.setCustomValidity("");
  passwordFeedback.textContent = "Enter your password.";
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  noAccount.classList.add("d-none");
  passwordInput.setCustomValidity("");

  // Stop here if a field is empty or the email format is wrong
  if (!loginForm.checkValidity()) {
    loginForm.classList.add("was-validated");
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  const user = getUsers().find(function (u) { return u.email === email; });

  // No account for this email: show the message with a signup link
  if (!user) {
    noAccount.classList.remove("d-none");
    return;
  }

  // Account exists but the password is wrong
  if (user.password !== passwordInput.value) {
    passwordInput.setCustomValidity("Wrong password");
    passwordFeedback.textContent = "Incorrect password. Try again.";
    loginForm.classList.add("was-validated");
    return;
  }

  // Success: remember who is logged in, then open the dashboard
  localStorage.setItem("giftnestCurrentUser", JSON.stringify({ name: user.name, email: user.email }));
  window.location.href = "dashboard.html";
});