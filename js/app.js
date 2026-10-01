// NovaCart Product Catalog

const productContainer = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Load products from products.json
fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(error => {
        console.error("Error loading products:", error);
        productContainer.innerHTML =
            "<p>Unable to load products.</p>";
    });


// Display products
function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        let stockMessage = "";

        if (product.inventory === 0) {
            stockMessage = `<p class="out-stock">Out of Stock</p>`;
        }
        else if (product.inventory <= 10) {
            stockMessage = `<p class="low-stock">Low Stock: ${product.inventory} left</p>`;
        }
        else {
            stockMessage = `<p class="in-stock">In Stock</p>`;
        }


        productCard.innerHTML = `

            <div class="product-image">
                🛍️
            </div>

            <div class="product-info">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="sku">
                    SKU: ${product.sku}
                </p>

                <p class="description">
                    ${product.description}
                </p>

                <h4>
                    ₹${product.price.toLocaleString("en-IN")}
                </h4>

                ${stockMessage}

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                    ${product.inventory === 0 ? "disabled" : ""}
                >
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(productCard);

    });
}


function addToCart(productId) {

    fetch("data/products.json")
        .then(response => response.json())
        .then(products => {

            const product = products.find(
                item => item.id === productId
            );

            if (!product) {
                return;
            }


            let storedCart =
                JSON.parse(localStorage.getItem("novaCart")) || [];


            const existingProduct =
                storedCart.find(
                    item => item.id === productId
                );


            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                storedCart.push({

                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    price: product.price,
                    quantity: 1

                });

            }


            localStorage.setItem(
                "novaCart",
                JSON.stringify(storedCart)
            );


            cartCount.textContent =
                storedCart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );


            alert(
                product.name +
                " added to cart!"
            );

        })
        .catch(error => {

            console.error(
                "Error adding product:",
                error
            );

        });
}