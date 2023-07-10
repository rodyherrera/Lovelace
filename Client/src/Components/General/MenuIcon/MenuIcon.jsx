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
import './MenuIcon.css';

const MenuIcon = ({ IsActive, ...Props }) => (
    <div id='Menu-Icon-Box'>
        <label className='Toggle'>
            <input
                readOnly={true}
                checked={IsActive} 
                type='checkbox' {...Props} />
            <div>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <svg>
                    <use xlinkHref="#Path" />
                </svg>
                <svg>
                    <use xlinkHref="#Path" />
                </svg>
            </div>
        </label>
                
        <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
            <symbol xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44' id='Path'>
                <path d='M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22'></path>
            </symbol>
        </svg>
    </div>
);

export default MenuIcon;