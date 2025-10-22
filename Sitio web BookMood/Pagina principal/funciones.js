const books = [
    { title: "Libro A", author: "Autor A", genre: "Ficción", year: 2021, img: "https://via.placeholder.com/200x250", trending:true, new:true },
    { title: "Libro B", author: "Autor B", genre: "Historia", year: 2019, img: "https://via.placeholder.com/200x250", trending:false, new:false },
    { title: "Libro C", author: "Autor C", genre: "Fantasía", year: 2023, img: "https://via.placeholder.com/200x250", trending:true, new:true },
    { title: "Libro D", author: "Autor D", genre: "Suspense", year: 2022, img: "https://via.placeholder.com/200x250", trending:false, new:true },
    { title: "Libro E", author: "Autor E", genre: "Romance", year: 2023, img: "https://via.placeholder.com/200x250", trending:true, new:true },
];

// Selecciones
const catalogDiv = document.getElementById('catalog');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const trendingSection = document.getElementById('trendingSection');
const newSection = document.getElementById('newSection');

// Función para mostrar tarjetas
function displayBooks(list, container) {
    container.innerHTML = '';
    list.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => viewProduct(book.title);
        card.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.genre}</p>
                <p>${book.year}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Mostrar secciones destacadas
displayBooks(books.filter(b=>b.trending), trendingSection);
displayBooks(books.filter(b=>b.new), newSection);
displayBooks(books, catalogDiv);

// Búsqueda y orden en tiempo real
searchInput.addEventListener('input', updateBooks);
sortSelect.addEventListener('change', updateBooks);

function updateBooks() {
    const query = searchInput.value.toLowerCase();
    let filtered = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        book.year.toString().includes(query)
    );

    // Ordenar según opción
    const sortValue = sortSelect.value;
    if (sortValue === 'recent') filtered.sort((a,b)=>b.year - a.year);
    else if (sortValue === 'oldest') filtered.sort((a,b)=>a.year - b.year);
    else if (sortValue === 'trending') filtered.sort(()=>Math.random()-0.5);
    else if (sortValue === 'bestseller') filtered.sort((a,b)=>a.title.localeCompare(b.title));

    // Actualizar catálogo y secciones
    displayBooks(filtered.filter(b=>b.trending), trendingSection);
    displayBooks(filtered.filter(b=>b.new), newSection);
    displayBooks(filtered, catalogDiv);
}
let cart = []; // Array que almacena los productos del carrito

// Función para añadir un producto al carrito
function addToCart(book) {
    cart.push(book); // Añade el libro al array
    updateCartCount(); // Actualiza el número en la interfaz
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

const notifBadge = document.getElementById('notifBadge');
const recomendacionesLink = document.getElementById('recomendacionesLink');

// Simulación de detección de "nueva recomendación"
function checkForNewRecommendations() {
    // Ejemplo: supongamos que tenemos un registro de búsquedas frecuentes
    const busquedasFrecuentes = ["terror", "Stephen King", "fantasía"];

    // Simular que llegó un nuevo libro del género buscado
    const nuevoLibro = {
        titulo: "El Resplandor II",
        genero: "terror",
        autor: "Stephen King"
    };

    // Si coincide con intereses del usuario, mostramos la notificación
    const coincidencia = busquedasFrecuentes.some(
        termino =>
            nuevoLibro.genero.toLowerCase().includes(termino.toLowerCase()) ||
            nuevoLibro.autor.toLowerCase().includes(termino.toLowerCase())
    );

    if (coincidencia) {
        notifBadge.style.display = 'block';
    }
}

// Llamamos la función (en un sitio real podrías llamarla con intervalos)
checkForNewRecommendations();

// Cuando el usuario haga clic en "Recomendaciones", quitamos la notificación
recomendacionesLink.addEventListener('click', () => {
    notifBadge.style.display = 'none';
});

// Vista de producto
function viewProduct(title){
    const book = books.find(b => b.title === title);
    if(book){
        addToCart(book); // Añade al carrito
        alert(`${book.title} agregado al carrito`);
    }
}

const userIcon = document.getElementById('userIcon');
const userDropdown = document.getElementById('userDropdown');

userIcon.addEventListener('click', () => {
    userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
});

// Cierra el menú si se hace clic fuera de él
window.addEventListener('click', (event) => {
    if (!event.target.matches('.user-icon')) {
        userDropdown.style.display = 'none';
    }
});

// Botón de cerrar sesión
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Has cerrado sesión.");
    // Aquí puedes agregar tu lógica de cierre real (por ejemplo, redirección o limpieza de sesión)
});





