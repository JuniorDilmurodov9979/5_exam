
const elForm = document.querySelector('.js-form-login')
const elEmail = document.querySelector('.js-login-email')
const elPassword = document.querySelector('.js-login-password')

function login(email,password) {
    fetch('http://localhost:9090/login', {
    method: 'POST',
    headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        "email":email, 
        "password":password,
    }),
    
}).then((res) => res.json()).then((data) => {
    console.log(data)
    console.log(data.status);
    alert(data.message)
    if(data.token) {
        localStorage.setItem("token", data.token)
        window.location.replace('main.html')
    }
})
}

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    login(elEmail.value,elPassword.value);
    
})