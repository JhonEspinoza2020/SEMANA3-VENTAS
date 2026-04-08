const btnCalcular = document.getElementById('btnCalcular');
const btnRegistrar = document.getElementById('btnRegistrar');
const inputCliente = document.getElementById('cliente');
const inputProducto = document.getElementById('producto');
const inputCantidad = document.getElementById('cantidad');
const inputPrecio = document.getElementById('precio');
const inputTotal = document.getElementById('total');

// Expresión regular: permite letras (mayúsculas/minúsculas), espacios y tildes. NO números ni símbolos.
const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

btnCalcular.addEventListener('click', function() {
    const cantidad = parseFloat(inputCantidad.value);
    const precio = parseFloat(inputPrecio.value);

    // Validar que se hayan ingresado números y que no sean negativos ni cero
    if (isNaN(cantidad) || cantidad <= 0 || isNaN(precio) || precio <= 0) {
        alert('Por favor, ingresa una cantidad y un precio válidos (mayores a 0).');
        inputTotal.value = '';
        return; 
    }

    const total = cantidad * precio;
    inputTotal.value = total.toFixed(2);
});

btnRegistrar.addEventListener('click', function() {
    const cliente = inputCliente.value.trim();
    const producto = inputProducto.value.trim();
    const cantidad = parseFloat(inputCantidad.value);
    const precio = parseFloat(inputPrecio.value);
    const total = parseFloat(inputTotal.value);

    // Validación 1: Evitar campos vacíos
    if (!cliente || !producto || isNaN(cantidad) || isNaN(precio) || isNaN(total)) {
        alert('Por favor, completa todos los campos y calcula el total antes de registrar.');
        return;
    }

    // Validación 2: El nombre del cliente no debe tener números ni caracteres raros
    if (!regexLetras.test(cliente)) {
        alert('Error: El nombre del cliente solo debe contener letras y espacios.');
        return;
    }

    // Validación 3: Evitar cantidades o precios negativos/cero
    if (cantidad <= 0 || precio <= 0) {
        alert('Error: La cantidad y el precio no pueden ser negativos ni cero.');
        return;
    }

    // Si pasa todas las validaciones, enviamos a Python
    const datos = {
        cliente: cliente,
        producto: producto,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
        total: parseFloat(total)
    };

    fetch('http://localhost:5000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        // Limpiar campos después de registrar
        inputCliente.value = '';
        inputProducto.value = '';
        inputCantidad.value = '';
        inputPrecio.value = '';
        inputTotal.value = '';
    })
    .catch(error => {
        alert('Error al conectar con el servidor Backend. ¿Está encendido Python?');
    });
});