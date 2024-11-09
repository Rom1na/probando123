# La tienda Online
## Trabajo práctico curso  Front End JS - Talento Tech Primer Cuatrimestre Tech 2024


Este repositorio alója el trabajo práctico del curso de Front End de Talento Tech 2024 
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


***Comentarios***

El index esta hecho enteramente en html y css (Como vimos en clase)
En otras partes utilice un poco de Javascript para poder dimamizar ciertas tareas repetitivas.
Las categorías del catálogo, o el encabezado de las reseñas y así poder reutilizar las estructuras.
El form fue hecho usando  como action una página de agradecimiento.
por lo to tanto todas la información del submit aparece en la url. 
No quise modificar los  campos submit  que no utilizo (y asi evitar que aparezcan)
porque quise respectar la estructura del formulario utlizada en clase.
