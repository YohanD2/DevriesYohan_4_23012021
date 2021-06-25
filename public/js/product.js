
// Get number product in cart
var countCard = document.getElementById('countCard');
let nbProduct = 0;

for ( var i = 0; i < localStorage.length; i++ ){
    let nb = JSON.parse(localStorage.getItem(localStorage.key(i))).nb;
    nbProduct = nbProduct + parseInt(nb);
}
countCard.textContent = nbProduct;

// Call on click back button
let back = document.getElementById('back');
back.addEventListener("click", function (e) {
    window.location.href = "index.html";
});

// Request to display one product
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

API = "http://localhost:3000/api/teddies/" + productId;

fetch(API)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let price = document.getElementById('price');
    price.textContent = value.price;

    let description = document.getElementById('productDescription');
    description.textContent = value.description;

    let image = document.getElementById('productImg');
    image.src = value.imageUrl;
    image.alt = "Image de la peluche " + value.name;

    let title = document.getElementsByClassName('title')[0];
    title.textContent = value.name;

    let colorSelect = document.getElementById('color__select');

    value.colors.forEach(function(value){
        let opt = document.createElement('option');
        opt.value = value;
        opt.innerHTML = value;
        colorSelect.appendChild(opt);
    });

    let btn = document.getElementsByClassName('callToAction')[0];
    btn.setAttribute("onclick",`addCart('${value._id}', '${value.name}', '${value.price}');`);
  })
  .catch(function(err) {
    alert('Une erreur est survenue');
  });

// Add product in cart
function addCart(idProduct, nameProduct, priceProduct) {

    nbProduct = nbProduct + 1;
    countCard.textContent = nbProduct;

    if(window.localStorage.getItem(idProduct)){
        let nbProduct = parseInt(JSON.parse(window.localStorage.getItem(idProduct)).nb) + 1;
        const person = {
            id: idProduct,
            name: nameProduct,
            price: priceProduct,
            nb: nbProduct,
        }
        let per = JSON.stringify(person);
        localStorage.setItem(idProduct, per);
    } else {
        const person = {
            id: idProduct,
            name: nameProduct,
            price: priceProduct,
            nb: '1',
        }
        let per =  JSON.stringify(person);
        localStorage.setItem(idProduct, per);
    }
}

// Link to go in checkout page
let go_cart = document.getElementById('go_cart');
go_cart.addEventListener("click", function (e) {
    window.location.href = "checkout.html";
});