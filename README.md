# FrontEnd_Suscripciones-main
 Realizado para la materia de electiva 2 - Desarrollo Web

# Consideraciones de despliegue
 Para descargar librerias: "npm install"
 Para iniciar la aplicación: "npm start"
 Link de la app desplegada: https://front-end-suscripciones-main.vercel.app/

# Sistema de gestión de suscripciones - Gestión de cuentas, suscriptores y servicios activos

Este proyecto es una API RestFull desarrollada en Node.js con el framework Express. Su objetivo principal es ayudar a la gestión de suscripciones de plataformas de servicios electronicos, cuentas, suscriptores y servicios activos 
. Proporciona un sistema completo de CRUD (Crear, Leer, Actualizar y Eliminar) para administrar los datos asociados a los empleados, cuentas y suscripciones de las cuentas.


## Contexto

Se propone un sistema de gestión de suscripciones para una empresa que vende suscripciones de distintos servicios de streaming. Este sistema aborda la administración de suscripciones, vendedores y usuarios, adoptando un enfoque integral: 

## vendedores

El sistema debe permitir realizar la gestión de usuarios, estos solo podrán ser registrados por alguno de los vendedores que se encuentran dentro del sistema. Cada uno de estos puede estar sujeto a cambios tales como, creación, visualización, actualización y eliminación. Los datos necesarios para crear un usuario son:
-          Nombre
-          Apellido
-          Teléfono
-          Dirección
-          Usuario
-          Contraseña

- Es importante destacar que los vendedores deben ser mayores de edad para poder registrarse en el sistema.

## suscripciones

El sistema debe permitir realizar la gestión de suscripciones. Cada uno de estos puede estar sujeto a cambios tales como, creación, visualización, actualización y eliminación. Los datos necesarios para la gestión de las suscripciones son:
-       Código del servicio
-       Nombre
-       Proveedor
-       Tipo de Servicio
-       Cantidad de Stock
-       Fecha Salida del Servicio
-       Precio


## Activar suscripciones

El sistema debe permitir realizar la gestión de suscripciones. Cada uno de estos puede estar sujeto a cambios tales como, creación, visualización y actualización. Los datos necesarios la gestión de los suscripciones son:
-          Fecha Inicio de Suscripción
-          Fecha Final de Suscripción
-          Estado de la Suscripción

## Usuarios (clientes)

El sistema debe permitirle al usuario visualizar las suscripciones que tiene activas, así mismo como un historial de todos las suscripciones que ha contratado.

## Estructura proyecto

- El proyecto sigue una estructura de directorios recomendada para una aplicación Node.js con Express. A continuación se describe brevemente cada uno de los directorios principales:

- *controllers*: Contiene los controladores de la aplicación que manejan la lógica de negocio y las interacciones con los modelos de datos.
- *models*: Contiene los modelos de datos de la aplicación que se utilizan para interactuar con la base de datos.
- *routes*: Contiene las definiciones de las rutas de la aplicación que manejan las solicitudes HTTP y llaman a los controladores correspondientes.
- *services*: Contiene los servicios de la aplicación que encapsulan la lógica de negocio y se utilizan para realizar operaciones más complejas que no pertenecen estrictamente a los controladores.
- *app.js*: El archivo principal de la aplicación que configura y arranca el servidor Express.
- *package.json*: El archivo de configuración del proyecto que contiene las dependencias, scripts y otra información relevante.

## Dependencias principales

El proyecto utiliza las siguientes dependencias principales:

- Express: Framework web rápido y minimalista para Node.js.
- Cors: Middleware que proporciona compatibilidad con CORS (Cross-Origin Resource Sharing) en Express, permitiendo que tu servidor acepte solicitudes HTTP desde dominios diferentes al dominio del servidor. Es especialmente útil cuando tienes una API que es consumida desde un cliente en un dominio distinto.
- Dotenv: Módulo que facilita la carga de variables de entorno desde archivos .env. Las variables de entorno son especialmente útiles para almacenar información sensible o configuraciones específicas para diferentes entornos (como credenciales de bases de datos, claves de API, etc.) y permiten que tu aplicación sea más segura y configurable.
- Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js que proporciona una forma sencilla y flexible de interactuar con bases de datos MongoDB. Mongoose permite definir esquemas y modelos para tus datos y proporciona una API para realizar consultas y operaciones en la base de datos.

## Consideraciones finales

Este proyecto es de carácter acádemico para poner en práctica los conocimientos adquiridos durante el desarrollo del primer 50% del curso de desarrollo de software - Electiva II.

Realizado por:
- INGRITH YISETH RODRIGUEZ LOPEZ
- SERGIO MAURICIO BALLEN SEDANO
- RONALDO PEREZ DIAZ
