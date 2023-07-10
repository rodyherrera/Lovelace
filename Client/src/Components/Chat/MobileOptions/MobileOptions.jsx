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
import { ChatContext } from '../../../Services/Chat/Context';
import { CoreContext } from '../../../Services/Core/Context';
import { Tooltip } from '@mui/material';
import { HidingHeader } from 'hiding-header-react'
import './MobileOptions.css';
import 'hiding-header/dist/style.css'

const MobileOptions = () => {
    const { UserExperience, HandleChatReset } = useContext(ChatContext);
    const { L } = useContext(CoreContext);

    return (
        <HidingHeader>
            <section id='Mobile-Options-Box'>
                {([
                    [L('MOBILE_OPTIONS_SETTINGS'), L('TOOLTIP_SIDE_MENU_SETTINGS'), () => UserExperience.SetIsSettingsMenuActive(true)],
                    [L('MOBILE_OPTIONS_ACTIVITY'), L('TOOLTIP_MY_ACTIVITY'), () => UserExperience.SetIsMobileActivityMenuActive(true)],
                    [L('MOBILE_OPTIONS_RESET_CHAT'), L('TOOLTIP_RESET_CHAT'), HandleChatReset]
                ].map(([ Name, TooltipTitle, OnClick ], Index) => (
                    <Tooltip title={TooltipTitle} key={Index}>
                        <button className='Button Outlined No-BR' onClick={OnClick}><span>{Name}</span></button>
                    </Tooltip>
                )))}
            </section>
        </HidingHeader>
    );
};

export default MobileOptions;