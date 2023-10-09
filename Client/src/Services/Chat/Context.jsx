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

import React, { createContext, useState, useEffect } from 'react';
import SocketIO from 'socket.io-client';
import { v4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { MergeObjectValues } from '../../Utilities/Algorithms';
import { With } from '../../Utilities/Runtime';
import * as Service from './Service';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const SavedSettings = Service.StoredLocalStorageSettings();
    const Location = useLocation();

    // ! Server Communication Related States
    const [GetWebSocket, SetWebSocket] = useState(null);
    const [GetPrompt, SetPrompt] = useState('');
    const [GetAPIResponses, SetAPIResponses] = useState([]);
    const [GetStreamedResponses, SetStreamedResponses] = useState({});
    const [GetIsLoading, SetIsLoading] = useState(false);
    const [GetIsWebSocketConnected, SetIsWebSocketConnected] = useState(false);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetError, SetError] = useState('');

    // ! User Experience's Related States
    const [GetIsSettingsMenuActive, SetIsSettingsMenuActive] = useState(false);
    const [GetIsMobileActivityMenuActive, SetIsMobileActivityMenuActive] = useState(false);
    const [GetSelectedList, SetSelectedList] = useState('');

    // ! Client Settings Related States
    // TODO: Default GPT4FREE Settings:
    // TODO: Communication Mode -> WS (Web Sockets)
    // TODO: Role -> User
    // TODO: Provider -> Recommended Provider by Communication Mode (assigned in useEffect)
    // TODO: Model -> GPT-3.5-Turbo
    const [GetCommunicationMode, SetCommunicationMode] = useState(SavedSettings?.CommunicationMode || 'WS');
    const [GetRole, SetRole] = useState(SavedSettings?.Role || 'user');
    const [GetAvailableProviders, SetAvailableProviders] = useState(SavedSettings?.Providers || {});
    const [GetIsAvailableProvidersLoading, SetIsAvailableProvidersLoading] = useState(!Object.keys(GetAvailableProviders).length);
    const [GetProvider, SetProvider] = useState(SavedSettings?.Provider?.[GetCommunicationMode] || '');
    const [GetModel, SetModel] = useState(SavedSettings?.Model || 'gpt-3.5-turbo');

    const SendMessage = (Body) => Service.SendMessage({ Body });

    const HandleAvailableProvidersRequest = async () => {
      SetIsAvailableProvidersLoading(true);
        try{
            const { Data } = await Service.GetProviders({ });
            SetAvailableProviders(Data.Providers);
        }finally{
            SetIsAvailableProvidersLoading(false);
        }
    };

    const HandleChatResponseSelect = (ListID) => {
        const Buffer = [];
        try{
            Service.StoredChatResponses()[ListID].forEach(({ Prompt, Response, ID }) => 
                (Buffer.push({ Discipline: 'Client', Answer: Prompt, ID }, { Discipline: 'Server', Answer: Response, ID })));
            SetStreamedResponses({});
            SetAPIResponses(Buffer);
        }catch(PersistChatError){
            Service.ClearChatResponses();
        }
    };

    const MountModifiedChatResponseList = (ID) => {
        const Buffer = GetStreamedResponses;
        delete Buffer[ID];
        SetStreamedResponses(Buffer);
        SetAPIResponses((APIResponses) => APIResponses.filter((Response) => Response.ID !== ID));
    };

    const HandleChatReset = () => {
        SetSelectedList('');
        SetAPIResponses([]);
        SetStreamedResponses({});
    };

    useEffect(() => {
        if(!GetError)
            return;
        console.error(`[Services::Chat::Context]: ${GetError.Message}.${(GetError?.Exception) ? ('\n' + GetError.Exception) : ('')}`);
    }, [GetError]);

    const SubmitPrompt = async (OutOfStatePrompt) => {
        SetIsLoading(true);
        (!OutOfStatePrompt) && (SetPrompt(''));
        const RequestedPrompt = (OutOfStatePrompt || GetPrompt);
        const ServerQuery = {
            Model: GetModel,
            Provider: GetProvider,
            Messages: [ ...Service.GetStoredChatResponsesAsGPTContext(), { Role: GetRole, Content: RequestedPrompt } ] };
        const ID = v4();
        if(GetCommunicationMode === 'WS'){
            SetStreamedResponses((StreamedResponses) => ({ ...StreamedResponses, [RequestedPrompt]: { Response: '' } }));
            GetWebSocket.emit('Prompt', ServerQuery, (ProcessError) => {
                (ProcessError) && (SetError(ProcessError));
                GetWebSocket.removeEventListener('Response');
                SetIsLoading(false);
            });
            const LastChatResponseIndex = Service.GetLastIndexFromChatResponseList(Service.RetrieveChatResponseDateData()[0]);
            GetWebSocket.on('Response', (Answer) => {
                SetStreamedResponses((StreamedResponses) => {
                    const Buffer = {
                        ...StreamedResponses,
                        [RequestedPrompt]: { Response: StreamedResponses[RequestedPrompt].Response += Answer + '\n', ID } };
                    Service.StoreChatResponse({ 
                        ...ServerQuery, 
                        Prompt: RequestedPrompt, 
                        Role: GetRole, 
                        ID, 
                        Response: Buffer[RequestedPrompt].Response }, LastChatResponseIndex);
                    return Buffer;
                });
            });
            return;
        }
        // ! If CommunicationMode == 'API'
        SetAPIResponses((APIResponses) => [ ...APIResponses, { ID, Discipline: 'Client', Answer: RequestedPrompt } ]);
        try{
            const { Data } = await SendMessage(ServerQuery);
            if(!GetIsComponentMounted)
                return;
            SetAPIResponses((APIResponses) => [ ...APIResponses, { Discipline: 'Server', ID, Answer: Data.Answer } ]);
            Service.StoreChatResponse({ ...ServerQuery, Response: Data.Answer, ID });
        }finally{
            SetIsLoading(false);
        }
    };

    useEffect(() => {
        // ! Provider exists in stored settings?: Load it in the state if 
        // ! exists, if not load the default recommended provider.
        With((StoredSettings) => SetProvider((!StoredSettings?.Provider?.[GetCommunicationMode])
            ? (Service.RecommendedProviders[GetCommunicationMode])
            : (StoredSettings.Provider[GetCommunicationMode])), Service.StoredLocalStorageSettings());
        // ! When the communication mode with the server changes from 
        // ! WebSockets to API, pass all responses stored 
        // ! in <GetStreamedResponses> to <GetAPIResponses>.
        const StreamedResponseKeys = Object.keys(GetStreamedResponses);
        if(StreamedResponseKeys.length >= 1 && GetCommunicationMode == 'WS'){
            const Buffer = [ ...GetAPIResponses ];
            // TODO: With(({ Prompt, Response, ID }) => Buffer.push( ClientPrompt, ServerResponse ), ...);
            StreamedResponseKeys.forEach((Key) => With(({ Prompt, Response, ID }) => 
                Buffer.push({ Discipline: 'Client', Answer: Prompt, ID }, 
                    { Discipline: 'Server', Answer: Response, ID }), { Prompt: Key, ...GetStreamedResponses[Key] }));
            SetStreamedResponses({});
            SetAPIResponses(Buffer);
        }
    }, [GetCommunicationMode]);

    useEffect(() => {
        if(!GetModel || !GetProvider || !Object.keys(GetAvailableProviders).length)
            return;
        const AvailableProviders = GetAvailableProviders[GetCommunicationMode];
        const ProviderSettings = AvailableProviders.find(({ Name }) => Name === GetProvider);
        if(ProviderSettings.Models.includes(GetModel))
            return;
        const FindProviders = (CommunicationMode = GetCommunicationMode) => {
            const FilteredProviders = GetAvailableProviders[CommunicationMode].find(({ Models }) => Models.includes(GetModel));
            if(!FilteredProviders){
                const Mode = CommunicationMode === 'WS' ? 'API' : 'WS';
                SetCommunicationMode(Mode);
                return FindProviders(Mode);
            }
            return FilteredProviders;
        };
        const ProvidersFilteredByModel = FindProviders();
        SetProvider(ProvidersFilteredByModel.Name);
    }, [GetModel, GetProvider, GetAvailableProviders]);
    
    useEffect(() => {
        Service.StoreLocalStorageSettings({
            Role: GetRole, 
            Provider: MergeObjectValues(Service.StoredLocalStorageSettings()?.Provider || {}, { [GetCommunicationMode]: GetProvider }),
            CommunicationMode: GetCommunicationMode,
            Model: GetModel,
            Providers: GetAvailableProviders });
    }, [GetModel, GetRole, GetProvider, GetCommunicationMode, GetAvailableProviders]);

    useEffect(() => {
        if(GetWebSocket === null)
            return;
        // TODO: Is the <GetWebSocket.off(event, callback)> required in useEffect cleanup fn?
        GetWebSocket.on('connect', () => SetIsWebSocketConnected(true));
        GetWebSocket.on('disconnect', () => SetIsWebSocketConnected(false));
    }, [GetWebSocket]);

    useEffect(() => {
        Service.ChatAPI.BindErrorSetter(SetError);
        HandleAvailableProvidersRequest();
        SetWebSocket(SocketIO.connect(import.meta.env.VITE_SERVER));
        // TODO: If a conversation was previously held within the day, when 
        // TODO: entering later they will be automatically loaded in the side menu. 
        // TODO: It's useful, but I'm slightly inclined to believe that it makes 
        // TODO: the user interface a little less simple.
        // ! Creating a more simplified view to display the 
        // ! content will be useful to rerun these lines of code, homework!
        // * const TodayHistorialKey = Service.RetrieveChatResponseDateData()[0];
        // * const AvaialbleHistorialKeys = Object.keys(Service.StoredChatResponses() || {});
        // * SetSelectedList((AvaialbleHistorialKeys).includes(TodayHistorialKey) ? (TodayHistorialKey) : (AvaialbleHistorialKeys[0]));
        return () => {
            SetWebSocket(null);
            SetPrompt('');
            SetAPIResponses([]);
            SetStreamedResponses({});
            SetIsWebSocketConnected(false);
            SetIsLoading(false);
            SetIsComponentMounted(true);
            SetIsSettingsMenuActive(false);
            SetIsMobileActivityMenuActive(false);
            SetCommunicationMode('');
            SetRole('');
            SetIsAvailableProvidersLoading(false);
            SetProvider('');
            SetSelectedList('');
            SetModel('');
            SetAvailableProviders([]);
        };
    }, []);

    useEffect(() => {
        (GetError?.length) && (SetError(''));
    }, [Location]);

    return (
        <ChatContext.Provider
            value={{
                ServerCommunication: {
                    GetWebSocket,
                    SetWebSocket,
                    GetPrompt,
                    SetPrompt,
                    SetAPIResponses,
                    GetAPIResponses,
                    SetStreamedResponses,
                    GetStreamedResponses,
                    GetIsWebSocketConnected,
                    GetIsLoading,
                    SetIsLoading,
                    GetError,
                    SetError
                },
                UserExperience: {
                    GetIsSettingsMenuActive,
                    SetIsSettingsMenuActive,
                    GetIsMobileActivityMenuActive,
                    SetIsMobileActivityMenuActive,
                    GetSelectedList,
                    SetSelectedList
                },
                Settings: {
                    GetCommunicationMode,
                    SetCommunicationMode,
                    GetRole,
                    SetRole,
                    GetIsAvailableProvidersLoading,
                    SetIsAvailableProvidersLoading,
                    GetProvider,
                    SetProvider,
                    SetModel,
                    GetModel,
                    GetAvailableProviders,
                    SetAvailableProviders
                },
                HandleChatResponseSelect,
                MountModifiedChatResponseList,
                HandleChatReset,
                SubmitPrompt
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
