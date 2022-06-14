//searchParam Method : recuperation de la partie après id=. Représente l'ID du produit (product.html?id=107fb5b75607497b96722bda5b504926)
const id = new URL(window.location.href).searchParams.get('id');

//-----decalaration de variables --------//
let productPicture; //image du canape
let productName; // nom du canape
let productPrice; // prix du canape
let productDescription; // description du canape
let productColors; // section couleurs du canape
let productColorOption; // options de couleurs 

//------Recuperation des elements de l'API -------------//
// recuperation des data selon l'ID
  fetch(`http://localhost:3000/api/products/${id}`)
   
  .then(response => response.json())     
    
  .catch(error => { alert('Le produit est indisponible pour le moment. Nous nous excusons pour la gene occasionnée.')})
  
  .then(productDetail => {
    //recuperation des details du produit

    //insertion de l'image correspondant à l'id
    productPicture = document.createElement('img');
    productPicture.src = productDetail.imageUrl;
    productPicture.alt = productDetail.altTxt;
    document.querySelector('.item__img').appendChild(productPicture);
    
    //insertion du nom correspondant à l'id
    productName = productDetail.name;
    document.querySelector('#title').innerHTML=productName;
    
    //insertion du prix correspondant à l'id
    productPrice = productDetail.price;
    document.querySelector('#price').innerHTML=productPrice;
    
    //insertion de la description correspondant à l'id
    productDescription = productDetail.description;
    document.querySelector('#description').innerHTML=productDescription;

    //selection du container #colors
    productColors = document.querySelector('#colors');

    //pour chaque element couleurs present dans la promesse : creation d'une balise option & creation
    //d'un element avec le nom de la couleur et sa valeur
      productDetail.colors.forEach((color) => {
      productColorOption = document.createElement("option");
      productColorOption.innerHTML = `${color}`;
      productColorOption.value = `${color}`;
      productColors.appendChild(productColorOption);
    });
   
    let addToBasket = document.querySelector('#addToCart');
  
      addToBasket.addEventListener("click", (e) => { 
        addToCart();

        //Fonction d'ajout au panier
        function addToCart() {
        
        let quantityPicked = quantity.value; // qté selectionnée
        let colorPicked = colors.value; //couleur selectionnée
        let id_Color = id + "_"+ colorPicked; //concatenation de l'id et de la couleur avant envoie dans le local storage
               
         if(localStorage.getItem(id_Color)!== null){
           localStorage.setItem(id_Color,parseInt(localStorage.getItem(id_Color))+parseInt(quantityPicked));
           alert('Vous venez d\'ajouter '+ quantityPicked +' ' + productName + " de couleur "+ colorPicked);
           } else {
           localStorage.setItem(id_Color,quantityPicked)
         }};
      });
    });