<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run Docker

How to Build and Run
Ensure You Have Docker Installed

Download and install Docker if you haven’t already.
Clone or Navigate to Your Project

1. Build the app

```
docker build -t nestjs-app .
```

2. Run all containers

```
docker run -p 3000:3000 nestjs-app
```

Open your browser or an API client (like Postman) and go to http://localhost:3000.

Environment Variables (Optional)

If you have environment variables (e.g., MONGODB_URI, JWT_SECRET), you can pass them at runtime:

```
docker run -p 3000:3000 \
-e MONGODB_URI="your_mongodb_connection_string" \
-e JWT_SECRET="your_secret_key" \
nestjs-app
```

Alternatively, you can bake them into the image by copying a .env file, but this is generally not recommended for sensitive data.
Stopping the Container


Purging all Images, Containers, Volumes, and Networks

```
docker system prune -a -f
```

If a Docker Container is Using Some Port
List Running Containers:

`docker ps`
Look for a container that maps port 3000 (e.g., it will show something like 0.0.0.0:3000->3000/tcp).

Stop the Container:
Use the container ID or name from the previous step:

```docker stop <container_id_or_name>```
