---
sidebar_position: 4
hide_table_of_contents: true
slug: /mounting-webapp-in-the-network/
---

# Setting up the Vite + React application, delving into the client.
The client application is built with ReactJS using Vite as its development tool. With just a few terminal commands, you can quickly set up and deploy the application on your network in no time! By following our instructions and utilizing the power of ReactJS and Vite, you'll experience a seamless and efficient setup process.

Make sure that, in order to use the web application correctly, it is necessary that the server is already running on the network.

```bash
# Accessing the existing <Client> folder within the cloned repository
cd Client/

# Assuming you have already installed the necessary npm packages <npm install --force>
# we will proceed to start the server in development mode
npm run dev
```

Happy hacking!... Your server should be running at `http://0.0.0.0:5173/`.

## Modifying environment variables...
In the same way in which it was done in the previous reading, the list of environment variables that the client application has in its ".env" file will be presented next, along with a description of it.


```bash
# Address where the backend server was mounted, you must
# be sure to specify in the address if you have ridden
# the server under HTTPS, changing <http> to <https> ;)
VITE_SERVER = http://0.0.0.0:8000

# The server has a suffix to be able to access its respective API
# in this case we use v1
VITE_API_SUFFIX = /api/v1

# Others...
VITE_DONATE_LINK = https://ko-fi.com/codewithrodi
VITE_GPT4FREE_LINK = https://github.com/xtekky/gpt4free
VITE_SOFTWARE_REPOSITORY_LINK = https://github.com/codewithrodi/Lovelace
```

## Modifying the port and hostname of the client's server
In case you want to modify the network address or the port that is used when launching the Vite server on the network, you can consider modifying the `vite.config.js` file. This file contains the configuration settings for the Vite server. Below are the contents of the `vite.config.js` file:

```javascript
export default defineConfig({
  plugins: [react()], 
  server: {
    // If you want to change the network address where the server will be mounted
    // you must change <0.0.0.0> to the desired one.
    host: '0.0.0.0',
    // Following the same line above, you must modify the port <5173>
    // for which you want to ride on the network.
    port: 5173
  },
  define: {
    global: {}
  }
});
```

Please note that modifying these settings should be done with caution, as it may affect the accessibility of the server. Make sure to choose a suitable network address and a port that is not already in use.

## Why is Vite used in the client application? 
Vite is a popular choice for developing web applications written in JavaScript due to its highly efficient environment. It offers significant advantages such as drastically reducing the startup time when loading new modules or compiling the source code during the development process. By leveraging Vite, developers can experience improved productivity and faster development cycles. Its speed and performance optimizations make it a valuable tool for web development projects.

## Internationalization within the Application
The web application has the ability to detect the language of the web browser from which the platform is accessed, in order to later be able to detect if there is a translation of the content available in the requested language, if it does not exist, a translation will be returned. by default, which corresponds to English.

Consider that, to add new translations, you can access `Client/src/Locale/`, where this last `Locale/` folder houses a series of JSONs which are in the following format `{LANGUAGE_IN_ISO_369}.json`; In case you want to add a new translation, you just have to follow the format and copy the respective keys whose value is updated to the desired language that you are creating.

Currently, the following translations exist within the web application: ```French - Arabic - Chinese - German - English - Spanish - Italian - Portuguese - Russian - Turkish```.

