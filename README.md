# HOLO Challenge - Fullstack

## TL;DR

### Client

`cd client`

`npm install`

`npm start`

### Server

`cd server`

`npm install`

`npm start`


-----

## Solution

### SERVER 

Se crea una API conectada a mongoDB que permite 

### POST /login
- Autenticar usuario

Esta funcionalidad esta pseudo-mockeada, no verifica usuario y password, simplemente si se envia el usuario "admin" se le asigna el rol de "admin"

### GET /users
- Listar usuarios

(Must-be-auth) Lista los usuarios utilizando paginacion.

### POST /users
- Crear usuarios

(Must-be-auth)(Must-be-admin) Crea un nuevo usuario


### Test: using JEST y Supertest

-------
### CLIENT

Se desarrolla el frontend utilizando ReactJS, Typescript, CSS, ContextAPI

El mismo permite:

- autenticar el usuario, conserva el token en ContextAPI (*todo: utilizar cookies para prevenir perdida de user en refresco*)
- desloguear
- listar usuarios de forma paginada
- agregar usuarios (si es administrador)

Por razones de tiempo no se implementan test en el front end.


