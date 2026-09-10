/* =====================================================
   PRODUCT DATABASE

   ADD YOUR PRODUCTS HERE
===================================================== */

const products = [

    {
        id: 1,

        name: "Yamaha Water Pump Kit",

        partNumber: "6H3-W0078-00",

        manufacturer: "Yamaha",

        condition: "New",

        category: "Outboard",

        price: 89.99,

        description:
            "Complete replacement water pump kit for compatible Yamaha outboard motors. Please verify your model and part number before ordering.",

        images: [

            "images/products/water-pump-1.jpg",

            "images/products/water-pump-2.jpg",

            "images/products/water-pump-3.jpg"

        ],

        featured: true
    },


    {
        id: 2,

        name: "Stainless Steel Propeller",

        partNumber: "PROP-12345",

        manufacturer: "Example Marine",

        condition: "Used",

        category: "Propellers",

        price: 149.99,

        description:
            "Stainless steel marine propeller in good used condition. Inspect photographs carefully for condition and specifications.",

        images: [

            "images/products/propeller-1.jpg",

            "images/products/propeller-2.jpg"

        ],

        featured: true
    },


    {
        id: 3,

        name: "Marine Battery Switch",

        partNumber: "BS-1000",

        manufacturer: "Example Marine",

        condition: "New",

        category: "Electrical",

        price: 39.99,

        description:
            "Heavy-duty marine battery switch suitable for a variety of boat electrical systems.",

        images: [

            "images/products/battery-switch-1.jpg",

            "images/products/battery-switch-2.jpg"

        ],

        featured: true
    },


    {
        id: 4,

        name: "Stainless Marine Cleat",

        partNumber: "CLEAT-8",

        manufacturer: "Example Marine",

        condition: "New",

        category: "Hardware",

        price: 24.99,

        description:
            "Polished stainless steel marine cleat for dock and boat applications.",

        images: [

            "images/products/cleat-1.jpg",

            "images/products/cleat-2.jpg"

        ],

        featured: false
    }

];



/* =====================================================
   CART
===================================================== */

let cart = [];



/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "boatPartsCart",
        JSON.stringify(cart)
    );

}



/* =====================================================
   LOAD CART
===================================================== */

function loadCart() {

    const savedCart =
        localStorage.getItem(
            "boatPartsCart"
        );


    if (savedCart) {

        cart =
            JSON.parse(savedCart);

    }

}



/* =====================================================
   PRODUCT CARD
===================================================== */

function createProductCard(product) {

    return `

        <article class="product-card">

            <a
                href="product.html?id=${product.id}"
            >

                <img
                    class="product-card-image"
                    src="${product.images[0]}"
                    alt="${product.name}"
                >

            </a>


            <div class="product-card-info">

                <div class="product-card-category">

                    ${product.category}

                </div>


                <h3>

                    <a
                        href="product.html?id=${product.id}"
                    >

                        ${product.name}

                    </a>

                </h3>


                <div class="product-card-part">

                    PART # ${product.partNumber}

                </div>


                <div class="product-card-bottom">

                    <span class="product-price">

                        $${product.price.toFixed(2)}

                    </span>


                    <button
                        class="quick-add"
                        onclick="addToCart(${product.id})"
                    >

                        ADD TO CART

                    </button>

                </div>

            </div>

        </article>

    `;

}



/* =====================================================
   DISPLAY FEATURED PRODUCTS
===================================================== */

function displayFeaturedProducts() {

    const container =
        document.getElementById(
            "featured-products"
        );


    if (!container) {

        return;

    }


    const featured =
        products.filter(
            product => product.featured
        );


    container.innerHTML =
        featured
            .map(createProductCard)
            .join("");

}



/* =====================================================
   DISPLAY SHOP
===================================================== */

function displayShopProducts(
    searchTerm = "",
    category = "all"
) {

    const container =
        document.getElementById(
            "shop-products"
        );


    if (!container) {

        return;

    }


    let filteredProducts =
        products;


    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category === category
            );

    }


    if (searchTerm) {

        const search =
            searchTerm.toLowerCase();


        filteredProducts =
            filteredProducts.filter(
                product =>

                    product.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.partNumber
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.manufacturer
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(search)

            );

    }


    if (filteredProducts.length === 0) {

        container.innerHTML = `

            <p>

                No parts found.

            </p>

        `;

        return;

    }


    container.innerHTML =
        filteredProducts
            .map(createProductCard)
            .join("");

}



/* =====================================================
   PRODUCT DETAIL PAGE
===================================================== */

function displayProductPage() {

    const container =
        document.getElementById(
            "product-page"
        );


    if (!container) {

        return;

    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            params.get("id")
        );


    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {

        container.innerHTML = `

            <h1>
                Product Not Found
            </h1>

            <p>
                Sorry, this product does not exist.
            </p>

        `;

        return;

    }


    container.innerHTML = `

        <div class="product-detail">


            <div class="product-gallery">


                <div class="product-thumbnails">

                    ${product.images
                        .map(
                            (image, index) => `

                                <img

                                    class="
                                        product-thumbnail
                                        ${index === 0 ? "active" : ""}
                                    "

                                    src="${image}"

                                    alt="${product.name}"

                                    onclick="
                                        changeMainImage(
                                            '${image}',
                                            this
                                        )
                                    "

                                >

                            `
                        )
                        .join("")
                    }

                </div>


                <img

                    id="main-product-image"

                    class="product-main-image"

                    src="${product.images[0]}"

                    alt="${product.name}"

                >

            </div>



            <div class="product-detail-info">


                <div class="product-detail-category">

                    ${product.category}

                </div>


                <h1>

                    ${product.name}

                </h1>


                <div class="product-meta">

                    <div>

                        <span>
                            PART NUMBER
                        </span>

                        <strong>
                            ${product.partNumber}
                        </strong>

                    </div>


                    <div>

                        <span>
                            MANUFACTURER
                        </span>

                        <strong>
                            ${product.manufacturer}
                        </strong>

                    </div>


                    <div>

                        <span>
                            CONDITION
                        </span>

                        <strong>
                            ${product.condition}
                        </strong>

                    </div>

                </div>


                <p class="product-description">

                    ${product.description}

                </p>


                <div class="detail-price">

                    $${product.price.toFixed(2)}

                </div>


                <button

                    class="detail-add-button"

                    onclick="addToCart(${product.id})"

                >

                    ADD TO CART

                </button>


            </div>

        </div>

    `;

}



/* =====================================================
   CHANGE PRODUCT IMAGE
===================================================== */

function changeMainImage(
    image,
    thumbnail
) {

    const mainImage =
        document.getElementById(
            "main-product-image"
        );


    mainImage.src = image;


    document
        .querySelectorAll(
            ".product-thumbnail"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );


    thumbnail.classList.add("active");

}



/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {

        return;

    }


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.images[0],

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}



/* =====================================================
   REMOVE ITEM
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    updateCart();

}



/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );


    if (!item) {

        return;

    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCart();

}



/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const itemsContainer =
        document.getElementById(
            "cart-items"
        );


    const count =
        document.getElementById(
            "cart-count"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    if (!itemsContainer) {

        return;

    }


    let total = 0;

    let itemCount = 0;


    cart.forEach(
        item => {

            total +=
                item.price *
                item.quantity;

            itemCount +=
                item.quantity;

        }
    );


    count.textContent =
        itemCount;


    totalElement.textContent =
        `$${total.toFixed(2)}`;


    if (cart.length === 0) {

        itemsContainer.innerHTML = `

            <p>
                Your cart is empty.
            </p>

        `;

        return;

    }


    itemsContainer.innerHTML =

        cart.map(
            item => `

                <div class="cart-item">


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


                        <div
                            class="quantity-controls"
                        >

                            <button
                                onclick="
                                    changeQuantity(
                                        ${item.id},
                                        -1
                                    )
                                "
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                onclick="
                                    changeQuantity(
                                        ${item.id},
                                        1
                                    )
                                "
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove-button"
                            onclick="
                                removeFromCart(
                                    ${item.id}
                                )
                            "
                        >

                            REMOVE

                        </button>

                    </div>

                </div>

            `
        )
        .join("");

}



/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    const cartElement =
        document.getElementById(
            "cart"
        );


    const overlay =
        document.getElementById(
            "cart-overlay"
        );


    if (!cartElement) {

        return;

    }


    cartElement.classList.add(
        "open"
    );


    overlay.classList.add(
        "active"
    );

}



/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const cartElement =
        document.getElementById(
            "cart"
        );


    const overlay =
        document.getElementById(
            "cart-overlay"
        );


    cartElement.classList.remove(
        "open"
    );


    overlay.classList.remove(
        "active"
    );

}



/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadCart();


        updateCart();


        displayFeaturedProducts();


        displayShopProducts();


        displayProductPage();



        const cartButton =
            document.getElementById(
                "cart-button"
            );


        const closeButton =
            document.getElementById(
                "close-cart"
            );


        const overlay =
            document.getElementById(
                "cart-overlay"
            );


        if (cartButton) {

            cartButton.addEventListener(
                "click",
                openCart
            );

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeCart
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeCart
            );

        }



        const search =
            document.getElementById(
                "search"
            );


        const category =
            document.getElementById(
                "category-filter"
            );


        if (search) {

            search.addEventListener(
                "input",
                function() {

                    displayShopProducts(
                        search.value,
                        category.value
                    );

                }
            );

        }


        if (category) {

            category.addEventListener(
                "change",
                function() {

                    displayShopProducts(
                        search.value,
                        category.value
                    );

                }
            );

        }



        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                function() {

                    if (
                        cart.length === 0
                    ) {

                        alert(
                            "Your cart is empty."
                        );

                        return;

                    }


                    alert(
                        "PayPal checkout will be connected here."
                    );

                }
            );

        }

    }
);
