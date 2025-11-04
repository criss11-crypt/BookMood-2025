document.addEventListener('DOMContentLoaded', () => {
    // Nota: El manejo del userIcon, userDropdown y logoutBtn
    // ya se hace en el archivo principal (funciones.js), 
    // pero lo incluimos por si no se carga ese archivo.

    const userIcon = document.getElementById('userIcon');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Si la barra de navegación no cargó el script principal, manejamos el dropdown aquí:
    if (userIcon && userDropdown && userIcon.getAttribute('data-handled') !== 'true') {
        userIcon.addEventListener('click', (e) => {
            e.stopPropagation(); 
            userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            // Asegura que se cierre si se hace clic fuera del menú de usuario
            if (!e.target.closest('.user-menu')) {
                 userDropdown.style.display = 'none';
            }
        });
        userIcon.setAttribute('data-handled', 'true'); // Marca como manejado
    }

    // Simulación de cierre de sesión si el script principal no está presente
    if (logoutBtn && logoutBtn.getAttribute('data-handled') !== 'true') {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Has cerrado sesión.');
            // Redirigir a login.html (asumiendo que está en la raíz)
            window.location.href = 'login.html'; 
        });
        logoutBtn.setAttribute('data-handled', 'true');
    }

    // --- Funcionalidades específicas del perfil (Ejemplo de carga dinámica) ---
    // Aquí puedes agregar funciones para cargar la lista de pedidos o la biblioteca
    // de forma dinámica si tuvieras datos del servidor.
});