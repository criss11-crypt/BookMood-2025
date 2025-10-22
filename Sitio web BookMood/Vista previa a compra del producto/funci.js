/* script.js
   - Contiene la variable `bookData` (simulada) que se usa para renderizar la vista del producto.
   - Controla: carga dinámica, añadir al carrito (simulado), reseñas en memoria, chatbot.
*/

/* === Datos simulados del libro (edítalos aquí) === */
const bookData = {
  id: "book_001",
  title: "La sombra del viento",
  author: "Carlos Ruiz Zafón",
  price: 18.90,
  currency: "€",
  description: `En una Barcelona secreta y literaria, un joven llamado Daniel descubre un libro que cambiará su vida.
  Una novela con misterio, intriga y homenaje a los libros.`,
  language: "ES",
  pages: 576,
  tags: ["Misterio", "Ficción", "Literatura contemporánea"],
  images: [
    "https://www.planetadelibros.com/usuaris/libros/thumbs/3f9b1e29-0591-4fc3-849b-819b4f0cca1c/d_360_620/la-sombra-del-viento_9788408163350_3d_202502191222.webp" // placeholder, sustituye por la URL real de la portada
  ]
};

/* === --- DOM references --- === */
const bookImage = document.getElementById("book-image");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPrice = document.getElementById("book-price");
const bookDescription = document.getElementById("book-description");
const bookLanguage = document.getElementById("book-language");
const bookPages = document.getElementById("book-pages");
const bookTags = document.getElementById("book-tags");
const thumbnails = document.getElementById("thumbnails");
const addToCartBtn = document.getElementById("add-to-cart");

const reviewsList = document.getElementById("reviews-list");
const reviewForm = document.getElementById("review-form");
const reviewName = document.getElementById("review-name");
const reviewText = document.getElementById("review-text");

/* Chatbot elements */
const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotBody = document.getElementById("chatbot-body");

/* Simple in-memory array de reseñas (vacío al inicio, espacio visual disponible) */
let reviews = []; // inicialmente vacío

/* === Funciones de render === */
function renderBook(data) {
  bookImage.src = data.images && data.images.length ? data.images[0] : "";
  bookImage.alt = `Portada: ${data.title}`;
  bookTitle.textContent = data.title;
  bookAuthor.textContent = data.author;
  bookPrice.textContent = `${data.currency}${data.price.toFixed(2)}`;
  bookDescription.textContent = data.description;
  bookLanguage.textContent = data.language;
  bookPages.textContent = data.pages;

  // tags
  bookTags.innerHTML = "";
  data.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    bookTags.appendChild(span);
  });

  // thumbnails (si hay)
  thumbnails.innerHTML = "";
  if (data.images && data.images.length > 1) {
    data.images.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.style.width = "68px";
      img.style.height = "92px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px";
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        bookImage.src = src;
      });
      thumbnails.appendChild(img);
    });
  }
}

/* render reseñas: si está vacío, dejamos espacio visual (no mensajes) */
function renderReviews() {
  reviewsList.innerHTML = "";
  if (reviews.length === 0) {
    // dejar espacio en blanco (puedes añadir un mensaje sutil si quieres)
    const placeholder = document.createElement("div");
    placeholder.style.minHeight = "120px";
    placeholder.style.border = "1px dashed #eee";
    placeholder.style.borderRadius = "10px";
    placeholder.style.display = "flex";
    placeholder.style.alignItems = "center";
    placeholder.style.justifyContent = "center";
    placeholder.style.color = "#bdbdbd";
    placeholder.textContent = "Aún no hay reseñas — sé el primero en escribir una.";
    reviewsList.appendChild(placeholder);
    return;
  }

  reviews.forEach(r => {
    const card = document.createElement("div");
    card.className = "review-card";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `<strong>${escapeHtml(r.name)}</strong> • <span>${new Date(r.date).toLocaleString()}</span>`;

    const text = document.createElement("div");
    text.className = "review-text";
    text.textContent = r.text;

    card.appendChild(meta);
    card.appendChild(text);
    reviewsList.appendChild(card);
  });
}

/* === Eventos === */
addToCartBtn.addEventListener("click", () => {
  // Simulación: efecto pequeño y mensaje temporal
  addToCartBtn.textContent = "Añadido ✓";
  addToCartBtn.disabled = true;
  setTimeout(() => {
    addToCartBtn.textContent = "Añadir al carrito";
    addToCartBtn.disabled = false;
  }, 1200);

  // Aquí podrías disparar evento para tu carrito real (fetch / localStorage / etc.)
  console.log(`Producto ${bookData.id} añadido (simulado).`);
});

/* Envío de reseña */
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = reviewName.value.trim();
  const text = reviewText.value.trim();
  if (!name || !text) return;

  const newReview = {
    name,
    text,
    date: new Date().toISOString()
  };

  reviews.unshift(newReview); // la agregamos al principio
  renderReviews();

  reviewForm.reset();
});

/* Chatbot toggle */
chatbotBtn.addEventListener("click", () => {
  chatbotWindow.setAttribute("aria-hidden", "false");
  chatbotInput.focus();
});
chatbotClose.addEventListener("click", () => {
  chatbotWindow.setAttribute("aria-hidden", "true");
});

/* Chatbot intercambio simple (simulado) */
chatbotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const txt = chatbotInput.value.trim();
  if (!txt) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = txt;
  chatbotBody.appendChild(userMsg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  chatbotInput.value = "";

  // Respuesta simulada (puedes integrar IA o respuestas predefinidas)
  setTimeout(() => {
    const botReply = document.createElement("div");
    botReply.className = "bot-message";
    botReply.textContent = "Gracias por tu pregunta. Si necesitas más detalles sobre este libro, puedo mostrarte el autor, la sinopsis o recomendaciones similares.";
    chatbotBody.appendChild(botReply);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }, 700);
});

/* Escape simple para prevenir inyecciones al renderizar reseñas */
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m];
  });
}

/* Inicialización */
document.addEventListener("DOMContentLoaded", () => {
  renderBook(bookData);
  renderReviews();

  // Opcional: si quieres que el logo se pueda cambiar fácilmente,
  // cambia el atributo src del #logo-img o reemplaza por texto.
  // document.getElementById('logo-img').src = 'mi-logo.png';
});


