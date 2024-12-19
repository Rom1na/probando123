const modal = document.getElementById('modal');
const cartButton = document.getElementById('user');
const closeButton = document.getElementsByClassName('close')[0];
const  elimarDelCarrito = document.getElementById('eliminar');

function carro(){
         
       
        createModal()
        let mod = document.getElementById('modal')
        if(mod!= null){
           mod.style.display= 'block';
        }else{
          alert('Tu carrito está vacio');  
        }  

    
  };




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
        enlaceReseña.href = `reviews.html?id=${producto.id}`;
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
        botonAgregar.addEventListener('click',function(){
            datos(producto.id,producto.nombre, producto.precio);
        })
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









async function traerQuerie(url){

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



function guardarUsuario(nombre, carrito) {
    // Obtiene los usuarios existentes del local storage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    localStorage.setItem('current',nombre);
    let existe = false;

    usuarios.forEach(usuario => {
        if (usuario.nombre === nombre) {
            existe = true;
        }
    });
    

    if (!existe){
    // Crea un nuevo usuario
    const nuevoUsuario = {
        nombre: nombre,
        carrito: carrito,
        totalCarro :0,
    };

    // Agrega el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario);

    // Guarda el array actualizado en el local storage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    }  
}




/* function obtenerUsuarios() {
    // Obtiene el array de usuarios del local storage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios;
} */


function actualizarCarrito(nombre, item) {
    // Obtiene los usuarios existentes del local storage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Encuentra el usuario y actualiza su carrito
    let usuarios2 = usuarios.map(usuario => {
        if (usuario.nombre === nombre) {
            let nuevoCarrito = usuario.carrito;
            nuevoCarrito.push(item);
            usuario.carrito = nuevoCarrito;
        }
        return usuarios;
    });

    // Guarda el array actualizado en el local storage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Producto agregado al carrito')
}



/* function actualizarCarritoCompleto(carro) {
    try {
        // Obtiene los usuarios existentes del local storage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let nombre = localStorage.getItem('current');

        if (!nombre) {
            console.error("No se encontró un usuario actual en localStorage.");
            return;
        }

        // Encuentra el usuario y actualiza su carrito
        let usuarioEncontrado = false;
        usuarios = usuarios.map(usuario => {
            if (usuario.nombre === nombre) {
                usuario.carrito = carro;
                usuarioEncontrado = true;
            }
            return usuario;
        });

        if (!usuarioEncontrado) {
            console.warn(`No se encontró un usuario con el nombre ${nombre}.`);
        }

        // Guarda el array actualizado en el local storage
        console.log('!!', usuarios);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
    }
} */

/* function ActualizaCarritoDesdeModal() {
    try {
        let cartData = [];

        const items = document.getElementsByClassName('cart-item');
        const itemsArray = Array.from(items);

        itemsArray.forEach(item => {
            const h = item.getElementsByTagName('h4');
            const cant = item.getElementsByTagName('input')[0];

            if (!h[0] || !h[1] || !h[2] || !cant) {
                console.warn("Se omitió un elemento del carrito porque faltan datos.");
                return;
            }

            const nom = h[0].textContent.trim();
            const prec = parseFloat(h[1].textContent.replace("$", "").trim());
            const tot = parseFloat(h[2].textContent.replace("$", "").trim());

            if (isNaN(prec) || isNaN(tot)) {
                console.warn("Precio o total inválidos para el producto:", nom);
                return;
            }

            const itemData = {
                "nombre": nom,
                "precio": prec,
                "cantidad": parseInt(cant.value, 10) || 1, // Valor predeterminado: 1
                "total": tot,
            };

            cartData.push(itemData);
        });

        actualizarCarritoCompleto(cartData);

       
    } catch (error) {
        console.error("Error al actualizar el carrito desde el modal:", error);
    }
}
 */






function obtenerActual(){
let actual = localStorage.getItem('current');

if (actual != null){
document.getElementById('user').innerHTML =`<i class="fa fa-shopping-cart" style="margin-right: 5px;"></i>${actual}`;
document.getElementById('user').addEventListener('click',function(){
        carro();
})
}else{
document.getElementById('user').innerHTML =`<i class="fa fa-shopping-cart" style="margin-right: 5px;"></i>Usuario`;
document.getElementById('user').addEventListener('click',function(){
    alert('Aun no te logueaste, entra a  Usuario->Log in e ingresa un nombre para iniciar tu carrito');
})
           
}

};

function salir(){
  localStorage.removeItem("current");
  obtenerActual();

}





function datos(id,prod,pre){

    const item ={
        "id":id,
        "nombre": prod,
        "precio": pre,
        "cantidad":1,
        "total": pre,
    
    }
    
    let usuario = localStorage.getItem('current');
    actualizarCarrito(usuario,item);
    


}



// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


//Funciones carrito.


function createModal() {
    // Obtener los productos desde el localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nombre = localStorage.getItem('current');

    if (!nombre) {
        console.error("No se encontró un usuario actual en localStorage.");
        return;
    }

    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    if (!usuario || !usuario.carrito || usuario.carrito.length === 0) {
        console.warn("El carrito está vacío o no se encontró.");
        return;
    }

    const products = usuario.carrito; // Productos actuales del carrito

    // Crear el modal
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";

    // Crear el contenido del modal
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Botón para cerrar
    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => {
        document.getElementById('modal').remove(); // Cerrar el modal
    };

    
    // Título
    const title = document.createElement("h1");
    title.className = "titDisplay";
    title.id='titu';
    title.style.backgroundColor = "white";
    title.style.marginTop = "2px";
    title.style.marginBottom = "10px";

    // Contenedor de items
    const itemsContenedor = document.createElement("div");
    itemsContenedor.className = "items-contenedor";

    // Iterar sobre los productos y crear las filas del carrito
    products.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const productName = document.createElement("h4");
        productName.className = "nombreproducto2";
        productName.textContent = product.nombre;

        const productPrice = document.createElement("h4");
        productPrice.className = "nombreproducto";
        productPrice.textContent = `$ ${product.precio.toFixed(2)}`;

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.className = "quantity";
        quantityInput.value = product.cantidad;
        quantityInput.min = 1;

        const totalPrice = document.createElement("h4");
        totalPrice.id = 'total';
        totalPrice.className = "nombreproducto";
        totalPrice.textContent = `$ ${(product.precio * product.cantidad).toFixed(2)}`;
        parcial = product.precio * product.cantidad;
    


        const deleteButton = document.createElement("button");
        deleteButton.className = "eliminar";
        deleteButton.setAttribute("aria-label", "Eliminar");
        deleteButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        deleteButton.onclick = () => {
            eliminarProductoDelCarrito(product.nombre); // Sincroniza con localStorage
            cartItem.remove(); // Remueve del DOM
        };

        // Agregar eventos para sincronizar cambios en cantidades
        quantityInput.addEventListener("change", event => {
            const newQuantity = parseInt(event.target.value, 10);
            if (newQuantity < 1) return;

            // Actualizar el precio total del producto
            totalPrice.textContent = `$ ${(product.precio * newQuantity).toFixed(2)}`;

            // Sincronizar con localStorage
            actualizarCantidadProducto(product.nombre, newQuantity);
        });

        
        title.textContent = `${localStorage.getItem('current')}, el total de tu compra es: $ ${totCarro().toFixed(2)}`;
        

        cartItem.appendChild(productName);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(quantityInput);
        cartItem.appendChild(totalPrice);
        cartItem.appendChild(deleteButton);

        itemsContenedor.appendChild(cartItem);
    });

    // Botón de checkout
    const checkoutButton = document.createElement("button");
    checkoutButton.id = "checkout-button";
    checkoutButton.textContent = "Comprar";
    checkoutButton.onclick = () => {
        resetCarrito();       
        alert("¡Gracias por tu compra!");
    };
    

    // Ensamblar el modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(itemsContenedor);
    modalContent.appendChild(checkoutButton);
    modal.appendChild(modalContent);

    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modal);

    return modal;
}


function eliminarProductoDelCarrito(nombreProducto) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nombre = localStorage.getItem('current');

    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    if (!usuario || !usuario.carrito) return;

    // Filtra el producto eliminado
    usuario.carrito = usuario.carrito.filter(item => item.nombre !== nombreProducto);

    // Actualiza el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('titu').textContent =  `${localStorage.getItem('current')}, el total de tu compra es: $ ${totCarro().toFixed(2)}`;

    
    
}

function resetCarrito() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nombre = localStorage.getItem('current');

    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    if (!usuario || !usuario.carrito) return;

    // Filtra el producto eliminado
    usuario.carrito = [];
    document.querySelector('#modal').style.display='none';
    document.querySelector('#modal').remove();
    
    

    // Actualiza el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}








function actualizarCantidadProducto(nombreProducto, nuevaCantidad) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nombre = localStorage.getItem('current');
    

    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    if (!usuario || !usuario.carrito) return;

    // Encuentra el producto y actualiza su cantidad
    usuario.carrito = usuario.carrito.map(item => {
        if (item.nombre === nombreProducto) {
            item.cantidad = nuevaCantidad;
            item.total = item.precio * nuevaCantidad;
        }
        return item;
    });

    

     // Actualiza el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('titu').textContent =  `${localStorage.getItem('current')}, el total de tu compra es: $ ${totCarro().toFixed(2)}`;

}




function totCarro (){
    let parcial = 0;
    let nuevoTotal = 0;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nombre = localStorage.getItem('current');
    
    
    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    usuario.carrito.forEach(item => {
        parcial = item.total;
        nuevoTotal = nuevoTotal + parcial 
           
   });

   usuario.totalCarro = nuevoTotal;
   localStorage.setItem('usuarios', JSON.stringify(usuarios));

   
   
   return nuevoTotal;





}