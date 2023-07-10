---
sidebar_position: 7
hide_table_of_contents: true
slug: /available-providers-and-models/
---

# Using the API to get the list of available providers and models.
Consider that, despite the fact that the `GPT4FREE` python library is used within the backend, the latter's providers are different from those offered by Lovelace. You can obtain the list of available providers using the API, where you will obtain information such as the models that it allows to use, the web address where the service is hosted and the name that must be specified when interacting with the AI ​​as you have seen in the examples. previous (API, WS).

The response you should get from `https://lovelace-backend.codewithrodi.com/api/v1/chat/providers/` should be:
```json
{
   "Status":"Success",
   "Data":{
      "Providers":{
        // List of providers available to use on WebSocket's
        "WS":[
            {
                // Name to specify when making the query
                "Name":"DeepAi",
                // Web address where the service is hosted
                "Website":"https://deepai.org",
                // Available models
                "Models":["gpt-3.5-turbo"]

            },
            // ! Others WebSocket's providers...
            { "Name":"Theb", "Website":"https://theb.ai", "Models":["gpt-3.5-turbo"] },
            { "Name":"Yqcloud", "Website":"https://chat9.yqcloud.top/", "Models":["gpt-3.5-turbo"] },
            { "Name":"You", "Website":"https://you.com", "Models":["gpt-3.5-turbo"] },
            { "Name":"GetGpt", "Website":"https://chat.getgpt.world/", "Models":["gpt-3.5-turbo"] }
        ],
        // List of Providers available to be able to use through the API
        "API":[
            {
                // Name to specify when making the query
                "Name":"Aichat",
                // Web address where the service is hosted
                "Website":"https://chat-gpt.org/chat",
                // Available models
                "Models":["gpt-3.5-turbo"]
            },
            // ! Others API providers...
            { "Name":"ChatgptLogin", "Website":"https://chatgptlogin.ac", "Models":["gpt-3.5-turbo"] },
            { "Name":"DeepAi", "Website":"https://deepai.org", "Models":["gpt-3.5-turbo"] },
            { "Name":"Yqcloud", "Website":"https://chat9.yqcloud.top/", "Models":["gpt-3.5-turbo"] },
            { "Name":"You", "Website":"https://you.com", "Models":["gpt-3.5-turbo"] },
            { "Name":"GetGpt", "Website":"https://chat.getgpt.world/", "Models":["gpt-3.5-turbo"] }
        ]
      }
   }
}
```

As you have seen, the list of providers is divided into 2 parts, one for those queries made through the API while for those that use WebSocket's.

## Getting the list of providers from JavaScript...
Unlike other examples where requests to the Lovelace backend server are involved, obtaining the list of providers and their respective available models is quite an easy task, since we only have to send a [GET] request to `/api/v1 /chat/providers/`, where the response will be the JSON that was shown to you previously.

For the following example, we'll use Axios within NodeJS, which you can install using the NPM package manager using the `npm i axios` command.

```javascript
const Axios = require('axios');

(async function(){
    // Consider that, you can replace <https://lovelace-backend.codewithrodi.com> with
    // the address where your backend server is mounted. If the latter is
    // running locally on your network, you can use <http://0.0.0.0:8000> in case
    // that you haven't modified the default configuration.
    const Endpoint = 'https://lovelace-backend.codewithrodi.com/api/v1/chat/providers/';
    try{
        // Making the request, and accessing the response after it
        // it has been completed.
        const Response = (await Axios.get(Endpoint)).data;
        // Response -> { Status: String(Success | ClientError), Data: { Providers: Object } }

        // Displaying the providers in the terminal.
        console.log(Response.Data.Providers);
    }catch(RequestError){
        console.error(RequestError);
    }
})();
```

Or, if you want to use the native JavaScript Fetch feature and experiment right now in your web browser's console, you might consider:

```javascript
const Endpoint = 'https://lovelace-backend.codewithrodi.com/api/v1/chat/providers/';

fetch(Endpoint)
    .then((Response) => Response.json())
    .then((Response) => console.log(Response.Data.Providers))
    .catch((RequestError) => console.error(RequestError));
```