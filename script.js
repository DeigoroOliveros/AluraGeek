const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const buyBtn = document.getElementById("buy-btn");
const clearBtn = document.getElementById("clear-btn");

let cart = [];
let products = [];

// Función para cargar productos desde el HTML
function loadProductsFromHTML() {
  const productData = document.getElementById("product-data");
  const productElements = productData.querySelectorAll("div");

  products = Array.from(productElements).map((element) => ({
    id: parseInt(element.getAttribute("data-id")),
    name: element.getAttribute("data-name"),
    price: parseFloat(element.getAttribute("data-price")),
    image: element.getAttribute("data-image"),
    description: element.getAttribute("data-description") || "Sin descripción",
    category: element.getAttribute("data-category") || "Sin categoría",
  }));
}

// Función para renderizar productos
function renderProducts() {
  productsContainer.innerHTML = ""; // Limpiar el contenedor
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Agregar a Lista</button>
    `;

    // Asociar evento para abrir el modal al hacer clic en la imagen
    const productImage = productElement.querySelector("img");
    productImage.addEventListener("click", () => openModal(product));

    productsContainer.appendChild(productElement);
  });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  // Verificar si el producto ya está en el carrito
  const productInCart = cart.find(item => item.id === productId);

  if (productInCart) {
    // Si el producto ya está en el carrito, aumentar la cantidad
    productInCart.quantity += 1;
  } else {
    // Si el producto no está en el carrito, agregarlo con una cantidad de 1
    cart.push({ ...product, quantity: 1 });
  }

  renderCart(); // Actualizar el carrito
}

// Función para renderizar el carrito
function renderCart() {
  cartContainer.innerHTML = ""; // Limpiar el carrito

  // Si el carrito está vacío, mostrar un mensaje
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
  }

  // Renderizar los productos en el carrito
  cart.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span>${product.name} - $${product.price} x ${product.quantity}</span>
      <button onclick="removeFromCart(${product.id})">Eliminar</button>
      <button onclick="increaseQuantity(${product.id})">+</button>
      <button onclick="decreaseQuantity(${product.id})">-</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  // Actualizar el total de precios en el carrito
  updateTotalPrice();
  
}

// Función para aumentar la cantidad de un producto en el carrito
function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;  // Aumentar la cantidad
    renderCart();  // Volver a renderizar el carrito
  }
}

// Función para actualizar el total de precios
function updateTotalPrice() {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Actualizar el contenido del elemento #total-price
  const totalPriceElement = document.getElementById("total-price");
  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
}

// Función para aumentar la cantidad de un producto en el carrito
function increaseQuantity(productId) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1; // Aumentar la cantidad
    renderCart(); // Volver a renderizar el carrito
  }
}

// Función para disminuir la cantidad de un producto en el carrito
function decreaseQuantity(productId) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity -= 1; // Disminuir la cantidad
    renderCart(); // Volver a renderizar el carrito
  } else if (cartItem && cartItem.quantity === 1) {
    removeFromCart(productId); // Si llega a 1, lo eliminamos
  }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId); // Filtrar para eliminar
  renderCart(); // Actualizar la visualización del carrito
}

// Comprar y limpiar carrito
buyBtn.addEventListener("click", () => {
  alert("Gracias por tu compra!");
  cart = [];
  renderCart();
});

clearBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Inicializar el modal
// Variables para el modal
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalLink = document.getElementById("modal-link");
const closeModal = document.querySelector(".close-modal");

// Función para abrir el modal con los datos del producto
function openModal(product) {
    modalImage.src = product.image; // Configurar la imagen
    modalName.textContent = product.name; // Configurar el nombre
    modalPrice.textContent = `Precio: $${product.price}`; // Configurar el precio
    modalLink.href = product.image; // Enlace a la imagen completa

    modal.style.display = "flex"; // Mostrar el modal
}

// Evento para cerrar el modal al hacer clic en el botón de cerrar
closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Ocultar el modal
});

// Evento para cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none"; // Ocultar el modal
    }
});

// Inicializar productos desde el HTML y renderizarlos
loadProductsFromHTML();
renderProducts();

