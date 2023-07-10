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

const Https = require('https');
const Http = require('http');
const { CapitalizeToLowerCaseWithDelimitier } = require('./Algorithms');

exports.StandarizedBindingToApplication = ({ Application, Routes, Suffix, Middlewares, Settings }) => {
    (Middlewares).forEach((Middleware) => (
        Application.use(...[((Array.isArray(Middleware)) 
            ? ((typeof Middleware[0] === 'string') ? (Middleware[0], Middleware[1]) 
            : (Middleware[0](Middleware[1])))
            : (Middleware()))])
    ));
    (Routes).forEach((Route) => (
        Application.use(Suffix + CapitalizeToLowerCaseWithDelimitier(Route), require(`../Routes/${Route}`))
    ));
    (Settings.Deactivated).forEach((DeactivatedSetting) => Application.disabled(DeactivatedSetting));
}

exports.GetConfiguredHTTPServerInstance = (Application) => {
    Http.globalAgent.maxSockets = Https.globalAgent.maxSockets = Infinity;
    const SSL = [process.env.SSL_CERT, process.env.SSL_KEY];
    return ((SSL[0]) ? (Https.createServer) : (Http.createServer))({
        key: (SSL[0]) ? (FileSystem.readFileSync(SSL[0])) : (undefined),
        cert: (SSL[1]) ? (FileSystem.readFileSync(SSL[1])) : (undefined)
    }, Application);
};