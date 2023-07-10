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
import { 
    Select as MUISelect, 
    OutlinedInput, 
    FormControl, 
    InputLabel, 
    FormHelperText } from '@mui/material';

const Select = ({ 
    Label, 
    Value, 
    OnChange, 
    children, 
    HelperText, 
    FormControlProps, 
    SelectProps, 
    ItemBoxProps, 
    PaperProps 
}) => (
    <FormControl sx={{ m: 1, width: 300 }} {...FormControlProps}>
        <InputLabel>{Label}</InputLabel>
        <MUISelect
            size='small'
            value={Value}
            onChange={OnChange}
            input={<OutlinedInput label={Label} />}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                        backgroundColor: '#222327',
                        color: '#FFFFFF',
                        ...ItemBoxProps,
                    },
                    ...PaperProps
                }
            }}
            {...SelectProps}
        >
            {children}
        </MUISelect>
        {(HelperText) && (
            <FormHelperText>{HelperText}</FormHelperText>
        )}
    </FormControl>
);

export default Select;