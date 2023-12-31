let elForm = document.querySelector(".js-form");
// let elInput = document.querySelector('js-input');
let elEmail = document.querySelector('.js-email');
let elPassword = document.querySelector('.js-password');
let elFirstName = document.querySelector('.js-first-name');
let elLastName = document.querySelector('.js-last-name');
let elAge = document.querySelector('.js-age');

function register(last_name,frist_name,email,password,age) {
    fetch('http://localhost:9090/register', {
    method: 'POST',
    headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        "last_name":last_name,
        "frist_name":frist_name,
        "email":email, 
        "password":password,
        "age":age
    }),
    
}).then((res) => res.json()).then((data) => {
    console.log(data)
    console.log(data.token)
    console.log(data.status);
    if(data.token) {
        localStorage.setItem("token", data.token)
        window.location.replace('main.html')
    }
})
}

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    register(elLastName.value, elFirstName.value,elEmail.value,elPassword.value,elAge.value);
})

