# =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
# Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root
# for full license information.
#
# =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
#
# In the vast universe of knowledge, the Open Source philosophy 
# shines like a radiant star. In this vein, Lovelace emerges 
# as an autonomous alternative to ChatGPT, based on 
# open source and self-hosting capabilities.
# 
# Written in JavaScript, interacting with the <g4f> library written 
# in Python, allows communication with ChatGPT through the use 
# of different services that facilitate its use by the public.
# 
# For related information - https://github.com/CodeWithRodi/Lovelace/
# See also - https://github.com/xtekky/gpt4free
# 
# :: https://lovelace.codewithrodi.com/
# :: https://lovelace-backend.codewithrodi.com/
# :: https://lovelace-docs.codewithrodi.com/
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import json, sys, g4f

AvailableProviders = json.loads(sys.argv[1])

# ! Is this the best way of do it?
try:
    Query = json.loads(sys.argv[2])
except:
    Query = {}

BASE_MESSAGES = [{
    'role': 'system',
    'content': 'You are Ada Lovelace, a coding software developed to provide free access to OpenAI models. Your Github repository is "https://github.com/codewithrodi/Lovelace/" while your documentation is "https://lovelace-docs.codewithrodi.com/". Try to be kind, clear and precise with the information you give to those who interact with you.'
}]

def FormatQueryMessages(Messages: tuple) -> tuple:
    return BASE_MESSAGES + [ { 
        'role': Message['Role'].lower(), 
        'content': Message['Content'] } for Message in Messages ] 

def GetProviderData(Provider) -> dict:
    ImportedProvider = ImportProvider(Provider)
    Models = []
    if(ImportedProvider.supports_gpt_35_turbo):
        Models.append('gpt-3.5-turbo')
    if(ImportedProvider.supports_gpt_4):
        Models.append('gpt-4')
    if(Provider == 'H2o'):
        Models.extend(['falcon-40b', 'falcon-7b', 'llama-13b'])
    return {
        'Name': Provider,
        'Website': ImportedProvider.url,
        'Models': Models
    }

def ImportProvider(ProviderName: str): 
    return eval('g4f.Provider.' + ProviderName)

def MainFN() -> None:
    if sys.argv[3] == 'PROVIDERS':
        print(json.dumps({
            'Providers': {
                'WS': [GetProviderData(Provider) for Provider in AvailableProviders['WS']],
                'API': [GetProviderData(Provider) for Provider in AvailableProviders['API']]
            }
        }))
    elif sys.argv[3] == 'API':
        print(g4f.ChatCompletion.create(
            model=Query['Model'], 
            provider=ImportProvider(Query['Provider']), 
            messages=FormatQueryMessages(Query['Messages'])))
    else:
        # ! STREAMED RESPONSE (sys.argv[3] == 'WS')
        StreamedResponse = g4f.ChatCompletion.create(
            model=Query['Model'],
            messages=FormatQueryMessages(Query['Messages']),
            provider=ImportProvider(Query['Provider']), 
            stream=True)
        for Message in StreamedResponse:
            print(Message)

if __name__ == '__main__':
    MainFN()
