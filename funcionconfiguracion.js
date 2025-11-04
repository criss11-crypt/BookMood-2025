document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.settings-nav .nav-item:not(.logout)');
    const sections = document.querySelectorAll('.settings-section');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const logoutSettingsBtn = document.getElementById('logoutSettingsBtn');
    
    // ----------------------------------------------------
    // 1. Manejo de la Navegación Lateral (Mostrar/Ocultar secciones)
    // ----------------------------------------------------
    
    function changeSection(sectionId) {
        // Oculta todas las secciones
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Desactiva todos los botones de navegación
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Muestra la sección activa
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        // Activa el botón de navegación
        const activeNavButton = document.querySelector(`.settings-nav .nav-item[data-section="${sectionId}"]`);
        if (activeNavButton) {
            activeNavButton.classList.add('active');
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            changeSection(sectionId);
        });
    });

    // Asegura que la sección de Perfil sea la primera en mostrarse
    changeSection('perfil'); 

    // ----------------------------------------------------
    // 2. Manejo del Modo Oscuro/Claro
    // ----------------------------------------------------
    
    // Cargar la preferencia del usuario (simulada con localStorage)
    const currentMode = localStorage.getItem('bookmood-mode');
    if (currentMode === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('bookmood-mode', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('bookmood-mode', 'light');
        }
    });

    // ----------------------------------------------------
    // 3. Funcionalidad de Cerrar Sesión
    // ----------------------------------------------------
    
    if (logoutSettingsBtn) {
        logoutSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Implementa tu lógica de cierre de sesión aquí
            alert('Cerrando sesión. Serás redirigido a la página de inicio de sesión.');
            // Redirigir a login.html (asumiendo que está en la raíz)
            window.location.href = 'login.html'; 
        });
    }

    // ----------------------------------------------------
    // 4. Manejo de formularios (Simulación)
    // ----------------------------------------------------
    document.querySelectorAll('.setting-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Ajustes guardados con éxito! (Simulación)');
            // En una aplicación real, aquí enviarías los datos al servidor
        });
    });
});