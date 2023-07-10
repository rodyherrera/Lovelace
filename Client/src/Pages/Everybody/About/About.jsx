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
import { CoreContext } from '../../../Services/Core/Context';
import Fade from 'react-reveal/Fade';
import './About.css';

const AboutPage = () => {
    const { L } = useContext(CoreContext);

    const Policies = [
        [L('POLICIES_LEGAL_NOTICE'), L('POLICIES_LEGAL_NOTICE_CONTENT_1'), L('POLICIES_LEGAL_NOTICE_CONTENT_2')],
        [L('POLICIES_PRIVACY'), L('POLICIES_PRIVACY_CONTENT_1'), L('POLICIES_PRIVACY_CONTENT_2')],
        [L('POLICIES_RESTRICTIONS'), L('POLICIES_RESTRICTIONS_CONTENT_1')],
        [L('POLICIES_OPEN_SOURCE'), L('POLICIES_OPEN_SOURCE_CONTENT_1')]
    ]; 

    return (
        <main id='About-Page-Main'>
            <Fade top>
                <section id='Introduction-Box'>
                    <h3 id='Page-Title'>{L('ABOUT_PAGE_TITLE')}</h3>
                    <p id='Page-Subtitle'>{L('ABOUT_PAGE_SUBTITLE')}</p>
                </section>
            </Fade>

            <Fade bottom>
                <section id='Policies-Box'>
                    {(Policies).map(([ Title, ...Descriptions ], Index) => (
                        <article key={Index}>
                            <h3 className='Policy-Title'>{Title}</h3>
                            <div className='Policy-Content-Box'>
                                {(Descriptions).map((Description, SubIndex) => (
                                    <p className='Policy-Description' key={SubIndex}>{Description}</p>
                                ))}
                            </div>
                        </article>
                    ))}
                </section>
            </Fade>
        </main>
    );
};

export default AboutPage;