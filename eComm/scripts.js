document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    if (cartItems) {
        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.bg-white');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));

            const itemIndex = cart.findIndex(item => item.id === productId);
            if (itemIndex === -1) {
                cart.push({ id: productId, name: productName, price: productPrice });
            } else {
                cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            if (cartItems) updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} (${item.quantity || 1})`;
            cartItems.appendChild(li);
            total += item.price * (item.quantity || 1);
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    function updateCartCount() {
        const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        if (cartCount) cartCount.textContent = count;
    }

    updateCartCount();  // Update the cart count on page load
});
