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
import { BsRobot } from 'react-icons/bs';
import { TbBrandRedhat } from 'react-icons/tb';
import { With } from '../../../Utilities/Runtime';
import { CopyBlock, dracula } from 'react-code-blocks';
import WaitingResponse from '../WaitingResponse';
import Fade from 'react-reveal/Fade';
import './RenderResponse.css';

const RenderResponse = ({ Content, Discipline }) => (
    <Fade clear>
        <div className='Render-Response-Box' data-discipline={Discipline}>
            <i className='Render-Response-Icon-Box'>
                {(Discipline === 'Client') ? (<TbBrandRedhat />) : (<BsRobot />)}
            </i>
            <div className='Render-Response-Content-Box'>
                {(Content.length >= 1) ? (
                    (Content?.includes('```') ? (
                        (With(([ InitialContent, Code, FinalContent ]) => (
                            <React.Fragment>
                                <p>{InitialContent}</p>
                                {(With(([ ProgrammingLanguage, ...CodeContent ]) => (
                                    <CopyBlock
                                        language={ProgrammingLanguage}
                                        showLineNumbers={true}
                                        theme={dracula}
                                        wrapLines={true}
                                        codeBlock={true}
                                        text={CodeContent.join('\n')} />
                                ), Code.split('\n').slice(0, -1)))}
                                <p>{FinalContent}</p>
                            </React.Fragment>
                        ), Content.split('```')))
                    ) : (
                        (Content.includes('\n') ? (
                            Content.split('\n').map((Part) => <p>{Part}</p>)
                        ) : (
                            <p>{Content}</p>
                        ))
                    ))
                ) : (
                    <WaitingResponse />
                )}
            </div>
        </div>
    </Fade>
);

export default RenderResponse;