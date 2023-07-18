/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * In the vast universe of knowledge, the Open Source philosophy 
 * shines like a radiant star. In this vein, Lovelace emerges 
 * as an autonomous alternative to ChatGPT, based on 
 * open source and self-hosting capabilities.
 * 
 * Written in JavaScript, interacting with the <g4f> library written 
 * in Python, allows communication with ChatGPT through the use 
 * of different services that facilitate its use by the public.
 * 
 * For related information - https://github.com/CodeWithRodi/Lovelace/
 * See also - https://github.com/xtekky/gpt4free
 * 
 * :: https://lovelace.codewithrodi.com/
 * :: https://lovelace-backend.codewithrodi.com/
 * :: https://lovelace-docs.codewithrodi.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

const { 
    AvailableProviders, 
    AvailableModels,
    AvailableRoles,
    DefaultChatParameters, 
    CatchAsync, 
    RuntimeError } = require('../Utilities/Runtime');
const { GPT, CollectProviders } = require('../Tools/GPT');

const SanitizedClientQuery = (Query, CommunicationMode, Next) => {
    // TODO: Add a maximum length for prompt.
    let { Model, Role, Provider, Messages, Prompt } = Query;
    (!Model) && (Model = DefaultChatParameters.Model);
    (!Role) && (Role = DefaultChatParameters.Role);
    (!Provider) && (Provider = DefaultChatParameters.Provider);
    (!Array.isArray(Messages) || !Messages) && (Messages = [ { Role, Content: Prompt } ])
    Model = Model.toLowerCase();
    Role = Role.toLowerCase();
    if(
        !AvailableProviders[CommunicationMode].includes(Provider) ||
        !AvailableRoles.includes(Role) ||
        !AvailableModels.includes(Model)
    ){
        // TODO: Add a API Controller that envolves all Lovelace 
        // TODO: Backend Error IDs, with a description of it.
        const ErrorID = 'Chat::Invalid::Parameter';
        return Next((CommunicationMode === 'API')
            ? (new RuntimeError(ErrorID)) : (ErrorID));
    }
    return { Messages, Model, Provider };
};

// TODO: Add a <GetSettings || Related Function Name> for retrieve
// TODO: the available models and roles, including providers.
exports.GetProviders = CatchAsync(async (_, Response, Next) => {
    try{
        const Providers = await CollectProviders();
        Response.status(200).json({ Status: 'Success', Data: JSON.parse(Providers) });
    }catch({ ErrorID, Exception }){
        Next(new RuntimeError(ErrorID, 500, Exception));
    }
});

exports.HandleCompletion = CatchAsync(async (Request, Response, Next) => {
    const { Model, Messages, Provider } = SanitizedClientQuery(Request.body, 'API', Next);
    try{
        const Answer = await GPT({ Model, Messages, Provider }, 'API');
        Response.status(200).json({ Status: 'Success', Data: { Answer } });
    }catch({ ErrorID, Exception }){
        Next(new RuntimeError(ErrorID, 500, Exception));
    }
});

exports.HandleStreamedResponse = (WebSocket) => {
    // TODO: Is this the correct way of do it?, Can it generate an eventually Callback Hell?
    WebSocket.on('connection', (Socket) => {
        Socket.on('Prompt', async (Query, Callback) => {
            const { Model, Messages, Provider } = SanitizedClientQuery(Query, 
                    'WS', (ErrorID) => Socket.emit('Response', ErrorID));
            let GPTError = null;
            try{
                await GPT({ Model, Messages, Provider }, 
                    'WS', (Answer) => Socket.emit('Response', Answer));
            }catch(Exception){
                GPTError = Exception;
            }finally{
                (Callback) && (Callback(GPTError));
            }
        });
    });
};