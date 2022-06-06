const id = new URL(window.location.href).searchParams.get('id');

let productPicture; //image du canape
let productName; // nom du canape
let productPrice; // prix du canape
let productDescription; // description du canape
let productColors; // section couleurs du canape
let productColorOption; // options de couleurs 

  fetch(`http://localhost:3000/api/products/${id}`)
  .then(response => response.json())   
    
  .catch(error => { alert('Le produit est indisponible pour le moment. Nous nous excusons pour la gene occasionnée.')})
  
  .then(productDetail => {

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

    let scriptToModule = document.querySelector("script");
    
    let addToBasket = document.querySelector('#addToCart');
  
      addToBasket.addEventListener("click", (e) => { 
        addToCart();

        function addToCart() {
        
        let quantityPicked = quantity.value; // qté selectionnée
        let colorPicked = colors.value; //couleur selectionnée
        let id_Color = id + "_"+ colorPicked;
                   
         if(localStorage.getItem(id_Color)!== null){
           localStorage.setItem(id_Color,parseInt(localStorage.getItem(id_Color))+parseInt(quantityPicked))
         } else {
           localStorage.setItem(id_Color,quantityPicked)
         }}
      });
    });