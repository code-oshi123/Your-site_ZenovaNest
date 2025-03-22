let names = document.getElementById("name");
let adds = document.getElementById("add");
let phoneint = document.getElementById("phone");
let zipint = document.getElementById("zip");
let cardint = document.getElementById("acnumber");
let monint = document.getElementById("month");
let yearint = document.getElementById("year");
let cvcint = document.getElementById("cvc");
let submit = document.getElementById("submit_btn");
let radios = document.getElementsByName('payment');


document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let total = localStorage.getItem("totalPrice") || 0;

    // alert(JSON.stringify(cart)); // Debugging: See the cart structure

    document.getElementById("totalPrice").innerText = "Total is: RS. " + total;

    let orderSummary = document.getElementById('cheak_cart');

    // Convert object into an array and loop over it
    Object.keys(cart).forEach(itemName => {
        let item = cart[itemName];

        let row = `<tr>
                    <td>${itemName}</td>
                    <td>${item.quantity}</td>
                    <td>RS. ${item.price * item.quantity}</td>
                   </tr>`;
        orderSummary.innerHTML += row;
    });
});


function sumbitt(){

    let fileds = document.querySelectorAll("#myForm input");
    let paymentm = document.querySelector('input[name = "payment"]:checked');

    // for (let filed of fileds){
    //     if (filed.value.trim() === ""){
    //         alert(`Place enter ${filed.placeholder}`)
    //         filed.focus();
    //         return;
    //     }
    // }
    for (radio of radios) {
        if (radio.checked == "card") {
            for (let filed of fileds){
                if (filed.value.trim() === ""){
                    alert("hii");
                }
            }
        }
    }

    if (!paymentm){
        alert("Place Enter a payment method");
        return
    }

//phone number validation


    let phone = phoneint.value;
    let frisnums = phone.substr(0 ,2);
    let numlenth = phone.length; //to get the lenth

    if (numlenth < 10) {
        alert("Some numbers in phone number is missing.....")
        return
    }else if(numlenth === 10){
        // alert("Number enered sucsessful")
    }else if(numlenth === 10 && frisnums !== "07"){
        alert("Phone number is starting wrong.....");
        return
    }else{
        alert(" Phone number invalid.");  
        return
    }

//Zip number validation
    let zip = zipint.value;
    let ziplenth = zip.length; //to get the lenth
    
    if (ziplenth < 5) {
        alert("Some numbers in Zipcode is missing.....");
        return
    }else if(ziplenth == 5){
        // alert("Number enered sucsessful")
    }else{
        alert("Zipcode invalid.");
        return
    }

//AC number validation
    let ac = cardint.value;
    
    // let aclenth = ac.length; //to get the lenth
    if (ac.length !== 16){
        alert("account number invalid.");
        return 
    }


//CVC number validation
    let cvc = cvcint.value;
    let cvclen = cvc.length; 
    if( cvclen == 3){
        // alert("card is valid");
    }else{
        alert("account number invalid.");
        return
    }

//Year 
    let exYear = parseInt(yearint.value);
    
    let currantyear = new Date().getFullYear();
    // alert(currantyear); 2025

    let exmon = monint.value;
    let lowermon = exmon.toLocaleLowerCase();
    // alert(lowermon); MARCH

    let monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
      ];
      
      let currentMonth = monthNames[new Date().getMonth()];
    //   alert(currentMonth);

   if (exYear < currantyear) {
        alert("card Invalid!!!!!!");
        return
    }else if (exYear > currantyear){
        // alert("card valid!!!!!!");
    }else if (!monthNames.includes(lowermon)){
        alert("Month spllings are wrong or invalid!!!!");
        return
    }else if (lowermon == currentMonth){
        alert("Card is expired!!!!!!!!!!");
        return
    }else if (lowermon < currentMonth){
        alert("Card is expired!!!!!!!!!!");
        return
    }else{
        // alert("Card is valid!!!!!!!!!!");
    }
    
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    // let name_1 = names.value;
    // let add_1 = adds.value;
    alert(`Thank you, for your purchase! Your order will be delivered to on ${deliveryDate.toDateString()}.`);
    
    alert(`Thank you, ${name_1}, for your purchase! Your order will be delivered to ${add_1} on ${deliveryDate.toDateString()}.`);

    document.getElementById("myForm").submit(); 
}


submit.addEventListener("click" , sumbitt);
