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

import React from 'react';
import ReactDOM from 'react-dom/client';
import ScrollToTop from './Components/General/ScrollToTop.jsx';
import Application from './Application.jsx';
import * as EvergreenUI from 'evergreen-ui';
import { MultiProvider } from 'react-pendulum';
import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './Services/Chat/Context.jsx';
import { CoreProvider } from './Services/Core/Context.jsx';
import { MergeObjectValues } from './Utilities/Algorithms.js';
import './Assets/StyleSheets/General.css';

const EvergreenTheme = MergeObjectValues(EvergreenUI.defaultTheme, {
    colors: { blue500: '#FFFFFF' }
});

ReactDOM.createRoot(document.getElementById('Lovelace-ROOT')).render(
    <MultiProvider
        providers={[
            <BrowserRouter />,
            <CoreProvider />,
            <ChatProvider />,
            <EvergreenUI.ThemeProvider value={EvergreenTheme} />,
            <ScrollToTop />
        ]}  
    >
        <Application />
    </MultiProvider>
);