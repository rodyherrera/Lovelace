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

import React, { createContext, useState, useEffect } from 'react';
import * as Service from './Service';

export const CoreContext = createContext();

export const CoreProvider = ({ children }) => {
    const [GetSelectedLanguage, SetSelectedLanguage] = useState(Service.StoredLocalStorageSettings()?.Language || Service.ClientLanguage);
    const [GetIsLovelaceAnimationEnabled, SetIsLovelaceAnimationEnabled] = useState(true);
    const [GetLocales, SetLocales] = useState({});

    // ! Shortcut for retrieve value from locales using key
    const L = (Key) => GetLocales?.[Key] || Key;

    useEffect(() => {
        Service.StoreLocalStorageSettings({ Language: GetSelectedLanguage });
        SetLocales(Service.GetLocalesFromLanguage(GetSelectedLanguage));
    }, [GetSelectedLanguage]);

    useEffect(() => {
        return () => {
            SetSelectedLanguage('');
            SetLocales({});
            SetIsLovelaceAnimationEnabled(false);
        };
    }, []);

    return (
        <CoreContext.Provider
            value={{
                GetSelectedLanguage,
                SetSelectedLanguage,
                GetIsLovelaceAnimationEnabled,
                SetIsLovelaceAnimationEnabled,
                L
            }}
        >

            {children}
        </CoreContext.Provider>
    );
};