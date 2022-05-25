
for (var i = 0; i < localStorage.length; i++){
  // set iteration key name
  var key = localStorage.key(i);
   
  // use key name to retrieve the corresponding value
  var value = localStorage.getItem(key);
  
  let productDetail = retrieveProduct(key);
  
  build(productDetail, value, key.split("_")[1]);
};

async function retrieveProduct(key){
  return await fetch(`http://localhost:3000/api/products/${key.split("_")[0]}`)
  };


function build(article, quantity, color){

    fetch(`http://localhost:3000/api/products/${key.split("_")[0]}`)
  .then(response => response.json())   
    
  .catch(error => { alert('Le produit est indisponible pour le moment. Nous nous excusons pour la gene occasionnée.')})
  
  .then(cartDetail => {
  
  //<section id="cart__items">
  let cartItemSection = document.querySelector('#cart__items');

  //<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  let cartItemArticle = document.createElement('article');
  cartItemArticle.setAttribute("data-id",article._id);
  cartItemArticle.setAttribute("data-color",color); 
  cartItemArticle.classList.add('cart__item');
  cartItemSection.appendChild(cartItemArticle);

    //<div class="cart__item__img">
    let cartItemImg = document.createElement('div'); 
    cartItemImg.classList.add('cart__item__img');
    cartItemArticle.appendChild(cartItemImg);

      //<img src="../images/product01.jpg" alt="Photographie d'un canapé"></img>
      let cartItemImgTag = document.createElement('img');
      cartItemImgTag.src = cartDetail.imageUrl;
      cartItemImgTag.alt = cartDetail.altTxt;
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
        cartItemContentDescriptionName.innerHTML = cartDetail.name;
        cartItemContentDescription.appendChild(cartItemContentDescriptionName);

        //<p>Vert</p>
        let cartItemContentDescriptionColor = document.createElement('p');
        cartItemContentDescriptionColor.innerHTML = color;
        cartItemContentDescription.appendChild(cartItemContentDescriptionColor);

       //<p>42,00 €</p>
        let cartItemContentDescriptionPrice = document.createElement('p');
        cartItemContentDescriptionPrice.innerHTML =Number(cartDetail.price) + " €";
        cartItemContentDescription.appendChild(cartItemContentDescriptionPrice);

      //<div class="cart__item__content__settings">
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

        //<div class="cart__item__content__settings__delete">
        let cartItemContentSettingsDelete = document.createElement('div');
        cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

          //<p class="deleteItem">Supprimer</p>
          let cartItemContentSettingsDeleteItem = document.createElement('p');
          cartItemContentSettingsDeleteItem.innerHTML = "Supprimer";
          cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteItem);

    //<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : 
    let totalQuantity = document.querySelector('#totalQuantity');
    totalQuantity.innerHTML = quantity;
    //<span id="totalPrice"><!-- 84,00 --></span> €</p>
    let totalPrice = document.querySelector('#totalPrice');
    totalPrice.innerHTML = totalQuantity*cartItemContentDescriptionPrice;
}
  )};



    //<p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
    /*let firstNameErrorMsg = document.querySelector('#firstNameError');
    firstNameErrorMsg.innerHTML = "ceci est un message d'erreur";*/