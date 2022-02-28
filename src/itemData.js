import blackTea from './assets/black-tea.jpg';
import earlGrey from './assets/earl-grey.jpg';
import GreenTea from './assets/green-tea.jpg';
import fruiteTea from './assets/fruite-tea.jpg';

export const itemData = [
    {
        name: 'blac__tea',
        tw_name: '紅茶',
        image: blackTea,
        price: 500
    },
    {
        name: 'earl__grey',
        tw_name: '伯爵茶',
        image: earlGrey,
        price: 650
    },
    {
        name: 'green__tea',
        tw_name: '綠茶',
        image: GreenTea,
        price: 500
    },
    {
        name: 'fruite__tea',
        tw_name: '水果茶',
        image: fruiteTea,
        price: 600
    }
]

export let cart = [
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
]