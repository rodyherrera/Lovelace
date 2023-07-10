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
import { GrPowerReset } from 'react-icons/gr';
import { VscHistory } from 'react-icons/vsc';
import { FiGithub } from 'react-icons/fi';
import { Tooltip } from '@mui/material';
import { ChatContext } from '../../../Services/Chat/Context';
import { CoreContext } from '../../../Services/Core/Context';
import StoredChatResponsesViewer from '../StoredChatResponsesViewer';
import './SideMenu.css';

const SideMenu = () => {
    const { UserExperience, HandleChatReset, ServerCommunication } = useContext(ChatContext);
    const { L } = useContext(CoreContext);
    const Options = [
        {
            Title: L('CHAT_SIDE_MENU_RESET_CHAT'),
            TooltipTitle: L('TOOLTIP_RESET_CHAT'),
            Icon: GrPowerReset,
            Callback: HandleChatReset,
            DisableOnLoading: true
        },
        {
            Title: L('CHAT_SIDE_MENU_MY_ACTIVITY'),
            TooltipTitle: L('TOOLTIP_MY_ACTIVITY'),
            Icon: VscHistory,
            Container: <StoredChatResponsesViewer />,
            DisableOnLoading: true
        },
        {
            Title: L('CHAT_SIDE_MENU_GITHUB'),
            TooltipTitle: L('TOOLTIP_GITHUB'),
            Icon: FiGithub,
            Callback: () => window.open(import.meta.env.VITE_SOFTWARE_REPOSITORY_LINK, '_blank')
        }
    ]

    return (
        <section id='Chat-Side-Menu-Box' data-isloading={ServerCommunication.GetIsLoading} >
            <article id='Options-Box'>
                {Options.map(({ Title, TooltipTitle, Icon, Callback, DisableOnLoading, Container }, Index) => (
                    <div className='Option-Group' key={Index} data-disableonloading={DisableOnLoading}>
                        <Tooltip title={TooltipTitle} placement='right'>
                            <div className='Option-Box' onClick={Callback}>
                                <i>
                                    <Icon />
                                </i>
                                <span>{Title}</span>
                            </div>
                        </Tooltip>
                        <div className='Option-Container-Box'>
                            {Container}
                        </div>
                    </div>
                ))}
            </article>
            <article id='Software-Info-Box'>
                <Tooltip title={L('TOOLTIP_SIDE_MENU_SETTINGS')} placement='top'>
                    <button 
                        className='Button Outlined Shine-Effect' 
                        onClick={() => UserExperience.SetIsSettingsMenuActive(true)}
                    >{L('CHAT_SIDE_MENU_SETTINGS')}</button>
                </Tooltip>
                <p id='I-Message'>{L('CHAT_SIDE_MENU_BOTTOM_MSG')}</p>
            </article>
        </section>
    );
};

export default SideMenu;