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

export const MergeObjectValues = (To, From) => {
    for(const Value in From){
        if(typeof To[Value] != 'object')
            To[Value] = From[Value];
        else if(typeof From[Value] === 'object')
            To[Value] = MergeObjectValues(To[Value], From[Value]);
    }
    return To;
};

export const ReplaceURLParameters = (URL, Parameters = []) => (
    URL.split(':').map((Value) => (Value.startsWith('/') && Value.endsWith('/')) ? (Value) : (Parameters.shift()))
).join('');

export const FormatChatResponseListDate = (ToFormatDate) => new Date(Date.UTC(...ToFormatDate.split('-'))
    ).toLocaleString(navigator.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });