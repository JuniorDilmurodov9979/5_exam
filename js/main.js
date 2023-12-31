let localData = localStorage.getItem('token');
if(!localData) {
    window.location.replace('index.html');
}

const elMainBtn = document.querySelector('.btn__main')
const elIncomesBtn = document.querySelector('.btn__incomes')
const elExpensesBtn = document.querySelector('.btn__expenses')
const elLogOutBtn = document.querySelector('.btn__log-out')
const elHistoryBtn = document.querySelector('.btn__history')
const elBtnWrapper = document.querySelector('.js-main-wrapper')
const elBtnAll = document.querySelector('.js-btn-main');
const elTotalIncomes = document.querySelector('.js-total-incomes')
const elTotalExpenses = document.querySelector('.js-total-expenses')
const elTotalBalance = document.querySelector('.js-total-balance')
const elTotalWrapper = document.querySelector('.wrapper-trans');
const elList = document.querySelector('.js-list')

let totalIncome = 0;
let totalExpenses = 0;

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
        // console.log(item);
        totalIncome += item.amount;
    })
    
})
}
getIncomes();

function getExpenses() {
    fetch('http://localhost:9090/get-expenses', {
    method: "GET",
    headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
        "Content-Type": "application/json"
    },
})
.then((res) => res.json())
.then((data) => {
    data.forEach((item) => {
        // console.log(item);
        totalExpenses += item.amount;
    })
    console.log(totalExpenses);
})
}

elTotalWrapper.addEventListener('click', (evt)=> {
    if(evt.target == elTotalIncomes) {
        let liEL = document.createElement('li')
        liEL.classList.add('list-group-item')
        let totalIncomeEl = document.createElement('strong')
        totalIncomeEl.textContent = `Total income: ${totalIncome}`;
        liEL.append(totalIncomeEl)
        elList.appendChild(liEL)
    }
    if(evt.target == elTotalExpenses) {
        let liEL = document.createElement('li')
        liEL.classList.add('list-group-item')
        let totalExpensesEl = document.createElement('strong')
        totalExpensesEl.textContent = `Total expenses: ${totalExpenses}`;
        liEL.append(totalExpensesEl)
        elList.appendChild(liEL)
    }
    if(evt.target == elTotalBalance) {
        let liEL = document.createElement('li')
        liEL.classList.add('list-group-item')
        let totalBalanceEl = document.createElement('strong')
        let totalBalance = totalIncome - totalExpenses;
        totalBalanceEl.textContent = `Total expenses: ${totalBalance}`;
        liEL.append(totalBalanceEl)
        elList.appendChild(liEL)
    }
}) 
getExpenses()


