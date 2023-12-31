let elItemOne = document.querySelector('.js-history-item-one')
let elItemTwo = document.querySelector('.js-history-item-two')

let localData = localStorage.getItem('token');
if(!localData) {
    window.location.replace('index.html');
}
const elBtnWrapper = document.querySelector('.js-main-wrapper')

elBtnWrapper.addEventListener('click', (evt) => {
    if(evt.target.matches(".btn__main")) {
        window.location.replace('main.html')
    }
    else if(evt.target.matches(".btn__incomes")) {
        window.location.replace('incomes.html')
    }
    else if(evt.target.matches(".btn__expenses")) {
        window.location.replace('expenses.html')
    }
    else if(evt.target.matches(".btn__history")) {
        window.location.replace('history.html')
    }
})

function getIncomes() {
    fetch('http://localhost:9090/get-incomes', {
    method: "GET",
    headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
        "Content-Type": "application/json"
    },
})
.then((res) => res.json())
.then((data) => {
    data.forEach((item) => {
        console.log(item);
        
        let wrapperEl = document.createElement('div');
        wrapperEl.classList.add('d-flex','gap-2');
        let titleEl = document.createElement('p');
        titleEl.classList.add('m-0');
        titleEl.textContent = `Title: ${item.title}`
        
        let incomeEl = document.createElement('strong')
        incomeEl.classList.add('m-0')
        incomeEl.textContent =`Income: ${item.amount}`
        
        let dateEl = document.createElement('p')
        dateEl.classList.add('m-0')
        dateEl.textContent =`Date: ${item.date}`
        
        wrapperEl.append(titleEl,incomeEl,dateEl)
        elItemOne.append(wrapperEl)
        
    },data.sort((a, b) => b.id - a.id))
    // renderIncomes(data.data)
})
}
getIncomes()

function getExpenses() {
    fetch('http://localhost:9090/get-expenses', {
    method: "GET",
    headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
        'Content-Type':'application/json'
    },
})
.then((res) => res.json())
.then((data) => {
    console.log(data);
    data.forEach((item) => {
        console.log(item);
        
        let wrapperEle = document.createElement('div');
        wrapperEle.classList.add('d-flex','gap-2');
        let titleEle = document.createElement('p');
        titleEle.classList.add('m-0');
        titleEle.textContent = `Title: ${item.title}`
        
        let expensesEl = document.createElement('strong')
        expensesEl.classList.add('m-0')
        expensesEl.textContent =`Expenses: ${item.amount}`
        
        let dateEle = document.createElement('p')
        dateEle.classList.add('m-0')
        dateEle.textContent =`Date: ${item.date}`
        
        wrapperEle.append(titleEle,expensesEl,dateEle)
        elItemTwo.append(wrapperEle)
    },data.sort((a, b) => b.id - a.id))
    // renderIncomes(data.data)
})
}
getExpenses()
