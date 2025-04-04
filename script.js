document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart and total price from localStorage
  let storedCart = localStorage.getItem("cart");
  let storedTotalPrice = localStorage.getItem("totalprice");

  window.cart = storedCart ? JSON.parse(storedCart) : {};
  window.totalprice = storedTotalPrice ? parseFloat(storedTotalPrice) : 0;

  updateCart(); // Display cart on load

  // Fetch data from the JSON file
  fetch("products.json")
      .then(response => response.json())
      .then(data => {
          // Load products into respective sections
          loadProducts(data.processors, "processor-list");
          loadProducts(data.graphics, "graphics-list");
          loadProducts(data.motherboard, "motherboard-list");
          loadProducts(data.memory, "memory-list");
          loadProducts(data.Storage, "Storage-list");
      })
      .catch(error => console.error("Error loading JSON:", error));

  // Ensure buttons exist before adding event listeners
  const checkoutBtn = document.getElementById("b2");
  if (checkoutBtn) {
      checkoutBtn.addEventListener("click", checkout);
  }

  const saveFavoriteBtn = document.getElementById("b1");
  if (saveFavoriteBtn) {
      saveFavoriteBtn.addEventListener("click", saveFavoriteOrder);
  }

  const loadFavoriteBtn = document.getElementById("b3");
  if (loadFavoriteBtn) {
      loadFavoriteBtn.addEventListener("click", loadFavoriteOrder);
  }
});

// Function to create and display products
function loadProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear existing content

  products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;

      const name = document.createElement("h3");
      name.textContent = product.name;

      const price = document.createElement("p");
      price.textContent = `Price: RS.${product.price}`;

      const button = document.createElement("button");
      button.textContent = "Add to Cart";
      button.addEventListener("click", function () {
          addToCart(product.name, product.price);
      });

      productCard.appendChild(img);
      productCard.appendChild(name);
      productCard.appendChild(price);
      productCard.appendChild(button);
      container.appendChild(productCard);
  });
}

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
  if (cart[itemName]) {
      cart[itemName].quantity += 1;
  } else {
      cart[itemName] = { price: itemPrice, quantity: 1 };
  }

  totalprice += itemPrice;
  updateCart();
}

// Function to update the cart UI
function updateCart() {
  let cartTable = document.getElementById("cart"); // Table body
  if (!cartTable) return; // Prevents errors if cart table is missing
  cartTable.innerHTML = ""; // Clear old items
  totalprice = 0; // Reset total price

  Object.keys(cart).forEach(itemName => {
      let item = cart[itemName];
      totalprice += item.price * item.quantity;

      let row = `<tr>
                  <td>${itemName}</td>
                  <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${itemName}', this.value)"></td>
                  <td>RS. ${item.price * item.quantity}</td>
                  <td><button onclick="removeItem('${itemName}')">Remove</button></td>
                 </tr>`;
      cartTable.innerHTML += row;
  });

  document.getElementById("totalprice").innerText = `Total: RS. ${totalprice}`;

  // Store cart and total price in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalprice", totalprice);
}

// Function to update item quantity
function updateQuantity(itemName, newQuantity) {
  if (newQuantity > 0) {
    cart[itemName].quantity = newQuantity; // Update quantity
    updateCart(); // Refresh cart
} else {
    removeItem(itemName); // Remove item if quantity is 0
    alert("Invalid input");
}

  cart[itemName].quantity = quantity;
  updateCart();
}

// Function to remove an item from the cart
function removeItem(itemName) {
  delete cart[itemName];
  updateCart();
}

// Checkout function
function checkout() {
  if (totalprice === 0) {
      alert("Your cart is empty!");
      return;
  }
  // Store data before redirecting
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalprice", totalprice);
  window.location.href = "./checkout.html";
}

// Save Favorite Order
function saveFavoriteOrder() {
  if (totalprice === 0) {
      alert("Your cart is empty! Add items before saving as favorite.");
      return;
  }
  localStorage.setItem("favoriteOrder", JSON.stringify(cart));
  alert("Favorite order saved successfully!");
}

// Apply Favorite Order
function loadFavoriteOrder() {
  let favoriteOrder = localStorage.getItem("favoriteOrder");
  if (favoriteOrder) {
      cart = JSON.parse(favoriteOrder);
      updateCart();
  } else {
      alert("No favorite order found. Please save one first.");
  }
}
