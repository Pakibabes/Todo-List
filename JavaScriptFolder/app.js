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
        errorText.innerText = "Please enter user and pass";
        return;
    }
    window.location.href = "home.html";
    alert("Successfully Login");
})

p2.onclick = function(){
    window.location.href = "register.html"
}