---
sidebar_position: 6
hide_table_of_contents: true
slug: /learning-how-to-use-websockets-for-interact-with-the-ai/
---

# Using WebSocket's to establish efficient communication with the AI ​​through the backend.
From the backend server, a WebSocket's server is provided with the help of SocketIO, so it is recommended to use a client provided by the same library, such as `npm i socket.io-client` in the case of NodeJS. It is recommended to use this type of communication if you want an "instantaneous" response, since the response from the AI, unlike using communication via API, you should not wait for the AI ​​to finish processing the response in order to be displayed. . Using WebSocket's the response from the AI ​​is transmitted in parts, generating an interaction with the client instantly.

```javascript
const { io } = require('socket.io-client');

// Using the NodeJS 'readline' module, like this
// allow <Prompts> to be created by the user
// to our console application.
const ReadLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// We store the address where the Lovelace backend is mounted.
// In case your instance is running locally
// you can change the value of <Endpoint> to something like <http://0.0.0.0:8000>.
const Endpoint = 'http://lovelace-backend.codewithrodi.com/';

(async function(){
    const Socket = io(Endpoint).connect();
    console.log(`Connecting to the server... [${Endpoint}]`);

    Socket.on('connect', () => {
        console.log('Connected, happy hacking!');
        RunApplicationLoop();
    });

    Socket.on('disconnect', () => {
        console.log('\nDisconnected, bye bye...!');
        process.exit(0);
    });

    // We use <process.stdout.write(...)> instead of <console.log(...)> because
    // in this way we print directly to the console without each time
    // that a part of the response is received, a new line (\n) is executed.
    Socket.on('Response', (StreamedAnswer) => process.stdout.write(StreamedAnswer));

    const BaseQuery = {
        // We indicate the model that we want to use to communicate with the AI
        // 'GPT-3.5-Turbo' - 'GPT-4'
        Model: 'GPT-3.5-Turbo',
        // Provider to use in the communication, keep in mind that not all
        // providers offer ChatGPT 3.5 or ChatGPT 4. You can make a request
        // [GET] to <https://lovelace-backend.codewithrodi.com/api/v1/chat/providers/>
        Provider: 'GetGpt',
        Role: 'User',
    };

    const HandleClientPrompt = () => new Promise((Resolve, Reject) => {
        const HandleStreamedResponseEnd = (MaybeError) => {
            if(MaybeError){
                return Reject(MaybeError);
            }
            Resolve();
        };

        ReadLine.question('Prompt > ', (Prompt) => {
            // We issue <Prompt> to the server, where as the second parameter
            // send the Query to it, specifying the Model, Provider, Role and Prompt.
            // The last parameter corresponds to the Callback that will be called
            // once the transmission of the response is finished, consider that this
            // callback receives a parameter, which corresponds to whether there is an error
            // or not during transmission, its content is therefore the error.
            Socket.emit('Prompt', { Prompt, ...BaseQuery }, HandleStreamedResponseEnd);
        });
    });

    const RunApplicationLoop = async () => {
        while(true){
            await HandleClientPrompt();
            console.log('\n');
        }
    };
})();
```

## SocketIO clients to establish communication with the server

If you want to establish communication with the Lovelace Backend through WebSocket's in another language than the one presented, you can consider:
- [NodeJS Socket.IO Client](https://www.npmjs.com/package/socket.io-client): Realtime application framework (client).
- [Python Socket.IO Client](https://python-socketio.readthedocs.io/en/latest/client.html): The Socket.IO Client.
- [Rust Socket.IO Client](https://crates.io/crates/rust_socketio): An implementation of a socketio client written in rust.
- [C++ Socket.IO Client](https://github.com/socketio/socket.io-client-cpp): C++11 implementation of Socket.IO client.
- [Go Socket.IO Client](https://github.com/hesh915/go-socket.io-client): go-socket.io-client is an client implementation of socket.io in golang, which is a realtime application framework.
- [C# Socket.IO Client](https://github.com/doghappy/socket.io-client-csharp): An elegant socket.io client for .NET, it supports socket.io server v2/v3/v4, and has implemented http polling and websocket.
- [Swift Socket.IO Client](https://github.com/socketio/socket.io-client-swift): Socket.IO-client for iOS/OS X.
- [Dart Socket.IO Client](https://pub.dev/packages/socket_io_client): Port of awesome JavaScript Node.js library - Socket.io-client v2.0.1~v3.0.3 - in Dart.
- [Kotlin Socket.IO Client](https://medium.com/@thushenarriyam/socket-io-connection-on-android-kotlin-to-node-js-server-71b218c160c9): Socket.io Connection on Android Kotlin to Node.js Server.