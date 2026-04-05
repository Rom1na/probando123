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

function traerQuerie(filtro){

 
    const productosFiltrados = prods.filter((e)=>e.category == filtro)

    console.log(productosFiltrados);

    const res = formatearProductos(productosFiltrados);
    console.log(res);  
    generarEstructuraProductos(res);


}






/*Esta funcion fue reemplazada temporariamente mientras esté caida https://fakestoreapi.com/  */

async function traerQuerieOld(url){

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
        imagen: corregirUrlImagen(a.image),
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



function corregirUrlImagen(urlOriginal) {
  // Verifica si la URL termina en .jpg
  if (urlOriginal.endsWith('.jpg')) {
    // Reemplaza la extensión por _t.png
    return urlOriginal.replace('.jpg', 't.png');
  }
  return urlOriginal; // Si no termina en .jpg, la deja igual
}




const prods=[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "menswear",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "menswear",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "menswear",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  },
  {
    "id": 4,
    "title": "Mens Casual Slim Fit",
    "price": 15.99,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "menswear",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    "rating": {
      "rate": 2.1,
      "count": 430
    }
  },
  {
    "id": 5,
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 4.6,
      "count": 400
    }
  },
  {
    "id": 6,
    "title": "Solid Gold Petite Micropave ",
    "price": 168,
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "category": "jewelery",
     "rating": {
        "rate": 4.1,
        "count": 259
        }, 

    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 3.9,
      "count": 70
    }
  },
  {
    "id": 7,
    "title": "White Gold Plated Princess",
    "price": 9.99,
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "category": "jewelery",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 3,
      "count": 400
    }
  },
  {
    "id": 8,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
    "rating": {
      "rate": 1.9,
      "count": 100
    }
  },
  {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
    "rating": {
      "rate": 3.3,
      "count": 203
    }
  },
  {
    "id": 10,
    "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "price": 109,
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_750614-MLA101666714972_122025-F.webp",
    "rating": {
      "rate": 2.9,
      "count": 470
    }
  },
  {
    "id": 11,
    "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "price": 109,
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
    "rating": {
      "rate": 4.8,
      "count": 319
    }
  },
  {
    "id": 12,
    "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "price": 114,
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
    "rating": {
      "rate": 4.8,
      "count": 400
    }
  },
  {
    "id": 13,
    "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "price": 599,
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "category": "electronics",
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_948110-MLA91955973641_092025-F.webp",
    "rating": {
      "rate": 2.9,
      "count": 250
    }
  },
  {
    "id": 14,
    "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "price": 999.99,
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "category": "electronics",
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_856117-MLA95834982409_102025-F.webp",
    "rating": {
      "rate": 2.2,
      "count": 140
    }
  },
  {
    "id": 15,
    "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "price": 56.99,
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
    "rating": {
      "rate": 2.6,
      "count": 235
    }
  },
  {
    "id": 16,
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": 29.95,
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
    "rating": {
      "rate": 2.9,
      "count": 340
    }
  },
  {
    "id": 17,
    "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "price": 39.99,
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
    "rating": {
      "rate": 3.8,
      "count": 679
    }
  },
  {
    "id": 18,
    "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "price": 9.85,
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
    "rating": {
      "rate": 4.7,
      "count": 130
    }
  },
  {
    "id": 19,
    "title": "Opna Women's Short Sleeve Moisture",
    "price": 7.95,
    "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    "category": "women's clothing",
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_974836-CBT87930351213_072025-F.webp",
    "rating": {
      "rate": 4.5,
      "count": 146
    }
  },
  {
    "id": 20,
    "title": "DANVOUY Womens T Shirt Casual Cotton Short",
    "price": 12.99,
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
    "rating": {
      "rate": 3.6,
      "count": 145
    }
  },
  {
    "id": "21",
    "title": "Zapato nautico",
    "description": "Es un zapato náutico color habano claro son suela  de goma antideslizante",
    "price": 32.64,
    "category": "women's clothing",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_846683-MLA78891894624_092024-F.webp"
  },
  {
    "id": "22",
    "title": "Reloj Digital Paddle Watch",
    "description": "Diámetro de Caja: 33mm\nAncho de malla: 14mm\nLargo total: 200mm.",
    "price": 43.43,
    "category": "jewelery",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_691200-MLA48266982066_112021-F.webp"
  },
  {
    "id": "23",
    "title": "Reloj Mistral Gsi-2238 ",
    "description": "Reloj Mistral Gsi-2238 Hombre Sumergible Línea Marine. - Diseño moderno y elegante. - Resistente al agua. - Ideal para actividades acuáticas. - Materiales de alta calidad.",
    "price": 110.82,
    "category": "jewelery",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_971044-MLA99454050894_112025-F.webp"
  },
  {
    "id": "24",
    "title": "Reloj Hombre Casio Mtp-vd01d ",
    "description": "Tamaño de la carcasa (largo × ancho × alto)\nicon-question\n49 × 45 × 10.3 mm\nPeso\nicon-question\n118 g\nCorrea\nCorrea de acero inoxidable\nBroche de triple pliegue\nResistencia al agua",
    "price": 127.55,
    "category": "jewelery",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_982647-MLA42871150460_072020-F.webp"
  },
  {
    "id": "25",
    "title": "Camisa Hombre Cuello Mao",
    "description": "Camisa tela de Lino con cuello Mao mangas cortas.\n\nTALLES:\nDel S al XXL\nVARIOS COLORES\n",
    "price": 22.7,
    "category": "menswear",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_752253-MLA95880337606_102025-F.webp"
  },
  {
    "id": "26",
    "title": "Pack X 4 Camisetas Mujer Cocot",
    "description": "- Camiseta ultraopaca\n- Bretel fino\n- Marca: Cocot\n- Pack armado: Blanco, Marfil, Natural(32) y Negro\n- Talle unico: hasta 100 de busto\n- Art: 5154",
    "price": 32.9,
    "category": "women's clothing",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_961271-MLA54694547399_032023-F.webp"
  },
  {
    "id": "27",
    "title": "Blusa Mujer Rayada Remera Camisa Dama",
    "description": "La blusa destaca por su excelente calidad y diseño atractivo. Es una prenda liviana y fresca, ideal para los días de calor.",
    "price": 8.75,
    "category": "women's clothing",
     "rating": {
        "rate": 4.1,
        "count": 259
        },
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_818532-MLA79082701760_092024-F.webp"
  }
]