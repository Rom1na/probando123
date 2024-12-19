# La tienda Online
## Trabajo práctico curso  Front End JS - Talento Tech Primer Cuatrimestre Tech 2024


Este repositorio aloja el trabajo práctico del curso de Front End de Talento Tech 2024 
La consigna es hacer una estructura que emule un comercio electrónico.
En mi caso elegí utilizar la api pública fake api store  para  los productos.
[FAKE API STORE](https://fakestoreapi.com/) 


Hasta el momento, el proyecto tiene un index con productos destacados, un catálogo por categorías,reseñas de los productos, un sector de contacto a través de un formulario y un página 'nosotros' con información de la empresa ficticia.

Cada producto es presentado en una card con los siguientes elementos:

- Nombre del producto
- Imagen del mismo.
- precio
- valoración  ( al hacer click aqui se accede a las reseñas del producto)
- Botón para agregar al carrito  ( Aún no funciona)
- categoría a la que pertenece el producto.


***Comentarios:***

El index esta hecho enteramente en html y css (Como vimos en clase)
En otras partes utilice un poco de Javascript para poder dinamizar ciertas tareas repetitivas.
Las categorías del catálogo, o el encabezado de las reseñas y así poder reutilizar las estructuras.
El form fue hecho usando  como action una página de agradecimiento,
por lo tanto todas la información del submit aparece en la url. 
No quise modificar los  campos submit  que no utilizo (y asi evitar que aparezcan)
porque quise respectar la estructura del formulario utlizada en clase.

***Comentarios sobre la segunda entrega   (Entrega Final Diciembre 2024):***

Se modificó la barra de navegación para mejorar la accesibilidad  con nuevas características:

- El usuario ingresa en el login su nombre y de esa forma crea un carrito de compras  ( de ya  existir uno para ese usuario, se carga el carrito guardado en el localStorage.)
- La estructura del Json de persistencia en el localStorage y las funciones soportan usuarios simultáneos.
- El carrito es un modal  que se crea con una funcion javascript, recupera la información del localStorage y la presenta en pantalla.
- El carrito es interactivo, permite cambiar cantidades o eliminar productos, actualizando el importe total de la compra con los diferentes eventos.
- El botón compra resetea el carrito de compras simulando el vaciado de los items luego de la misma.