document.addEventListener("DOMContentLoaded", function () {
    let addButtons = document.querySelectorAll(".add-button"); // Select all "Add" buttons

    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            addToCart(button); // Call addToCart function when clicked
        });
    });
});

let cart = {}; // store items
let totalPrice = 0; // to store total price

function addToCart(button) {
    let productElement = button.parentElement; //select the div
    let itemName = productElement.dataset.name; // product name
    let itemPrice = parseFloat(productElement.dataset.price); // Get price

    if (cart[itemName]) {
        cart[itemName].quantity += 1; //if item alreeady in the cart
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 }; //Add new onces
    }

    updateCart(); //to add details to cart
}


function updateCart() {
    let cartTable = document.getElementById('cart'); //Table body
    cartTable.innerHTML = ""; // Clear clear old things
    totalPrice = 0; // Update total price

    Object.keys(cart).forEach(itemName => { 
        let item = cart[itemName];
        totalPrice += item.price * item.quantity; // Calculate total price

        let row = `<tr>
                    <td>${itemName}</td>
                    <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${itemName}', this.value)"></td>
                    <td>RS. ${item.price * item.quantity}</td>
                    <td><button onclick="removeItem('${itemName}')">Remove</button></td>
                   </tr>`;
        cartTable.innerHTML += row; // Append row to cart table
    });

    document.getElementById('totalPrice').innerText = totalPrice; // 
}

function updateQuantity(itemName, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeItem(itemName); // Remove item if quantity is 0
        return;
    }
    cart[itemName].quantity = newQuantity; // Update quantity
    updateCart(); // Refresh cart
}

function removeItem(itemName) {
    delete cart[itemName]; // Remove item from cart
    updateCart(); // Refresh cart
}

let btn2 = document.getElementById("b2");


function checkout() {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totalPrice", totalPrice);
        window.location.href = "./checkout.html";
}

btn2.addEventListener("click",checkout);


// ** Save as Favorite **
function saveFavoriteOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before saving as favorite.");
        return;
    }
    localStorage.setItem("favoriteOrder", JSON.stringify(cart));
    alert("Favorite order saved successfully!");
}

document.getElementById("b1").addEventListener("click" , saveFavoriteOrder);

// ** Apply Favorite Order **
function loadFavoriteOrder() {
    let favoriteOrder = localStorage.getItem("favoriteOrder");
    if (favoriteOrder) {
        cart = JSON.parse(favoriteOrder);
        updateCart();
     }else{
        alert("No favorite order found. Please save one first.");
     }

     cart = JSON.parse(favoriteOrder);
     updateCart();
}
document.getElementById("b3").addEventListener("click" , loadFavoriteOrder);