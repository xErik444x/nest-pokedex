<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

> Node version v21.6.2

# Dev build
1. Clonar el repo

2. Ejecutar
```
pnpm i 
o
npm i
```

3. Tener NestCLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Llenar valores del __.env__

7. Ejecutar la aplicación
```
npm run start:dev
```
7. Opcional, llenar la base de datos
```
localhost:3000/api/v2/seed
```
## Stacks
* MongoDB
* Nest