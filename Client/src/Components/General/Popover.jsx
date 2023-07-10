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
import { Popover as EvergreenPopover, Menu as EverMenu, Position } from 'evergreen-ui';

const Popover = ({
    Items = {},
    children
}) => {
    const TotalItems = Object.keys(Items).length;
    const ItemKeys = Object.keys(Items);

    return (
        <EvergreenPopover
            position={Position.BOTTOM_RIGHT}
            content={
                <EverMenu>
                    {(ItemKeys.map((Key, Index) => (
                        <React.Fragment key={Index}>
                            <EverMenu.Group>
                                {(Items[Key]).map(({ OnClick, Icon, Content }, Index) => (
                                    <EverMenu.Item
                                        key={Index}
                                        onClick={OnClick}
                                        icon={<i className='Popover-Icon'><Icon /></i>}
                                    >
                                        <span className='Popover-Content'>{Content}</span>
                                    </EverMenu.Item>
                                ))}
                            </EverMenu.Group>
                            {(Index === 0 && Index !== TotalItems) && (<EverMenu.Divider />)}
                        </React.Fragment>
                    )))}
                </EverMenu>
            }
        >
            {children}
        </EvergreenPopover>
    );
};

export default Popover;