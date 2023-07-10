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
import { VscClose } from 'react-icons/vsc';
import { ChatContext } from '../../../Services/Chat/Context';
import { IconButton, MenuItem } from '@mui/material';
import { AvailableSettings, RecommendedProviders } from '../../../Services/Chat/Service';
import { CoreContext } from '../../../Services/Core/Context';
import Select from '../../General/Select';
import './SettingsMenu.css';

const SettingsMenu = () => {
    const SettingsMenuContentBoxReference = useRef(null);
    const { Settings, UserExperience } = useContext(ChatContext);
    const { L } = useContext(CoreContext);

    return (
        <aside id='Settings-Menu-Box' onClick={(Event) => (SettingsMenuContentBoxReference.current 
                && (Event.target.className)?.indexOf('MuiButtonBase-root') 
                && (Event.target.className)?.indexOf('MuiList-root') 
                && !SettingsMenuContentBoxReference.current.contains(Event.target)) 
                    && (UserExperience.SetIsSettingsMenuActive(false))}>
            <article id='Settings-Menu-Content-Box' ref={SettingsMenuContentBoxReference}>
                <div id='Settings-Menu-Header'>
                    <h3 id='Settings-Menu-Title'>{L('SETTINGS_MENU_TITLE')}</h3>
                    <IconButton id='Settings-Menu-Close-Icon-Box' onClick={() => UserExperience.SetIsSettingsMenuActive(false)}>
                        <VscClose />
                    </IconButton>
                </div>

                <div id='Settings-Menu-Body'>
                    {[
                        [L('SETTINGS_MENU_MODE_TITLE'), Settings.GetModel, Settings.SetModel, AvailableSettings.Models, L('SETTINGS_MENU_MODEL_HELPER_TEXT')],
                        [L('SETTINGS_MENU_ROLE_TITLE'), Settings.GetRole, Settings.SetRole, AvailableSettings.Roles, L('SETTINGS_MENU_ROLE_HELPER_TEXT')],
                        [L('SETTINGS_MENU_COMMUNICATION_MODE_TITLE'), Settings.GetCommunicationMode, Settings.SetCommunicationMode, AvailableSettings.CommunicationModes, L('SETTINGS_MENU_COMMUNICATION_MODE_HELPER_TEXT')]
                    ].map(([ Label, Getter, Setter, Options, HelperText ], Index) => (
                        <Select
                            key={Index}
                            HelperText={HelperText}
                            Label={Label}
                            Value={Getter}
                            OnChange={(Event) => Setter(Event.target.value)}
                        >
                            {(Options).map(([ Name, Option ], Index) => (
                                <MenuItem key={Index} value={Option}>{Name}</MenuItem>
                            ))}
                        </Select>
                    ))}

                    {(Settings.GetIsAvailableProvidersLoading) ? (
                        <p>{L('SETTINGS_MENU_REQUESTING_PROVIDERS')}</p>
                    ) : (
                        <Select
                            Label={L('SETTINGS_MENU_PROVIDERS_TITLE')}
                            Value={Settings.GetProvider}
                            HelperText={L('SETTINGS_MENU_PROVIDERS_HELPER_TEXT')}
                            OnChange={(Event) => Settings.SetProvider(Event.target.value)}
                        >
                            {(Settings.GetAvailableProviders[Settings.GetCommunicationMode]).map(({ Name }, Index) => (
                                <MenuItem
                                    key={Index}
                                    value={Name}
                                >{Name} {(RecommendedProviders?.[Settings.GetCommunicationMode] === Name) && ('(Recommended)')}</MenuItem>
                            ))}
                        </Select>
                    )}
                </div>
            </article>
        </aside>
    );
};

export default SettingsMenu;