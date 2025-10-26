
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { name: "Perfume For You", price: 142, unit: "apiece" },
    { name: "Perfume Nota-Fa", price: 160, unit: "apiece" },
    { name: "Perfume Laska", price: 123, unit: "apiece" },
    { name: "Perfume Sonata", price: 178, unit: "apiece" },
    { name: "Perfume Spring", price: 136, unit: "apiece" },
    { name: "Perfume Serenade", price: 140, unit: "apiece" },
    { name: "Perfume Iriska", price: 148, unit: "apiece" },
    { name: "Perfume Melody", price: 130, unit: "apiece" },
    { name: "Perfume Melody", price: 160, unit: "apiece" },
  ];

  const openOrderModal = document.getElementById("openOrderModal");
  const orderModal = document.getElementById("orderModal");
  const closeOrderModal = document.getElementById("closeOrderModal");
  const cancelOrder = document.getElementById("cancelOrder");
  const submitOrder = document.getElementById("submitOrder");
  const addToCartButton = document.getElementById("addToCart");
  const deliverySummary = document.getElementById("deliverySummary");
  const totalSummary = document.getElementById("totalSummary");
  const optionSelect = document.getElementById("option");
  const quantityInput = document.getElementById("quantity");
  const cartItemsContainer = document.getElementById("cartItems");

  let cart = [];

  function populateProductOptions() {
    if (!optionSelect) return;
    optionSelect.innerHTML = "";
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.price;
      option.textContent = `${product.name} - ${product.price} € (${product.unit})`;
      optionSelect.appendChild(option);
    });
  }

  function updateSummaries() {
    if (!deliverySummary || !totalSummary) return;
    const totalProductPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = totalProductPrice > 1000 ? 0 : totalProductPrice * 0.03;
    const totalAmount = totalProductPrice + deliveryFee;

    deliverySummary.textContent =
      deliveryFee === 0
        ? "Free shipping"
        : `Delivery: ${deliveryFee.toFixed(2)} €`;

    totalSummary.textContent = `Total amount: ${totalAmount.toFixed(2)} €`;
  }

  function renderCart() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name} (${item.quantity} шт.)</span>
        <span>${item.price * item.quantity} грн</span>
        <button class="remove-item" data-index="${index}">remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        renderCart();
      });
    });

    updateSummaries();
  }
  

  // ---- Modal logic ----
  if (openOrderModal && orderModal) {
    openOrderModal.addEventListener("click", () => {
      orderModal.style.display = "flex";
      populateProductOptions();
      updateSummaries();
    });
  }

  if (closeOrderModal) {
    closeOrderModal.addEventListener("click", () => {
      orderModal.style.display = "none";
    });
  }

  if (cancelOrder) {
    cancelOrder.addEventListener("click", () => {
      orderModal.style.display = "none";
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === orderModal) {
      orderModal.style.display = "none";
    }
  });

  // ---- Add to cart ----
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const selectedOption = optionSelect.options[optionSelect.selectedIndex];
      const quantity = parseInt(quantityInput.value, 10);

      if (quantity <= 0) {
        alert("The quantity of the product must be greater than zero.");
        return;
      }

      const product = {
        name: selectedOption.text.split(" - ")[0],
        price: parseInt(selectedOption.value, 10),
        quantity: quantity,
      };

      cart.push(product);
      renderCart();
    });
  }

  // ---- Submit order ----
  if (submitOrder) {
    submitOrder.addEventListener("click", () => {
      const name = document.getElementById("modwin-name").value;
      const phone = document.getElementById("modwin-phone").value;
      const email = document.getElementById("modwin-email").value;
      const message = document.getElementById("modwin-message").value;

      if (cart.length === 0) {
        alert("Please add items to your cart before placing an order.");
        return;
      }

      const orderSummary = cart
        .map(
          (item) =>
            `${item.name} (${item.quantity} apiece) - ${
              item.price * item.quantity
            } €`
        )
        .join("\n");

      alert(`Order successful!
Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}
Items:
${orderSummary}`);

      orderModal.style.display = "none";
      cart = [];
      renderCart();
    });
  }

  

  // ---- Accordion animation ----
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const header = item.querySelector(".accordion-header");
    if (header) {
      header.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    }
  });

  // ---- Scroll animations ----
  const animatedBlocks = document.querySelectorAll(".animated-block");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedBlocks.forEach((block) => observer.observe(block));

  // ---- Slide-in animations ----
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  });

  document
    .querySelectorAll(".slide-in-bottom, .slide-in-left, .slide-in-right")
    .forEach((el) => slideObserver.observe(el));

    
});
