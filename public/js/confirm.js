// Get url's parameter and display it

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('id_order')
const price = urlParams.get('price')

let spanOrderId = document.getElementById('orderId');
spanOrderId.textContent = orderId;

let totalPrice = document.getElementById('totalPrice');
totalPrice.textContent = price;