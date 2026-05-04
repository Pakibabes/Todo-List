const form = document.querySelector('form');
const p2 = document.getElementById('p2')

const user = document.getElementById('user')
const pass = document.getElementById('pass')
form.addEventListener('submit', function(e){
    const userInput = user.value;
    if(userInput == null){
        console.log("Enter credentials")
    }else{
        alert(`Hi ${userInput}`);
    }

    window.location.href = "home.html";
})

p2.onclick = function(){
    window.location.href = "register.html"
}