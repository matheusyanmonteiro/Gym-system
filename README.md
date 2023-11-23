# Welcome to the api (back-end) of a generic gymPass.

## running local:

This project it was designed for run into a Docker container. But if you want to run local you have to do this steps

1. Install postgress in your computer.
2. Config the envs using ```.env.example```.
3. run the command ```npx prisma migrate dev```.
    3.1. If you don't have the prisma folder run ```npx prisma generate```.
4. install the node_modules ```npm i | npm install | yarn (not recommend )```.
5. run the command ```npm run dev-local```.

The correct way to start this project is ```docker compose up --build | docker-compose up --buld```


## testing 

The test is a simple command already configured into *package.json* 
1. For unity test ```npm run test```.
2. For E2E test ```npm run test:e2e```.

Remember has another options into *package.json* for run this test, if you run *test:e2e:covarage*, any modification in `prisma/vitest-environment-prisma` you have to do npm link into the project manually.