import { menuArray } from './data.js'

const menulist = document.getElementById('menu-list')
const orderDetails = document.getElementById('order-details')
const orderTotal = document.getElementById('order-total')
const compeleteOrderBtn = document.getElementById('complete-order-btn')
const orderListDiv = document.getElementById('order-list')
const cardDetails = document.getElementById('card-details')
const cardDetailsForm = document.getElementById('card-details-form')

let orderList = []
let orderPriceTotal = 0

document.addEventListener("click", function(e){
    if(e.target.dataset.name){
        handleAddBtnClick(e.target.dataset.name)
    }else if(e.target.dataset.remove){
        handleRemoveItemClick(e.target.dataset.remove)
    }else if(e.target.id === 'complete-order-btn'){
        handleCompleteOrder()
    }else if(e.target.id === "submit-pay"){
        e.preventDefault()
        handlePayClick()
    }
    render()
})

function handleAddBtnClick(itemName){
    const menuItem = menuArray.filter( item => {
        return item.name === itemName
    })[0]
    orderList.push(menuItem)
}

function handleRemoveItemClick(index){
    orderList.splice(index, 1)
}

function handleCompleteOrder(){
    cardDetails.style.display = 'inline'
}

function handlePayClick(){
    const cardForm = new FormData(cardDetailsForm)
    const fullName = cardForm.get('fullName')
    cardDetails.style.display = 'none'
    orderListDiv.innerHTML = `
    <div class="order-complete">
        <h1>Thanks, ${fullName}! Your order is on its way!</h1>
    </div>
    `
}

function getMenuItems(){
    let menulistHtml = ''

    menuArray.forEach(item => {
        menulistHtml += `
            <div class="menu-item">
                <img src="${item.image}" class="item-img"/>
                <div class="menu-item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-ingredients">${item.ingredients.join()}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <button class="add-btn" data-name="${item.name}">+</button>
            </div>
        `
    })
    return menulistHtml
}

function render(){
    orderPriceTotal = 0
    menulist.innerHTML = getMenuItems()
    let orderDetailsHtml = `<h4 class="order-header">Your order</h4>`
    if(orderList.length > 0){
        orderList.forEach(function(item, index){
            orderDetailsHtml += `
            <div class="order-item-details">
                <h4 class="order-item-name">${item.name}</h4>
                <p class="order-item-remove-btn" data-remove="${index}">remove</p>
                <p class="margin-left-auto">$${item.price}</p>
            </div>
            `
            orderPriceTotal += item.price
        })
        
        orderDetails.innerHTML = orderDetailsHtml
        orderTotal.innerHTML = `
            <h4 class="total-price-label">Total price:</h4>
            <p class="margin-left-auto">$${orderPriceTotal}</p>
        `
        orderListDiv.style.display = 'inline'
    }else{
        orderDetails.innerHTML = ''
        orderTotal.innerHTML=''
        orderListDiv.style.display = 'none'
    }
}

render()
