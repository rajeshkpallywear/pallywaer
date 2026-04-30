document.addEventListener("DOMContentLoaded", function () {
    const cartForm = document.querySelector("#cart");
    const subtotalElement = document.querySelector(".cart-subtotal-price");
    const cartItemRows = document.querySelectorAll(".cart-item");
    const liveRegion = document.querySelector("#cart-live-region-text");

    function calculateSubtotal() {
        let total = 0;

        cartItemRows.forEach((row) => {
            const quantityInput = row.querySelector(".quantity-input");
            const quantity = parseInt(quantityInput.value, 10);
            const price = parseFloat(
                row.querySelector(".cart-item-line strong").textContent.replace("₹", "")
            );
            const printingCost =
                parseFloat(row.dataset.printingCost || 0) * quantity || 0;

            total += price + printingCost;
        });

        // Update subtotal text
        if (subtotalElement) {
            subtotalElement.textContent = `₹${total.toFixed(2)}`;
            subtotalElement.setAttribute("data-original-subtotal", total.toFixed(2));
        }

        // Update live region for accessibility
        if (liveRegion) {
            liveRegion.textContent = `Cart updated. New total: ₹${total.toFixed(2)}`;
        }
    }

    function updateCart(variantId, quantity) {
        fetch("/cart/change.js", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: variantId,
                quantity: quantity,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                calculateSubtotal();
            })
            .catch((err) => console.error("Cart update error:", err));
    }

    // Quantity change listeners
    document.querySelectorAll(".quantity-button").forEach((button) => {
        button.addEventListener("click", function () {
            const input = this.closest(".quantity").querySelector(".quantity-input");
            const variantId = input.dataset.quantityVariantId;
            let quantity = parseInt(input.value, 10);

            if (this.name === "plus") {
                quantity++;
            } else if (this.name === "minus" && quantity > 1) {
                quantity--;
            }

            input.value = quantity;
            updateCart(variantId, quantity);
        });
    });

    // Direct input change listener
    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", function () {
            const variantId = this.dataset.quantityVariantId;
            const quantity = parseInt(this.value, 10);
            updateCart(variantId, quantity);
        });
    });

    // Initial calculation
    calculateSubtotal();
});
