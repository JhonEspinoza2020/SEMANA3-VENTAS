const btnCalcular = document.getElementById('btnCalcular');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnVerRegistros = document.getElementById('btnVerRegistros');
const inputCliente = document.getElementById('cliente');
const inputProducto = document.getElementById('producto');
const inputCantidad = document.getElementById('cantidad');
const inputPrecio = document.getElementById('precio');
const inputTotal = document.getElementById('total');

const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

// Evitar numeros negativos
function evitarNegativo(event) {
    if (event.key === '-') {
        event.preventDefault();
    }
}

inputCantidad.addEventListener('keydown', evitarNegativo);
inputPrecio.addEventListener('keydown', evitarNegativo);

btnCalcular.addEventListener('click', function() {
    const cantidad = parseFloat(inputCantidad.value);
    const precio = parseFloat(inputPrecio.value);

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

    if (!cliente || !producto || isNaN(cantidad) || isNaN(precio) || isNaN(total)) {
        alert('Por favor, completa todos los campos y calcula el total antes de registrar.');
        return;
    }

    if (!regexLetras.test(cliente)) {
        alert('Error: El nombre del cliente solo debe contener letras y espacios.');
        return;
    }

    if (!regexLetras.test(producto)) {
        alert('Error: El nombre del producto solo debe contener letras y espacios.');
        return;
    }

    if (cantidad <= 0 || precio <= 0) {
        alert('Error: La cantidad y el precio no pueden ser negativos ni cero.');
        return;
    }

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

// Boton Ver Registros
btnVerRegistros.addEventListener('click', function() {
    window.location.href = 'reporte.html';
});