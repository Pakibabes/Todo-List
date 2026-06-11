// Redirect to home page if already logged in
if (localStorage.getItem('currentUser')) {
    window.location.href = "home.html";
}

const form = document.querySelector('form');
const p2 = document.getElementById('p2')
const errorText = document.getElementById('error');

const user = document.getElementById('user')
const pass = document.getElementById('pass')

form.addEventListener('submit', function(e){
    const userInput = user.value.trim();
    const passInput = pass.value.trim();
    e.preventDefault();

    if(userInput.length === 0 || passInput.length === 0){
        errorText.innerText = "Please enter username and password.";
        return;
    }

    // Get existing users database
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find matching user
    const foundUser = users.find(u => u.username.toLowerCase() === userInput.toLowerCase());

    if (!foundUser) {
        errorText.innerText = "Account does not exist.";
        return;
    }

    if (foundUser.password !== passInput) {
        errorText.innerText = "Incorrect password.";
        return;
    }

    // Store login session
    localStorage.setItem('currentUser', foundUser.username);
    
    alert("Logged in successfully!");
    window.location.href = "home.html";
})

p2.onclick = function(){
    window.location.href = "register.html"
}