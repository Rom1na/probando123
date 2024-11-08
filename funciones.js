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

        // Añadir título, imagen y descripción a la card
        productoCard.appendChild(nombreProducto);
        productoCard.appendChild(imgProducto);
        productoCard.appendChild(descripcion);

        // Contenedor "linea" para precio y reseña
        const linea = document.createElement('div');
        linea.className = 'linea';

        // Precio
        const precio = document.createElement('p');
        precio.className = 'precio';
        precio.textContent = `$ ${producto.precio}`;
        linea.appendChild(precio);

        // Reseña con estrellas
        const reseña = document.createElement('div');
        reseña.className = 'rev';
        const enlaceReseña = document.createElement('a');
        enlaceReseña.href = 'joyeria.html';
        enlaceReseña.innerHTML = `${producto.res} <i class="fa fa-star"></i>`;
        reseña.appendChild(enlaceReseña);
        linea.appendChild(reseña);

        // Añadir el contenedor "linea" a la card, después de la descripción
        productoCard.appendChild(linea);

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

        // Añadir el footer a la card
        productoCard.appendChild(footerContenedor);

        // Añadir la card del producto al contenedor principal
        contenedorPrincipal.appendChild(productoCard);
    });

    // Agregar el contenedor principal al body (o a otro contenedor en el DOM)
    document.body.appendChild(contenedorPrincipal);


    crearFooterRedesSociales(); 






}


function crearFooterRedesSociales() {
    // Crear el elemento footer
    const footer = document.createElement('footer');
    footer.id = 'sm-footer';

    // Lista de redes sociales y sus URLs
    const redesSociales = [
        { url: 'https://www.facebook.com', icono: 'fa fa-facebook' },
        { url: 'https://www.instagram.com', icono: 'fa fa-instagram' },
        { url: 'https://www.twitter.com', icono: 'fa fa-twitter' },
        { url: 'https://youtube.com', icono: 'fa fa-youtube' }
    ];

    // Crear cada enlace de red social y añadirlo al footer
    redesSociales.forEach(red => {
        const enlace = document.createElement('a');
        enlace.href = red.url;
        enlace.target = '_blank'; // Abre el enlace en una nueva pestaña

        const icono = document.createElement('i');
        icono.className = red.icono;

        enlace.appendChild(icono); // Añadir el icono al enlace
        footer.appendChild(enlace); // Añadir el enlace al footer
    });

    // Añadir el footer al body (o a otro contenedor en el DOM)
    document.body.appendChild(footer);
}











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
        res: a.rating.rate,

    }) 
    );

    return resultado;


}





