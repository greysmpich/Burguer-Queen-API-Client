### [0.0.3](https://github.com/greysmpich/Burguer-Queen-API-Client/compare/v0.0.2...v0.0.3) (2024-01-24)


### Features

* **components:** eliminar productos y actualizar input ([f3200ae](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/f3200aef832e8f720eede781136633ea8fb533a2))
* **components:** poder visualizar la vista de detalle en el el componente orderDetail, creacion del boton done ([2011324](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/2011324966cb1ddaa1d046c749600b7af345fc73))
* **components:** Se agregaron cambios de test de usabilidad ([a20862c](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/a20862c523c026bd754544419ae55d404b09da21))
* **components:** se agregaron dos nuevos componentes para la HU2 y se hicieron ajustes en los estilos ([cdadc4b](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/cdadc4b02c219b3406f9191d7aefe9c5f29aee52))
* **components:** se cambia el status de la orden al dar click en el botón Done y se actualiza la API ([afa9ffb](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/afa9ffb59474a6e31746d168700884375e3780eb))
* **components:** se crearon los componentes Order y OrderDetails para la vista Kitchen ([43b5d6b](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/43b5d6be2e5764f20873c3a97468c8c363df41c4))
* **components:** se creó el LogoutComponentModal ([2e61f8b](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/2e61f8b7c258903323be64b3c2492e9afae4f7d2))
* **components:** Se cubrieron los test al 100% ([681c524](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/681c52486b5c662ee9426e75e6789351d3a8e515))
* **components:** se muestran en el OrderSummary los productos seleccionados y se envía la orden a la Api ([bc07fc1](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/bc07fc1b669d600d632066cd3e087056e0bd932c))


### Bug Fixes

* **components:** se corrigio la manera en la que se almacena el accessToken para que cada que se recargue de pagina, no desparezcan los productos, y se ajustaros estilos ([2921497](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/29214972a2327ef5e01eb08e312669824181a014))
* se actualizaron test para corregir errores surgidos a partir de la incorporación del LogoutModalComponent y modificación del AuthenticationService(accessToken persistence) ([4d4dd7f](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/4d4dd7f79d58596fb574311f2d0777d5526ef468))


### [0.0.2](https://github.com/greysmpich/Burguer-Queen-API-Client/compare/v0.0.1...v0.0.2) (2024-01-17)


### Features

* **components:** cambios css en componente de productos, actualizacion de productos, cambio de imagenes rotas a una generica ([6a8e6b4](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/6a8e6b4659bcbd04bba5a0a9f3f08ec255d32b03))
* **components:** se crearon los componentes de la vista Waiter ([03dc369](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/03dc369e382f385d999a192e64bce6d524228071))
* **components:** se crearon los componentes de la vista Waiter ([8c2238c](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/8c2238cce16526ac261d195d430c85a0df18e273))
* **components:** se muestran los productos de acuerdo al menú seleccionado en WaiterComponent ([0a2b606](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/0a2b60643188ab60c39d8efdbb966b4c0b70c1f3))
* **routing**: se añadió Auth Guard para proteger rutas privadas **components:** se crearon componente Waiter y Logout ([3843c0b](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/3843c0bd14d8c768e5bd936848b5f6c067d3f7cc))
* **routing:** quedó funcionando AuthGuard y chore: se quitó código innecesario del template de WaiterComponent ([186f327](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/186f3277b14d3b9110cac3e218dc79f78be4d250))

### Estilos

* **styles:** cambios en la vista waiter vertical ([08f174b](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/08f174ba6d99849f6835adae31d8670eaa901b8b))
* **styles:** arreglo en la estructura de html y estilos ([d4ec7df](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/d4ec7dfcb1013de956ef19ef63cdd4f64437b131))


### Pruebas unitarias

* **tests:** test cubiertos al 100% ([33bca35](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/33bca35ccab75d55edb98c1e9239df0ce9269df2)) 
* **tests:** se agregaron tests a lunchAndDinnerComponent y a AuthenticatinService para subir % de branches ([bc05ebc](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/bc05ebc95e40ca2cc5ee34602ee898297fc97085)) 
* **tests:** WaiterComponent tests completos ([15f2349](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/15f2349965b59e1bfd09ab8622c8bff8b5d76f56)) 
* **tests:** se agregaron los tests para la mitad de las funciones del WaiterComponent ([a75515b](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/a75515b30a3aa6d78948e87f73d881d4a9a0a21a)) 
* **tests:** test waiter component 3/6 listos ([9c59df1](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/9c59df1af05218d8538496f350dda51ed7e634ab))
* **tests:** test unitarios actualizados, falta testear guards y waiter component ([1b576c1](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/1b576c136883a1e1d08ab4110e9f6f4ef0afd70b))
* **tests:** test de authentication service completados al 100% ([9bb871c](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/9bb871ca9ab2a2299689f766268f37b7bb298460))

### Refactorización de código y correcciones de Errores

* **components:** separacion y simplicacion de codigo para clasificar los alimentos segun menu ([0f50aa7](https://github.com/greysmpich/Burguer-Queen-API-Client/commit/0f50aa717289f721efde011c04cd77577c704358))


### 0.0.1 (2024-01-10)

### Nuevas Características
- Creación el módulo Authentication.
- Función para mostrar y ocultar contraseña en Log In.
- Creación del servicio de autenticación para conectar con la API.
- Validación de credenciales al iniciar sesión.
- Manejo de mensajes de error al ingresar credenciales incorrectas.

### Correcciones de Errores
- Se quitaron etiquetas innecesarias del template de Authentication.


