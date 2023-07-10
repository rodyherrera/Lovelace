---
sidebar_position: 5
hide_table_of_contents: true
slug: /learning-how-to-use-the-api-for-interact-with-the-ai/
---

# Using the API provided by the backend to interact with the AI.
If your intention is to utilize Lovelace for your individual needs and objectives, you may disregard the Client application implemented in ReactJS. Instead, divert your attention towards the Server, as it is where the enchantment truly takes place.

Keep in mind that when communicating with the backend using the API or WebSocket's, the data sent as `Model or Role` is not case-sensitive, that is, if the value of `Model` is `gPT-3.5-TUrbO` will not matter, since it will be formatted from the backend, the `Prompt` is obviously not important either, but the value assigned to `Provider` is, in later readings you will learn how to obtain the available providers to be able to use when establishing an interaction with the AI, in the same way that you will be able to know what their respective models are, or you can now access the same path [`/api/v1/chat/providers/`](https://lovelace-backend.codewithrodi.com/api/v1/chat/providers/) of the public instance of the lovelace backend and view the information.

Here's an example using the API via the native Fetch function:
```javascript
const Data = {
    // Select the model you want to use for the request.
    // <GPT-3.5-Turbo> | <GPT-4> 
    Model: 'GPT-3.5-Turbo', // Recommended Model
    // Use a provider according to the model you used, consider
    // that you can see the list of providers next to the models
    // that have available in:
    // [GET REQUEST]: http://lovelace-backend.codewithrodi.com/api/v1/chat/providers/
    Provider: 'GetGpt', // Recommended Provider, you can also use 'DeepAi'
    // GPT Role
    Role: 'User',
    // Prompt that you will send to the model
    Prompt: 'Hi Ada, Who are you?'
};

// Note that if you want to use your own instance replace
// <https://lovelace-backend.codewithrodi.com> for the address
// from your server, or <http://0.0.0.0:8000> in case it is
// is running locally.
const Endpoint = 'https://lovelace-backend.codewithrodi.com/api/v1/chat/completions';

// We will make the request with the Fetch API provided in a way
// native by JavaScript, specified in the first instance
// the endpoint where our request will be made, while as a second
// parameter we specify by means of an object the method, the header and the
// body that will have the request.
fetch(Endpoint, {
    // /api/v1/chat/completions/
    method: 'POST',
    // We are sending a JSON, we specify the format
    // in the request header
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)
})
    // We transform the response into JSON
    .then((Response) => Response.json())
    // Once the response has been transformed to the desired format, we proceed
    // to display the response from the AI ​​in the console.
    .then((Response) => console.log(Response.Data.Answer))
    // Consider that <Response> has the following structure
    // Response -> { Data: { Answer: String }, Status: String(Success | ClientError) }
    .catch((RequestError) => console.error(RequestError));
```

In case you want to use Axios when making the communication, you can consider:

```javascript
const Axios = require('axios');

const Data = {
    Model: 'GPT-3.5-Turbo', // Recommended Model
    Provider: 'GetGpt', // Recommended Provider, you can also use 'DeepAi'
    // GPT Role
    Role: 'User',
    Prompt: 'Hi Ada, Who are you?'
};

const Endpoint = 'https://lovelace-backend.codewithrodi.com/api/v1/chat/completions';

(async function(){
    const Response = (await Axios.post(Endpoint, Data, { headers: { 'Content-Type': 'application/json' } })).data;
    console.log(Response.Data.Answer);
})();
```

You can see how the client communicates with the backend via the API by looking at the `Client/src/Services/Chat/Context.jsx` and `Client/src/Services/Chat/Service.js` files, where magic happens.