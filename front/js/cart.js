/****Recuperer les données *****/

//parcourir le localStorage
localStorageLoop();

//fonction qui parcourt le localStorage pour y recuperer les clés & valeurs
function localStorageLoop() {

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i); //key = clé de stockage (ID + COLOR)
        var value = parseInt(localStorage.getItem(key)); //récuperer la valeur des clés et les transformer en nombre
        let promiseDetail = retrieveProduct(key);
        var kanapColor = key.split("_")[1]; // kanapColor = PARTIE DROITE DE LA CLE => COULEUR SELECTIONNEE
        build(promiseDetail, value, kanapColor, key);
    };
};

//recupere les produits grace à l'iD
async function retrieveProduct(key) {
    return await fetch(`http://localhost:3000/api/products/${key.split("_")[0]}`)
};

//initialisation de la variable total servant à calculer le prix total
var total = 0;

/****Traiter les données *****/

//construction de la promesse avec en paramètres Promise Detail/quantity/color/key
function build(promiseDetail, quantity, color, key) {

    promiseDetail

        .then(response => response.json())

        .catch(error => {
            alert('Le produit est indisponible pour le moment. Nous nous excusons pour la gene occasionnée.')
        })

        .then(inCartProduct => {

            //<section id="cart__items"> 
            let cartItemSection = document.querySelector('#cart__items');

            //<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            let cartItemArticle = document.createElement('article');
            cartItemArticle.setAttribute("data-id", inCartProduct._id);
            cartItemArticle.setAttribute("data-color", color);
            cartItemArticle.classList.add('cart__item');
            cartItemSection.appendChild(cartItemArticle);

            //<div class="cart__item__img">
            let cartItemImg = document.createElement('div');
            cartItemImg.classList.add('cart__item__img');
            cartItemArticle.appendChild(cartItemImg);

            //<img src="../images/product01.jpg" alt="Photographie d'un canapé"></img>
            let cartItemImgTag = document.createElement('img');
            cartItemImgTag.src = inCartProduct.imageUrl;
            cartItemImgTag.alt = inCartProduct.altTxt;
            cartItemImg.appendChild(cartItemImgTag);

            //<div class="cart__item__content">
            let cartItemContent = document.createElement('div');
            cartItemContent.classList.add('cart__item__content');
            cartItemArticle.appendChild(cartItemContent);

            //<div class="cart__item__content__description">
            let cartItemContentDescription = document.createElement('div');
            cartItemContentDescription.classList.add('cart__item__content__description');
            cartItemContent.appendChild(cartItemContentDescription);

            //<h2>Nom du produit</h2>
            let cartItemContentDescriptionName = document.createElement('h2');
            cartItemContentDescriptionName.innerHTML = inCartProduct.name;
            cartItemContentDescription.appendChild(cartItemContentDescriptionName);

            //<p>Vert</p>
            let cartItemContentDescriptionColor = document.createElement('p');
            cartItemContentDescriptionColor.innerHTML = color;
            cartItemContentDescription.appendChild(cartItemContentDescriptionColor);

            //<p>42,00 €</p>
            let cartItemContentDescriptionPrice = document.createElement('p');
            let unitPrice = parseInt(inCartProduct.price);
            cartItemContentDescriptionPrice.innerHTML = unitPrice + " €";
            cartItemContentDescription.appendChild(cartItemContentDescriptionPrice);

            let cartItemContentSettings = document.createElement('div');
            cartItemContentSettings.classList.add('cart__item__content__settings');
            cartItemContent.appendChild(cartItemContentSettings);

            //<div class="cart__item__content__settings__quantity">
            let cartItemContentSettingsQuantity = document.createElement('div');
            cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            //<p>Qté : </p>
            let cartItemContentSettingsQuantityQuantity = document.createElement('p');
            cartItemContentSettingsQuantityQuantity.innerHTML = "Qté : ";
            cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityQuantity);

            //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"></input>
            let cartItemContentSettingsQuantityQuantityInput = document.createElement('input');
            cartItemContentSettingsQuantityQuantityInput.type = Number;
            cartItemContentSettingsQuantityQuantityInput.classList.add('itemQuantity');
            cartItemContentSettingsQuantityQuantityInput.name = ('itemQuantity');
            cartItemContentSettingsQuantityQuantityInput.min = '1';
            cartItemContentSettingsQuantityQuantityInput.max = '100';
            cartItemContentSettingsQuantityQuantityInput.value = quantity;

            cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityQuantityInput);


            /*****changement quantité****/
            cartItemContentSettingsQuantityQuantityInput.addEventListener("change", () => {

                if (cartItemContentSettingsQuantityQuantityInput.value > 0) {
                    localStorage.setItem(key, cartItemContentSettingsQuantityQuantityInput.value);
                    totalQuantity.innerHTML = quantityGrandTotal();
                    cartItemSection.innerHTML = "";
                    localStorageLoop();
                } else {
                    alert('La quantité ne peut être egale à 0');
                };
                location.reload();
            });

            //<div class="cart__item__content__settings__delete"> 
            let cartItemContentSettingsDelete = document.createElement('div');
            cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

            //<p class="deleteItem">Supprimer</p>
            let cartItemContentSettingsDeleteItem = document.createElement('p');
            cartItemContentSettingsDeleteItem.innerHTML = "Supprimer";
            cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteItem);

            /*****suppression article****/
            cartItemContentSettingsDeleteItem.addEventListener("click", () => {

                let ok = confirm("Etes vous sûr de vouloir supprimer " + inCartProduct.name + " " + color + " ?");
                if (ok) {
                    localStorage.removeItem(key);
                    cartItemSection.innerHTML = "";
                    localStorageLoop();
                    alert(inCartProduct.name + " " + color + " " + "a été supprimé");
                    location.reload();
                    return true;
                } else {
                    alert(inCartProduct.name + " " + color + " " + "n'a pas été supprimé");
                };
                return false;
            });

            //<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : 
            let totalQuantity = document.querySelector('#totalQuantity');
            totalQuantity.innerHTML = quantityGrandTotal();

            //<span id="totalPrice"><!-- 84,00 --></span> €</p>
            let totalPrice = document.querySelector('#totalPrice');
            total = total + (inCartProduct.price * quantity);
            totalPrice.innerHTML = total;

        })
};

//calcul de la quantité totale (fonction utilisée ligne 118 & 156 )
function quantityGrandTotal() {
    let sumQty = 0;
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i); //key = clé de stockage (ID + COLOR)
        sumQty += Number(localStorage.getItem(key));
    };
    return sumQty;
};

//Formulaire

let form = document.querySelector('.cart__order__form');

//Test Prénom

let firstName = form.firstName;
let firstNameRegExp = /[a-zA-Z\-]+$/;

firstName.addEventListener('change', function() {
    let firstNameInput = firstName.value;
    let inputOutcome = firstName.nextElementSibling;
    if (firstNameRegExp.test(firstNameInput)) {
        inputOutcome.innerHTML = '✅ Prénom valide ';
    } else {
        inputOutcome.innerHTML = '⚠️ Prénom non valide. Le prénom ne doit pas comporter de chiffres ou de caractères spéciaux.';
        firstName.value = "";
    }
});

//nom

let lastName = form.lastName;
let lastNameRegExp = /[a-zA-Z\-]+$/;

lastName.addEventListener('change', function() {
    let lastNameInput = lastName.value;
    let inputOutcome = lastName.nextElementSibling;
    if (lastNameRegExp.test(lastNameInput)) {
        inputOutcome.innerHTML = '✅ Nom valide ';
    } else {
        inputOutcome.innerHTML = '⚠️ Nom non valide. Il ne doit pas y avoir de chiffres. ';
        lastName.value = "";
    };
});

//adresse

let address = form.address;
let addressRegExp = /^[\S].*$/gm;

address.addEventListener('change', function() {
    let addressInput = address.value;
    let inputOutcome = address.nextElementSibling;
    if (addressRegExp.test(addressInput)) {
        inputOutcome.innerHTML = '✅ Adresse valide ';
    } else {
        inputOutcome.innerHTML = '⚠️ Adresse non valide.';
        address.value = "";
    }
});

//city

let city = form.city;
let cityRegExp = /(([\w']*)([- ]{1})?)*/gm;

city.addEventListener('change', function() {
    let cityInput = city.value;
    let inputOutcome = city.nextElementSibling;
    if (cityRegExp.test(cityInput)) {
        inputOutcome.innerHTML = '✅ Ville valide ';
    } else {
        inputOutcome.innerHTML = '⚠️ Ville non valide.';
        city.value = "";
    }
});

//email

let email = form.email;
let emailRegExp = /^[\w]+[\.]?[\w]+[@]{1}[\w]+[.]{1}[a-z]{2,10}$/g;

email.addEventListener('change', function() {
    let emailInput = email.value;
    let inputOutcome = email.nextElementSibling;
    if (emailRegExp.test(emailInput)) {
        inputOutcome.innerHTML = '✅ Email valide ';
    } else {
        inputOutcome.innerHTML = '⚠️ Email non valide : doit être au format ww@yy.zz';
        email.value = "";
    }
});

let orderBtn = document.querySelector('#order');
orderBtn.addEventListener('click', function() {

    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    let products = [];

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i); //key = clé de stockage (ID + COLOR)
        var kanapId = key.split("_")[0]; // kanapId = PARTIE GAUCHE DE LA CLE => ID PRODUIT
        products.push(kanapId);
    };

    let commande = {
        contact: contact,
        products: products
    };
    console.log(commande);

    const options = {
        method: 'POST',
        body: JSON.stringify(commande),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    };
    //envoi post//

    fetch('http://localhost:3000/api/products/order', options)
        .then(response => response.json())
        .catch(error => {
            alert('Une erreur s\'est produite. Nous nous excusons pour la gene occasionnée.')
        })
        .then(order => {
            document.location.href = `confirmation.html?id=${order.orderId}`;
        })

});