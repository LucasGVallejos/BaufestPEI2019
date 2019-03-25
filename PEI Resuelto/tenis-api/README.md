# Tenis-API

Ejercicio Integrador Tenis PEI Desarrollo Full Stack - Marzo - 2019

## Quick Start

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Instalación de dependencias

Instalar todas las dependencias del proyecto

```shell
npm install
```

## Ejecución
#### Ejecución en *development* mode:
Ejecutar la aplicación en desarrollo

```shell
npm run dev
```

o en debug

```shell
npm run dev:debug
```

#### Ejecución en *production* mode:

Compilar la aplicación y ejecutarla en producción.

```shell
npm run compile
npm start
```

## Testing

Ejecución de unit tests

```shell
npm test
```

o debug

```shell
npm run test:debug
```

## Configuración variables de entorno

Crear en la raiz del proyecto un archivo .env con el siguiente contenido

  ```shell
APP_ID=tenis-api
PORT=3000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret

#Swagger
SWAGGER_API_SPEC=/spec
SWAGGER_ENABLED = true
SWAGGER_VALIDATE_REQUEST = false
  ```

## Acceso a la documentación Swagger API
* Abrir el browser en [http://localhost:3000](http://localhost:3000)
* Invocar el endpoint `/api-explorer` 
  ```shell
  curl http://localhost:3000/api-explorer
  ```