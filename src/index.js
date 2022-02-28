import $ from 'jquery';
import './css/style.scss';
import homePageImg from './assets/homepage.jpg';
import teaImg from './assets/tea.jpg';
import { itemData, cart } from './itemData';
import shoppingCart from './assets/shopping-cart.png';
import menuIcon from "./assets/menu.png";
import githubIcon from './assets/GitHub-Mark-Light-32px.png';

let imgList = [
    {
        image: homePageImg,
        className: 'top__image',
        elementId: '.top__banner'
    },
    {
        image: teaImg,
        className: 'about__image',
        elementId: '.about'
    }
]

function createImg(imgList) {
    let newImage = imgList.map(img => {
        $(`<image src="${img.image}" class="${img.className}"/>`
        ).appendTo(img.elementId)
    })
    return newImage;
}

export function createNavBar(mainroute, subroute) {
    let content = ` <h1>Tea</h1>
                    <nav class="nav__container" >
                        <ul class="nav" >
                            <li><a href="${mainroute}#home">首頁</a></li>
                            <li><a href="${mainroute}#about">關於我們</a></li>
                            <li><a href="${mainroute}#tea">茶</a></li>
                            <div class="cart__container"><a class="cart" href="${subroute}shoppingCart.html"><img src="${shoppingCart}" alt="cart"/></a><div class="cart__quantity">${cart.length.toString()}</div></div>
                        </ul>
                    </nav>
    `;
    return content;
}

function createItemCard(data) {
    return data.map(item => {
      return    $(
                 `<div  id="${item.name}" class="card">
                    <div class="card_img"><img src="${item.image}" alt="${item.name}"/></div>
                    <div class="item__info">
                        <p class="tea__name">${item.tw_name}</p>
                        <p class="tea__price">$${item.price}</p>
                    </div>
                    <div class="purchase__option">
                        <div class="quantity__container">
                            <div class="minor">-</div>
                            <div class="quantity">0</div>
                            <div class="add">+</div>
                        </div>
                        <button class="purchase__btn">加入購物車</button>
                    </div>
                  </div>
                 `)
                .appendTo('.card__container')
    });
}

function addToCart() {
    const itemName = $(this).parents().get(1).id;
    let quantity = $(this).siblings().children('.quantity').text();

    if ( parseInt(quantity) === 0) {
        alert('沒有數量')
    } else {
        if (cart.findIndex(item => item.name === itemName) > -1) {return alert('已在購物車內')};
        cart.push(
            {
                name: itemName,
                quantity: quantity,
            }
        )
        alert('已加入購物車')
        countCartQuantity()
        quantity = $(this).siblings().children('.quantity').text('0');
    }
}

export function addQuantity() {
    const quantity = $(this).siblings('.quantity').text();
    if (parseInt(quantity) < 10) {
        let add = parseInt(quantity) + 1;
        const newQuantity = add.toString();
        return $(this).siblings('.quantity').text(newQuantity);
    } else {
        alert('已達上限');
    }
    
}

export function minorQuantity() {
    const quantity = $(this).siblings('.quantity').text();
    if (parseInt(quantity) > 0) {
        let minor = parseInt(quantity) - 1;
        const newQuantity = minor.toString();
        return $(this).siblings('.quantity').text(newQuantity);
    }
}

function countCartQuantity() {
    const cartLength = cart.length.toString();
    return $('.cart__quantity').text(cartLength);
}

function showMenu(mainroute) {
    $(`
    <div class="dropdown__menu">
        <ul class="dropdown__list">
            <li class="click"><a href="${mainroute}#home">首頁</a></li>
            <li class="click"><a href="${mainroute}#about">關於我們</a></li>
            <li class="click"><a href="${mainroute}#tea">茶</a></li>
        </ul>
    </div>
    `).appendTo('.header')
    $('.menu__icon').on('click', function() {$('.dropdown__menu').toggle()});
    $('.click').on('click', function() {$('.dropdown__menu').css('display', 'none')})
}

export function createFooter(mainroute, tagName) {
    $(`
    <div class="footer__nav">
        <ul class="footer__nav__list">
            <li><a  class="anchor" href="${mainroute}#home">首頁</a></li>
            <li><a  class="anchor" href="${mainroute}#about">關於我們</a></li>
            <li><a  class="anchor" href="${mainroute}#tea">茶</a></li>
        </ul>
    </div>
    <div class="footer__info">
        <a  class="anchor" href="https://github.com/dawnglede?tab=repositories"><img src="${githubIcon}"/></a>
    </div>
    <div class="footer__credit">
        <p class="credit__title">Credit</p>
        <a class="anchor" href="https://www.flaticon.com/free-icons/shopping-cart" title="shopping cart icons">Shopping cart icons created by Freepik - Flaticon</a>
        <a class="anchor" href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a>
        <a class="anchor" href="https://www.flaticon.com/free-icons/menu" title="menu icons">Menu icons created by Mayor Icons - Flaticon</a> 
    </div>
    `).appendTo(tagName);
}

$(function() {
    //load homepage
    createItemCard(itemData);
    createImg(imgList);
    $('#header').append(createNavBar('','./shoppingCart/'));
    $(`<div class="menu__icon"><img src="${menuIcon}"></div>`).appendTo('.header');
    showMenu('')
    createFooter('', '#footer')

    //load button function
    $('.purchase__btn').on('click', addToCart);
    $('.add').on('click', addQuantity);
    $('.minor').on('click', minorQuantity);
});

