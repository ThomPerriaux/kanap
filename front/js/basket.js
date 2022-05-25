
//Save Cart
function saveCart (cart){
    localStorage.setItem("cart", JSON.stringify(cart)) // sauvegarde le panier et le serialise avec stringify
};

//Get Cart
function getCart(){
    let cart = localStorage.getItem("cart"); // assigne l contenu du local storage à cart
    if(cart == null){ // si le panier est vide alors retourne un tableau vide
        return [];
    } else { //sinon retourne le contenu du tableau
        return JSON.parse(cart);
    }
};

//Add to cart
function addCart(product){
    let cart = getCart(); //on recupere le panier dans le local storage

    let foundProduct = cart.find(p => p.id == product.id) // decalaration variable foundproduct -- 
    if(foundProduct != undefined){
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product); // on ajoute un produit
    }
    saveCart(cart); // on sauvegarde le nouveau panier
};

//Remove from Cart

function removeFromCart(product) {
let cart = getCart();
cart = cart.filter(p => p.id != product.id);
saveCart(cart);
};

//change quantity

function changeQty (product, quantity){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if( foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromCart(foundProduct)
        } else {
            saveCart(cart);
        }
    }
    
};

function getNumberProduct(){
    let cart = getCart();
    let number = 0;
    for (let product of cart){
        number += product.quantity;
    }
    return number;
};

function getTotalPrice(){
    let cart = getCart();
    let total = 0;
    for (let product of cart){
        total += product.quantity*product.price;
    }
    return total;
};



