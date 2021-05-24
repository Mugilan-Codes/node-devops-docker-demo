# node-devops-docker-demo

## Practicing Node Devops with Docker

[Devops with Docker and Node.js Youtube Playlist](https://www.youtube.com/playlist?list=PL8VzFQ8k4U1JEu7BLraz8MdKJILJir7oY)

### Commands

- Build App Image

  ```sh
  docker build -t node-devops-docker-demo-image .
  ```

- Run a Container (port fowarding, bind mount(read-only), and anonymous volume)

  ```sh
  docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:4000 --env-file ./.env -d --name node-devops-docker-demo node-devops-docker-demo-image
  ```

- Access FileSystem

  ```sh
  docker exec -it node-devops-docker-demo bash
  ```

- Exit FileSystem

  ```sh
  exit
  ```

- Forcefully Remove a container with volume

  ```sh
  docker rm node-devops-docker-demo -fv
  ```

- Using Docker Compose

  - Build App

    ```sh
    docker-compose up -d
    ```
  
  - use this if there is a change in image (Dockerfile)

    ```sh
    docker-compose up -d --build
    ```

  - Delete App

    ```sh
    docker-compose down -v
    ```

  - Development docker-compose command

    - up
  
      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

      # force re-build image for changes
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

      # re-build image without downing the container and renewing volumes
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V
      ```

    - down

      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

      # don't remove volumes
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
      ```

  - Production docker-compose command

    - up
  
      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

      # force re-build image for changes
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
      ```

    - down

      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v

      # don't remove volumes
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
      ```

- Open MongoDB directly

  ```sh
  docker exec -it node-devops-docker-demo_mongodb_1 mongo -u "mugil" -p "mypassword"
  ```

  **note**: Don't pass in `-v` flag to remove the volumes when using databases as it would ultimately remove all volumes, Instead start up the containers and run `docker volume prune` to remove unused volumes.

- Get network details of container

  ```sh
  docker inspect <container_name>
  ```

  **note**: you can directly use the service name from docker-compose instead of using the ipAddress(works only for the services created/declared in docker-compose).
