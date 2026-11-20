
const products = [
    {
        name: "Dragon articulé",
        description: "Dragon imprimé en 3D avec articulations.",
        price: 12,
        image: "images/produits/dragon.jpg"
    },
    {
        name: "Porte-clés personnalisé",
        description: "Un porte-clés unique à ton image.",
        price: 4,
        image: "images/produits/portecles.jpg"
    },
    {
        name: "Support de téléphone",
        description: "Un support pratique et moderne.",
        price: 8,
        image: "images/produits/support.jpg"
    },
    {
        name: "Figurine 3D",
        description: "Une figurine décorative originale.",
        price: 10,
        image: "images/produits/figurine.jpg"
    }
];

let cart = [];

const productList = document.getElementById("product-list");

products.forEach((product, index) => {
    productList.innerHTML += `
        <article class="product-card">
            <img src="${product.image}"
                 alt="${product.name}"
                 onerror="this.style.display='none'">

            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">${product.price.toFixed(2)} €</div>

            <button onclick="addToCart(${index})">
                Ajouter au panier
            </button>
        </article>
    `;
});

function addToCart(index) {
    const existing = cart.find(item => item.index === index);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            index,
            quantity: 1
        });
    }

    updateCart();
}

function removeFromCart(index) {
    cart = cart.filter(item => item.index !== index);
    updateCart();
}

function updateCart() {
    const container = document.getElementById("cart-items");

    container.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const product = products[item.index];

        total += product.price * item.quantity;
        count += item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${product.name}</strong>
                    <p>${item.quantity} × ${product.price.toFixed(2)} €</p>
                </div>

                <button onclick="removeFromCart(${item.index})">
                    Supprimer
                </button>
            </div>
        `;
    });

    if (cart.length === 0) {
        container.innerHTML = "<p>Ton panier est vide.</p>";
    }

    document.getElementById("cart-total").textContent =
        "Total : " + total.toFixed(2) + " €";

    document.getElementById("cart-count").textContent = count;
}

function showOrderForm() {
    if (cart.length === 0) {
        alert("Ton panier est vide !");
        return;
    }

    document.getElementById("commande").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const message = document.getElementById("customer-message").value.trim();

    if (!name || !email || cart.length === 0) {
        alert("Vérifie les informations de ta commande.");
        return;
    }

    const details = cart.map(item => {
        const product = products[item.index];

        return `${product.name} x${item.quantity} : ${
            (product.price * item.quantity).toFixed(2)
        } €`;
    }).join("\n");

    const total = cart.reduce((sum, item) => {
        return sum + products[item.index].price * item.quantity;
    }, 0);

    const subject = encodeURIComponent("Commande EWDU77 3D STORE");

    const body = encodeURIComponent(
        `Bonjour,\n\nClient : ${name}\nEmail : ${email}\n\n` +
        `Commande :\n${details}\n\nTotal : ${total.toFixed(2)} €\n\n` +
        `Message : ${message}`
    );

    window.location.href =
        "mailto:ewdu77.ewdu77@gmail.com?subject=" + subject + "&body=" + body;
});

updateCart();
