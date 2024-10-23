
# Challenge ELDAR - Angular

Aplicacion web desarrollada en Angular v17 para el cumplimiento del challenge

## Instalacion

![Importante](https://img.shields.io/badge/IMPORTANTE-yellow.svg) 
A efectos de hacer mas sencilla la prueba, ya se han incluidos los environments.
 **Esto es una muy mala practica.**  Lo recomendable es guardar los secrets en AWS secret manager y luego hacer el reemplazo en el environment.ts mediante el pipeline (Devops).

Se requiere npm para instalar este proyecto y se deben seguir estos pasos:
```bash
  git clone https://github.com/reymundonahuel/challenge-eldar.git
  cd challenge-eldar
  npm i
  ng serve --open
```
Finalmente se nos abrirá una nueva pestaña en ```localhost:4200```
## Datos de ingreso
Para acceder se deben utilizar las siguientes credenciales
```bash
email: eve.holt@reqres.in
password: cityslicka
```
**Nota**: Las credenciales deben ser compartidas de forma segura mediante la encriptacion de un PDF con contraseña o un servicio de gestion de contraseñas. A fines practicos, se comparten las credenciales en el readme
## Apis utilizadas

A continuacion se detallan las apis utilizadas para el proyecto:
- [jsonplaceholder](https://jsonplaceholder.typicode.com/)
    - Se utilizó para interactura con los posts
- [reqres.in](https://reqres.in/)
    - Provee una api basica de autenticacion (fake) con login exitoso y fallido


## Librerias utilizadas
- PrimeNG
- Primeflex
    - Estilos compatibles con PrimeNG
- Primeicons
    - Iconos propios de PrimeNG
- crypto-js 
    - Se utiliza para cifrar el token y datos de usuarios, simulando una autenticacion real y dandole una mayor capa de seguridad
- sweetalert2
    - Libreria encargada de crear toast, alertas, etc

## Estructura del proyecto
El proyecto cuenta con 3 categorias de carpetas:

- **Core**
  - Aqui van todas las configuraciones, constantes, enums, interfaces que se requeriran para el proyecto
- **Modules**
  - Aquí van todos los modulos del proyecto. Cada modulo contiene su servicio, y componentes propios del modulo.
- **Shared**
  - Aqui van todos los componentes, servicios, etc. Que se comparten en todo el proyecto.

### Descripcion de las carpetas
- **Core**
  - *decorators*: iran los decoradores que lleguemos a necesitar para el proyecto
  - *constants*: iran las variables del sistema, como la url de la api, etc.
  - *enums*: iran los enums del sistema, como roles y permisos
  - *guards*: separado por roles y rutas. Dado que es un proyecto sin backend, se separa en admin y user, pero debiese ser un solo guard manejado con data de backend 
  - *interceptor*: Posee un interceptor que le añade el header con Authorization Bearer. Para evitar la duplicidad de codigo en los servicios
  - *interfaces*: irán las interfaces del sistema, como las interfaces de los posts, cuenta de usuario, login, etc. Para mantener el tipado fuerte
  - *store*: Irán los archivos como state, reducers, actions, selectors, etc.
  - *types*: van a ir los types del proyectos. Se usan para mantener un tipado fuerte.
  - *utils*: Carpeta con funciones y archivos utiles para el desarrollo, como alertas, encriptacion, etc.
- **Modules**
  - *auth*: modulo de autenticacion con sus componentes y servicios
  - *dashboard*: un pequeño dashboard de bienvenida con funciones super simples.
  - *posts*: modulo de listar posteos, actualizar, crear, eliminar.
  - ***Nota: Cada modulo cuenta con sus componentes y servicios*** 
- **Shared**
  - *components*: componentes compartidos dentro del proyecto, como un container que aplica padding o el menu
  - *services*: Servicios que se comparten en todo el proyecto, como los de manejo de sesiones, almacenamiento en local storage, etc.
  - *pipes*: pipes customizados que van a modificar el html, como trucar textos largos, etc.

```bash
├───app
│   ├───core
│   │   ├───constants
│   │   ├───decorators
│   │   ├───enums
│   │   ├───guards
│   │   │   ├───roles
│   │   │   │   ├───admin
│   │   │   │   └───user
│   │   │   └───routes
│   │   ├───interceptor
│   │   ├───interfaces
│   │   ├───store
│   │   ├───types
│   │   └───utils
│   ├───modules
│   │   ├───auth
│   │   │   ├───components
│   │   │   │   └───login
│   │   │   └───services
│   │   ├───dashboard
│   │   │   ├───components
│   │   │   │   └───list
│   │   │   └───services
│   │   └───posts
│   │       ├───components
│   │       │   ├───add-edit
│   │       │   └───list
│   │       └───services
│   │           └───posts
│   └───shared
│       ├───components
│       │   ├───container
│       │   │   └───container
│       │   └───menu-bar
│       └───services
│           ├───auth
│           ├───modals
│           ├───session
│           └───storage
├───assets
└───environments
```