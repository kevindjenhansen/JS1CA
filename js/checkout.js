document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalPrice = document.getElementById("total-price");
    const checkoutForm = document.getElementById("checkout-form");

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Your cart is empty.</p>";
        totalPrice.textContent = "Total: $0.00";
    } else {
        let total = 0;
        cartSummary.innerHTML = "";

        cart.forEach(item => {
            total += item.price;
            cartSummary.innerHTML += `<img src="${item.image}"> <p>${item.title} - Size: ${item.size} - $${item.price.toFixed(2)}</p>`;
        });

        totalPrice.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    }

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        alert("Order placed successfully!");

        localStorage.removeItem("cart");
        window.location.href = "./thank-you.html";
    });
});
