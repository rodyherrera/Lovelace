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

import React, { useContext, useEffect } from 'react';
import RenderResponse from '../RenderResponse';
import WaitingResponse from '../WaitingResponse';
import UseAnimations from 'react-useanimations';
import Infinity from 'react-useanimations/lib/infinity';
import Loading from 'react-useanimations/lib/loading2';
import Fade from 'react-reveal/Fade';
import { ChatContext } from '../../../Services/Chat/Context';
import { IconButton, Tooltip } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { BsRobot } from 'react-icons/bs';
import { CoreContext } from '../../../Services/Core/Context';
import './ChatViewer.css';

const ChatViewer = ({ ChatNodeReference }) => {
    const { ServerCommunication, SubmitPrompt, Settings } = useContext(ChatContext);
    const { L } = useContext(CoreContext);

    return (
        <article id='Chat-Viewer-Box' data-isloading={ServerCommunication.GetIsLoading || !ServerCommunication.GetIsWebSocketConnected}>
            <div id='Chat-History-Box' ref={ChatNodeReference}>
                <Fade clear>
                    <div id='Software-Presentation-Box'>
                        <i>
                            <BsRobot />
                        </i>
                        <div>
                            <p>{L('CHAT_VIEWER_WELCOME_TITLE')}</p>
                            <p>{L('CHAT_VIEWER_INSPIRATION')}</p>
                            <div id='Software-Presentation-Recommendation-Box'>
                                {[
                                    L('CHAT_VIEWER_INSPIRATION_QUANTUM_COMPUTING'),
                                    L('CHAT_VIEWER_INSPIRATION_DOPAMINE_ALTERED'),
                                    L('CHAT_VIEWER_INSPIRATION_PI_DISCOVERED'),
                                    L('CHAT_VIEWER_INSPIRATION_GOOGLE_V8_ENGINE')
                                ].map((Suggestion, Index) => (
                                    <div className='Suggestion-Box' onClick={() => SubmitPrompt(Suggestion)} key={Index}>
                                        <span className='Suggestion'>{Suggestion}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Fade>
                {(ServerCommunication.GetAPIResponses).map(({ Discipline, Answer }, Index) => (
                    <RenderResponse Content={Answer} Discipline={Discipline} key={Index} /> ))}
                {(Object.keys(ServerCommunication.GetStreamedResponses).map((Prompt, Index) => (
                    <React.Fragment key={Index}>
                        <RenderResponse Content={Prompt} Discipline='Client' />
                        <RenderResponse Content={ServerCommunication.GetStreamedResponses[Prompt].Response} Discipline='Server' />
                    </React.Fragment>
                )))}
                {(ServerCommunication.GetIsLoading && Settings.GetCommunicationMode === 'API') && ( <WaitingResponse /> )}
            </div>
            
            <Fade {...{ [(window.innerWidth > 768) ? ('bottom') : 'top']: true }}>
                <div id='Chat-Bottom-Box'>
                    <Tooltip title={L('TOOLTIP_CHAT_INPUT')}>
                        <div id='Chat-Input-Box'>
                            <input
                                id='Chat-Input'
                                type='text'
                                onKeyUp={(Event) => (Event.key === 'Enter' || Event.keyCode === 13) && (SubmitPrompt())}
                                name='Prompt'
                                disabled={ServerCommunication.GetIsLoading}
                                value={ServerCommunication.GetPrompt}
                                onChange={(Event) => ServerCommunication.SetPrompt(Event.target.value)}
                                placeholder={(!ServerCommunication.GetIsLoading && ServerCommunication.GetIsWebSocketConnected) 
                                        ? (L('CHAT_INPUT_BOX_PLACEHOLDER')) : (
                                            (ServerCommunication.GetIsLoading) 
                                                ? ('Please wait while the request is resolved...')
                                                : ('Establishing communication with the server, please wait...')
                                        )}
                            />
                            <i id='Input-Decoration-Box'>
                                {(ServerCommunication.GetIsLoading || !ServerCommunication.GetIsWebSocketConnected) ? (
                                    <UseAnimations 
                                        animation={(ServerCommunication.GetIsLoading) ? (Infinity) : (Loading)} 
                                        id='Chat-Right-Icon' 
                                        size={28} 
                                        strokeColor='#FFFFFF' />
                                ) : (
                                    <IconButton size='small' onClick={() => SubmitPrompt()}>
                                        <AiOutlineSend />
                                    </IconButton>
                                )}
                            </i>
                        </div>
                    </Tooltip>
                </div>
            </Fade>

        </article>
    );
};

export default ChatViewer;