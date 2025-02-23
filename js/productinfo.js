document.addEventListener("DOMContentLoaded", function () {
    const productDetail = document.getElementById("product-detail");
    const cartIcon = document.querySelector(".header-icons a[aria-label='Your cart']");
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = cart.length;

        let cartBadge = document.querySelector(".cart-badge"); // Look for existing badge
        if (!cartBadge) {
            cartBadge = document.createElement("span");
            cartBadge.classList.add("cart-badge");
            cartIcon.appendChild(cartBadge); // Add badge inside cart link
        }
        cartBadge.textContent = cartCount > 0 ? cartCount : ""; // Show count only if > 0
    }

    async function fetchProduct() {
        try {
            const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const product = await response.json();
            displayProduct(product.data);
        } catch (error) {
            productDetail.innerHTML = "<p>Error loading product details.</p>";
        }
    }

    function displayProduct(product) {
        const sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

        productDetail.innerHTML = `
            <h1>${product.title}</h1>
            <img src="${product.image.url}" alt="${product.image.alt}" class="product-image">
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price}</p>
            <label for="size-options">Select Size:</label>
            <select id="size-options">
                ${sizeOptions}
            </select>
            <button id="add-to-cart">Add to Cart</button>
        `;

        document.getElementById("add-to-cart").addEventListener("click", function () {
            const selectedSize = document.getElementById("size-options").value;
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ id: product.id, title: product.title, price: product.price, size: selectedSize, image: product.image.url });
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();  
            window.location.href = "../html/cart.html";  
        });
    }

    fetchProduct();
    updateCartCount(); 
});
