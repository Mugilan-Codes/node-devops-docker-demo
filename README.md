# node-devops-docker-demo

## Practicing Node Devops with Docker

[Devops with Docker and Node.js Youtube Playlist](https://www.youtube.com/playlist?list=PL8VzFQ8k4U1JEu7BLraz8MdKJILJir7oY)

### Commands

- Build App Image

  ```sh
  docker build -t node-devops-docker-demo-image .
  ```

- Run a Container (port fowarding & binding volumes)

  ```sh
  docker run -v $(pwd):/app -p 3000:3000 -d --name node-devops-docker-demo node-devops-docker-demo-image
  ```

- Access FileSystem

  ```sh
  docker exec -it node-devops-docker-demo bash
  ```

- Exit FileSystem

  ```sh
  exit
  ```
