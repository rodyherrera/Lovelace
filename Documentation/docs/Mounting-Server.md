---
sidebar_position: 3
hide_table_of_contents: true
slug: /mounting-server-in-the-network/
---

# Riding the Lovelace Backend and going geeper into it.
Once the repository has been cloned and you have subsequently installed the necessary Server and Client NPM modules, it is time to set up the backend to start using the software.

Let's start with the server, this is where the magic will happen, you can communicate with the AI ​​through API requests or using WebSocket's; Next, you will be presented with the series of commands to be able to mount the server within the network.

```bash
# Accessing the <Server> folder that houses the repository you cloned earlier
cd Server/

# Running the server in Production mode
npm run production
```

If you have done everything correctly, the server should already be running on your system. You can check it if you access `http://0.0.0.0:8000/api/v1/`!

## Other ways to raise the server...

| Script (`npm run <script_name>`) | Description |
| ------ | ------ |
| start |The normal execution of the server begins, you can consider this option in case you want to mount it in production. |
| dev | Start the execution of the server in development mode with the help of the "nodemon" package.|

## What about environment variables?
You should know that environment variables are dynamic character values, which allow you to store information related to credentials, configurations, etc..., then you will be presented with the ".env" file located within the server's source code, where in turn you will have a description about the operation of the available variables.

```bash
# Specifies the execution mode of the server, considers the value of <NODE_ENV>
# can be <development> and <production>.
NODE_ENV = production

# Address of the server where the client application is running.
CLIENT_HOST = https://lovelace.codewithrodi.com/

# Port where the server will 
# start executing over the network.
SERVER_PORT = 8000

# Hostname where the server will be launched in 
# complement with the previously established 
# port on the network.
SERVER_HOST = 0.0.0.0

# If you have an SSL certificate, you must 
# specify the certificate and then the key.
SSL_CERT = 
SSL_KEY = 

# Others...
CORS_ORIGIN = *
BODY_MAX_SIZE = 100kb
```

Assuming that at this point in the reading you already have the backend server set up on the network, we can continue to set up the client's server, where, in this way, you can start interacting with the AI ​​through the website that you will configure next...