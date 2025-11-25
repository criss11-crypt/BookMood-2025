document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.settings-nav .nav-item:not(.logout)');
    const sections = document.querySelectorAll('.settings-section');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const logoutSettingsBtn = document.getElementById('logoutSettingsBtn');
    const languageSelector = document.getElementById('languageSelector'); // Selector de idioma

    // ----------------------------------------------------
    // 0. Configuración de Idiomas (i18n)
    // ----------------------------------------------------
    const translations = {
        // Título de la página
        'title-page': { es: 'Configuración - BookMood', en: 'Settings - BookMood' },
        
        // Navegación principal (Menú superior)
        'nav-inicio': { es: 'Inicio', en: 'Home' },
        'nav-comunidad': { es: 'Comunidad', en: 'Community' },
        'nav-categorias': { es: 'Categorias', en: 'Categories' },
        'nav-recomendaciones': { es: 'Recomendaciones', en: 'Recommendations' },
        'nav-usuario': { es: 'Usuario', en: 'User' },
        'nav-carrito': { es: 'Carrito', en: 'Cart' },
        'nav-cerrar-sesion': { es: 'Cerrar sesión', en: 'Log out' },
        
        // Título principal
        'title-main': { es: 'Ajustes de la Aplicación y Cuenta', en: 'Application and Account Settings' },

        // Menú lateral de configuración
        'perfil': { es: 'Perfil y Cuenta', en: 'Profile and Account' },
        'interfaz': { es: 'Interfaz del Sitio', en: 'Site Interface' },
        'pago-envio': { es: 'Pagos y Envíos', en: 'Payments and Shipping' },
        'notificaciones': { es: 'Notificaciones', en: 'Notifications' },
        'otros': { es: 'Otras Opciones', en: 'Other Options' },
        'cerrar-sesion-btn': { es: 'Cerrar Sesión', en: 'Log Out' },

        // Sección Perfil y Cuenta
        'perfil-titulo': { es: '👤 Datos Personales y de Cuenta', en: '👤 Personal and Account Data' },
        'perfil-desc': { es: 'Actualiza tu información personal, correo electrónico y foto de perfil.', en: 'Update your personal information, email, and profile photo.' },
        'label-nombre': { es: 'Nombre Completo', en: 'Full Name' },
        'label-email': { es: 'Correo Electrónico', en: 'Email' },
        'label-visibilidad': { es: 'Visibilidad del Perfil', en: 'Profile Visibility' },
        'option-publico': { es: 'Público (Otros usuarios pueden verte)', en: 'Public (Other users can see you)' },
        'option-oculto': { es: 'Oculto (Solo tú puedes ver tu perfil)', en: 'Hidden (Only you can see your profile)' },
        'btn-guardar': { es: 'Guardar Cambios', en: 'Save Changes' },
        'pass-titulo': { es: 'Cambiar Contraseña', en: 'Change Password' },
        'label-pass-actual': { es: 'Contraseña Actual', en: 'Current Password' },
        'label-pass-nueva': { es: 'Nueva Contraseña', en: 'New Password' },
        'label-pass-confirmar': { es: 'Confirmar Nueva Contraseña', en: 'Confirm New Password' },
        'btn-actualizar-pass': { es: 'Actualizar Contraseña', en: 'Update Password' },
        'foto-titulo': { es: 'Foto de Perfil', en: 'Profile Photo' },
        'btn-subir-foto': { es: 'Subir Nueva Foto', en: 'Upload New Photo' },
        'btn-eliminar-foto': { es: 'Eliminar Foto', en: 'Delete Photo' },
        
        // Sección Pagos y Envíos
        'pago-envio-titulo': { es: '💳 Métodos de Pago y Direcciones', en: '💳 Payment Methods and Addresses' },
        'pago-envio-desc': { es: 'Administra tus tarjetas, direcciones de envío y facturación para agilizar tus compras.', en: 'Manage your cards, shipping, and billing addresses to expedite your purchases.' },
        'pago-metodos-titulo': { es: 'Métodos de Pago', en: 'Payment Methods' },
        // Listas (usan data-i18n-li)
        'pago-tarjeta-ejemplo': { es: 'Tarjeta VISA terminada en **4321**', en: 'VISA Card ending in **4321**' },
        'pago-paypal-ejemplo': { es: 'PayPal (lector.bookmood@email.com)', en: 'PayPal (lector.bookmood@email.com)' },
        'btn-editar': { es: 'Editar', en: 'Edit' },
        'btn-eliminar': { es: 'Eliminar', en: 'Delete' },
        'btn-anadir-pago': { es: '➕ Añadir Nuevo Método de Pago', en: '➕ Add New Payment Method' },
        'envio-direcciones-titulo': { es: 'Direcciones de Envío y Facturación', en: 'Shipping and Billing Addresses' },
        'envio-casa-ejemplo': { es: '**Casa:** Calle Falsa 123, Ciudad de México', en: '**Home:** 123 Falsa Street, Mexico City' },
        'envio-oficina-ejemplo': { es: '**Oficina:** Avenida Siempre Viva, Bogotá', en: '**Office:** Siempre Viva Avenue, Bogotá' },
        'btn-establecer-principal': { es: 'Establecer como principal', en: 'Set as primary' },
        'btn-anadir-direccion': { es: '➕ Añadir Nueva Dirección', en: '➕ Add New Address' },
        
        // Sección Interfaz del Sitio
        'interfaz-titulo': { es: '🎨 Interfaz del Sitio Web', en: '🎨 Website Interface' },
        'interfaz-desc': { es: 'Personaliza la apariencia y el idioma de la aplicación BookMood.', en: 'Customize the appearance and language of the BookMood application.' },
        'modo-titulo': { es: 'Modo de Pantalla', en: 'Display Mode' },
        'modo-label': { es: 'Modo Oscuro / Modo Claro', en: 'Dark Mode / Light Mode' },
        'idioma-titulo': { es: 'Idioma', en: 'Language' },
        'btn-actualizar-idioma': { es: 'Actualizar Idioma', en: 'Update Language' },

        // Sección Notificaciones
        'notificaciones-titulo': { es: '🔔 Opciones de Notificación', en: '🔔 Notification Options' },
        'notificaciones-desc': { es: 'Controla qué tipos de alertas y correos electrónicos deseas recibir.', en: 'Control what types of alerts and emails you wish to receive.' },
        'notif-email': { es: 'Notificaciones por Correo Electrónico (Ofertas y Novedades)', en: 'Email Notifications (Offers and News)' },
        'notif-pedidos': { es: 'Alertas de Estado de Pedido (Envío y Entrega)', in: 'Order Status Alerts (Shipping and Delivery)' },
        'notif-comunidad': { es: 'Notificaciones de Interacción en Comunidad', en: 'Community Interaction Notifications' },
        
        // Sección Otros
        'otros-titulo': { es: '⚙️ Términos y Soporte', en: '⚙️ Terms and Support' },
        'otros-desc': { es: 'Información legal y ayuda.', en: 'Legal information and support.' },
        'link-terminos': { es: 'Ver Términos y Condiciones de Uso', en: 'View Terms and Conditions of Use' },
        'link-privacidad': { es: 'Ver Política de Privacidad', en: 'View Privacy Policy' },
        'link-soporte': { es: 'Contáctanos para Soporte', en: 'Contact Us for Support' },
    };

    /**
     * Aplica las traducciones a los elementos de la página.
     * @param {string} lang - Código de idioma ('es' o 'en').
     */
    function setLanguage(lang) {
        document.documentElement.lang = lang; 
        localStorage.setItem('bookmood-lang', lang); 

        // 1. Traducir elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const newText = translations[key]?.[lang];
            
            if (newText) {
                const originalHTML = element.innerHTML;
                    
                // Si es un botón de navegación lateral (con ícono)
                const iconMatch = originalHTML.match(/<i[^>]*>.*?<\/i>/);
                if (iconMatch) {
                    element.innerHTML = iconMatch[0] + ' ' + newText;
                } 
                // Si es el carrito (con contador)
                else if (key === 'nav-carrito') {
                    const countMatch = originalHTML.match(/\((<span[^>]*>.*?<\/span>)\)/);
                    const countSpan = countMatch ? countMatch[1] : '0';
                    element.innerHTML = newText + ' (' + countSpan + ')';
                }
                // Si es el título de la página
                else if (key === 'title-page') {
                    document.title = newText;
                }
                // Caso general
                else {
                    element.textContent = newText;
                }
            }
        });
        
        // 2. Traducir elementos de lista con botones internos (usan data-i18n-li)
        document.querySelectorAll('[data-i18n-li]').forEach(element => {
            const key = element.getAttribute('data-i18n-li');
            const newText = translations[key]?.[lang];
            
            if (newText) {
                const actionButton = element.querySelector('.btn-accion-sm');
                if (actionButton) {
                    element.innerHTML = newText + ' ';
                    element.appendChild(actionButton);
                } else {
                    element.textContent = newText;
                }
            }
        });

        // 3. Traducir opciones de select (Visibilidad)
        document.querySelectorAll('select option').forEach(option => {
            const key = option.getAttribute('data-i18n');
            const newText = translations[key]?.[lang];
            if (newText) {
                option.textContent = newText;
            }
        });
    }

    // Carga inicial del idioma
    if (languageSelector) {
        const storedLang = localStorage.getItem('bookmood-lang') || 'es';
        languageSelector.value = storedLang;
        setLanguage(storedLang);
        
        // Evento para cambiar el idioma
        languageSelector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });

        // Evento para el botón "Actualizar Idioma" 
        const updateLangButton = document.querySelector('[data-i18n="btn-actualizar-idioma"]');
        if (updateLangButton) {
            updateLangButton.addEventListener('click', () => {
                setLanguage(languageSelector.value);
                const lang = languageSelector.value;
                alert(lang === 'es' ? 'Idioma actualizado a Español' : 'Language updated to English');
            });
        }
    }


    // ----------------------------------------------------
    // 1. Manejo de la Navegación Lateral (CORREGIDO)
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

    // Listener para los botones de navegación
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            changeSection(sectionId);
        });
    });

    // Asegura que la sección de Perfil sea la primera en mostrarse AL INICIO
    // ESTA ERA LA LÍNEA QUE FALTABA O ESTABA MAL POSICIONADA.
    changeSection('perfil'); 

    // ----------------------------------------------------
    // 2. Manejo del Modo Oscuro/Claro (Mantenido)
    // ----------------------------------------------------
    
    if (darkModeToggle) {
        // Cargar la preferencia del usuario
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
    }

    // ----------------------------------------------------
    // 3. Funcionalidad de Cerrar Sesión (Mantenido)
    // ----------------------------------------------------
    
    if (logoutSettingsBtn) {
        logoutSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = localStorage.getItem('bookmood-lang') || 'es';
            const alertMessage = lang === 'es' 
                ? 'Cerrando sesión. Serás redirigido a la página de inicio de sesión.'
                : 'Logging out. You will be redirected to the login page.';
                
            alert(alertMessage);
            window.location.href = 'login.html'; 
        });
    }

    // ----------------------------------------------------
    // 4. Manejo de formularios (Simulación de Guardado con idioma - CORREGIDO)
    // ----------------------------------------------------
    document.querySelectorAll('.setting-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulación de guardar datos del usuario
            const lang = localStorage.getItem('bookmood-lang') || 'es';
            const alertMessage = lang === 'es' 
                ? '¡Datos de usuario guardados con éxito! (Simulación)'
                : 'User data successfully saved! (Simulation)';

            alert(alertMessage);
        });
    });
});