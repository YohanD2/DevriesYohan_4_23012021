
// Get number product in cart
var countCard = document.getElementById('countCard');
let nbProduct = 0;
for (var i = 0; i < localStorage.length; i++){
    let nb = JSON.parse(localStorage.getItem(localStorage.key(i))).nb;
    nbProduct = nbProduct + parseInt(nb);
}
countCard.textContent = nbProduct;

fetch("http://localhost:3000/api/teddies/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    var parent = document.getElementsByClassName('content__homeBox--main')[0];

    value.forEach(element => {
         let t = document.createElement('div');
            t.classList.add("content__homeBox--center");
            t.innerHTML = 
            `
            <div class="homeBox">
                <div class="homeBox__visual">
                    <img src="${element.imageUrl}" alt="Description de l'objet">
                    <button class="see__description" onclick="seeDescription('${element._id}')" >
                        <p>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.8889 3.11111V24.8889H3.11111V3.11111H24.8889ZM26.6 0H1.4C0.622222 0 0 0.622222 0 1.4V26.6C0 27.2222 0.622222 28 1.4 28H26.6C27.2222 28 28 27.2222 28 26.6V1.4C28 0.622222 27.2222 0 26.6 0ZM12.4444 6.22222H21.7778V9.33333H12.4444V6.22222ZM12.4444 12.4444H21.7778V15.5556H12.4444V12.4444ZM12.4444 18.6667H21.7778V21.7778H12.4444V18.6667ZM6.22222 6.22222H9.33333V9.33333H6.22222V6.22222ZM6.22222 12.4444H9.33333V15.5556H6.22222V12.4444ZM6.22222 18.6667H9.33333V21.7778H6.22222V18.6667Z" fill="white"/>
                                </svg>
                                Fiche produit
                        </p>
                    </button>
                </div>
                <div class="homeBox__description">
                    <p>
                        ${element.name}
                    </p>
                    <p class="strong">
                        ${element.price} €
                    </p>
                    <span class="addCart" onclick="addCart('${element._id}', '${element.name}', '${element.price}')">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 8H12V5H15V3H12V0H10V3H7V5H10V8ZM6 17C4.9 17 4.01 17.9 4.01 19C4.01 20.1 4.9 21 6 21C7.1 21 8 20.1 8 19C8 17.9 7.1 17 6 17ZM16 17C14.9 17 14.01 17.9 14.01 19C14.01 20.1 14.9 21 16 21C17.1 21 18 20.1 18 19C18 17.9 17.1 17 16 17ZM6.17 13.75L6.2 13.63L7.1 12H14.55C15.3 12 15.96 11.59 16.3 10.97L20.16 3.96L18.42 3H18.41L17.31 5L14.55 10H7.53L7.4 9.73L5.16 5L4.21 3L3.27 1H0V3H2L5.6 10.59L4.25 13.04C4.09 13.32 4 13.65 4 14C4 15.1 4.9 16 6 16H18V14H6.42C6.29 14 6.17 13.89 6.17 13.75Z" fill="#8F5BFE"/>
                            </svg>
                            
                    </span>
                </div>
            </div>
            `;
            parent.append(t);
    });
  })
  .catch(function(err) {
    alert('Une erreur est survenue');
  });

// Call on click to go in selected product page
function seeDescription(idProduct) {
    window.location.href = "product.html?id=" + idProduct;
}

// Add a product in cart
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
        let per = JSON.stringify(person);
        localStorage.setItem(idProduct, per);
    }
}

// Link to go in checkout page
let go_cart = document.getElementById('go_cart');

go_cart.addEventListener("click", function (e) {
    window.location.href = "checkout.html";
});