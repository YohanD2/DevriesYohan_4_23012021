// Get number product in cart

var countCard = document.getElementById('countCard');
let nbProduct = 0;

for (var i = 0; i < localStorage.length; i++){
    let nb = JSON.parse(localStorage.getItem(localStorage.key(i))).nb;
    nbProduct = nbProduct + parseInt(nb);
}
countCard.textContent = nbProduct;

// Link to go in checkout page
let go_cart = document.getElementById('go_cart');
go_cart.addEventListener("click", function (e) {
    window.location.href = "http://localhost/JWDP5/checkout";
});

// Call on click back button
let back = document.getElementById('back');
back.addEventListener("click", function (e) {
window.location.href = "http://localhost/JWDP5/";
});

// Request to display one product
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        let price = document.getElementById('price');
        price.textContent = response.price;

        let description = document.getElementById('productDescription');
        description.textContent = response.description;

        let image = document.getElementById('productImg');
        image.src = response.imageUrl;
        image.alt = "Image de la peluche " + response.name;

        let title = document.getElementsByClassName('title')[0];
        title.textContent = response.name;

        let colorSelect = document.getElementById('color__select');

        response.colors.forEach(function(value){
            let opt = document.createElement('option');
            opt.value = value;
            opt.innerHTML = value;
            colorSelect.appendChild(opt);
        });

        let btn = document.getElementsByClassName('callToAction')[0];
        btn.setAttribute("onclick",`addCart('${response._id}', '${response.name}', '${response.price}');`);
    }
}
let url = "http://localhost:3000/api/teddies/" + productId;
request.open("GET", url);
request.send();


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