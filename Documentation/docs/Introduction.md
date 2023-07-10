---
sidebar_position: 1
slug: /
hide_table_of_contents: true
---

# What the hell is Lovelace?

Lovelace is a web application which allows free interaction with ChatGPT using Python's GPT4FREE library. The software is written in JavaScript, using NodeJS + [Express](https://expressjs.com/es/4x/api.html) + [SocketIO](https://socket.io/) on the server side and [Vite](https://vitejs.dev/) + [ReactJS](https://react.dev/) on the Frontend.

The backend allows different clients to communicate with ChatGPT. If your purpose with Lovelace is to use it for your own ends or purposes, you can only mount the Backend server in your network and ignore the other side of the application, that is, the client; the backend allows its interaction through the API, or you can use the connection by WebSocket using some SocketIO client.

![Lovelace's Website Presentation](/img/WebApp-Presentation.png)

Table of Contents:
- Installing necessary dependencies before proceeding with the installation. [[View]](/#before-you-start-the-installation)
- Cloning the Github repository that contains the Lovelace source code. [[View]](/installation)
- Knowing the functionality of the files and directories found within the cloned repository. [[View]](/installation#knowing-a-little-more-about-the-contents-of-the-cloned-repository)
- Running the backend server on the network. [[View]](/mounting-server-in-the-network/)
- Knowing the environment variables that the Lovelace Backend has. [[View]](/mounting-server-in-the-network/#what-about-environment-variables)
- Mounting the Lovelace Frotend built with Vite + React on the network. [[View]](/mounting-webapp-in-the-network/)
- Knowing and modifying the environment variables that the Vite + React application has (Frontend). [[View]](/mounting-webapp-in-the-network/#modifying-environment-variables)
- Modifying the host and port where the development server of the Vite + React web application (Frontend) will be mounted. [[View]](/mounting-webapp-in-the-network/#modifying-the-port-and-hostname-of-the-clients-server)
- Why was Vite selected to build the software interface? [[View]](/mounting-webapp-in-the-network/#why-is-vite-used-in-the-client-application)
- Internationalization within the web application, multiple languages ​​under the same interface! [[View]](/mounting-webapp-in-the-network/#internationalization-within-the-application)
- Learning to make requests to the API located on the backend server, in order to communicate with the AI. [[View]](/learning-how-to-use-the-api-for-interact-with-the-ai/)
- Using WebSocket's to connect to the server using SocketIO and establish communication with the AI. [[View]](/learning-how-to-use-websockets-for-interact-with-the-ai/)
- Getting to know some of the clients available from SocketIO in other technologies/programming languages. [[View]](/learning-how-to-use-websockets-for-interact-with-the-ai/#socketio-clients-to-establish-communication-with-the-server)
- Using the API to obtain the list of providers and their respective models available, both for requests to the AI ​​through the API and WebSocket's. [[View]](/available-providers-and-models/)
- An overview of the web application. [[View]](/learning-how-to-use-the-web-application/)
- Knowing the main functionalities provided by the Lovelace web application. [[View]](/learning-how-to-use-the-web-application/#about-the-options-available-at-first-glance)
- Learning to use the settings menu provided by the web application and knowing each of its features. [[View]](/learning-how-to-use-the-web-application/#whats-behind-the-settings-menu)
- Learning to use the history of interactions with the AI ​​provided by the web application. [[View]](/learning-how-to-use-the-web-application/#the-history-of-interactions-with-ada)
- Partially knowing the design of the application on mobile devices. [[View]](/learning-how-to-use-the-web-application/#a-view-of-design-within-mobile-devices)
- Video-based example of the use of the web application on computers. [[View]](/Web-App-Usage#using-the-web-application-on-desktop)
- Video-based example of the use of the web application on mobile devices. [[View]](/Web-App-Usage#using-the-web-application-on-mobile)

## Before you start the installation
Installing Lovelace on your computer or server is relatively simple, you shouldn't have any major complications in the process; however, before you start cloning the repository, make sure you have at least `NodeJS v18.0.0` and `Python v3.10`.

Consider that, in case you do not have the required NodeJS version installed on your system, you can use the version manager [`NVM (Node Version Manager)`](https://github.com/nvm-sh/nvm#installing-and-updating).

```bash
# Installing NVM on your system...
export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"

# Once NVM has been installed, we proceed to install the specified NodeJS version (> 18.0.0)
nvm install 18.0.0
```

If you don't have `Python v3.10` on your system, you might consider the following:

```bash
# (DEBIAN)
sudo add-apt-repository ppa:deadsnakes/ppa && sudo apt update && sudo apt install python3.10

# (MacOS)
brew install python@3.10
```

In the same way, consider having pip installed on your system, since it will be used when installing the necessary modules to be able to mount the backend server within the network.

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
```

Now, assuming you have the aforementioned dependencies installed on your system, we can proceed to the next step...
