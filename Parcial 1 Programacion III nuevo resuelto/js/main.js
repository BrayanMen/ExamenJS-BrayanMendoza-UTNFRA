// Ejercicio 1 _____________ 0.5 puntos
// Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:

const frutas = [
    {
        id: 1,
        nombre: 'Anana',
        precio: 15,
        imagen: 'img/anana.jpg',
    },
    {
        id: 2,
        nombre: 'Arandano',
        precio: 8,
        imagen: 'img/arandano.jpg',
    },
    {
        id: 3,
        nombre: 'Banana',
        precio: 2,
        imagen: 'img/banana.jpg',
    },
    {
        id: 4,
        nombre: 'frambuesa',
        precio: 10,
        imagen: 'img/frambuesa.png',
    },
    {
        id: 5,
        nombre: 'Frutilla',
        precio: 7,
        imagen: 'img/frutilla.jpg',
    },
    {
        id: 6,
        nombre: 'Kiwi',
        precio: 15,
        imagen: 'img/kiwi.jpg',
    },
    {
        id: 7,
        nombre: 'mandarina',
        precio: 4,
        imagen: 'img/mandarina.jpg',
    },
    {
        id: 8,
        nombre: 'Manzana',
        precio: 6,
        imagen: 'img/manzana.jpg',
    },
    {
        id: 9,
        nombre: 'Naranja',
        precio: 10,
        imagen: 'img/naranja.jpg',
    },
    {
        id: 10,
        nombre: 'Pera',
        precio: 40,
        imagen: 'img/pera.jpg',
    },
    {
        id: 11,
        nombre: 'Pomelo Amarillo',
        precio: 20,
        imagen: 'img/pomelo-amarillo.jpg',
    },
    {
        id: 12,
        nombre: 'Pomelo Rojo',
        precio: 30,
        imagen: 'img/pomelo-rojo.jpg',
    },
    {
        id: 13,
        nombre: 'Sandia',
        precio: 50,
        imagen: 'img/sandia.jpg',
    },
];

let carrito = [];

// Ejercicio 2 _____________ 0.5 puntos
// Modifica la función inicializadora init() para incluir una función que imprima tu nombre y apellido en el <nav> del HTML
// y también en la consola.
// Pasos:
// • Crea un objeto alumno con tus datos (dni, nombre, apellido).
const datos = {
    dni: 95943339,
    nombre: 'Brayan',
    apellido: 'Mendoza',
};
// • Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto.

// • Imprimí tu nombre y apellido en el <nav> y en la consola.
// • Todo esto debe ser parte de la funcion imprimirDatosAlumno()
function imprimirDatosAlumno(datos) {
    let navbarDatos = document.querySelector('.nombreAlumno');
    let navbarDatosHTML = `
    <p>Nombre Completo: ${datos.nombre} ${datos.apellido}</p>
    `;
    navbarDatos.innerHTML += navbarDatosHTML;
    console.log(`DNI: ${datos.dni}, Nombre: ${datos.nombre}, ${datos.apellido}`);
}

// Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de
// init()

function mostrarProductos(arr) {
    let productos = document.querySelector('.contenedor-productos');
    let listaProductos = '';
    if (!arr.length) {
        listaProductos += `<p>
        No hay productos por ahora...
        </p>`;
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const producto = arr[i];
        listaProductos += `
        <div class="card-producto">
            <img src=${producto.imagen} alt=${producto.nombre}>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarProducto(${producto.id})">Agregar al carrito</button>
        </div>
        `;
    }
    productos.innerHTML = listaProductos;
}

// Ejercicio 4 _____________ 1 punto
// Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el campo de texto.
function buscadorProductos() {
    let barraBusqueda = document.querySelector('.barra-busqueda');

    barraBusqueda.addEventListener('keyup', () => {
        let valorInput = barraBusqueda.value.toLowerCase().trim();

        let productoFiltrado = frutas.filter(p => p.nombre.toLowerCase().includes(valorInput));
        console.log(productoFiltrado);

        mostrarProductos(productoFiltrado);
    });
}

// Ejercicio 5 _____________ 2 puntos
// 1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe
// mostrarse por console.log()

function agregarProducto(id) {
    let productoExistente = frutas.find(f => f.id === id);
    if (!productoExistente) {
        console.error('El producto no puede agregarse');
    }

    let productoEnCarrito = validarProductoEnCarrito(productoExistente.id);

    if (!productoEnCarrito) {
        let agregarFruta = {
            ...productoExistente, //Agrego todo lo que tengo en cada frutas
            cantidad: 1, //Y le agrega la cantidad
        };
        carrito.push(agregarFruta);
    } else {
        productoEnCarrito.cantidad++;
    }
    actualizarCarrito();
    console.log(carrito);
}

function validarProductoEnCarrito(id) {
    return carrito.find(c => c.id === id);
}

// 2. Incorporar la funcion mostrarCarrito() asociada al boton de cada elemento del carrito El HTML generado debe
// seguir esta estructura:
// <li class="bloque-item">
// <p class="nombre-item">nombreProducto - precioProducto</p>
// <button class="boton-eliminar">Eliminar</button>
// </li>

function mostrarCarrito() {
    let itemsCarritoLocal = atraparDatosEnCarrito('carrito');

    let divCarrito = document.querySelector('#items-carrito');

    let itemsEnCarrito = '';

    if (!itemsCarritoLocal.length) {
        divCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }

    for (let i = 0; i < itemsCarritoLocal.length; i++) {
        const item = itemsCarritoLocal[i];
        itemsEnCarrito += `
        <li class="bloque-item">
            <img src=${item.imagen} alt=${item.nombre}>
            <p class="nombre-item">${item.nombre} - ${item.precio}</p>
            <p>${item.cantidad}</p>
            <p>${item.cantidad * item.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${item.id})">Eliminar</button>
        </li>
        `;
    }
    divCarrito.innerHTML = itemsEnCarrito;
}
// 3. Incorporar la funcion eliminarProducto() . Este debe estar asociado al boton del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(c => c.id !== id);
    actualizarCarrito();
}

// Ejercicio 6 _____________ 1 punto
// • Almacena los productos del carrito en localStorage .
function cargarDatosEnLocalStorage(nombreArrLocal, arrDatos) {
    localStorage.setItem(nombreArrLocal, JSON.stringify(arrDatos));
}
function atraparDatosEnCarrito(nombreArrLocal) {
    let items = localStorage.getItem(nombreArrLocal);
    return items ? JSON.parse(items) : [];
}
// • Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan
// eliminado del carrito
// • Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina
function actualizarCarrito() {
    cargarDatosEnLocalStorage('carrito', carrito);
    mostrarCarrito();
    totalCarritoPrecio();
    contadorCarrito();
}

// Ejercicio 7 _____________ 1 punto
// • Implementa un contador de números de productos del carrito. Si hay 0 productos se eliminan del carrito.
// • Actualiza la cantidad de productos en el header en la parte de Carrito: 0 productos
function contadorCarrito() {
    let contador = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    let contadorCarrito = document.getElementById('contador-carrito');
    contadorCarrito.textContent = contador;
}
// • Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)
function totalCarritoPrecio() {
    let carritoTotal = carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
    let etiquetaTotal = document.getElementById('precio-total');
    etiquetaTotal.textContent = carritoTotal;
}

// Ejercicio 8 _____________ 1 punto
// • Crea dos botones en línea con el título de sección productos.
function activarBotonesOrden() {
    const btnNombre = document.getElementById('ordenar-nombre');
    const btnPrecio = document.getElementById('ordenar-precio');

    // • Implementa la funcionalidad para ordenar los productos en estos dos botones. Un boton debe ordenar por nombre los
    // productos y el otro por precio de menor a mayor
    btnNombre.addEventListener('click', () => {
        let ordenados = [...frutas].sort((a, b) => a.nombre.localeCompare(b.nombre));
        mostrarProductos(ordenados);
    });

    btnPrecio.addEventListener('click', () => {
        let ordenados = [...frutas].sort((a, b) => a.precio - b.precio);
        mostrarProductos(ordenados);
    });
}
// Ejercicio 9 _____________ 0.5 puntos
// • Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito.
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}
// Ejercicio 10_____________ 1.5 puntos
// • Estila la pagina acorde a la imagen (sample.png)
// sample.png

function abrirCarrito() {
    let carritoVista = document.querySelector('.seccion-carrito');
    if (carritoVista.style.display === 'flex') {
        carritoVista.style.display = 'none';
    } else {
        carritoVista.style.display = 'flex';
    }
}

function init() {
    carrito = atraparDatosEnCarrito('carrito');
    imprimirDatosAlumno(datos);
    mostrarProductos(frutas);
    buscadorProductos();
    mostrarCarrito();
    contadorCarrito();
    totalCarritoPrecio();
    activarBotonesOrden();
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
}
init();
