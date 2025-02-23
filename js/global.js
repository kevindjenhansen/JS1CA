/* Cart Count */

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".header-icons a[aria-label='Your cart']"); 
    if (!cartIcon) return; 

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = cart.length;

        let cartBadge = document.querySelector(".cart-badge"); 
        if (!cartBadge) {
            cartBadge = document.createElement("span");
            cartBadge.classList.add("cart-badge");
            cartIcon.appendChild(cartBadge); 
        }
        cartBadge.textContent = cartCount > 0 ? cartCount : ""; 
    }

    updateCartCount(); 
});
