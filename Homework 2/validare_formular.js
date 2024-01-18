const form = document.getElementById('registrationForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!emailRegex.test(email.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.style.display = 'block';
  } else {
    emailError.style.display = 'none';
  }

  if (!passwordRegex.test(password.value)) {
    passwordError.textContent = 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit.';
    passwordError.style.display = 'block';
  } else {
    passwordError.style.display = 'none';
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    confirmPasswordError.style.display = 'block';
  } else {
    confirmPasswordError.style.display = 'none';
  }

 
});