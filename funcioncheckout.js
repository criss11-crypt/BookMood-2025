document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'bookmood-cart'; 
    // Función para leer el carrito de localStorage (asume estructura de carrito)
    const readCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    // CLAVE: Determina si hay algún ítem 'Físico' en el carrito.
    const isPhysicalCart = (cart) => cart.some(item => item.format && item.format.toLowerCase().includes('físico'));

    // Elementos del DOM para la navegación
    const shippingSection = document.getElementById('shipping-section');
    const paymentSection = document.getElementById('payment-section');
    const confirmationSection = document.getElementById('confirmation-section');

    const stepEnvio = document.getElementById('step-envio');
    const stepPago = document.getElementById('step-pago');
    const stepConfirmacion = document.getElementById('step-confirmacion');

    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    const digitalNotice = document.querySelector('.digital-notice');
    const backBtn = document.getElementById('backBtn');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    let isPhysical = false; 
    let shippingData = {};
    let selectedPaymentMethod = 'card';
    let currentShippingCost = 0.00;

    // ----------------------------------------------------
    // 1. Inicialización y Ruta Condicional
    // ----------------------------------------------------
    function initializeCheckout() {
        const cart = readCart();
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Redirigiendo a la tienda.');
            window.location.href = 'shop.html';
            return;
        }

        isPhysical = isPhysicalCart(cart);

        if (!isPhysical) {
            // RUTA SOLO DIGITAL: Omitir Envío (pasos 1 y 2)
            shippingSection.style.display = 'none'; // Oculta la sección de formulario
            digitalNotice.classList.remove('hidden'); // Muestra el mensaje de no envío
            
            // Re-etiquetar pasos
            stepEnvio.style.display = 'none';
            stepPago.textContent = '1. Método de Pago';
            stepConfirmacion.textContent = '2. Confirmación Final';
            
            // Configurar datos por defecto para digital
            shippingData = { name: "Digital", address: "Digital", city: "Digital", zip: "Digital", method: "Ninguno" };
            currentShippingCost = 0.00;
            
            showStep('payment'); // **SALTA DIRECTO AL PASO DE PAGO**
        } else {
            // RUTA CON FÍSICOS: Habilitar Envío
            shippingSection.style.display = 'block';
            digitalNotice.classList.add('hidden');
            showStep('shipping');
        }
    }

    // ----------------------------------------------------
    // 2. Navegación entre Pasos (Envío, Pago, Confirmación)
    // ----------------------------------------------------
    function showStep(stepName) {
        // Ocultar todas las secciones
        document.querySelectorAll('.checkout-section').forEach(section => section.classList.add('hidden'));
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));

        if (stepName === 'shipping') {
            shippingSection.classList.remove('hidden');
            stepEnvio.classList.add('active');
        } else if (stepName === 'payment') {
            paymentSection.classList.remove('hidden');
            stepPago.classList.add('active');
            // Ajustar el texto del botón Volver
            backBtn.textContent = isPhysical ? 'Volver a Envío' : 'Volver al Carrito';
        } else if (stepName === 'confirmation') {
            updateOrderSummary(); // Recalcular antes de la confirmación
            confirmationSection.classList.remove('hidden');
            stepConfirmacion.classList.add('active');
        }
    }

    // ----------------------------------------------------
    // 3. Manejo de Formularios
    // ----------------------------------------------------

    // 1. Envío -> Pago (Solo para carritos Físicos/Mixtos)
    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Guardar datos de envío y costo
        shippingData = {
            name: document.getElementById('shipName').value,
            address: document.getElementById('shipAddress1').value,
            city: document.getElementById('shipCity').value,
            zip: document.getElementById('shipZip').value,
            method: document.getElementById('shipMethod').value
        };
        const selectedOption = document.getElementById('shipMethod').options[document.getElementById('shipMethod').selectedIndex];
        currentShippingCost = parseFloat(selectedOption.getAttribute('data-price'));

        showStep('payment');
    });

    // 2. Pago -> Confirmación Final
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        selectedPaymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
        showStep('confirmation');
    });

    // Botón Volver
    backBtn.addEventListener('click', () => {
        if (isPhysical && document.getElementById('payment-section').classList.contains('hidden') === false) {
            // Si el carrito es físico y estamos en el paso de Pago, volvemos a Envío
            showStep('shipping');
        } else {
            // Si el carrito es digital, o si estamos al inicio, volvemos al carrito
            window.location.href = 'shop.html';
        }
    });
    
    // Simular mostrar/ocultar campos de tarjeta
    paymentForm.addEventListener('change', (e) => {
        if (e.target.name === 'payment_method') {
            const cardDetails = document.getElementById('cardDetails');
            if (e.target.value === 'card') {
                cardDetails.style.display = 'block';
                cardDetails.querySelectorAll('input').forEach(input => input.required = true);
            } else {
                cardDetails.style.display = 'none';
                cardDetails.querySelectorAll('input').forEach(input => input.required = false);
            }
        }
    });

    // ----------------------------------------------------
    // 4. Confirmación Final y Finalizar Pedido
    // ----------------------------------------------------
    
    function updateOrderSummary() {
        const cart = readCart();
        const list = document.getElementById('orderSummaryList');
        const summaryAddress = document.getElementById('summaryAddress');
        let subtotal = 0;
        
        // Resumen de Ítems
        let itemHtml = cart.map(item => {
            const itemSubtotal = (item.qty || 1) * (item.price || 10.00);
            subtotal += itemSubtotal;
            return `<li>**${item.title}** (${item.format || 'Digital'}) x ${item.qty || 1} - $${itemSubtotal.toFixed(2)}</li>`;
        }).join('');

        // Agregar costos y método de pago
        const finalTotal = subtotal + currentShippingCost;

        itemHtml += `<hr style="margin: 10px 0;">`;
        itemHtml += `<li>Subtotal Ítems: $${subtotal.toFixed(2)}</li>`;
        itemHtml += `<li>Costo de Envío: $${currentShippingCost.toFixed(2)}</li>`;
        itemHtml += `<li>Método de Pago: **${selectedPaymentMethod.toUpperCase()}**</li>`;
        
        list.innerHTML = itemHtml;
        document.getElementById('finalTotal').textContent = `$${finalTotal.toFixed(2)}`;

        // Resumen de Dirección (Condicional)
        if (isPhysical) {
            summaryAddress.innerHTML = `
                <p><strong>Recibe:</strong> ${shippingData.name}</p>
                <p><strong>Dirección:</strong> ${shippingData.address}, ${shippingData.city}, C.P. ${shippingData.zip}</p>
                <p><strong>Envío:</strong> ${shippingData.method.charAt(0).toUpperCase() + shippingData.method.slice(1)}</p>
            `;
        } else {
            summaryAddress.innerHTML = `<p style="color: #27ae60;">**Su carrito es 100% digital, no se requiere dirección física.**</p>`;
        }
    }

    placeOrderBtn.addEventListener('click', () => {
        // En este punto, se ejecutaría la lógica de pago real (API)
        alert('Procesando pago... (Simulación).');

        // Limpiar el carrito y redirigir
        localStorage.removeItem(CART_KEY);
        alert('✅ ¡Pedido Finalizado con éxito!');
        window.location.href = 'usuario.html?orderStatus=placed'; 
    });

    // Iniciar la lógica al cargar la página
    initializeCheckout();
});