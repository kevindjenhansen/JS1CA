document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutCta = document.getElementById("checkout-cta");


    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "";
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <p><strong>${item.title}</strong></p>
                    <p>Size: ${item.size}</p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        updateCartDisplay();
    });
    
    checkoutCta.addEventListener("click", function () {
        window.location.href = "checkout.html";
    });
    
    updateCartDisplay();
});
