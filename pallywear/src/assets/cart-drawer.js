class CartDrawer extends HTMLElement {
    constructor() {
        super();
        this.addEventListener("keyup", (evt) => evt.code === "Escape" && this.close());
        this.querySelector("#CartDrawer-Overlay").addEventListener("click", this.close.bind(this));

        const closeBtn = document.querySelector("#drawerCloseBtn");
        if (closeBtn) {
            closeBtn.addEventListener("click", this.close.bind(this));
        }

        this.setHeaderCartIconAccessibility();
    }

    setHeaderCartIconAccessibility() {
        const cartLink = document.querySelector("#cart-icon-bubble");
        if (!cartLink) return;

        cartLink.setAttribute("role", "button");
        cartLink.setAttribute("aria-haspopup", "dialog");

        cartLink.addEventListener("click", (event) => {
            event.preventDefault();
            this.open(cartLink);
        });

        cartLink.addEventListener("keydown", (event) => {
            if (event.code.toUpperCase() === "SPACE") {
                event.preventDefault();
                this.open(cartLink);
            }
        });
    }

    open(triggeredBy) {
        const isCartPage = document.querySelector("cart-items");
        if (isCartPage) return;

        if (triggeredBy) this.setActiveElement(triggeredBy);

        setTimeout(() => {
            this.classList.add("animate", "active", "is-open");
        });

        this.addEventListener(
            "transitionend",
            () => {
                const containerToTrapFocusOn = this.classList.contains("is-empty")
                    ? this.querySelector(".drawer-inner-empty")
                    : document.getElementById("CartDrawer");
                const focusElement =
                    this.querySelector(".drawer-close") || this.querySelector(".drawer-inner");
                trapFocus(containerToTrapFocusOn, focusElement);
            },
            { once: true }
        );

        document.body.classList.add("cart-drawer-quick-view");
        if (window.matchMedia("(min-width: 768px)").matches) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "4px";
        }

        const animatedElements = this.querySelectorAll("[data-aos]");
        animatedElements.forEach((el) => el.classList.add("aos-animate"));
    }

    close() {
        this.classList.remove("active", "is-open");
        removeTrapFocus(this.activeElement);

        document.body.classList.remove("cart-drawer-quick-view");
        if (window.matchMedia("(min-width: 768px)").matches) {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
            document.body.style.overflowX = "hidden";
        }

        const animatedElements = this.querySelectorAll(".aos-animate");
        animatedElements.forEach((el) => el.classList.remove("aos-animate"));
    }

    renderContents(parsedState) {
        this.querySelector(".drawer-inner").classList.remove("is-empty");
        this.productId = parsedState.id;

        this.getSectionsToRender().forEach((section) => {
            const sectionElement = section.selector
                ? document.querySelector(section.selector)
                : document.getElementById(section.id);

            if (sectionElement) {
                sectionElement.innerHTML = this.getSectionInnerHTML(
                    parsedState.sections[section.id],
                    section.selector
                );
            }
        });

        // ✅ Recalculate Subtotal with Printing Cost
        setTimeout(() => {
            let printingCostTotal = 0;

            document.querySelectorAll(".cart-item").forEach((item) => {
                const printingCost = parseInt(item.dataset.printingCost || 0);
                const quantityInput = item.querySelector('[name="updates[]"]');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

                printingCostTotal += printingCost * quantity;
            });

            const subtotalElement = document.querySelector(".cart-subtotal-price");
            if (subtotalElement) {
                const originalSubtotal = parseFloat(subtotalElement.dataset.originalSubtotal || 0);
                subtotalElement.textContent = `₹${(originalSubtotal + printingCostTotal).toFixed(2)}`;
            }

            this.open();
        });
    }

    getSectionInnerHTML(html, selector = ".shopify-section") {
        return new DOMParser().parseFromString(html, "text/html").querySelector(selector).innerHTML;
    }

    getSectionsToRender() {
        return [
            { id: "cart-drawer", selector: "#CartDrawer" },
            { id: "cart-icon-bubble" },
        ];
    }

    setActiveElement(element) {
        this.activeElement = element;
    }
}

customElements.define("cart-drawer", CartDrawer);

class CartDrawerItems extends CartItems {
    getSectionsToRender() {
        return [
            { id: "CartDrawer", section: "cart-drawer", selector: ".drawer-inner" },
            { id: "cart-icon-bubble", section: "cart-icon-bubble", selector: ".shopify-section" },
        ];
    }
}

customElements.define("cart-drawer-items", CartDrawerItems);
