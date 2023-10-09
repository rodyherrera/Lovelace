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

import { QuickLocalStorageRescue, StandardizedAPIRequestBuilder } from '../../Utilities/Runtime';
export const ChatAPI = new StandardizedAPIRequestBuilder({ Endpoint: '/chat' });
export const LocalStorageIdentifier = {
    Settings: 'Lovelace::Service::Chat::Settings',
    Historial: 'Lovelace::Service::History'
};

export const RecommendedProviders = { WS: 'Automatic', API: 'Automatic' };
export const StoredChatResponses = () => QuickLocalStorageRescue(LocalStorageIdentifier.Historial);

export const AvailableSettings = {
    CommunicationModes: [
        ['WebSocket (Recommended)', 'WS'],
        ['API', 'API']
    ],
    Roles: [
        ['User (Default)', 'user'],
        ['Assistant', 'assistant'],
        ['System', 'system'],
    ],
    Models: [
        ['GPT-3.5-Turbo (Recommended)', 'gpt-3.5-turbo'],
        ['GPT-4 (Unstable)', 'gpt-4']
    ]
};

export const SendMessage = ChatAPI.Register({
    Path: '/completions',
    Method: 'POST'
});

export const GetProviders = ChatAPI.Register({
    Path: '/providers',
    Method: 'GET'
});

export const DeleteItemFromChatHistory = (ID, ListIdentifier) => {
    const CurrentStoredChatResponses = StoredChatResponses();
    CurrentStoredChatResponses[ListIdentifier] = CurrentStoredChatResponses[ListIdentifier]
        .filter((SavedResponse) => SavedResponse.ID !== ID);
    (CurrentStoredChatResponses[ListIdentifier].length === 0) && (delete CurrentStoredChatResponses[ListIdentifier]);
    localStorage.setItem(LocalStorageIdentifier.Historial, JSON.stringify(CurrentStoredChatResponses));
};

export const GetStoredChatResponsesAsGPTContext = () => {
    const Buffer = [];
    const CurrentChatResponses = Object.values(StoredChatResponses() || {});
    if(!CurrentChatResponses)
        return Buffer;
    CurrentChatResponses.forEach((ChatResponseHistorial) => 
        ChatResponseHistorial.forEach(({ Prompt, Role, Response }) => 
            Buffer.push({ Content: Prompt, Role }, { Content: Response, Role: 'assistant' })));
    return Buffer;
};

export const GetLastIndexFromChatResponseList = (ListIdentifier) => {
    const ListLength = StoredChatResponses()?.[ListIdentifier]?.length;
    return (ListLength >= 1) ? (ListLength) : (0);
};

export const RetrieveChatResponseDateData = (DateInstance = new Date()) => {
    const DI = DateInstance;
    const FormatWithZero = (IntegerValue) => (IntegerValue < 10 ? '0' : '') + IntegerValue;
    return [
        DI.getFullYear() + '-' + DI.getMonth() + '-' + DI.getDate(),
        FormatWithZero(DI.getHours()) + ':' + FormatWithZero(DI.getMinutes())
    ];
};

export const ClearChatResponses = () => {
    localStorage.clear(LocalStorageIdentifier.Historial);
};

export const StoreChatResponse = (Response, Index = undefined) => {
    const [ Identifier, CreatedAt ] = RetrieveChatResponseDateData();
    const CurrentStoredResponses = StoredChatResponses() || {};
    const ToSaveResponseData = { ...Response, CreatedAt };
    delete Response.Model;
    delete Response.Provider;
    delete Response.Role;
    // ! Here it is verified if there is already a record that stores 
    // ! the interactions carried out by the user on the day they access the 
    // ! platform. This day is the value of the variable 'Identifier', which 
    // ! has the value '{Year}-{Month}-{Day}'.
    (!Array.isArray(CurrentStoredResponses?.[Identifier])) && (CurrentStoredResponses[Identifier] = []);
    (Index != undefined) 
        // ! In the event that we are storing a response in a WebSockets 
        // ! communication, as this is RealTime, the function must receive 
        // ! the response index in the set of interactions of the day in order to reassign its value.
        ? (CurrentStoredResponses[Identifier][Index] = { ...ToSaveResponseData })
        // ! In case the communication is through 'API', we simply save the final response within the set.
        : (CurrentStoredResponses[Identifier].push({ ...ToSaveResponseData }));
    localStorage.setItem(LocalStorageIdentifier.Historial, JSON.stringify(CurrentStoredResponses));
};

export const StoredLocalStorageSettings = () => QuickLocalStorageRescue(LocalStorageIdentifier.Settings);

export const StoreLocalStorageSettings = (Settings) =>
    localStorage.setItem(LocalStorageIdentifier.Settings, JSON.stringify(Settings));

/*
TODO: The following function will simulate a history 
TODO: of interactions with the AI ​​by the client, in case of tests related to the module.
TODO: Usage <FillChatResponseStorageForTesting(10, 5)>

import { LoremIpsum } from 'lorem-ipsum';
import { v4 } from 'uuid';

export const FillChatResponseStorageForTesting = (Amount, ResponsesPerDate) => {
    const DateResponsesBuffer = {};
    const PromptLoremGenerator = new LoremIpsum({
        sentencesPerParagraph: { max: 8, min: 4 },
        wordsPerSentence: { max: 12, min: 8 } });
    const ResponseLoremGenerator = new LoremIpsum({
        sentencesPerParagraph: { max: 12, min: 8 },
        wordsPerSentence: { max: 16, min: 12 } });
    for(let Iterator = 0; Iterator < Amount; Iterator++){
        const CurrentDate = new Date();
        CurrentDate.setDate(CurrentDate.getDate() - Iterator);
        for(let DateResponseIterator = 0; DateResponseIterator < ResponsesPerDate; DateResponseIterator++){
            CurrentDate.setMinutes(CurrentDate.getMinutes() - DateResponseIterator);
            const [ Identifier, CreatedAt ] = RetrieveChatResponseDateData(CurrentDate);
            (!DateResponsesBuffer?.[Identifier]) && (DateResponsesBuffer[Identifier] = []);
            DateResponsesBuffer[Identifier].push({
                ID: v4(),
                Prompt: PromptLoremGenerator.generateSentences(5),
                Response: ResponseLoremGenerator.generateSentences(5),
                CreatedAt });
        }
    }
    localStorage.setItem(LocalStorageIdentifier.Historial, JSON.stringify(DateResponsesBuffer));
};
*/
