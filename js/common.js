const btnLogOut = document.querySelector('.btn__log-out')

btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.replace('index.html')
})