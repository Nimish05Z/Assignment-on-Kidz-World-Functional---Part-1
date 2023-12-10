// // Get all the "Add" buttons
// var addButtons = document.querySelectorAll(".add-button");

// // Add click event listener to each "Add" button
// addButtons.forEach(function (button) {
//   button.addEventListener("click", function () {
//     // Get the parent div of the clicked button (which represents the book)
//     var bookDiv = button.closest(".book");
//     var bookName = bookDiv.querySelector(".book-name").textContent;
//     var authorName = bookDiv.querySelector(".author-name").textContent;
//     var price = bookDiv.querySelector(".price").textContent;

//     // Create an object with the book information
//     var bookInfo = {
//       name: bookName,
//       author: authorName,
//       price: price,
//     };

//     // Convert the object to a JSON string and store it in local storage
//     var storedBooks = JSON.parse(localStorage.getItem("cartItems")) || [];
//     storedBooks.push(bookInfo);
//     localStorage.setItem("cartItems", JSON.stringify(storedBooks));    
//   });
// });

// // Get the "Cart" element
// var cartItems = document.getElementById("cart-items");

// // Add click event listener to the "Cart" element
// cartItems.addEventListener("click", function () {
//   // Retrieve the stored items from local storage
//   var storedBooks = JSON.parse(localStorage.getItem("cartItems")) || [];
//   // Log the stored data in the console
//   console.log("Book added to cart:", bookInfo);
//   console.log("Items in the cart:", storedBooks);
// });

// Add event listener to all "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll(".add-button");
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", addToCart);
});

// Add event listener to the "Cart" button
var cartButton = document.getElementById("cart-items");
cartButton.addEventListener("click", displayCart);

// Function to handle "Add to Cart" button click
function addToCart(event) {
  var bookName = event.target.parentNode.querySelector(".book-name").textContent;
  var price = parseFloat(event.target.parentNode.querySelector(".price").textContent.slice(1));
  
  // Check if the item is already in the cart
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var existingItem = cartItems.find(item => item.bookName === bookName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      bookName: bookName,
      price: price,
      quantity: 1
    });
  }

  // Save updated cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to handle "Cart" button click
function displayCart() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    console.log("Cart is empty.");
  } else {
    cartItems.forEach(function (item) {
      console.log(`Item name: ${item.bookName} - Quantity: ${item.quantity}`);
    });

    // Calculate and display total price with cents
    var totalCents = cartItems.reduce(function (total, item) {
      return total + item.price * item.quantity * 100;
    }, 0);
    var totalDollars = totalCents / 100; // Convert cents back to dollars
    var dollars = Math.floor(totalDollars);
    var cents = Math.round((totalDollars - dollars) * 100);
    console.log(`The total amount is ${dollars}$ and ${cents} cents`);
  }
}

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
  localStorage.clear();
  console.log("Local storage cleared.");
});