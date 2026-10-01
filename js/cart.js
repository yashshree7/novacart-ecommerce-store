// NovaCart Shopping Cart

const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");


// Get cart from browser storage
let cart = JSON.parse(localStorage.getItem("novaCart")) || [];


// Display cart
function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart.</p>

                <a href="index.html#products" class="shop-button">
                    Continue Shopping
                </a>
            </div>
        `;

        cartCount.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    SKU: ${item.sku}
                </p>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

            </div>


            <div>

                <label>
                    Quantity:
                </label>

                <input
                    type="number"
                    min="1"
                    value="${item.quantity}"
                    onchange="updateQuantity(${index}, this.value)"
                >

            </div>


            <div>

                <strong>
                    ₹${(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>

                <button
                    class="remove-button"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    // Total section

    const totalSection = document.createElement("div");

    totalSection.classList.add("cart-total");


    totalSection.innerHTML = `

        <h2>
            Cart Total:
            ₹${total.toLocaleString("en-IN")}
        </h2>

        <button
            class="shop-button"
            onclick="goToCheckout()"
        >
            Proceed to Checkout
        </button>

    `;


    cartContainer.appendChild(totalSection);


    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
}


// Update quantity
function updateQuantity(index, quantity) {

    quantity = parseInt(quantity);


    if (quantity < 1 || isNaN(quantity)) {

        quantity = 1;

    }


    cart[index].quantity = quantity;


    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );


    displayCart();
}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );


    displayCart();
}


// Checkout
function goToCheckout() {

    window.location.href = "checkout.html";

}


// Load cart
displayCart();