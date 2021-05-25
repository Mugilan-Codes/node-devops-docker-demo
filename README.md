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

      # re-build image without downing the container and re creating anonymous volumes
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V

      # scale the number of instances
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2
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

- Open Redis CLI

  ```sh
  docker exec -it node-devops-docker-demo_redis_1 redis-cli
  ```

  - View Session Keys

    ```sh
    KEYS *
    ```

  - Get Session Details

    ```sh
    GET <session_key>
    ```

### Steps to Production

- Create Ubuntu Server on Cloud Platforms like **Digital Ocean** (I am using this one), AWS, etc..
- Create a Droplet
- Copy the IP Address of the Droplet provided
- Open a terminal in your computer and SSH into the droplet

  ```sh
  ssh root@<ip_address_of_droplet_here>
  ```

- Type in `yes` to conntinue connecting
- Type in your root password that you used while creating the droplet
- Install docker engine in the droplet

  ```sh
  curl -fsSL https://get.docker.com -o get-docker.sh

  sh get-docker.sh
  ```

- Install docker-compose by following instructions in the official documentation for linux

  ```sh
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

  sudo chmod +x /usr/local/bin/docker-compose
  ```

- Set Environment Variables

  ```sh
  export <key>=<value>
  ```

- Show all Env variables

  ```sh
  printenv
  ```

- Instead of individually adding env variables, setup .env file and add the .env variables into it

  ```sh
  vi .env
  ```

- Open `.profile` and add this at the bottom

  ```sh
  vi .profile
  ```

  ```vim
  <!-- Removed the lines for brevity -->

  set -o allexport; source /root/.env; set +o allexport 
  ```

- Create a directory and move into it

  ```sh
  mkdir app

  cd app
  ```

- Clone the Git repo in this folder and pull whenever there is a change

  ```sh
  git clone <git_repo_url> .
  ```

  **Note**: This works with public repo. If you want to work with private repos, check [Deploy Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys) section or [How to clone your private repository from GitHub to server, Droplet, VDS, etc?](https://dev.to/koddr/quick-how-to-clone-your-private-repository-from-github-to-server-droplet-vds-etc-39jm)

- Run the production docker-compose command

  ```sh
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

  # do this to see any changes made
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

  # rebuild only necessary service to avoid checking other containers unneccessarily
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build node-app

  # when you don't want to check for dependencies
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app

  # force rebuild containers even when there is no change
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate node-app

  # force rebuild containers even when there is no change without dependecies
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app
  ```

- Make requests to `http://<ip_address_of_the_droplet>/` routes

- Push Images to docker to avoid building images on production server. Create a repo in `dockerhub`

  - Tag the local image with the name of that of the remote image
  
    ```sh
    docker tag <local_image> <username/remote_dockerhub_repo_name>    
    ```

  - Push the tagged image to dockerhub

    ```sh
    docker push <username/remote_dockerhub_repo_name>
    ```

#### Docker Images

- [node](https://hub.docker.com/_/node)
- [mongo](https://hub.docker.com/_/mongo)
- [redis](https://hub.docker.com/_/redis)
- [nginx](https://hub.docker.com/_/nginx)

#### DOCS

- [Express behind proxies](https://expressjs.com/en/guide/behind-proxies.html)
- [Docker Script for Ubuntu](https://get.docker.com/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)
