// Call on click back button
let back = document.getElementById('back');
back.addEventListener("click", function (e) {
    window.location.href = "http://localhost/JWDP5/";
});

// Check if cart is empty
if ( localStorage.length == 0 ) {
    let deleteCart = document.getElementById('deleteCart');
    deleteCart.style.display = "none";

    let ul = document.getElementById('ul');

    let li = document.createElement('li');
    li.innerHTML = `<p>Vous n'avez pas de produit dans le panier</p>`;
    ul.appendChild(li);
}

// Call on click delete cart button
let delete_cart = document.getElementById('deleteCart');
delete_cart.addEventListener('click', function() {
    window.localStorage.clear();
    window.location.href = "http://localhost/JWDP5/checkout";
});

let ul = document.getElementById('ul');
let total = 0;

for (var i = 0; i < localStorage.length; i++){
    let id = JSON.parse(localStorage.getItem(localStorage.key(i))).id;
    let name = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
    let price = JSON.parse(localStorage.getItem(localStorage.key(i))).price;
    let nb = JSON.parse(localStorage.getItem(localStorage.key(i))).nb;
    let li = document.createElement('li');

    li.innerHTML = 
    `
        <p>Nom : ${name} x ${nb}  =  ${price} €</p>
    `;
    ul.append(li);
    total = total + (price * nb);
}

let totalPrice = document.getElementById('total__price');
totalPrice.textContent = total;

// Reproduction of htmlspecialchar in JS
function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

// Check if var is an email
function checkEmail(email) {
    let regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    let found = email.match(regex);
    if(found != null) {
        return email;
    } else {
        return null;
    }
}

// Check if var is a string
function checkString(string) {
    let regex = /^[a-zA-z]+$/gm;
    let found = string.match(regex);
    if(found != null) {
        return string;
    } else {
        return null;
    }
}

// Send information to confirm order
function validationForm(e){
    e.preventDefault();

    let inputs = document.getElementsByClassName('formOrder');
    let error = false;
    let contact = new Object();
    let products = new Array();

    // Use htmlspecialchar and regex to secure the data before send them
    for (var i = 0; i < inputs.length; i++) {
        let input = inputs[i].getElementsByTagName('input')[0];
        value = escapeHtml(input.value);
        if( input.name != "address") {
            if (input.type == "text") {
                let result = checkString(value);
                if(result == null) {
                    error = true;
                } else {
                    contact[input.name] = value;
                }
            }
            if (input.type == "email") {
                let result = checkEmail(value);
                if(result == null) {
                    error = true;
                } else {
                    contact[input.name] = value;
                }
            }
        } else {
            contact[input.name] = value;
        }
    }

    // Check if form is good
    if(error == false) {
        for (var i = 0; i < localStorage.length; i++){
            let id = JSON.parse(localStorage.getItem(localStorage.key(i))).id;
            let nb = JSON.parse(localStorage.getItem(localStorage.key(i))).nb;
            for (let j = 0; j < nb; nb--) {
                products.push(id);
            }
        }

        if (products.length != 0) {
            var jsonBody = {contact,products};
            jsonBody = JSON.stringify(jsonBody);

            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                    window.localStorage.clear();
                    var response = JSON.parse(this.responseText);
                    window.location.href = "http://localhost/JWDP5/payment_confirmation?id_order=" + response.orderId;
                }
            };

            let url = "http://localhost:3000/api/teddies/order";
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(jsonBody);
        } else {
            alert('Une erreur est survenue dans le formulaire');
        }
    } else {
        alert('Une erreur est survenue dans le formulaire');
    }
}