let elTitle = document.querySelector('.js-title')
let elAmount = document.querySelector('.js-amount')
let elCategory = document.querySelector('.js-category')
let elDesc = document.querySelector('.js-desc')
let elDate = document.querySelector('.js-date')
let elJsWrapper = document.querySelector('.js-wrapper-form')
const elBtnWrapper = document.querySelector('.js-main-wrapper')
let elListIncomes = document.querySelector('.js-incomes-list');
let elListWrapper = document.querySelector('.incomes-list-wrapper')
let arr = [];


let localData = localStorage.getItem('token');
if(!localData) {
    window.location.replace('index.html');
}

function incomes(title,amount,category,desc,date) {
    fetch('http://localhost:9090/add-income', {
    method:'POST',
    headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
        'Content-Type' : "application/json"
    },
    body: JSON.stringify({
        "title": title,
        "amount":amount,
        "category":category, 
        "description":desc,
        "date":date,
    }),
})
.then((res) => res.json())
.then((data) => {
    console.log(data)
    arr = [...data.data]
    
    renderIncomes(data.data, elListIncomes)
    
    
    
    
    if(!data.data.length) {
        fetch(`http://localhost:9090/delete-income/${data.data.length ? data.data.at(-1).id : 1}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res) 
    .then(data => {
        console.log(data);
        
    })
}
})

}
elListWrapper.addEventListener('click', (evt) => {
    let valueDeleteBtn = evt.target.matches('.delete-btn')
    
    // console.log(data.data);
    if(valueDeleteBtn) {
        let listItem = evt.target.closest('.list-group-item');
        if(listItem) {
            let deletedIncomes = evt.target.dataset.id;                
            let deletedIncomesIndex = arr.findIndex((item) => item.id == deletedIncomes);
            if (deletedIncomesIndex !== -1) {
                arr.splice(deletedIncomesIndex, 1);
                renderIncomes(arr, elListIncomes);
            }
            
        }            
        
    }
})

elJsWrapper.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    if(elTitle.value.length > 30) {
        alert('Maximum 30 words in the title')
        elTitle.classList.add("border", 'border-danger')
        return
    }
    else if(!isNaN(elAmount)) {
        alert('Please enter the number')
        elAmount.classList.add('border', 'border-danger')
        return
    }
    else if(elCategory.value.length > 30) {
        alert('Maximum 30 words')
        elCategory.classList.add('border', 'border-danger')
        return
    }
    
    incomes(elTitle.value, elAmount.value,elCategory.value,elDesc.value,elDate.value)
    renderIncomes(arr, elListIncomes)
    
})

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


function renderIncomes(array, node) {
    node.innerHTML = "";
    
    array.forEach((item) => {
        console.log(item);
        
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex align-items-center gap-3 flex-wrap";
        
        // listItem.innerHTML = `
        // <strong class="m-0">${item?.title}</strong>
        // <p class="m-0 px-2 border-css">Amount: ${item?.amount}$</p>
        // <p class="m-0">Category: ${item?.category}</p>
        // <strong class="my-auto ms-auto">${item?.date}</strong>
        // <p class="m-0 ">Desc: ${item?.description}</p>
        // <button class= "btn btn-danger delete-btn" data-id="${item.id}">Delete</button>
        // `;
        
        let titleEl = document.createElement('strong');
        titleEl.classList.add('m-0')
        titleEl.textContent = item?.title
        
        let amountEl = document.createElement('p') 
        amountEl.classList.add('m-0', 'px-2' , 'border-css')
        amountEl.textContent = `Amount: ${item?.amount}$`
        
        let categoryEl = document.createElement('strong');
        categoryEl.classList.add('m-0')
        categoryEl.textContent =`Purpose: ${item?.category}`
        
        let dateEl = document.createElement('strong')
        dateEl.classList.add('my-auto', 'ms-auto')
        dateEl.textContent = `Date: ${elDate.value.trim()}`
        
        let descEl = document.createElement('p')
        descEl.classList.add('m-0')
        descEl.textContent = `Description: ${item.description}`
        
        let btnDelete = document.createElement('button')
        btnDelete.classList.add('btn', 'btn-danger', 'delete-btn')
        btnDelete.setAttribute('data-id', item.id)
        btnDelete.textContent = 'DELETE'
        
        let plus = 1
        console.log(plus++);
        elTitle.value = '';
        elAmount.value = '';
        elCategory.value = '';
        elDesc.value = '';
        elDate.value = '';
        
        listItem.append(titleEl,amountEl,categoryEl,descEl,dateEl,btnDelete)
        
        node.appendChild(listItem);
    }) 
}