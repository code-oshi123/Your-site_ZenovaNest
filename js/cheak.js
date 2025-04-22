let names = document.getElementById("name");
let adds = document.getElementById("add");
let dis_in = document.getElementById("dis");
let zipint = document.getElementById("zip");
let cardint = document.getElementById("acnumber");
let monint = document.getElementById("month");
let yearint = document.getElementById("year");
let cvcint = document.getElementById("cvc");
let submit = document.getElementById("submit_btn");
let radios = document.getElementsByName('payment');
let phoneint = document.getElementById("phone");

let deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 3);
    
let cart = JSON.parse(localStorage.getItem("cart")) || {};
let total = localStorage.getItem("totalprice") || 0;

document.getElementById("totalprice").innerText = "Total is: RS. " + total;

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
    
let cashOnDelivery = document.getElementById("c1");
let cardPayment = document.getElementById("c2");
let cardDetails = document.querySelectorAll(".card-info"); // Select all card fields

function toggleCardDetails() {
        if (cashOnDelivery.checked) {
            cardDetails.forEach(el => el.style.display = "none"); // Hide card fields
            // submit.addEventListener("click" , sub_2);
        } else if(cardPayment.checked){
            cardDetails.forEach(el => el.style.display = "block"); // Show card fields
            // submit.addEventListener("click" , sumbitt);
        }
}

cashOnDelivery.addEventListener("change", toggleCardDetails);
cardPayment.addEventListener("change", toggleCardDetails);
toggleCardDetails();

function sumbit_btn_fun(e){
    e.preventDefault();

    if (cashOnDelivery.checked) {
        sub_2();
    } else if (cardPayment.checked) {
        sumbitt();
    } else {
        alert("Please select a payment method!");
    }
}
submit.addEventListener("click" , sumbit_btn_fun);

phoneint.addEventListener('input', function () {
    // Remove all non-digit characters
    this.value = this.value.replace(/\D/g, '');
    
    // Enforce max 16 digits just in case
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
    });
      
    cardint.addEventListener('input', function () {
    // Remove all non-digit characters
    this.value = this.value.replace(/\D/g, '');
    
    // Enforce max 16 digits just in case
    if (this.value.length > 16) {
        this.value = this.value.slice(0, 16);
    }
    });
    
    zipint.addEventListener('input', function () {
        // Remove all non-digit characters
        this.value = this.value.replace(/\D/g, '');
      
        // Enforce max 16 digits just in case
        if (this.value.length > 10) {
          this.value = this.value.slice(0, 10);
        }
      });
    
    cvcint.addEventListener('input', function () {
        // Remove all non-digit characters
        this.value = this.value.replace(/\D/g, '');
      
        // Enforce max 16 digits just in case
        if (this.value.length > 10) {
          this.value = this.value.slice(0, 10);
        }
      });

// submit.addEventListener("click", function (e) {
//     e.preventDefault();

//     if (cashOnDelivery.checked) {
//         sub_2();
//     } else if (cardPayment.checked) {
//         sumbitt();
//     } else {
//         alert("Please select a payment method!");
//     }
// });

function sub_2(){
    let name_1 = names.value;
    if (name_1 == ""){
        alert("enter your name!!");
        return
    }
    let add_1 = adds.value;
    if (add_1 == ""){
        alert("enter your address!!");
        return
    }

    let dis_int = dis_in.value;
    if (dis_int == ""){
        alert("enter your distric!!");
        return
    }

    //phone number validation
    let phone = phoneint.value;
    let frisnums = phone.substr(0 ,2);
    let numlenth = phone.length; //to get the lenth

    if (numlenth < 10) {
        alert("Some numbers in phone number is missing.....")
        // alert(numlenth);
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

    let zip_1 = zipint.value;
    let ziplenth = zip_1.length; //to get the lenth
    // alert(ziplenth );

    if (ziplenth < 3 || ziplenth > 5 ) {
        alert("Some numbers in Zipcode is missing or over.....(Enter number which have 3,4,5 numbers)");
        return;
    }else{
        // alert("Number enered sucsessful");
    }

    alert(`Thank you, ${name_1}, for your cash on dilivary purchase! Your order will be delivered to ${add_1} on ${deliveryDate.toDateString()}.`);
    document.getElementById("myForm").submit(); 
}

function sumbitt(){  
    // let fileds = document.querySelectorAll("#myForm input");
    
    // for (let filed of fileds){
    //     if (filed.value.trim() === ""){
    //         alert(`Place enter ${filed.placeholder}`)
    //         filed.focus();
    //         return;
    //     }
    // }

    let name_2 = names.value;
    if (name_2 == ""){
        alert("enter your name!!");
        return
    }
    let add_2 = adds.value;
    if (add_2 == ""){
        alert("enter your address!!");
        return
    }

    let dis_int_1 = dis_in.value;
    if (dis_int_1 == ""){
        alert("enter your distric!!");
        return
    }

    let paymentm = document.querySelector('input[name = "payment"]:checked');
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
    if (ziplenth < 3 || ziplenth > 5 ) {
        alert("Some numbers in Zipcode is missing or over.....(Enter number which have 3,4,5 numbers)");
        return;
    }else{
        // alert("Number enered sucsessful");
    }

//AC number validation
    let ac = cardint.value;
    
    // let aclenth = ac.length; //to get the lenth
    if (ac.length !== 16){
        alert("account number invalid.(Enter correct account number with 16 nummbers.)");
        return 
    }


//CVC number validation
    let cvc = cvcint.value;
    let cvclen = cvc.length; 
    if( cvclen == 3){
        // alert("card is valid");
    }else{
        alert("cvc number invalid.");
        return
    }

//Year 
    let exYear = parseInt(yearint.value);
    // alert(exYear); //entered one
    
    let currantyear = new Date().getFullYear();
    // alert(currantyear); //2025

    let exmon = monint.value;
    let lowermon = exmon.toLocaleLowerCase(); 

    let monthNames = [
        "january", "february", "march", "april", "may", "june","july", "august", "september", "october", "november", "december"
      ];
      
    let monthmonth  = monthNames.indexOf(lowermon);
    // alert(monthmonth);

    let currentMonth = monthNames[new Date().getMonth()];
    let currntmonthin  = monthNames.indexOf(currentMonth);
    // alert(currntmonthin);
      

    if (exYear < currantyear) {
        alert("card expired!!!!!!!!!!");
        return;
    }else if (exYear > currantyear){
        // alert("card valid!!!!!!");
        if (!monthNames.includes(lowermon)){
            alert("Month spllings are wrong or invalid!!!!");
            return;
        }else{
            // alert("Card is valid!!!!!!!!!!");
        }
    }else if (exYear === currantyear){
        if (!monthNames.includes(lowermon)){
            alert("Month spllings are wrong or invalid!!!!");
            return;
        }else if (monthmonth <= currntmonthin){
            alert("Card is expired!!!!!!!!!!");
            return;
        }else{
            // alert("Card is valid!!!!!!!!!!");
        }
    }

    alert(`Thank you, ${name_2}, for your card payment purchase! Your order will be delivered to ${add_2} on ${deliveryDate.toDateString()}.`);
    document.getElementById("myForm").submit(); 
}






 
