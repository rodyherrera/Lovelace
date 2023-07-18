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

exports.AvailableProviders = {
    'WS': [
        'DeepAi',
        'Theb',
        'H2o',
        'DfeHub',
        'EasyChat',
        'Yqcloud',
        'You',
        'GetGpt',
        'Bing'
    ],
    'API': [
        'H2o',
        'Aichat',
        'AItianhu',
        'AiService',
        'ChatgptLogin',
        'DeepAi',
        'DfeHub',
        'EasyChat',
        'Yqcloud',
        'You',
        'GetGpt',
        'Bing'
    ]
};
exports.AvailableRoles = ['user', 'assistant', 'system'];
exports.AvailableModels = ['gpt-3.5-turbo', 'gpt-4', 'falcon-40b', 'falcon-7b', 'llama-13b'];

exports.DefaultChatParameters = {
    Model: 'gpt-3.5-turbo',
    Role: 'user',
    Provider: 'GetGpt'
};

exports.RuntimeError = class extends Error{
    constructor(Message, StatusCode, Exception){
        super(Message);
        this.Exception = Exception;
        this.StatusCode = StatusCode;
        this.Status = `${StatusCode}`.startsWith(4) ? 'Client Error' : 'Server Error';
        this.IsOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
};

exports.CatchAsync = (AsyncFunction) => (Request, Response, Next, ...Arguments) =>
    AsyncFunction(Request, Response, Next, ...Arguments).catch(Next);