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

import React, { useContext } from 'react';
import { MenuItem, Tooltip } from '@mui/material';
import { CoreContext } from '../../../Services/Core/Context';
import { GetAvailableLocales } from '../../../Locale';
import Select from '../Select';
import './LanguageSelect.css';

const LanguageSelect = () => {
    const { GetSelectedLanguage, SetSelectedLanguage, L } = useContext(CoreContext);

    return (
        <Tooltip title={L('TOOLTIP_LANGUAGE_SELECT')} placement='right'>
            <div>
                <Select
                    OnChange={(Event) => SetSelectedLanguage(Event.target.value)}
                    Value={GetSelectedLanguage}
                    ItemBoxProps={{ width: 64,  }}
                    FormControlProps={{ id: 'Language-Select-Box' }}
                    PaperProps={{ id: 'Language-Select-Paper-Box' }}
                >
                    {(GetAvailableLocales).map((Locale, Index) => (
                        <MenuItem key={Index} value={Locale}>{Locale}</MenuItem>
                    ))}
                </Select>
            </div>
        </Tooltip>
    );
};

export default LanguageSelect;