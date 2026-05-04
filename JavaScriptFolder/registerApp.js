const p2 = document.getElementById('p2');

const email = document.getElementById('email');
const user = document.getElementById('user');
const pass =  document.getElementById('pass');

const regForm = document.querySelector('form');
const error = document.getElementById('error');
const btnRegister = document.getElementById('btnRegister');

regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(email.value.length === 0  || user.value.length === 0 || pass.value.length === 0){
        error.innerText = "Please fill up the input text"
        return;
    }
    alert("Successfully Registered");
})

p2.onclick = function(){
    window.location.href = "login.html";
}