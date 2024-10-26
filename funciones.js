function generarEstructuraProductos(productos) {
    // Selecciona el contenedor principal donde se agregarán las cards
    const contenedorPrincipal = document.createElement('div');
    contenedorPrincipal.className = 'contenedor';

    // Itera sobre cada producto y crea la estructura HTML
    productos.forEach(producto => {
        // Crear la card del producto
        const productoCard = document.createElement('div');
        productoCard.className = 'productoCard';

        // Crear el título del producto
        const nombreProducto = document.createElement('h3');
        nombreProducto.id = 'nombreproducto';
        nombreProducto.textContent = producto.nombre;

        // Crear la imagen del producto
        const imgProducto = document.createElement('img');
        imgProducto.id = 'imgprodu';
        imgProducto.src = producto.imagen;
        imgProducto.alt = producto.nombre;

        // Crear la descripción del producto
        const descripcion = document.createElement('p');
        descripcion.className = 'descripcion';
        descripcion.textContent = producto.descripcion;

        // Crear el precio del producto
        const precio = document.createElement('p');
        precio.className = 'precio';
        precio.textContent = `$ ${producto.precio}`;

        // Crear el footer del contenedor con el botón y la categoría
        const footerContenedor = document.createElement('div');
        footerContenedor.className = 'footercontenedor';

        const botonAgregar = document.createElement('button');
        botonAgregar.style.display = 'flex';
        botonAgregar.style.alignItems = 'center';
        botonAgregar.style.gap = '0.5rem';
        botonAgregar.textContent = 'Agregar al carrito';
        const iconoCarrito = document.createElement('i');
        iconoCarrito.className = 'fa fa-shopping-cart fa-2x';
        iconoCarrito.setAttribute('aria-hidden', 'true');
        botonAgregar.appendChild(iconoCarrito);




        const categoria = document.createElement('p');
        categoria.className = 'categoria';
        categoria.textContent = producto.categoria;

        // Agregar los elementos al footer y luego al productoCard
        footerContenedor.appendChild(botonAgregar);
        footerContenedor.appendChild(categoria);

        productoCard.appendChild(nombreProducto);
        productoCard.appendChild(imgProducto);
        productoCard.appendChild(descripcion);
        productoCard.appendChild(precio);
        productoCard.appendChild(footerContenedor);

        // Añadir la card del producto al contenedor principal
        contenedorPrincipal.appendChild(productoCard);
    });

    // Agregar el contenedor principal al body (o a otro contenedor en el DOM)
    document.body.appendChild(contenedorPrincipal);
}

// Ejemplo de productos para usar la función
/* const productos = [
    {
        nombre: "Mens Casual Premium Slim Fit T-Shirts",
        imagen: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        descripcion: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        precio: 22.3,
        categoria: "men's clothing"
    },
    {
        nombre: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        imagen: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        descripcion: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
        precio: 695,
        categoria: "bijouterie"
    }
]; */

/* Llamar a la función para generar las cards
generarEstructuraProductos(productos);
 */

async function traerQuerie(url,source){

try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const res = formatearProductos(data);
    console.log(res);  
    generarEstructuraProductos(res);

   
} catch (error) {
    return console.error('Error:', error);
}

}


function formatearProductos (data){

    const resultado = data.map( (a) =>({
        id: a.id,
        nombre: a.title,
        imagen: a.image,
        descripcion: a.description,
        precio : a.price,
        categoria: a.category,

    }) 
    );

    return resultado;


}





