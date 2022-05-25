fetch('http://localhost:3000/api/products')
.then(response => response.json())
.catch(error => {
    alert('Le site est indisponible pour le moment. Nous nous excusons pour la gene occasionnée.')
})
.then(canapes => {
    for (let canape of canapes){

        let productLink = document.createElement('a');
        productLink.href = `product.html?id=${canape._id}`;
        document.querySelector('.items').appendChild(productLink);
               
        let productArticle = document.createElement('article');
        productLink.appendChild(productArticle);

        let productImage = document.createElement('img');
        productImage.src = canape.imageUrl;
        productImage.alt = canape.altTxt;
        productArticle.appendChild(productImage);

        let productName = document.createElement('h3');
        productName.className = ('productName');
        productName.innerHTML = canape.name;
        productArticle.appendChild(productName);
        
        let productDescription = document.createElement('p');
        productDescription.className = ('productDescription');
        productDescription.innerHTML = canape.description;
        productArticle.appendChild(productDescription);     
}});


