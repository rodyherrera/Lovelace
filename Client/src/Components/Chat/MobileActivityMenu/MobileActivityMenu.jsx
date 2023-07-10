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

import React, { useContext, useRef } from 'react';
import { ChatContext } from '../../../Services/Chat/Context';
import { IconButton } from '@mui/material';
import { VscClose } from 'react-icons/vsc';
import StoredChatResponsesViewer from '../StoredChatResponsesViewer';
import './MobileActivityMenu.css';

const MobileActivityMenu = () => {
    const MobileActivityContentBoxReference = useRef(null);
    const { UserExperience } = useContext(ChatContext);

    return (
        <aside id='Mobile-Activity-Menu' onClick={(Event) => (MobileActivityContentBoxReference.current 
            && !MobileActivityContentBoxReference.current.contains(Event.target)
            && !document.querySelector('div[evergreen-portal-container]')?.contains(Event.target)) 
                && (UserExperience.SetIsMobileActivityMenuActive(false))}>
            <div id='Mobile-Activity-Content-Box' ref={MobileActivityContentBoxReference}>
                <div id='Mobile-Activity-Header-Box'>
                    <h3 id='Mobile-Activity-Title'>Your Activity</h3>
                    <IconButton id='Mobile-Activity-Icon-Box' onClick={() => UserExperience.SetIsMobileActivityMenuActive(false)}>
                        <VscClose />
                    </IconButton>
                </div>

                <StoredChatResponsesViewer />
            </div>
        </aside>
    );
};

export default MobileActivityMenu;