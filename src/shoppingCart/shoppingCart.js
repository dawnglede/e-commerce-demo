import $ from 'jquery';
import '../css/style.scss';
import { createNavBar, addQuantity, minorQuantity, createFooter } from '../index';
import deleteIcon from '../assets/delete.png';
import blackTea from '../assets/black-tea.jpg';
import GreenTea from '../assets/green-tea.jpg';

let cart = [
    {
        name: 'blac__tea',
        tw_name: '紅茶',
        image: blackTea,
        price: 500,
        quantity: 1
    },
    {
        name: 'green__tea',
        tw_name: '綠茶',
        image: GreenTea,
        price: 500,
        quantity: 2
    }
];

function loadCartItem() {
    let cartCard = cart.map(item => {
        return $(`
        <div class="cart__card">
            <div class="cart__card__img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div id="${item.name}" class="cart__card__name">${item.tw_name}</div>
            <div class="cart__card__price">$${item.price}</div>
            <div class="cart__card__quantity">
                <div class="cart__card__minor border">-</div>
                <div class="quantity">${item.quantity}</div>
                <div class="cart__card__add border">+</div>
            </div>
            <div class="cart__card__sub__total">$${item.quantity*item.price}</div>
            <div class="delete"><img src="${deleteIcon}" /></div>
        </div>
        `).appendTo('.cart__card__container')
    })

    return cartCard;
}

function countTotal() {
    if (cart.length === 0) return $('.total__quantity').text('0');
    const count = cart.map(item => item.quantity*item.price);
    const total = count.reduce((a,b) => a+b);
    const totalString = total.toString()
    return $('.total__quantity').text(totalString);
}

function deleteItem() {
    const deleteItem = $(this).siblings('.cart__card__name').text();
    cart = cart.filter(item => item.tw_name != deleteItem)
    countTotal()
    countCartQuantity()
    noItem()
    $(this).parents().get(0).remove();
}

function noItem() {
    if (cart.length === 0) {
        return $('<p class="no__item">購物車內無商品</p>').appendTo('.cart__card__container')
    }
}

function countCartQuantity() {
    const cartLength = cart.length.toString();
    return $('.cart__quantity').text(cartLength);
}

function countSubTotal() {
    //const className = target.innerHTML === '+'? '.cart__card__add': '.cart__card__minor';
    const quantity = $(this).siblings('.quantity').text();
    const itemName = $(this).parent().siblings('.cart__card__name').attr('id');
    const order = cart.findIndex(item => item.name === itemName)
    if (order  >-1) {
        cart[order].quantity = parseInt(quantity);
    }

   const subTotal = cart[order].quantity * cart[order].price;
   //console.log(quantity);
   const subTotalTag = $(this).parent().siblings('.cart__card__sub__total');
   countTotal();
   return subTotalTag.text(`$${subTotal.toString()}`)
    
}

$(function() {
    $('#cart-header').append(createNavBar('../index.html', ''))
    createFooter('../index.html', '#cart-footer')
    noItem()
    loadCartItem()
    countTotal()
    $('.cart__card__add').on('click', addQuantity);
    $('.cart__card__minor').on('click', minorQuantity);
    $('.delete').on('click', deleteItem);
    /*$('.cart__card__container').on('click', function(e) {
        let target = e.currentTarget;
        //if (target.innerHTML != '+' && '-') return;
        countSubTotal(target);

    })*/
    $('.cart__card__minor').on('click', countSubTotal);
    $('.cart__card__add').on('click', countSubTotal);


});

