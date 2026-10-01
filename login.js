const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordFeedback = document.getElementById("password-feedback");
const signupSuccess = document.getElementById("signup-success");
const noAccount = document.getElementById("no-account");
const loginSuccess = document.getElementById("login-success");

// Read all saved accounts (empty list if none yet)
function getUsers() {
  return JSON.parse(localStorage.getItem("giftnestUsers")) || [];
}

// Show the green message when the user just came from the signup page
if (new URLSearchParams(window.location.search).get("signup") === "success") {
  signupSuccess.classList.remove("d-none");
}

// Clear the wrong-password error as soon as the user edits the field
passwordInput.addEventListener("input", function () {
  passwordInput.setCustomValidity("");
  passwordFeedback.textContent = "Enter your password.";
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  noAccount.classList.add("d-none");
  signupSuccess.classList.add("d-none");
  loginSuccess.classList.add("d-none");
  passwordInput.setCustomValidity("");

  // Stop here if a field is empty or the email format is wrong
  if (!loginForm.checkValidity()) {
    loginForm.classList.add("was-validated");
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  const user = getUsers().find(function (u) { return u.email === email; });

  // No account for this email: send the user to signup
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

  // Success: remember who is logged in
  localStorage.setItem("giftnestCurrentUser", JSON.stringify({ name: user.name, email: user.email }));
  loginSuccess.textContent = "Welcome back, " + user.name.split(" ")[0] + "!";
  loginSuccess.classList.remove("d-none");
  loginForm.reset();
  loginForm.classList.remove("was-validated");

  // Later (Task 2) redirect to the home page or dashboard here:
  // window.location.href = "index.html";
});