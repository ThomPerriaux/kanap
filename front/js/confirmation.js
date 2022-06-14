let orderId = new URL(window.location.href).searchParams.get('id');

let orderNumber = document.querySelector('#orderId');
//confirmation de la commande et affichage du numero de commande
//si le n° de commande n'est pas null il s'affiche sinon il affiche un message d'excuse
function orderConfirmation (){
    if (orderId !=='undefined') {
        orderNumber.innerHTML= orderId +"  ✅ <br><br> Un email va vous parvenir dans quelques minutes avec le récapitulatif de votre commande.</br>Notez bien cette référence, elle vous sera demandée par le service client en cas de non réception de l'email.<br> Merci pour votre confiance.</br>";
        localStorage.clear();
    } else { 
        alert('Votre commande ne peut être validée. Veuillez verifier les informations du formulaire avant confirmer le panier. Si l\'issue persiste, notre Service Client se tient à votre disposition. Merci.');
        window.history.back();
}};
orderConfirmation();

