/* =====================================================
   PRODUCT DATABASE
===================================================== */

/*
    ADD YOUR PRODUCTS HERE.

    You can copy an existing product and change:

    id
    name
    description
    price
    image
*/

const products = [

    {
        id: 1,

        name: "Product One",

        description:
            "This is a description of your first product.",

        price: 29.99,

        image: "images/product1.jpg"
    },


    {
        id: 2,

        name: "Product Two",

        description:
            "This is a description of your second product.",

        price: 39.99,

        image: "images/product2.jpg"
    },


    {
        id: 3,

        name: "Product Three",

        description:
            "This is a description of your third product.",

        price: 49.99,

        image: "images/product3.jpg"
    }

];


/* =====================================================
   SHOPPING CART
===================================================== */

let cart = [];


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts() {

    const productGrid =
        document.getElementById("product-grid");

    productGrid.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-price">
                    $${product.price.toFixed(2)}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;


        productGrid.appendChild(card);

    });

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();
}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(productId, change) {

    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    updateCart();
}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    updateCart();
}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    let total = 0;

    let quantityTotal = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

    }


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        quantityTotal += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    $${item.price.toFixed(2)}
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        quantityTotal;


    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");


    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");


    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


/* =====================================================
   CART BUTTONS
===================================================== */

document
    .getElementById("cart-button")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("close-cart")
    .addEventListener(
        "click",
        closeCart
    );


document
    .getElementById("cart-overlay")
    .addEventListener(
        "click",
        closeCart
    );


/* =====================================================
   PAYPAL CHECKOUT
===================================================== */

document
    .getElementById("checkout-button")
    .addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            /*
                PAYPAL WILL GO HERE.

                We will replace this alert with
                the actual PayPal checkout later.
            */

            alert(
                "PayPal checkout will be connected here."
            );

        }
    );


/* =====================================================
   START STORE
===================================================== */

displayProducts();

updateCart();
