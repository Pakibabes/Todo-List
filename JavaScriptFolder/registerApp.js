// Redirect to home page if already logged in
if (localStorage.getItem('currentUser')) {
    window.location.href = "home.html";
}

const p2 = document.getElementById('p2');

const email = document.getElementById('email');
const user = document.getElementById('user');
const pass =  document.getElementById('pass');

const regForm = document.querySelector('form');
const error = document.getElementById('error');
const btnRegister = document.getElementById('btnRegister');

regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();
    const usernameValue = user.value.trim();
    const passwordValue = pass.value.trim();

    if (emailValue.length === 0 || usernameValue.length === 0 || passwordValue.length === 0) {
        error.innerText = "Please fill up all input fields.";
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        error.innerText = "Please enter a valid email address.";
        return;
    }

    if (passwordValue.length < 4) {
        error.innerText = "Password must be at least 4 characters.";
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    const userExists = users.some(u => u.username.toLowerCase() === usernameValue.toLowerCase());
    if (userExists) {
        error.innerText = "Username is already registered.";
        return;
    }

    // Check if email already exists
    const emailExists = users.some(u => u.email.toLowerCase() === emailValue.toLowerCase());
    if (emailExists) {
        error.innerText = "Email is already registered.";
        return;
    }

    // Add user to database
    users.push({
        email: emailValue,
        username: usernameValue,
        password: passwordValue
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert("Successfully Registered! You can now login.");
    window.location.href = "login.html";
});

p2.onclick = function(){
    window.location.href = "login.html";
}