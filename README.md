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
